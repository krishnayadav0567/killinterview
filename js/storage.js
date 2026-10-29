(function () {
  const STORAGE_KEY = "developer-interview-master-progress-v1";
  const emptyState = () => ({ learnedQuestions: {}, quizAttempts: [] });

  function readState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyState();
      const parsed = JSON.parse(raw);
      return {
        learnedQuestions: parsed && parsed.learnedQuestions && typeof parsed.learnedQuestions === "object" ? parsed.learnedQuestions : {},
        quizAttempts: parsed && Array.isArray(parsed.quizAttempts) ? parsed.quizAttempts : []
      };
    } catch (error) {
      return emptyState();
    }
  }

  function writeState(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

  function saveQuizAttempt(attempt) {
    const state = readState();
    state.quizAttempts = [attempt, ...state.quizAttempts].slice(0, 30);
    writeState(state);
    return state;
  }

  function resetProgress() {
    const state = emptyState();
    writeState(state);
    return state;
  }

  function getTopicStats(topicId, questions) {
    const state = readState();
    const topicQuestions = (questions || []).filter((question) => question.topicId === topicId);
    const learned = topicQuestions.reduce((count, question) => count + (state.learnedQuestions[question.id] ? 1 : 0), 0);
    const attempts = state.quizAttempts.filter((attempt) => attempt.topicId === topicId);
    const latestAttempt = attempts[0] || null;
    return {
      learned,
      totalQuestions: topicQuestions.length,
      percentage: topicQuestions.length ? Math.round((learned / topicQuestions.length) * 100) : 0,
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
    saveQuizAttempt,
    resetProgress,
    getTopicStats
  };
})();