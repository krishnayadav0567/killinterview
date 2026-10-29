(function () {
  function escapeHTML(value) {
    return window.DIM ? window.DIM.escapeHTML(value) : String(value ?? "");
  }

  function renderProgress() {
    const topics = window.JAVA_TOPICS || [];
    const questions = window.JAVA_LEARNING_QUESTIONS || [];
    const state = window.DIMStorage.getState();
    const availableTopics = topics.filter((topic) => topic.contentAvailable);
    const learned = Object.keys(state.learnedQuestions).filter((id) => state.learnedQuestions[id]).length;
    const total = questions.length;
    const percentage = total ? Math.round((learned / total) * 100) : 0;
    const stats = document.getElementById("progress-stats");
    const topicList = document.getElementById("progress-topics");
    const attempts = document.getElementById("quiz-attempts");

    if (stats) stats.innerHTML = `<div class="stat-card"><strong>${learned}</strong><span>Questions learned</span></div><div class="stat-card"><strong>${total}</strong><span>Available questions</span></div><div class="stat-card"><strong>${percentage}%</strong><span>Overall completion</span></div><div class="stat-card"><strong>${state.quizAttempts.length}</strong><span>Quiz attempts</span></div>`;
    if (topicList) topicList.innerHTML = availableTopics.map((topic) => {
      const topicQuestions = questions.filter((question) => question.topicId === topic.id);
      const topicStats = window.DIMStorage.getTopicStats(topic.id, questions);
      return `<a class="progress-topic-row" href="${window.DIM.getTopicUrl(topic.id)}"><span><strong>${escapeHTML(topic.name)}</strong><small>${topicStats.learned}/${topicStats.totalQuestions} questions learned</small></span><span class="progress-topic-meter"><i style="width:${topicStats.percentage}%"></i></span><strong>${topicStats.percentage}%</strong></a>`;
    }).join("") || `<div class="empty-state"><p>No learning topics are available yet.</p></div>`;
    if (attempts) attempts.innerHTML = state.quizAttempts.length ? state.quizAttempts.map((attempt) => {
      const topic = window.DIM.getTopic(attempt.topicId);
      const date = attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString() : "";
      return `<div class="attempt-row"><span><strong>${escapeHTML(topic ? topic.name : attempt.topicId)}</strong><small>${date}</small></span><strong>${attempt.score}/${attempt.total} <small>${attempt.percentage}%</small></strong></div>`;
    }).join("") : `<div class="empty-state compact-empty"><p>No quiz attempts yet.</p><a class="text-link" href="topics.html">Start practicing →</a></div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderProgress();
    const reset = document.getElementById("reset-progress");
    if (reset) reset.addEventListener("click", () => {
      if (!window.confirm("Reset all learning progress and quiz attempts?")) return;
      window.DIMStorage.resetProgress();
      renderProgress();
    });
  });
})();