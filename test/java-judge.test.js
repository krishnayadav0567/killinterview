const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const vm = require("node:vm");

const {
  getJudgeDefinition,
  judgeJavaSubmission,
  normalizeOutput,
  runJudge0
} = require("../server/java-judge");

function jsonResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => JSON.stringify(body)
  };
}

test("accepts output matching the deterministic question contract", async () => {
  const result = await judgeJavaSubmission({
    questionId: "java-practice-001",
    code: "class Main {}",
    runner: async () => ({ success: true, output: "10 | 100 | 2.5 | J | true | Java\n" })
  });

  assert.equal(result.verdict, "accepted");
  assert.equal(result.accepted, true);
  assert.equal(result.passedTestCases, 1);
});

test("returns Wrong Answer and exposes only visible case details", async () => {
  const result = await judgeJavaSubmission({
    questionId: "java-practice-001",
    code: "class Main {}",
    runner: async () => ({ success: true, output: "wrong" })
  });

  assert.equal(result.verdict, "wrong_answer");
  assert.equal(result.accepted, false);
  assert.equal(result.testCases[0].expectedOutput, "10 | 100 | 2.5 | J | true | Java");
});

test("classifies compiler and runtime failures separately", async () => {
  const compilation = await judgeJavaSubmission({
    questionId: "java-practice-001",
    code: "class Main {}",
    runner: async () => ({ success: false, errors: "error: ';' expected", exitCode: 1 })
  });
  assert.equal(compilation.verdict, "compilation_error");

  const runtime = await judgeJavaSubmission({
    questionId: "java-practice-001",
    code: "class Main {}",
    runner: async () => ({ success: false, errors: "Exception in thread \\\"main\\\" java.lang.ArithmeticException", exitCode: 1 })
  });
  assert.equal(runtime.verdict, "runtime_error");
});

test("returns Manual review for Spring Boot questions without running a compiler", async () => {
  const result = await judgeJavaSubmission({
    questionId: "java-practice-200",
    code: "class Main {}",
    runner: async () => { throw new Error("compiler should not be called"); }
  });

  assert.equal(result.verdict, "manual_review");
  assert.equal(result.totalTestCases, 0);
});

test("normalizes line endings and trailing whitespace", () => {
  assert.equal(normalizeOutput("10  \r\n20\r\n"), "10\n20");
});

test("Q2 provides its array through standard input", () => {
  const question = require("../server/java-judge").getQuestion("java-practice-002");
  assert.match(question.starterCode, /Scanner scanner = new Scanner\(System\.in\);/);
  assert.equal(question.input, "4\n4 8 12 16\n");
  assert.equal(getJudgeDefinition("java-practice-002").testCases[0].input, "4\n4 8 12 16\n");
});

test("submits to Judge0, polls the token, and normalizes an accepted result", async () => {
  const requests = [];
  const result = await runJudge0({
    code: "class Main { public static void main(String[] args) {} }",
    input: "input",
    expectedOutput: "output",
    judge0Url: "http://judge0.test/",
    languageId: 26,
    authToken: "judge-token",
    pollIntervalMs: 0,
    fetchImpl: async (url, options) => {
      requests.push({ url, options });
      if (requests.length === 1) return jsonResponse({ token: "submission-1" }, 201);
      return jsonResponse({
        stdout: "output\n",
        stderr: null,
        compile_output: null,
        status: { id: 3, description: "Accepted" }
      });
    }
  });

  assert.equal(result.success, true);
  assert.equal(result.output, "output\n");
  assert.equal(result.judgeStatusId, 3);
  assert.equal(requests.length, 2);
  assert.equal(requests[0].url, "http://judge0.test/submissions?base64_encoded=false&wait=false");
  assert.equal(requests[1].url, "http://judge0.test/submissions/submission-1?base64_encoded=false");
  assert.equal(requests[0].options.headers["X-Auth-Token"], "judge-token");
  assert.deepEqual(JSON.parse(requests[0].options.body), {
    source_code: "class Main { public static void main(String[] args) {} }",
    language_id: 26,
    stdin: "input",
    expected_output: "output"
  });
});

test("maps Judge0 wrong-answer, compilation, and runtime statuses", async () => {
  const run = (status) => runJudge0({
    code: "class Main {}",
    judge0Url: "http://judge0.test",
    languageId: 26,
    pollIntervalMs: 0,
    fetchImpl: async () => jsonResponse({
      stdout: status.id === 4 ? "wrong" : "",
      stderr: status.id === 7 ? "Exception in thread \\\"main\\\"" : null,
      compile_output: status.id === 6 ? "error: ';' expected" : null,
      status
    }, 201)
  });

  const wrongAnswer = await run({ id: 4, description: "Wrong Answer" });
  assert.equal(wrongAnswer.success, false);
  assert.equal(wrongAnswer.errorType, "wrong_answer");

  const compilation = await run({ id: 6, description: "Compilation Error" });
  assert.equal(compilation.success, false);
  assert.equal(compilation.errorType, "compilation_error");

  const runtime = await run({ id: 7, description: "Runtime Error (SIGSEGV)" });
  assert.equal(runtime.success, false);
  assert.equal(runtime.errorType, "runtime_error");
});

test("maps Judge0 internal errors separately from Java failures", async () => {
  const result = await runJudge0({
    code: "class Main {}",
    judge0Url: "http://judge0.test",
    languageId: 62,
    pollIntervalMs: 0,
    fetchImpl: async () => jsonResponse({
      stdout: null,
      stderr: null,
      compile_output: "sandbox unavailable",
      status: { id: 13, description: "Internal Error" }
    }, 201)
  });

  assert.equal(result.success, false);
  assert.equal(result.errorType, "judge0_error");
  assert.equal(result.judgeStatusId, 13);
});

test("recognizes sandbox startup failures reported as compilation errors", async () => {
  const result = await runJudge0({
    code: "class Main {}",
    judge0Url: "http://judge0.test",
    languageId: 62,
    pollIntervalMs: 0,
    fetchImpl: async () => jsonResponse({
      stdout: null,
      stderr: null,
      compile_output: "Could not reserve enough space for code cache (245760K)",
      status: { id: 6, description: "Compilation Error" }
    }, 201)
  });

  assert.equal(result.success, false);
  assert.equal(result.errorType, "judge0_error");
});

test("catalog audit contains all 235 questions and explicit test case schema is available", () => {
  const context = { window: {} };
  const questionsPath = require("node:path").join(__dirname, "..", "data", "java", "practice-questions.js");
  vm.runInNewContext(fs.readFileSync(questionsPath, "utf8"), context);
  assert.equal(context.window.JAVA_PRACTICE_QUESTIONS.length, 235);
  assert.equal(getJudgeDefinition("java-practice-001").testCases[0].hidden, false);
});