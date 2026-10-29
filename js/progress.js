(function () {
  function escapeHTML(value) { return window.DIM ? window.DIM.escapeHTML(value) : String(value ?? ""); }

  function renderProgress() {
    const topics = window.JAVA_TOPICS || [];
    const questions = window.JAVA_LEARNING_QUESTIONS || [];
    const state = window.DIMStorage.getState();
    const availableTopics = topics.filter((topic) => topic.contentAvailable);
    const learned = Object.keys(state.learnedQuestions).filter((id) => state.learnedQuestions[id]).length;
    const total = questions.length;
    const percentage = total ? Math.round((learned / total) * 100) : 0;
    const completedTopics = availableTopics.filter((topic) => window.DIMStorage.getTopicStats(topic.id, questions).completed).length;
    const startedTopics = availableTopics.filter((topic) => window.DIMStorage.getTopicStats(topic.id, questions).started).length;
    const attempts = state.quizAttempts;
    const averageScore = attempts.length ? Math.round(attempts.reduce((sum, attempt) => sum + Number(attempt.percentage || 0), 0) / attempts.length) : 0;
    const highestScore = attempts.length ? Math.max(...attempts.map((attempt) => Number(attempt.percentage || 0))) : 0;
    const stats = document.getElementById("progress-stats");
    const topicList = document.getElementById("progress-topics");
    const attemptsContainer = document.getElementById("quiz-attempts");
    if (stats) stats.innerHTML = `<div class="stat-card"><strong>${startedTopics}</strong><span>Topics started</span></div><div class="stat-card"><strong>${completedTopics}</strong><span>Topics completed</span></div><div class="stat-card"><strong>${learned}</strong><span>Questions learned</span></div><div class="stat-card"><strong>${attempts.length}</strong><span>Quiz attempts</span></div><div class="stat-card"><strong>${averageScore}%</strong><span>Average quiz score</span></div><div class="stat-card"><strong>${highestScore}%</strong><span>Highest quiz score</span></div>`;
    if (topicList) topicList.innerHTML = availableTopics.map((topic) => { const topicStats = window.DIMStorage.getTopicStats(topic.id, questions); return `<a class="progress-topic-row" href="${window.DIM.getTopicUrl(topic.id)}"><span><strong>${escapeHTML(topic.name)}</strong><small>${topicStats.learned}/${topicStats.totalQuestions} questions learned</small></span><span class="progress-topic-meter"><i style="width:${topicStats.percentage}%"></i></span><strong>${topicStats.percentage}%</strong></a>`; }).join("") || `<div class="empty-state"><p>No learning topics are available yet.</p></div>`;
    if (attemptsContainer) attemptsContainer.innerHTML = attempts.length ? attempts.map((attempt) => { const topic = window.DIM.getTopic(attempt.topicId); const date = attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString() : ""; return `<div class="attempt-row"><span><strong>${escapeHTML(topic ? topic.name : attempt.topicId)}</strong><small>${date}${attempt.timeTaken ? ` · ${attempt.timeTaken}s` : ""}</small></span><strong>${attempt.score}/${attempt.total}<small>${attempt.percentage}%</small></strong></div>`; }).join("") : `<div class="empty-state compact-empty"><p>No quiz attempts yet.</p><a class="text-link" href="topics.html">Start practicing →</a></div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderProgress();
    const reset = document.getElementById("reset-progress");
    if (reset) reset.addEventListener("click", () => { if (!window.confirm("Reset all learning progress and quiz attempts?")) return; window.DIMStorage.resetProgress(); renderProgress(); });
  });
})();