const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function createStorageContext() {
  const values = new Map();
  const window = {
    localStorage: {
      getItem: (key) => values.get(key) || null,
      setItem: (key, value) => values.set(key, String(value)),
      removeItem: (key) => values.delete(key)
    },
    dispatchEvent: () => true
  };
  const context = {
    window,
    CustomEvent: class CustomEvent {
      constructor(type, init) {
        this.type = type;
        this.detail = init?.detail;
      }
    }
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "js", "storage.js"), "utf8"), context);
  return context.window.DIMStorage;
}

test("failed submissions remain incomplete and accepted submissions persist", () => {
  const storage = createStorageContext();
  const failed = storage.recordPracticeSubmission("java-practice-001", {
    code: "class Main {}",
    input: "",
    verdict: "wrong_answer",
    accepted: false,
    passedTestCases: 0,
    totalTestCases: 1,
    message: "Wrong output"
  });
  assert.equal(failed.completedAt, null);
  assert.equal(failed.status, "in-progress");
  assert.equal(failed.lastSubmissionVerdict, "wrong_answer");

  const accepted = storage.recordPracticeSubmission("java-practice-001", {
    code: "class Main { public static void main(String[] args) {} }",
    input: "",
    verdict: "accepted",
    accepted: true,
    passedTestCases: 1,
    totalTestCases: 1,
    message: "All test cases passed."
  });
  assert.equal(accepted.status, "completed");
  assert.ok(accepted.completedAt);
  assert.equal(accepted.acceptedCode, "class Main { public static void main(String[] args) {} }");

  storage.savePracticeDraft("java-practice-001", { code: "class Main { /* experiment */ }", input: "" });
  const edited = storage.getPracticeProgress("java-practice-001");
  assert.equal(edited.status, "completed");
  assert.equal(edited.draftDirty, true);
  assert.equal(edited.acceptedCode, "class Main { public static void main(String[] args) {} }");
});