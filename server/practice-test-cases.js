const NON_JUDGEABLE_PATTERNS = [
  /order\s+(?:is\s+)?unspecified/i,
  /order\s+may\s+vary/i,
  /ordering\s+depends/i,
  /nondeterministic/i,
  /not guaranteed/i,
  /exact(?:ly)?\s+.*vary/i,
  /approximately/i,
  /depends on/i,
  /after about/i,
  /may be less than/i,
  /eventually/i,
  /does not compile/i,
  /all three task ids print/i,
  /application starts/i,
  /HTTP\s+\d{3}/i,
  /status\s+\d{3}/i,
  /file contains/i,
  /resource closes automatically/i,
  /object bytes written/i,
  /state cannot be changed/i,
  /if equality is based/i,
  /method list includes/i,
  /test passes/i,
  /both updates commit/i,
  /security filter chain/i,
  /depending on configuration/i,
  /exact map/i,
  /map order/i,
  /output\/behavior.*varies/i
];

const NON_JUDGEABLE_TITLES = [
  /read text file/i,
  /write text file/i,
  /serialize/i,
  /shallow vs deep copy/i,
  /reflection/i,
  /thread-safe singleton/i,
  /race condition/i,
  /volatile visibility/i,
  /fixed thread pool/i,
  /countdownlatch/i,
  /asynchronous failure/i
];

function hasUnstableContract(question) {
  const output = typeof question?.example?.output === "string" ? question.example.output.trim() : "";
  const title = typeof question?.title === "string" ? question.title : "";
  return !output
    || NON_JUDGEABLE_PATTERNS.some((pattern) => pattern.test(output))
    || NON_JUDGEABLE_TITLES.some((pattern) => pattern.test(title));
}

function getPracticeTestCaseDefinition(question) {
  if (question && Object.prototype.hasOwnProperty.call(question, "testCases")) {
    if (!Array.isArray(question.testCases) || question.testCases.length === 0) {
      return { testCases: [], error: "Question testCases must be a non-empty array." };
    }
    const testCases = question.testCases.map((testCase, index) => {
      if (!testCase || typeof testCase !== "object") throw new Error(`Test case ${index + 1} must be an object.`);
      if (typeof testCase.input !== "string") throw new Error(`Test case ${index + 1} input must be a string.`);
      if (typeof testCase.expectedOutput !== "string") throw new Error(`Test case ${index + 1} expectedOutput must be a string.`);
      return {
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        hidden: testCase.hidden === true
      };
    });
    return { testCases, error: "" };
  }

  if (!question || question.topic === "Spring Boot" || hasUnstableContract(question)) {
    return { testCases: [], error: "" };
  }

  return {
    testCases: [{
      input: typeof question.input === "string" ? question.input : "",
      expectedOutput: question.example.output,
      hidden: false
    }],
    error: ""
  };
}

function getPracticeTestCases(question) {
  return getPracticeTestCaseDefinition(question).testCases;
}

module.exports = {
  getPracticeTestCases,
  getPracticeTestCaseDefinition,
  hasUnstableContract
};