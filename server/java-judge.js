const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { getPracticeTestCaseDefinition } = require("./practice-test-cases");

const QUESTIONS_PATH = path.join(__dirname, "..", "data", "java", "practice-questions.js");
const DEFAULT_TIMEOUT_MS = 15000;
const DEFAULT_POLL_INTERVAL_MS = 250;
const MAX_CODE_LENGTH = 100 * 1024;
const MAX_OUTPUT_LENGTH = 12000;

let questionMap;

function loadQuestions() {
  if (questionMap) return questionMap;
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(QUESTIONS_PATH, "utf8"), context, { filename: QUESTIONS_PATH });
  const questions = Array.isArray(context.window.JAVA_PRACTICE_QUESTIONS)
    ? context.window.JAVA_PRACTICE_QUESTIONS
    : [];
  questionMap = new Map(questions.map((question) => [question.id, question]));
  return questionMap;
}

function firstValue(data, keys, fallback = "") {
  for (const key of keys) {
    if (data && data[key] !== undefined && data[key] !== null) return data[key];
  }
  return fallback;
}

function textValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  try { return JSON.stringify(value, null, 2); } catch (error) { return String(value); }
}

function truncate(value) {
  const text = textValue(value);
  return text.length > MAX_OUTPUT_LENGTH ? `${text.slice(0, MAX_OUTPUT_LENGTH)}\n[…output truncated…]` : text;
}

function normalizeOutput(value) {
  return textValue(value)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

function getQuestion(questionId) {
  return loadQuestions().get(questionId) || null;
}

function getJudgeDefinition(questionId) {
  const question = getQuestion(questionId);
  if (!question) {
    const error = new Error("Question not found.");
    error.statusCode = 404;
    throw error;
  }

  let definition;
  try {
    definition = getPracticeTestCaseDefinition(question);
  } catch (error) {
    const validationError = new Error(error.message);
    validationError.statusCode = 422;
    throw validationError;
  }
  const testCases = definition.testCases;
  return {
    question,
    testCases,
    judgeable: testCases.length > 0,
    invalid: Boolean(definition.error),
    reason: testCases.length > 0
      ? ""
      : definition.error
        ? definition.error
      : question.topic === "Spring Boot"
        ? "Spring Boot questions require framework dependencies and a separate application test harness."
        : "This question does not have a deterministic standalone output contract for the current judge."
  };
}

function looksLikeRuntimeError(errors, output) {
  return /(?:Exception in thread|\b(?:RuntimeException|ArithmeticException|ArrayIndexOutOfBoundsException|NullPointerException|NumberFormatException|StackOverflowError|OutOfMemoryError)\b|\bat\s+Main\.)/i.test(`${errors}\n${output}`);
}

function normalizeCompilerResult(data) {
  const output = firstValue(data, ["output", "stdout", "result", "programOutput"], "");
  const errors = firstValue(data, ["errors", "stderr", "error", "compileError", "compilationError", "message"], "");
  const exitCode = firstValue(data, ["exit_code", "exitCode", "code"], null);
  const status = String(firstValue(data, ["status"], "") || "").toLowerCase();
  const explicitSuccess = firstValue(data, ["compileSuccess", "compiled", "success", "ok"], null);
  const success = explicitSuccess === null
    ? status === "success" && (exitCode === null || Number(exitCode) === 0)
    : Boolean(explicitSuccess);

  return {
    success,
    output: truncate(output),
    errors: truncate(errors),
    exitCode,
    status,
    errorType: data.errorType || null,
    judgeStatusId: data.judgeStatusId ?? null,
    raw: data
  };
}

function createTimeoutSignal(timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return { signal: controller.signal, clear: () => clearTimeout(timer) };
}

function createJudge0TimeoutError() {
  const error = new Error("Judge0 exceeded the execution time limit.");
  error.statusCode = 504;
  error.code = "TIMEOUT";
  return error;
}

function judge0BaseUrl(value) {
  return String(value || "").replace(/\/+$/, "");
}

function judge0Headers({ authToken, rapidApiKey, rapidApiHost }) {
  return {
    "Content-Type": "application/json",
    ...(authToken ? { "X-Auth-Token": authToken } : {}),
    ...(rapidApiKey ? { "X-RapidAPI-Key": rapidApiKey } : {}),
    ...(rapidApiHost ? { "X-RapidAPI-Host": rapidApiHost } : {})
  };
}

function parseJsonResponse(raw) {
  try {
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return { error: raw };
  }
}

function judge0Status(data) {
  const status = data?.status;
  const id = Number(data?.status_id ?? status?.id ?? NaN);
  const description = String(data?.status_description ?? status?.description ?? "").toLowerCase();
  return { id: Number.isFinite(id) ? id : null, description };
}

function isJudge0Terminal(data) {
  const status = judge0Status(data);
  if (status.id !== null) return ![1, 2].includes(status.id);
  if (["in queue", "processing"].includes(status.description)) return false;
  return !data?.token;
}

function normalizeJudge0Result(data) {
  const status = judge0Status(data);
  const output = data?.stdout || "";
  const errors = data?.compile_output || data?.stderr || data?.message || "";
  const infrastructureError = /(?:could not reserve enough space for code cache|rosetta error|failed to create control group|no such file or directory.*\/box\/|sandbox unavailable)/i.test(String(errors));
  const accepted = status.id === 3 || status.description === "accepted";
  let errorType = null;

  if (infrastructureError) errorType = "judge0_error";
  else if (status.id === 4 || status.description === "wrong answer") errorType = "wrong_answer";
  else if (status.id === 6 || status.description === "compilation error") errorType = "compilation_error";
  else if (status.id === 13 || status.description === "internal error") errorType = "judge0_error";
  else if (status.id === 5 || (status.id >= 7 && status.id <= 15)
    || status.description.startsWith("runtime error")
    || status.description === "time limit exceeded") {
    errorType = "runtime_error";
  }

  return normalizeCompilerResult({
    output,
    errors,
    exitCode: data?.exit_code ?? data?.exitCode ?? null,
    compileSuccess: accepted,
    status: status.description,
    errorType,
    judgeStatusId: status.id,
    raw: data
  });
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function runJudge0({
  code,
  input = "",
  expectedOutput,
  judge0Url,
  languageId,
  authToken = "",
  rapidApiKey = "",
  rapidApiHost = "",
  fetchImpl = globalThis.fetch,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  pollIntervalMs = DEFAULT_POLL_INTERVAL_MS
}) {
  if (!judge0Url || languageId === undefined || languageId === null || languageId === "") {
    const error = new Error("Judge0 is not configured.");
    error.statusCode = 503;
    throw error;
  }
  if (typeof fetchImpl !== "function") {
    const error = new Error("This runtime does not provide fetch.");
    error.statusCode = 500;
    throw error;
  }

  const timeout = createTimeoutSignal(timeoutMs);
  const baseUrl = judge0BaseUrl(judge0Url);
  const headers = judge0Headers({ authToken, rapidApiKey, rapidApiHost });
  const numericLanguageId = Number(languageId);
  if (!Number.isInteger(numericLanguageId) || numericLanguageId < 1) {
    const error = new Error("JUDGE0_LANGUAGE_ID must be a positive integer.");
    error.statusCode = 500;
    throw error;
  }

  try {
    const submissionUrl = `${baseUrl}/submissions?base64_encoded=false&wait=false`;
    const upstream = await fetchImpl(submissionUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        source_code: code,
        language_id: numericLanguageId,
        stdin: input,
        ...(typeof expectedOutput === "string" ? { expected_output: expectedOutput } : {})
      }),
      signal: timeout.signal
    });
    const result = parseJsonResponse(await upstream.text());

    if (!upstream.ok) {
      const error = new Error(result.error || result.message || "Judge0 rejected the submission.");
      error.statusCode = upstream.status >= 500 ? 502 : upstream.status;
      error.provider = result;
      throw error;
    }

    if (!result.token && !isJudge0Terminal(result)) {
      const error = new Error("Judge0 did not return a submission token.");
      error.statusCode = 502;
      error.provider = result;
      throw error;
    }

    let finalResult = result;
    while (!isJudge0Terminal(finalResult)) {
      if (timeout.signal.aborted) throw createJudge0TimeoutError();
      await wait(pollIntervalMs);
      if (timeout.signal.aborted) throw createJudge0TimeoutError();

      const statusUrl = `${baseUrl}/submissions/${encodeURIComponent(result.token)}?base64_encoded=false`;
      const statusResponse = await fetchImpl(statusUrl, {
        method: "GET",
        headers,
        signal: timeout.signal
      });
      const statusResult = parseJsonResponse(await statusResponse.text());
      if (!statusResponse.ok) {
        const error = new Error(statusResult.error || statusResult.message || "Judge0 could not retrieve the submission.");
        error.statusCode = statusResponse.status >= 500 ? 502 : statusResponse.status;
        error.provider = statusResult;
        throw error;
      }
      finalResult = statusResult;
    }

    return normalizeJudge0Result(finalResult);
  } catch (error) {
    if (error.name === "AbortError") {
      throw createJudge0TimeoutError();
    }
    throw error;
  } finally {
    timeout.clear();
  }
}

function classifyCompilerResult(result) {
  if (result.success) return null;
  if (["wrong_answer", "compilation_error", "runtime_error", "judge0_error"].includes(result.errorType)) return result.errorType;
  if (looksLikeRuntimeError(result.errors, result.output)) return "runtime_error";
  return "compilation_error";
}

function visibleTestCaseResult(index, testCase, result, passed, verdict) {
  const hidden = testCase.hidden === true;
  return {
    index,
    hidden,
    passed,
    verdict,
    actualOutput: hidden ? undefined : result ? result.output : "",
    expectedOutput: hidden ? undefined : testCase.expectedOutput,
    errors: hidden ? (passed ? "" : "Hidden test case failed.") : (result?.errors || ""),
    exitCode: result?.exitCode ?? null
  };
}

async function judgeJavaSubmission({ questionId, code, runner }) {
  if (typeof code !== "string" || !code.trim()) {
    const error = new Error("Java code is required.");
    error.statusCode = 400;
    throw error;
  }
  if (code.length > MAX_CODE_LENGTH) {
    const error = new Error("Java code is too large.");
    error.statusCode = 413;
    throw error;
  }
  if (typeof runner !== "function") {
    const error = new Error("Judge compiler runner is not available.");
    error.statusCode = 500;
    throw error;
  }

  const definition = getJudgeDefinition(questionId);
  if (definition.invalid) {
    const error = new Error(definition.reason);
    error.statusCode = 422;
    throw error;
  }
  if (!definition.judgeable) {
    return {
      questionId,
      verdict: "manual_review",
      accepted: false,
      passedTestCases: 0,
      totalTestCases: 0,
      testCases: [],
      message: definition.reason
    };
  }

  const results = [];
  for (let index = 0; index < definition.testCases.length; index += 1) {
    const testCase = definition.testCases[index];
    let compilerResult;
    try {
      compilerResult = await runner(code, testCase.input, testCase.expectedOutput);
    } catch (error) {
      if (error.code === "TIMEOUT") {
        results.push(visibleTestCaseResult(index + 1, testCase, { errors: error.message }, false, "runtime_error"));
        return {
          questionId,
          verdict: "runtime_error",
          accepted: false,
          passedTestCases: 0,
          totalTestCases: definition.testCases.length,
          testCases: results,
          message: error.message
        };
      }
      throw error;
    }

    const errorVerdict = classifyCompilerResult(compilerResult);
    if (errorVerdict) {
      results.push(visibleTestCaseResult(index + 1, testCase, compilerResult, false, errorVerdict));
      return {
        questionId,
        verdict: errorVerdict,
        accepted: false,
        passedTestCases: results.filter((item) => item.passed).length,
        totalTestCases: definition.testCases.length,
        testCases: results,
        message: errorVerdict === "compilation_error"
          ? "The submitted code did not compile."
          : errorVerdict === "wrong_answer"
            ? "The program output did not match the expected output."
            : errorVerdict === "judge0_error"
              ? "Judge0 could not execute the submission. Check the local Judge0 service and sandbox configuration."
            : "The submitted program terminated with a runtime error."
      };
    }

    const passed = normalizeOutput(compilerResult.output) === normalizeOutput(testCase.expectedOutput);
    results.push(visibleTestCaseResult(index + 1, testCase, compilerResult, passed, passed ? "passed" : "wrong_answer"));
    if (!passed) {
      return {
        questionId,
        verdict: "wrong_answer",
        accepted: false,
        passedTestCases: results.filter((item) => item.passed).length,
        totalTestCases: definition.testCases.length,
        testCases: results,
        message: "The program output did not match the expected output."
      };
    }
  }

  return {
    questionId,
    verdict: "accepted",
    accepted: true,
    passedTestCases: results.length,
    totalTestCases: definition.testCases.length,
    testCases: results,
    message: "All test cases passed."
  };
}

module.exports = {
  MAX_CODE_LENGTH,
  normalizeOutput,
  normalizeCompilerResult,
  getQuestion,
  getJudgeDefinition,
  runJudge0,
  judgeJavaSubmission
};