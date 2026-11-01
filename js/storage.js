(function () {
  const STORAGE_KEY = "developer-interview-master-progress-v1";
  const PRACTICE_ATTEMPTS_KEY = "developer-interview-java-practice-attempts-v1";
  const emptyState = () => ({ learnedQuestions: {}, solvedQuestions: {}, quizAttempts: [], practiceProgress: {}, practiceAttempts: [] });

  function normalizePracticeProgress(questionId, value) {
    const record = value && typeof value === "object" ? value : {};
    return {
      questionId,
      status: record.status === "completed" ? "completed" : (record.status === "in-progress" ? "in-progress" : "not-started"),
      draftCode: typeof record.draftCode === "string" ? record.draftCode : "",
      draftInput: typeof record.draftInput === "string" ? record.draftInput : "",
      lastSubmittedCode: typeof record.lastSubmittedCode === "string" ? record.lastSubmittedCode : "",
      lastSubmittedInput: typeof record.lastSubmittedInput === "string" ? record.lastSubmittedInput : "",
      acceptedCode: typeof record.acceptedCode === "string" ? record.acceptedCode : "",
      acceptedInput: typeof record.acceptedInput === "string" ? record.acceptedInput : "",
      attemptCount: Math.max(0, Number(record.attemptCount) || 0),
      lastRunSuccess: record.lastRunSuccess === true,
      lastOutput: typeof record.lastOutput === "string" ? record.lastOutput : "",
      lastErrors: typeof record.lastErrors === "string" ? record.lastErrors : "",
      lastExitCode: record.lastExitCode ?? null,
      lastSubmissionVerdict: typeof record.lastSubmissionVerdict === "string" ? record.lastSubmissionVerdict : null,
      lastSubmissionAccepted: record.lastSubmissionAccepted === true,
      lastSubmissionMessage: typeof record.lastSubmissionMessage === "string" ? record.lastSubmissionMessage : "",
      lastPassedTestCases: Math.max(0, Number(record.lastPassedTestCases) || 0),
      lastTotalTestCases: Math.max(0, Number(record.lastTotalTestCases) || 0),
      lastSubmissionResult: record.lastSubmissionResult && typeof record.lastSubmissionResult === "object" ? record.lastSubmissionResult : null,
      draftDirty: record.draftDirty === true,
      aiReviewed: record.aiReviewed === true,
      aiCorrect: record.aiCorrect ?? null,
      aiScore: record.aiScore ?? null,
      completedAt: record.completedAt || null,
      lastSubmittedAt: record.lastSubmittedAt || null,
      updatedAt: record.updatedAt || null
    };
  }

  function normalizePracticeMap(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(Object.entries(value).map(([questionId, record]) => [questionId, normalizePracticeProgress(questionId, record)]));
  }

  function readState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyState();
      const parsed = JSON.parse(raw);
      return {
        learnedQuestions: parsed && parsed.learnedQuestions && typeof parsed.learnedQuestions === "object" ? parsed.learnedQuestions : {},
        solvedQuestions: parsed && parsed.solvedQuestions && typeof parsed.solvedQuestions === "object" ? parsed.solvedQuestions : {},
        quizAttempts: parsed && Array.isArray(parsed.quizAttempts) ? parsed.quizAttempts : [],
        practiceProgress: normalizePracticeMap(parsed && parsed.practiceProgress),
        practiceAttempts: parsed && Array.isArray(parsed.practiceAttempts) ? parsed.practiceAttempts.slice(0, 100) : []
      };
    } catch (error) {
      return emptyState();
    }
  }

  function writeState(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      window.dispatchEvent(new CustomEvent("dim:state-change", { detail: state }));
    } catch (error) {
      // Private browsing modes can reject localStorage; the app continues in memory.
    }
  }

  function getState() {
    return readState();
  }

  function markQuestionLearned(questionId, learned) {
    const state = readState();
    if (learned) state.learnedQuestions[questionId] = true;
    else delete state.learnedQuestions[questionId];
    writeState(state);
    return state;
  }

  function resetTopicLearned(topicId, questions) {
    const state = readState();
    const topicQuestionIds = new Set((questions || [])
      .filter((question) => question.topicId === topicId)
      .map((question) => question.id));
    Object.keys(state.learnedQuestions).forEach((questionId) => {
      if (topicQuestionIds.has(questionId)) delete state.learnedQuestions[questionId];
    });
    writeState(state);
    return state;
  }

  function isQuestionLearned(questionId) {
    return Boolean(readState().learnedQuestions[questionId]);
  }

  function markQuestionSolved(questionId, solved) {
    const state = readState();
    if (solved) state.solvedQuestions[questionId] = true;
    else delete state.solvedQuestions[questionId];
    writeState(state);
    return state;
  }

  function isQuestionSolved(questionId) {
    return Boolean(readState().solvedQuestions[questionId]);
  }

  function saveQuizAttempt(attempt) {
    const state = readState();
    state.quizAttempts = [attempt, ...state.quizAttempts].slice(0, 30);
    writeState(state);
    return state;
  }

  function getPracticeProgress(questionId) {
    const record = readState().practiceProgress[questionId];
    return record ? normalizePracticeProgress(questionId, record) : null;
  }

  function savePracticeDraft(questionId, draft) {
    if (!questionId) return readState();
    const code = typeof draft?.code === "string" ? draft.code : "";
    const input = typeof draft?.input === "string" ? draft.input : "";
    const now = new Date().toISOString();
    const state = readState();
    const current = normalizePracticeProgress(questionId, state.practiceProgress[questionId]);
    const hasDraft = Boolean(code.trim() || input.trim());
    const draftDirty = Boolean(current.completedAt && (code !== current.acceptedCode || input !== current.acceptedInput));
    state.practiceProgress[questionId] = {
      ...current,
      questionId,
      draftCode: code,
      draftInput: input,
      status: current.completedAt ? "completed" : (hasDraft ? "in-progress" : "not-started"),
      draftDirty,
      updatedAt: now
    };
    writeState(state);
    return state.practiceProgress[questionId];
  }

  function recordPracticeRun(questionId, run) {
    if (!questionId) return readState();
    const now = new Date().toISOString();
    const state = readState();
    const current = normalizePracticeProgress(questionId, state.practiceProgress[questionId]);
    const code = typeof run?.code === "string" ? run.code : current.draftCode;
    const input = typeof run?.input === "string" ? run.input : current.draftInput;
    const record = {
      ...current,
      questionId,
      draftCode: code,
      draftInput: input,
      status: current.completedAt ? "completed" : "in-progress",
      attemptCount: current.attemptCount + 1,
      lastRunSuccess: run?.success === true,
      lastOutput: typeof run?.output === "string" ? run.output : "",
      lastErrors: typeof run?.errors === "string" ? run.errors : "",
      lastExitCode: run?.exitCode ?? null,
      draftDirty: Boolean(current.completedAt && (code !== current.acceptedCode || input !== current.acceptedInput)),
      updatedAt: now
    };
    state.practiceProgress[questionId] = record;
    state.practiceAttempts = [{
      questionId,
      success: run?.success === true,
      output: record.lastOutput,
      errors: record.lastErrors,
      attemptedAt: now
    }, ...state.practiceAttempts].slice(0, 100);
    writeState(state);
    return record;
  }

  function promotePracticeRunToSubmitted(questionId) {
    if (!questionId) return readState();
    const now = new Date().toISOString();
    const state = readState();
    const record = state.practiceProgress[questionId];
    if (!record || !record.lastRunSuccess) return state;
    const current = normalizePracticeProgress(questionId, record);
    if (current.status === "completed" && current.lastSubmittedCode && current.lastSubmittedInput) return state;
    state.practiceProgress[questionId] = {
      ...current,
      questionId,
      status: "completed",
      lastRunSuccess: true,
      lastOutput: record.lastOutput || "",
      lastErrors: record.lastErrors || "",
      lastExitCode: record.lastExitCode ?? null,
      completedAt: current.completedAt || now,
      lastSubmittedAt: now,
      updatedAt: now
    };
    state.practiceAttempts = [{ questionId, submitted: true, success: true, submittedAt: now }, ...state.practiceAttempts].slice(0, 100);
    writeState(state);
    return state.practiceProgress[questionId];
  }

  function completePracticeQuestion(questionId, submission) {
    if (!questionId || submission?.success !== true) return getPracticeProgress(questionId);
    if (!submission || submission.success !== true) return getPracticeProgress(questionId);
    const now = new Date().toISOString();
    const state = readState();
    const current = normalizePracticeProgress(questionId, state.practiceProgress[questionId]);
    const code = typeof submission.code === "string" ? submission.code : current.draftCode;
    const input = typeof submission.input === "string" ? submission.input : current.draftInput;
    const record = {
      ...current,
      questionId,
      status: "completed",
      draftCode: code,
      draftInput: input,
      lastSubmittedCode: code,
      lastSubmittedInput: input,
      lastSubmittedAt: now,
      acceptedCode: code,
      acceptedInput: input,
      lastRunSuccess: true,
      draftDirty: false,
      completedAt: current.completedAt || now,
      updatedAt: now
    };
    state.practiceProgress[questionId] = record;
    state.practiceAttempts = [{ questionId, submitted: true, success: true, submittedAt: now }, ...state.practiceAttempts].slice(0, 100);
    writeState(state);
    return record;
  }

  function recordPracticeSubmission(questionId, submission) {
    if (!questionId || !submission || typeof submission !== "object") return getPracticeProgress(questionId);
    const now = new Date().toISOString();
    const state = readState();
    const current = normalizePracticeProgress(questionId, state.practiceProgress[questionId]);
    const code = typeof submission.code === "string" ? submission.code : current.draftCode;
    const input = typeof submission.input === "string" ? submission.input : current.draftInput;
    const accepted = submission.verdict === "accepted" || submission.accepted === true;
    const resultSource = submission.result && typeof submission.result === "object" ? submission.result : submission;
    const { code: _code, input: _input, source: _source, stdin: _stdin, ...result } = resultSource;
    const record = {
      ...current,
      questionId,
      draftCode: code,
      draftInput: input,
      status: current.completedAt || accepted ? "completed" : "in-progress",
      attemptCount: current.attemptCount + 1,
      lastSubmittedCode: code,
      lastSubmittedInput: input,
      lastSubmissionVerdict: typeof submission.verdict === "string" ? submission.verdict : null,
      lastSubmissionAccepted: accepted,
      lastSubmissionMessage: typeof submission.message === "string" ? submission.message : "",
      lastPassedTestCases: Math.max(0, Number(submission.passedTestCases) || 0),
      lastTotalTestCases: Math.max(0, Number(submission.totalTestCases) || 0),
      lastSubmissionResult: result,
      draftDirty: Boolean(current.completedAt && (code !== current.acceptedCode || input !== current.acceptedInput)),
      updatedAt: now
    };
    if (accepted) {
      record.completedAt = current.completedAt || now;
      record.acceptedCode = code;
      record.acceptedInput = input;
    }
    state.practiceProgress[questionId] = record;
    state.practiceAttempts = [{
      questionId,
      submitted: true,
      verdict: record.lastSubmissionVerdict,
      accepted,
      passedTestCases: record.lastPassedTestCases,
      totalTestCases: record.lastTotalTestCases,
      submittedAt: now
    }, ...state.practiceAttempts].slice(0, 100);
    writeState(state);
    return record;
  }

  function savePracticeReview(questionId, review) {
    if (!questionId) return readState();
    const state = readState();
    const current = normalizePracticeProgress(questionId, state.practiceProgress[questionId]);
    state.practiceProgress[questionId] = {
      ...current,
      questionId,
      aiReviewed: true,
      aiCorrect: review?.correct ?? null,
      aiScore: review?.score ?? null,
      updatedAt: new Date().toISOString()
    };
    writeState(state);
    return state.practiceProgress[questionId];
  }

  function getPracticeStats(questions) {
    const state = readState();
    const list = Array.isArray(questions) ? questions : [];
    const records = state.practiceProgress;
    const startedQuestions = list.filter((question) => {
      const record = records[question.id];
      return record && (record.attemptCount > 0 || record.draftCode || record.draftInput);
    });
    const completedQuestions = list.filter((question) => Boolean(records[question.id]?.completedAt));
    const reviewedQuestions = list.filter((question) => records[question.id]?.aiReviewed === true);
    const topicMap = {};
    list.forEach((question) => {
      const topic = question.topic || question.category || "Java practice";
      if (!topicMap[topic]) topicMap[topic] = { topic, total: 0, started: 0, completed: 0 };
      topicMap[topic].total += 1;
      const record = records[question.id];
      if (record && (record.attemptCount > 0 || record.draftCode || record.draftInput)) topicMap[topic].started += 1;
      if (record?.completedAt) topicMap[topic].completed += 1;
    });
    return {
      total: list.length,
      started: startedQuestions.length,
      completed: completedQuestions.length,
      reviewed: reviewedQuestions.length,
      attempts: list.reduce((total, question) => total + (Number(records[question.id]?.attemptCount) || 0), 0),
      percentage: list.length ? Math.round((completedQuestions.length / list.length) * 100) : 0,
      topics: Object.values(topicMap).map((topic) => ({ ...topic, percentage: topic.total ? Math.round((topic.completed / topic.total) * 100) : 0 })),
      recentAttempts: state.practiceAttempts.slice(0, 12)
    };
  }

  function resetProgress() {
    const state = emptyState();
    writeState(state);
    try { window.localStorage.removeItem(PRACTICE_ATTEMPTS_KEY); } catch (error) { /* continue without persistence */ }
    return state;
  }

  function getTopicStats(topicId, questions) {
    const state = readState();
    const topicQuestions = (questions || []).filter((question) => question.topicId === topicId);
    const learned = topicQuestions.reduce((count, question) => count + (state.learnedQuestions[question.id] ? 1 : 0), 0);
    const solved = topicQuestions.reduce((count, question) => count + (state.solvedQuestions[question.id] ? 1 : 0), 0);
    const attempts = state.quizAttempts.filter((attempt) => attempt.topicId === topicId);
    const latestAttempt = attempts[0] || null;
    return {
      learned,
      solved,
      totalQuestions: topicQuestions.length,
      percentage: topicQuestions.length ? Math.round((learned / topicQuestions.length) * 100) : 0,
      solvedPercentage: topicQuestions.length ? Math.round((solved / topicQuestions.length) * 100) : 0,
      attempts,
      latestAttempt,
      started: learned > 0 || attempts.length > 0,
      completed: topicQuestions.length > 0 && learned >= topicQuestions.length
    };
  }

  window.DIMStorage = {
    STORAGE_KEY,
    getState,
    markQuestionLearned,
    resetTopicLearned,
    isQuestionLearned,
    markQuestionSolved,
    isQuestionSolved,
    saveQuizAttempt,
    getPracticeProgress,
    savePracticeDraft,
    recordPracticeRun,
    recordPracticeSubmission,
    completePracticeQuestion,
    savePracticeReview,
    getPracticeStats,
    resetProgress,
    getTopicStats
  };
})();