(function () {
  function parseQuery() {
    const params = new URLSearchParams(window.location.search);
    return { topic: params.get("topic"), search: params.get("search"), filter: params.get("filter") || "all" };
  }

  function topicMatchFilter(topic, filter) {
    if (!window.DIMStorage) return true;
    const questions = window.DIM ? window.DIM.getTopicQuestions(topic.id) : [];
    const stats = window.DIMStorage.getTopicStats(topic.id, questions);
    if (filter === "not-started") return !stats.started;
    if (filter === "in-progress") return stats.started && !stats.completed;
    if (filter === "completed") return stats.completed;
    return true;
  }

  function renderTopics(filter) {
    const container = document.getElementById("topics-grid");
    const summary = document.getElementById("topics-summary");
    if (!container || !window.JAVA_TOPICS) return;
    const topics = window.JAVA_TOPICS.slice().sort((a, b) => a.order - b.order).filter((topic) => topicMatchFilter(topic, filter));
    const totalLearned = window.DIMStorage ? topics.reduce((sum, t) => sum + window.DIMStorage.getTopicStats(t.id, window.JAVA_LEARNING_QUESTIONS || []).learned, 0) : 0;
    container.innerHTML = topics.map((topic) => {
      const status = window.DIM ? window.DIM.getTopicStatus(topic.id) : { label: "Coming soon", className: "status-coming-soon" };
      const canOpen = topic.contentAvailable && window.DIM;
      const stats = window.DIMStorage ? window.DIMStorage.getTopicStats(topic.id, window.DIM.getTopicQuestions(topic.id)) : { learned: 0, totalQuestions: 0, percentage: 0, started: false, completed: false };
      return `<article class="topic-card ${canOpen ? "" : "topic-card-disabled"}" ${canOpen ? `onclick="location='${window.DIM.getTopicUrl(topic.id)}'"` : ""} role="button" tabindex="0" aria-label="${escapeAttr(topic.name)} topic card">
        <div class="topic-card-header"><span class="topic-number">${topic.order}</span><span class="status-badge ${status.className}">${escapeHTML(status.label)}</span></div>
        <h3>${escapeHTML(topic.name)}</h3>
        <p>${escapeHTML(topic.description)}</p>
        <div class="topic-card-meta">
          <span><strong>${stats.learned}/${stats.totalQuestions}</strong> learned</span>
          <span><strong>${stats.percentage}%</strong> complete</span>
        </div>
        <div class="topic-card-actions">
          ${canOpen ? `<a class="button button-primary" href="${window.DIM.getTopicUrl(topic.id)}">Learn <span aria-hidden="true">→</span></a>` : `<span class="button button-secondary button-disabled" aria-disabled="true">Coming soon</span>`}
          ${canOpen ? `<a class="button button-secondary" href="${window.DIM.getQuizUrl(topic.id)}">Quiz <span aria-hidden="true">→</span></a>` : ``}
        </div>
      </article>`;
    }).join("");
    if (summary) summary.innerHTML = `<strong>${topics.length}</strong> topic${topics.length !== 1 ? "s" : ""} matching <strong>${filter}</strong> · <strong>${totalLearned}</strong> questions learned`;
  }

  function escapeHTML(value) { return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function escapeAttr(value) { return String(value ?? "").replace(/"/g, "&quot;"); }

  document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-tab");
    const searchInput = document.getElementById("topic-search");
    let activeFilter = "all";
    filterButtons.forEach((button) => button.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.toggle("active", b === button));
      activeFilter = button.dataset.filter;
      renderTopics(activeFilter);
    }));
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const term = searchInput.value.trim().toLowerCase();
        const cards = document.querySelectorAll(".topic-card");
        cards.forEach((card) => {
          const text = card.textContent.toLowerCase();
          card.style.display = term ? (text.includes(term) ? "" : "none") : "";
        });
      });
    }
    renderTopics(activeFilter);
  });
})();