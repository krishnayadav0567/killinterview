const MAX_REQUEST_BYTES = 120 * 1024;
const DEFAULT_RUN_URL = "https://api.onlinecompiler.io/api/run-code-sync/";
const DEFAULT_COMPILER = "openjdk-25";

function getMethod(event) {
  return event.httpMethod || event.requestContext?.http?.method || "GET";
}

function getHeader(event, name) {
  const headers = event.headers || {};
  const requestedName = name.toLowerCase();
  const matchingKey = Object.keys(headers).find((key) => key.toLowerCase() === requestedName);
  return matchingKey ? headers[matchingKey] : "";
}

function corsHeaders(event) {
  const origin = getHeader(event, "origin");
  const isAllowedOrigin = /^https:\/\/[a-z0-9-]+(?:\.[a-z0-9-]+)*\.netlify\.app$/i.test(origin)
    || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);

  return {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "600",
    ...(isAllowedOrigin ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {})
  };
}

function jsonResponse(event, statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...corsHeaders(event)
    },
    body: JSON.stringify(body)
  };
}

function readJsonBody(event) {
  if (!event.body) return {};

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;

  if (Buffer.byteLength(rawBody, "utf8") > MAX_REQUEST_BYTES) {
    throw new Error("Request body is too large.");
  }

  try {
    return JSON.parse(rawBody);
  } catch (error) {
    throw new Error("Request body must be valid JSON.");
  }
}

async function runJavaCode(event) {
  if (!process.env.ONLINECOMPILER_API_KEY) {
    return jsonResponse(event, 503, {
      error: "OnlineCompiler is not configured.",
      message: "Add ONLINECOMPILER_API_KEY to the Netlify Functions environment variables and redeploy."
    });
  }

  let body;
  try {
    body = readJsonBody(event);
  } catch (error) {
    return jsonResponse(event, 400, { error: error.message });
  }

  const code = typeof body.code === "string" ? body.code : "";
  const input = typeof body.input === "string" ? body.input : "";
  if (!code.trim()) {
    return jsonResponse(event, 400, { error: "Java code is required." });
  }

  const runUrl = process.env.ONLINECOMPILER_RUN_URL || DEFAULT_RUN_URL;
  const compiler = process.env.ONLINECOMPILER_COMPILER || DEFAULT_COMPILER;

  try {
    const upstream = await fetch(runUrl, {
      method: "POST",
      headers: {
        Authorization: process.env.ONLINECOMPILER_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ compiler, code, input })
    });

    const raw = await upstream.text();
    let result;
    try {
      result = raw ? JSON.parse(raw) : {};
    } catch (error) {
      result = { error: raw };
    }

    if (!upstream.ok) {
      return jsonResponse(event, upstream.status, {
        error: result.error || result.message || "OnlineCompiler rejected the request.",
        provider: result
      });
    }

    return jsonResponse(event, 200, {
      ...result,
      compileSuccess: result.status === "success" && Number(result.exit_code || 0) === 0,
      compiler
    });
  } catch (error) {
    return jsonResponse(event, 502, {
      error: "Could not reach OnlineCompiler.",
      message: error.message
    });
  }
}

exports.handler = async (event) => {
  const method = getMethod(event).toUpperCase();
  if (method === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders(event),
      body: ""
    };
  }

  if (method !== "POST") {
    return jsonResponse(event, 405, { error: "Method not allowed." });
  }

  return runJavaCode(event);
};