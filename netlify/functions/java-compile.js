const { runJudge0 } = require("../../server/java-judge");

const MAX_REQUEST_BYTES = 120 * 1024;

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
  if (!process.env.JUDGE0_URL) {
    return jsonResponse(event, 503, {
      error: "Judge0 is not configured.",
      message: "Add JUDGE0_URL and JUDGE0_LANGUAGE_ID to the Netlify Functions environment variables and redeploy."
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

  try {
    const result = await runJudge0({
      code,
      input,
      judge0Url: process.env.JUDGE0_URL,
      languageId: process.env.JUDGE0_LANGUAGE_ID || "62",
      authToken: process.env.JUDGE0_AUTH_TOKEN,
      rapidApiKey: process.env.RAPIDAPI_KEY,
      rapidApiHost: process.env.RAPIDAPI_HOST
    });
    return jsonResponse(event, 200, result);
  } catch (error) {
    return jsonResponse(event, error.statusCode || 502, { error: error.message, ...(error.code ? { code: error.code } : {}) });
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