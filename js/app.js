(function () {
  const topics = () => window.JAVA_TOPICS || [];
  const learningQuestions = () => window.JAVA_LEARNING_QUESTIONS || [];

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatCode(value) {
    return escapeHTML(value || "");
  }

  function getTopic(topicId) {
    return topics().find((topic) => topic.id === topicId) || null;
  }

  function getTopicQuestions(topicId) {
    return learningQuestions().filter((question) => question.topicId === topicId);
  }

  function getTopicUrl(topicId) {
    return `topic.html?topic=${encodeURIComponent(topicId)}`;
  }

  function getQuizUrl(topicId) {
    return `quiz.html?topic=${encodeURIComponent(topicId)}`;
  }

  function getTopicStatus(topicId) {
    const topic = getTopic(topicId);
    if (!topic || !topic.contentAvailable) return { label: "Coming soon", className: "status-coming-soon" };
    const stats = window.DIMStorage.getTopicStats(topicId, learningQuestions());
    if (stats.completed) return { label: "Completed", className: "status-completed" };
    if (stats.started) return { label: "In progress", className: "status-in-progress" };
    return { label: "Not started", className: "status-not-started" };
  }

  function initNavigation() {
    const page = document.body.dataset.page;
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === page) link.classList.add("active");
    });
    const menuButton = document.querySelector(".mobile-menu-button");
    const nav = document.querySelector(".site-nav");
    if (menuButton && nav) {
      menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
      });
    }
    const year = document.getElementById("current-year");
    if (year) year.textContent = String(new Date().getFullYear());
    initThemeToggle();
  }

  function initThemeToggle() {
    const root = document.documentElement;
    const storageKey = "developer-interview-master-theme";
    let savedTheme = "light";
    try { savedTheme = window.localStorage.getItem(storageKey) || "light"; } catch (error) { /* file:// or private mode */ }
    root.dataset.theme = savedTheme === "dark" ? "dark" : "light";

    const header = document.querySelector(".header-inner");
    if (!header || header.querySelector(".theme-toggle")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.setAttribute("aria-label", "Enable dark mode");

    function updateButton() {
      const dark = root.dataset.theme === "dark";
      button.textContent = dark ? "☀ Light" : "☾ Dark";
      button.setAttribute("aria-label", dark ? "Enable light mode" : "Enable dark mode");
      button.setAttribute("aria-pressed", String(dark));
    }

    button.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      try { window.localStorage.setItem(storageKey, nextTheme); } catch (error) { /* continue without persistence */ }
      updateButton();
    });
    header.insertBefore(button, header.querySelector(".header-search"));
    updateButton();
  }

  function renderSearchResults(query) {
    const resultsContainer = document.getElementById("search-results");
    if (!resultsContainer) return;
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      resultsContainer.innerHTML = "";
      resultsContainer.classList.remove("visible");
      return;
    }
    const topicResults = topics().filter((topic) => `${topic.name} ${topic.description}`.toLowerCase().includes(normalized)).map((topic) => ({
      title: topic.name,
      detail: topic.contentAvailable ? "Java topic" : "Coming soon",
      url: getTopicUrl(topic.id),
      type: "Topic"
    }));
    const questionResults = learningQuestions().filter((question) => `${question.question} ${question.answer} ${question.topicName}`.toLowerCase().includes(normalized)).slice(0, 6).map((question) => ({
      title: question.question,
      detail: question.topicName,
      url: `${getTopicUrl(question.topicId)}#${question.id}`,
      type: "Question"
    }));
    const results = [...topicResults, ...questionResults].slice(0, 8);
    resultsContainer.innerHTML = results.length ? results.map((result) => `<a class="search-result" href="${result.url}" role="option"><span class="search-result-type">${escapeHTML(result.type)}</span><strong>${escapeHTML(result.title)}</strong><small>${escapeHTML(result.detail)}</small></a>`).join("") : `<div class="search-empty">No matching topics or questions.</div>`;
    resultsContainer.classList.add("visible");
  }

  function initGlobalSearch() {
    const input = document.getElementById("global-search");
    const results = document.getElementById("search-results");
    if (!input || !results) return;
    input.addEventListener("input", () => renderSearchResults(input.value));
    input.addEventListener("focus", () => { if (input.value.trim()) renderSearchResults(input.value); });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".header-search")) results.classList.remove("visible");
    });
  }

  function initHome() {
    const grid = document.getElementById("technology-grid");
    if (!grid) return;
    const technologyCards = [
      { name: "Java", description: "Build strong fundamentals and explain what happens inside the JVM.", icon: "☕", active: true, href: "topics.html" },
      { name: "Spring Boot", description: "Dependency injection, web APIs, data access, and production patterns.", icon: "SB" },
      { name: "JavaScript", description: "Language fundamentals, async behavior, and browser execution.", icon: "JS" },
      { name: "React.js", description: "Components, hooks, rendering, and state management.", icon: "⚛" },
      { name: "HTML", description: "Semantic structure, accessibility, and browser document behavior.", icon: "<>" },
      { name: "CSS", description: "Layout, responsive design, and maintainable styling systems.", icon: "#" },
      { name: "Node.js", description: "Event-driven servers, streams, and backend JavaScript.", icon: "N" },
      { name: "SQL", description: "Queries, data modeling, joins, and transaction thinking.", icon: "DB" },
      { name: "MongoDB", description: "Document modeling, indexes, and practical NoSQL trade-offs.", icon: "M" },
      { name: "Data Structures & Algorithms", description: "Problem-solving patterns for coding rounds and system thinking.", icon: "DS" }
    ];
    grid.innerHTML = technologyCards.map((card) => {
      const available = card.active;
      const topicCount = available ? topics().length : 0;
      const questionCount = available ? learningQuestions().length + (window.JAVA_QUIZ_QUESTIONS || []).length : 0;
      return `<article class="technology-card ${available ? "technology-card-active" : "technology-card-disabled"}">
        <div class="technology-card-top"><span class="technology-icon">${escapeHTML(card.icon)}</span>${available ? "<span class=\"card-status card-status-ready\">Available now</span>" : "<span class=\"card-status\">Coming soon</span>"}</div>
        <h3>${escapeHTML(card.name)}</h3><p>${escapeHTML(card.description)}</p>
        <div class="technology-meta"><span><strong>${topicCount || "—"}</strong><small>Topics</small></span><span><strong>${questionCount || "—"}</strong><small>Questions</small></span><span><strong>${available ? "0%" : "—"}</strong><small>Complete</small></span></div>
        ${available ? `<a class="button button-card" href="${card.href}">Start learning <span aria-hidden="true">→</span></a>` : `<span class="button button-card button-disabled" aria-disabled="true">Path in progress</span>`}
      </article>`;
    }).join("");
    const topicCount = document.getElementById("hero-topic-count");
    const questionCount = document.getElementById("hero-question-count");
    if (topicCount) topicCount.textContent = String(topics().length);
    if (questionCount) questionCount.textContent = String(learningQuestions().length);
  }

  window.DIM = { escapeHTML, formatCode, getTopic, getTopicQuestions, getTopicUrl, getQuizUrl, getTopicStatus, renderSearchResults };
  document.addEventListener("DOMContentLoaded", () => { initNavigation(); initGlobalSearch(); initHome(); });
})();