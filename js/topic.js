(function () {
  function escapeHTML(value) {
    return window.DIM ? window.DIM.escapeHTML(value) : String(value ?? "");
  }

  function formatCode(value) {
    return window.DIM ? window.DIM.formatCode(value) : escapeHTML(value || "");
  }

  function highlightCode(value) {
    const tokens = [];
    const token = (className, text) => {
      const placeholder = `@@CODE_TOKEN_${tokens.length}@@`;
      tokens.push(`<span class="${className}">${formatCode(text)}</span>`);
      return placeholder;
    };
    let highlighted = String(value || "")
      .replace(/\/\/.*$/gm, (text) => token("code-comment", text))
      .replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, (text) => token("code-string", text))
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|void|if|else|for|while|try|catch|throw|throws|synchronized|volatile)\b/g, (text) => token("code-keyword", text))
      .replace(/\b(\d+)\b/g, (text) => token("code-number", text));
    highlighted = formatCode(highlighted);
    tokens.forEach((markup, index) => {
      highlighted = highlighted.replace(`@@CODE_TOKEN_${index}@@`, markup);
    });
    return highlighted;
  }

  function renderCodeBlock(value, label = "Example") {
    return `<div class="code-block"><div class="code-block-title"><span>${escapeHTML(label)}</span><button class="copy-code-button" type="button">Copy code</button></div><pre><code>${highlightCode(value)}</code></pre></div>`;
  }

  function getTopicTheory(topicId) {
    return (window.JAVA_TOPIC_THEORY || {})[topicId] || null;
  }

  function renderTheory(topic, theory) {
    if (!theory) return `<div class="topic-theory-panel"><div class="empty-state"><h2>Theory is being prepared</h2><p>The complete guide for ${escapeHTML(topic.name)} will be added soon.</p></div></div>`;
    return `<div id="topic-theory" class="topic-theory-panel">
      <div class="theory-intro"><p class="eyebrow">Complete topic guide</p><h2>${escapeHTML(topic.name)} theory</h2><p>${escapeHTML(theory.introduction)}</p></div>
      <div class="theory-sections">${theory.sections.map((section) => `<article class="theory-section"><h3>${escapeHTML(section.title)}</h3><p class="theory-summary">${escapeHTML(section.summary)}</p><ul class="theory-points">${section.points.map((point) => `<li>${escapeHTML(point)}</li>`).join("")}</ul><div class="theory-nuances"><strong>Important nuances</strong><ul>${section.nuances.map((nuance) => `<li>${escapeHTML(nuance)}</li>`).join("")}</ul></div>${section.code ? renderCodeBlock(section.code) : ""}</article>`).join("")}</div>
      <section class="theory-takeaways"><h3>Interview takeaways</h3><ul>${theory.takeaways.map((takeaway) => `<li>${escapeHTML(takeaway)}</li>`).join("")}</ul></section>
    </div>`;
  }

  function getTopicId() {
    return new URLSearchParams(window.location.search).get("topic") || "java-fundamentals";
  }

  function renderQuestion(question) {
    const learned = window.DIMStorage && window.DIMStorage.isQuestionLearned(question.id);
    return `<article class="learning-card${learned ? " is-learned" : ""}" id="${escapeHTML(question.id)}" data-learned="${learned ? "true" : "false"}">
      <div class="learning-question-row">
        <h3>${escapeHTML(question.question)}</h3>
        <span class="section-label">${escapeHTML(question.section || "concept")}</span>
      </div>
      <p class="learning-answer">${escapeHTML(question.answer)}</p>
      <details open><summary>Explanation</summary><p>${escapeHTML(question.explanation)}</p></details>
      ${question.codeExample ? renderCodeBlock(question.codeExample) : ""}
      <div class="learning-details">
        ${question.realWorldUseCase ? `<div><strong>Real-world use</strong><p>${escapeHTML(question.realWorldUseCase)}</p></div>` : ""}
        ${question.commonMistakes ? `<div><strong>Common mistake</strong><p>${escapeHTML(question.commonMistakes)}</p></div>` : ""}
      </div>
      ${question.interviewReadyAnswer ? `<div class="interview-answer"><strong>Interview-ready answer</strong><p>${escapeHTML(question.interviewReadyAnswer)}</p></div>` : ""}
      <div class="learning-card-footer"><label class="learned-toggle"><input type="checkbox" data-learned-id="${escapeHTML(question.id)}" ${learned ? "checked" : ""} /> <span class="learned-status">${learned ? "Done" : "Mark learned"}</span></label></div>
    </article>`;
  }

  function renderPage(topicId) {
    const topic = window.DIM && window.DIM.getTopic(topicId);
    const hero = document.getElementById("topic-hero");
    const content = document.getElementById("topic-content");
    const breadcrumb = document.getElementById("breadcrumb-topic");

    if (!topic || !topic.contentAvailable) {
      if (breadcrumb) breadcrumb.textContent = topic ? topic.name : "Topic not found";
      if (hero) hero.innerHTML = `<div class="empty-state"><h1>${escapeHTML(topic ? topic.name : "Topic not found")}</h1><p>This topic is not available yet.</p><a class="button button-primary" href="topics.html">Back to topics</a></div>`;
      if (content) content.innerHTML = "";
      return;
    }

    const questions = (window.JAVA_LEARNING_QUESTIONS || [])
      .filter((question) => question.topicId === topicId)
      .sort((a, b) => {
        const sectionOrder = { what: 0, why: 1, how: 2 };
        const sectionDifference = (sectionOrder[a.section] ?? 99) - (sectionOrder[b.section] ?? 99);
        return sectionDifference || ((a.sectionOrder || 0) - (b.sectionOrder || 0));
      });
    const theory = getTopicTheory(topicId);
    const stats = window.DIMStorage.getTopicStats(topicId, window.JAVA_LEARNING_QUESTIONS || []);
    const quizUrl = window.DIM.getQuizUrl(topicId);

    if (breadcrumb) breadcrumb.textContent = topic.name;
    if (hero) {
      hero.innerHTML = `<div class="topic-hero-copy"><p class="eyebrow">Java learning path</p><h1>${escapeHTML(topic.name)}</h1><p>${escapeHTML(topic.description)}</p><div class="topic-hero-actions"><a class="button button-primary" href="${quizUrl}">Practice quiz <span aria-hidden="true">→</span></a><span class="topic-progress-copy"><span><strong id="topic-learned-count">${stats.learned}</strong>/${questions.length} learned</span><button id="reset-topic-progress" class="button button-outline-danger topic-reset-button" type="button" ${stats.learned ? "" : "disabled"}>Reset learned</button></span></div></div><div class="topic-progress-ring"><strong id="topic-progress-percent">${stats.percentage}%</strong><small>complete</small></div>`;
    }
    if (content) {
      const availableTopics = (window.JAVA_TOPICS || []).filter((item) => item.contentAvailable).sort((a, b) => a.order - b.order);
      const currentIndex = availableTopics.findIndex((item) => item.id === topicId);
      const previousTopic = currentIndex > 0 ? availableTopics[currentIndex - 1] : null;
      const nextTopic = currentIndex >= 0 && currentIndex < availableTopics.length - 1 ? availableTopics[currentIndex + 1] : null;
      content.innerHTML = `<div class="learning-toolbar"><div class="section-tabs" role="group" aria-label="Learning sections"><button class="section-tab active" type="button" data-section="theory">Theory</button><button class="section-tab" type="button" data-section="what">What</button><button class="section-tab" type="button" data-section="why">Why</button><button class="section-tab" type="button" data-section="how">How</button><button class="section-tab" type="button" data-section="all">All</button><button class="section-tab" type="button" data-section="done">Done</button></div><div><p id="learning-eyebrow" class="eyebrow">Topic theory</p><h2 id="learning-count" aria-live="polite">Complete guide to ${escapeHTML(topic.name)}</h2></div></div>${renderTheory(topic, theory)}<div id="learning-list" class="learning-list" hidden>${questions.map(renderQuestion).join("")}</div><nav class="topic-navigation" aria-label="Topic navigation">${previousTopic ? `<a class="button button-secondary" href="${window.DIM.getTopicUrl(previousTopic.id)}">← ${escapeHTML(previousTopic.name)}</a>` : `<span></span>`}${nextTopic ? `<a class="button button-primary" href="${window.DIM.getTopicUrl(nextTopic.id)}">${escapeHTML(nextTopic.name)} →</a>` : `<a class="button button-secondary" href="topics.html">Back to topics</a>`}</nav>`;
    }

    const list = document.getElementById("learning-list");
    const tabs = document.querySelectorAll(".section-tab");
    const learningEyebrow = document.getElementById("learning-eyebrow");
    const learningCount = document.getElementById("learning-count");
    const resetButton = document.getElementById("reset-topic-progress");
    const theoryPanel = document.getElementById("topic-theory");
    let selectedSection = "theory";

    function updateTopicProgress(updated) {
      const learnedCount = document.getElementById("topic-learned-count");
      const percent = document.getElementById("topic-progress-percent");
      if (learnedCount) learnedCount.textContent = String(updated.learned);
      if (percent) percent.textContent = `${updated.percentage}%`;
      if (resetButton) resetButton.disabled = updated.learned === 0;
    }

    function updateLearningHeading(visibleCards) {
      const sectionLabels = { theory: "Topic theory", what: "What questions", why: "Why questions", how: "How questions", all: "Learn by angle", done: "Questions studied" };
      if (selectedSection === "theory") {
        if (learningEyebrow) learningEyebrow.textContent = sectionLabels.theory;
        if (learningCount) learningCount.textContent = `Complete guide to ${topic.name}`;
        return;
      }
      const questionCount = visibleCards.length;
      const questionText = `${questionCount} ${selectedSection === "done" ? "completed " : ""}interview question${questionCount === 1 ? "" : "s"}`;
      if (learningEyebrow) learningEyebrow.textContent = sectionLabels[selectedSection] || "Learn by angle";
      if (learningCount) learningCount.textContent = questionText;
    }

    function scrollCardBelowHeader(card) {
      window.requestAnimationFrame(() => {
        const header = document.querySelector(".site-header");
        const headerBottom = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
        const viewportPadding = 16;
        const safeTop = headerBottom + viewportPadding;
        const safeBottom = window.innerHeight - viewportPadding;
        const cardRect = card.getBoundingClientRect();

        if (cardRect.top >= safeTop && cardRect.bottom <= safeBottom) return;

        const targetTop = window.scrollY + cardRect.top - safeTop;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
      });
    }

    function applyFilter() {
      if (theoryPanel) theoryPanel.hidden = selectedSection !== "theory";
      list.hidden = selectedSection === "theory";
      list.querySelectorAll(".learning-card").forEach((card) => {
        const section = card.querySelector(".section-label")?.textContent.toLowerCase();
        const learned = card.dataset.learned === "true";
        const matchesSection = selectedSection === "all" || section === selectedSection;
        card.hidden = selectedSection === "done" ? !learned : learned || !matchesSection;
      });
      updateLearningHeading(Array.from(list.querySelectorAll(".learning-card:not([hidden])")));
    }

    tabs.forEach((tab) => tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.toggle("active", item === tab));
      selectedSection = tab.dataset.section;
      applyFilter();
    }));

    if (resetButton) {
      resetButton.addEventListener("click", () => {
        if (!window.confirm(`Reset learned questions for ${topic.name}?`)) return;
        window.DIMStorage.resetTopicLearned(topicId, window.JAVA_LEARNING_QUESTIONS || []);
        list.querySelectorAll(".learning-card").forEach((card) => {
          card.dataset.learned = "false";
          card.classList.remove("is-learned");
          const input = card.querySelector("input[data-learned-id]");
          if (input) input.checked = false;
          const status = card.querySelector(".learned-status");
          if (status) status.textContent = "Mark learned";
        });
        updateTopicProgress(window.DIMStorage.getTopicStats(topicId, window.JAVA_LEARNING_QUESTIONS || []));
        applyFilter();
      });
    }

    content.addEventListener("click", async (event) => {
      const copyButton = event.target.closest(".copy-code-button");
      if (!copyButton) return;
      const code = copyButton.closest(".code-block")?.querySelector("code")?.textContent || "";
      try {
        await navigator.clipboard.writeText(code);
        copyButton.textContent = "Copied";
      } catch (error) {
        copyButton.textContent = "Select code";
      }
      window.setTimeout(() => { copyButton.textContent = "Copy code"; }, 1400);
    });

    list.addEventListener("change", (event) => {
      const input = event.target.closest("input[data-learned-id]");
      if (!input) return;
      window.DIMStorage.markQuestionLearned(input.dataset.learnedId, input.checked);
      const card = input.closest(".learning-card");
      if (card) {
        card.dataset.learned = String(input.checked);
        card.classList.toggle("is-learned", input.checked);
        const status = card.querySelector(".learned-status");
        if (status) status.textContent = input.checked ? "Done" : "Mark learned";
      }
      const updated = window.DIMStorage.getTopicStats(topicId, window.JAVA_LEARNING_QUESTIONS || []);
      updateTopicProgress(updated);

      if (input.checked && card) {
        applyFilter();
        const allCards = Array.from(list.querySelectorAll(".learning-card"));
        const currentIndex = allCards.indexOf(card);
        const visibleCards = allCards.filter((item) => !item.hidden && item.dataset.learned !== "true");
        const nextCard = visibleCards.find((item) => allCards.indexOf(item) > currentIndex) || visibleCards[0];
        if (nextCard) {
          scrollCardBelowHeader(nextCard);
        }
      } else {
        applyFilter();
      }
    });

    applyFilter();
  }

  document.addEventListener("DOMContentLoaded", () => renderPage(getTopicId()));
})();