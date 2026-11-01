const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { URL } = require("node:url");
const { judgeJavaSubmission, runJudge0 } = require("./server/java-judge");

const ROOT_DIR = __dirname;
const MAX_REQUEST_BYTES = 120 * 1024;

loadDotEnv(path.join(ROOT_DIR, ".env"));

const PORT = Number(process.env.PORT || 3000);
const JUDGE0_URL = process.env.JUDGE0_URL;
const JUDGE0_LANGUAGE_ID = process.env.JUDGE0_LANGUAGE_ID || "62";

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const separator = trimmed.indexOf("=");
    if (separator < 1) return;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  });
}

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

function sendJson(response, statusCode, body) {
  const payload = JSON.stringify(body);
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
    "Cache-Control": "no-store",
    ...corsHeaders(response.req)
  });
  response.end(payload);
}

function sendText(response, statusCode, body, contentType = "text/plain; charset=utf-8") {
  response.writeHead(statusCode, {
    "Content-Type": contentType,
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    ...corsHeaders(response.req)
  });
  response.end(body);
}

function corsHeaders(request) {
  const origin = request?.headers?.origin || "";
  const allowedOrigin = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin) ? origin : "";
  return {
    ...(allowedOrigin ? { "Access-Control-Allow-Origin": allowedOrigin, Vary: "Origin" } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "600"
  };
}

function sendCorsPreflight(response) {
  response.writeHead(204, {
    ...corsHeaders(response.req),
    "Content-Length": 0
  });
  response.end();
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let totalBytes = 0;
    const chunks = [];
    request.on("data", (chunk) => {
      totalBytes += chunk.length;
      if (totalBytes > MAX_REQUEST_BYTES) {
        reject(new Error("Request body is too large."));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(new Error("Request body must be valid JSON."));
      }
    });
    request.on("error", reject);
  });
}

async function runJavaCode(request, response) {
  let body;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    sendJson(response, 400, { error: error.message });
    return;
  }

  const code = typeof body.code === "string" ? body.code : "";
  const input = typeof body.input === "string" ? body.input : "";
  if (!code.trim()) {
    sendJson(response, 400, { error: "Java code is required." });
    return;
  }

  try {
    const result = await runJudge0({
      code,
      input,
      judge0Url: JUDGE0_URL,
      languageId: JUDGE0_LANGUAGE_ID,
      authToken: process.env.JUDGE0_AUTH_TOKEN,
      rapidApiKey: process.env.RAPIDAPI_KEY,
      rapidApiHost: process.env.RAPIDAPI_HOST
    });
    sendJson(response, 200, result);
  } catch (error) {
    sendJson(response, error.statusCode || 502, { error: error.message, ...(error.code ? { code: error.code } : {}) });
  }
}

async function judgeJavaCode(request, response) {
  let body;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    sendJson(response, 400, { error: error.message });
    return;
  }

  try {
    const result = await judgeJavaSubmission({
      questionId: typeof body.questionId === "string" ? body.questionId : "",
      code: typeof body.code === "string" ? body.code : "",
      runner: (code, input, expectedOutput) => runJudge0({
        code,
        input,
        expectedOutput,
        judge0Url: JUDGE0_URL,
        languageId: JUDGE0_LANGUAGE_ID,
        authToken: process.env.JUDGE0_AUTH_TOKEN,
        rapidApiKey: process.env.RAPIDAPI_KEY,
        rapidApiHost: process.env.RAPIDAPI_HOST
      })
    });
    sendJson(response, 200, result);
  } catch (error) {
    sendJson(response, error.statusCode || 502, {
      error: error.message || "Java judge failed.",
      ...(error.code ? { code: error.code } : {})
    });
  }
}

function safeStaticPath(urlPath) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(urlPath);
  } catch (error) {
    return null;
  }
  const relativePath = decodedPath === "/" ? "index.html" : decodedPath.replace(/^\/+/, "");
  const blockedPath = relativePath === ".env" || relativePath.startsWith(".env.") || relativePath === "server.js" || relativePath.startsWith(".git/");
  if (blockedPath) return null;
  const absolutePath = path.resolve(ROOT_DIR, relativePath);
  return absolutePath.startsWith(ROOT_DIR + path.sep) || absolutePath === ROOT_DIR ? absolutePath : null;
}

function serveStatic(request, response, pathname) {
  const filePath = safeStaticPath(pathname);
  if (!filePath) {
    sendText(response, 403, "Forbidden");
    return;
  }
  fs.stat(filePath, (statError, stats) => {
    if (!statError && stats.isFile()) {
      const extension = path.extname(filePath).toLowerCase();
      response.writeHead(200, {
        "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
        "Content-Length": stats.size
      });
      fs.createReadStream(filePath).pipe(response);
      return;
    }
    if (request.method === "GET" && !path.extname(pathname)) {
      const fallback = path.join(ROOT_DIR, "index.html");
      fs.stat(fallback, (fallbackError, fallbackStats) => {
        if (fallbackError || !fallbackStats.isFile()) {
          sendText(response, 404, "Not found");
          return;
        }
        response.writeHead(200, { "Content-Type": MIME_TYPES[".html"], "Content-Length": fallbackStats.size });
        fs.createReadStream(fallback).pipe(response);
      });
      return;
    }
    sendText(response, 404, "Not found");
  });
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  response.req = request;
  const isPracticeApi = requestUrl.pathname === "/api/java/compile"
    || requestUrl.pathname === "/api/java/judge"
    || requestUrl.pathname === "/api/java/check";
  if (request.method === "OPTIONS" && isPracticeApi) {
    sendCorsPreflight(response);
    return;
  }
  if (request.method === "POST" && requestUrl.pathname === "/api/java/compile") {
    await runJavaCode(request, response);
    return;
  }
  if (request.method === "POST" && requestUrl.pathname === "/api/java/judge") {
    await judgeJavaCode(request, response);
    return;
  }
  if (request.method === "POST" && requestUrl.pathname === "/api/java/check") {
    sendJson(response, 501, {
      error: "AI checking endpoint is not configured yet.",
      message: "Add your AI endpoint and response contract before using Check with AI."
    });
    return;
  }
  if (request.method !== "GET" && request.method !== "HEAD") {
    sendText(response, 405, "Method not allowed");
    return;
  }
  serveStatic(request, response, requestUrl.pathname);
});

server.listen(PORT, () => {
  console.log(`Developer Interview Master running at http://localhost:${PORT}`);
  console.log(`Judge0 URL: ${JUDGE0_URL || "not configured"}`);
  console.log(`Judge0 Java language ID: ${JUDGE0_LANGUAGE_ID}`);
  console.log(`Judge0 configured: ${Boolean(JUDGE0_URL)}`);
});