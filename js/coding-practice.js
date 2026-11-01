// Coding Practice System - Scalable across multiple technologies
// Integrates with Firestore for cloud-synced progress, test cases, and green/red status
//
// Schema design:
//   technologies/{techId}       - e.g., javascript, python, java, cpp
//   questions/{questionId}      - coding questions with test cases
//   userProgress/{userId}_{techId}_{questionId} - completion status + test results
//   submissions/{submissionId}  - code submission audit trail

(function () {
  let firestore = null;
  let initialized = false;

  function getFirestore() {
    if (!window.firebase || !window.firebase.firestore) return null;
    return window.firebase.firestore();
  }

  async function init() {
    if (initialized) return firestore;
    const auth = window.DIMFirebaseAuth.getAuth();
    if (!auth || !auth.currentUser) {
      console.warn("Firebase Auth user not available. Sign in first.");
      return null;
    }
    firestore = getFirestore();
    initialized = true;
    return firestore;
  }

  // ============================================================
  // TECHNOLOGIES
  // ============================================================

  async function getTechnologies() {
    const fs = await init();
    if (!fs) return [];
    const snapshot = await fs.collection("technologies").orderBy("order").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async function getTechnology(techId) {
    const fs = await init();
    if (!fs) return null;
    const doc = await fs.collection("technologies").doc(techId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  // ============================================================
  // QUESTIONS
  // ============================================================

  async function getQuestions(techId) {
    const fs = await init();
    if (!fs) return [];
    const snapshot = await fs.collection("questions")
      .where("techId", "==", techId)
      .orderBy("order")
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async function getQuestion(questionId) {
    const fs = await init();
    if (!fs) return null;
    const doc = await fs.collection("questions").doc(questionId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  // ============================================================
  // USER PROGRESS - Green/Red marking system
  // ============================================================

  function makeProgressId(userId, techId, questionId) {
    return `${userId}_${techId}_${questionId}`;
  }

  async function getUserProgress(userId, techId, questionId) {
    const fs = await init();
    if (!fs) return null;
    const progressId = makeProgressId(userId, techId, questionId);
    const doc = await fs.collection("userProgress").doc(progressId).get();
    if (!doc.exists) {
      return {
        id: progressId,
        userId,
        techId,
        questionId,
        status: "not_started",
        isDone: false,
        completedAt: null,
        attempts: 0,
        bestTimeMs: null,
        lastAttemptAt: null,
        testCaseResults: []
      };
    }
    return { id: doc.id, ...doc.data() };
  }

  async function getAllUserProgress(userId, techId) {
    const fs = await init();
    if (!fs) return [];
    const snapshot = await fs.collection("userProgress")
      .where("userId", "==", userId)
      .where("techId", "==", techId)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async function saveUserProgress(userId, techId, questionId, progressData) {
    const fs = await init();
    if (!fs) throw new Error("Firestore not available");
    const progressId = makeProgressId(userId, techId, questionId);
    const data = {
      userId,
      techId,
      questionId,
      updatedAt: new Date(),
      ...progressData
    };
    await fs.collection("userProgress").doc(progressId).set(data, { merge: true });
    return { id: progressId, ...data };
  }

  async function markQuestionDone(userId, techId, questionId, testCaseResults) {
    const fs = await init();
    if (!fs) throw new Error("Firestore not available");
    const progressId = makeProgressId(userId, techId, questionId);
    const passed = testCaseResults.every(r => r.passed);
    const totalTime = testCaseResults.reduce((sum, r) => sum + (r.executionTimeMs || 0), 0);

    const data = {
      userId,
      techId,
      questionId,
      status: passed ? "done" : "in_progress",
      isDone: passed,
      completedAt: passed ? new Date() : null,
      lastAttemptAt: new Date(),
      testCaseResults: testCaseResults,
      updatedAt: new Date()
    };

    const existing = await getUserProgress(userId, techId, questionId);
    if (existing) {
      data.attempts = (existing.attempts || 0) + 1;
      data.bestTimeMs = passed
        ? Math.min(existing.bestTimeMs || Infinity, totalTime)
        : existing.bestTimeMs || null;
    } else {
      data.attempts = 1;
      data.bestTimeMs = passed ? totalTime : null;
    }

    await fs.collection("userProgress").doc(progressId).set(data, { merge: true });
    return { id: progressId, ...data, isDone: passed };
  }

  // ============================================================
  // SUBMISSIONS - Code submission audit trail
  // ============================================================

  async function saveSubmission(userId, techId, questionId, code, language, testCaseResults) {
    const fs = await init();
    if (!fs) throw new Error("Firestore not available");
    const passedCount = testCaseResults.filter(r => r.passed).length;
    const totalCount = testCaseResults.length;
    const isAccepted = passedCount === totalCount;

    const data = {
      userId,
      techId,
      questionId,
      code,
      language,
      passedTestCases: passedCount,
      totalTestCases: totalCount,
      isAccepted,
      testCaseResults,
      createdAt: new Date()
    };

    const docRef = await fs.collection("submissions").add(data);
    return { id: docRef.id, ...data };
  }

  // ============================================================
  // TEST CASE RUNNER - Client-side mock (replace with backend for production)
  // ============================================================

  async function runTestCases(code, language, testCases) {
    return testCases.map((tc, index) => {
      const passed = Math.random() > 0.3;
      return {
        testCaseIndex: index,
        passed,
        actualOutput: passed ? tc.expectedOutput : "incorrect output",
        expectedOutput: tc.expectedOutput,
        executionTimeMs: Math.floor(Math.random() * 100) + 10,
        errorMessage: passed ? null : "Output does not match expected"
      };
    });
  }

  // ============================================================
  // Submit code - Full flow: run test cases + save progress + submission
  // ============================================================

  async function submitCode(userId, techId, questionId, code, language) {
    const question = await getQuestion(questionId);
    if (!question) throw new Error("Question not found");

    const testCases = question.testCases || [];
    const results = await runTestCases(code, language, testCases);

    await saveSubmission(userId, techId, questionId, code, language, results);
    const progress = await markQuestionDone(userId, techId, questionId, results);

    return {
      isAccepted: progress.isDone,
      passedCount: results.filter(r => r.passed).length,
      totalCount: testCases.length,
      results,
      progress
    };
  }

  // ============================================================
  // Seed initial data (for development - call once to set up technologies & questions)
  // ============================================================

  async function seedSampleData() {
    const fs = await init();
    if (!fs) throw new Error("Firestore not available");

    const batch = fs.batch();

    const techs = [
      { id: "javascript", name: "JavaScript", slug: "javascript", description: "JavaScript coding practice", order: 1, isActive: true },
      { id: "python", name: "Python", slug: "python", description: "Python coding practice", order: 2, isActive: true },
      { id: "java", name: "Java", slug: "java", description: "Java coding practice", order: 3, isActive: true },
      { id: "cpp", name: "C++", slug: "cpp", description: "C++ coding practice", order: 4, isActive: true }
    ];

    techs.forEach(tech => {
      const ref = fs.collection("technologies").doc(tech.id);
      batch.set(ref, tech);
    });

    const jsQuestions = [
      {
        techId: "javascript",
        title: "Two Sum",
        slug: "two-sum",
        description: "Given an array of integers, return indices of the two numbers that add up to a specific target.",
        difficulty: "easy",
        tags: ["array", "hash-map"],
        order: 1,
        constraints: "2 <= nums.length <= 10^4",
        testCases: [
          { input: JSON.stringify({ nums: [2,7,11,15], target: 9 }), expectedOutput: JSON.stringify([0, 1]), explanation: "nums[0] + nums[1] = 2 + 7 = 9", isHidden: false, order: 1 },
          { input: JSON.stringify({ nums: [3,2,4], target: 6 }), expectedOutput: JSON.stringify([1, 2]), explanation: "nums[1] + nums[2] = 2 + 4 = 6", isHidden: false, order: 2 },
          { input: JSON.stringify({ nums: [3,3], target: 6 }), expectedOutput: JSON.stringify([0, 1]), explanation: "nums[0] + nums[1] = 3 + 3 = 6", isHidden: true, order: 3 }
        ]
      },
      {
        techId: "javascript",
        title: "Reverse String",
        slug: "reverse-string",
        description: "Write a function that reverses a string in place.",
        difficulty: "easy",
        tags: ["string", "two-pointers"],
        order: 2,
        constraints: "1 <= s.length <= 10^5",
        testCases: [
          { input: JSON.stringify("hello"), expectedOutput: JSON.stringify("olleh"), explanation: "hello reversed is olleh", isHidden: false, order: 1 },
          { input: JSON.stringify("JavaScript"), expectedOutput: JSON.stringify("tpircSavaJ"), explanation: "JavaScript reversed", isHidden: false, order: 2 },
          { input: JSON.stringify(""), expectedOutput: JSON.stringify(""), explanation: "empty string stays empty", isHidden: true, order: 3 }
        ]
      }
    ];

    jsQuestions.forEach(q => {
      const ref = fs.collection("questions").doc();
      batch.set(ref, q);
    });

    await batch.commit();
    console.log("Sample data seeded successfully");
    return { technologies: techs.length, questions: jsQuestions.length };
  }

  window.DIMCodingPractice = {
    init,
    getTechnologies,
    getTechnology,
    getQuestions,
    getQuestion,
    getUserProgress,
    getAllUserProgress,
    saveUserProgress,
    markQuestionDone,
    saveSubmission,
    runTestCases,
    submitCode,
    seedSampleData,
    makeProgressId
  };

  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
})();