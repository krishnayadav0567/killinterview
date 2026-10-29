(function () {
  function escapeHTML(value) {
    return window.DIM ? window.DIM.escapeHTML(value) : String(value ?? "");
  }

  function formatCode(value) {
    return window.DIM ? window.DIM.formatCode(value) : escapeHTML(value || "");
  }

  function renderQuiz() {
    const topicId = new URLSearchParams(window.location.search).get("topic") || "java-fundamentals";
    const topic = window.DIM.getTopic(topicId);
    const app = document.getElementById("quiz-app");
    const breadcrumb = document.getElementById("quiz-breadcrumb");
    const questions = (window.JAVA_QUIZ_QUESTIONS || []).filter((question) => question.topicId === topicId).sort((a, b) => (a.sectionOrder || 0) - (b.sectionOrder || 0));

    if (breadcrumb) breadcrumb.textContent = topic ? `${topic.name} quiz` : "Quiz";
    if (!app || !topic || !questions.length) {
      if (app) app.innerHTML = `<div class="empty-state"><h1>Quiz unavailable</h1><p>There are no quiz questions for this topic yet.</p><a class="button button-primary" href="topics.html">Back to topics</a></div>`;
      return;
    }

    let index = 0;
    let score = 0;
    let answered = false;
    const answers = [];

    function renderQuestion() {
      const question = questions[index];
      answered = false;
      app.innerHTML = `<div class="quiz-header"><div><p class="eyebrow">${escapeHTML(topic.name)} practice</p><h1>Question ${index + 1} of ${questions.length}</h1></div><div class="quiz-score">Score <strong>${score}</strong></div></div><div class="quiz-progress"><span style="width:${((index + 1) / questions.length) * 100}%"></span></div><article class="quiz-card"><div class="quiz-card-meta"><span class="section-label">${escapeHTML(question.section || "concept")}</span><span>Choose one answer</span></div><h2>${escapeHTML(question.question)}</h2>${question.code ? `<div class="code-block"><pre><code>${formatCode(question.code)}</code></pre></div>` : ""}<div class="quiz-options">${(question.options || []).map((option, optionIndex) => `<button class="quiz-option" type="button" data-option-index="${optionIndex}"><span class="option-letter">${String.fromCharCode(65 + optionIndex)}</span><span>${escapeHTML(option)}</span></button>`).join("")}</div><div id="quiz-feedback" class="quiz-feedback" hidden></div><div class="quiz-actions"><a class="button button-secondary" href="${window.DIM.getTopicUrl(topicId)}">Back to topic</a><button id="quiz-next" class="button button-primary" type="button" disabled>${index === questions.length - 1 ? "Finish quiz" : "Next question"} <span aria-hidden="true">→</span></button></div></article>`;

      app.querySelectorAll(".quiz-option").forEach((button) => button.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const selected = Number(button.dataset.optionIndex);
        const correct = selected === question.correctAnswer;
        if (correct) score += 1;
        answers[index] = selected;
        app.querySelectorAll(".quiz-option").forEach((option) => {
          option.disabled = true;
          const value = Number(option.dataset.optionIndex);
          if (value === question.correctAnswer) option.classList.add("correct");
          else if (value === selected) option.classList.add("incorrect");
        });
        const feedback = document.getElementById("quiz-feedback");
        feedback.hidden = false;
        feedback.className = `quiz-feedback ${correct ? "feedback-correct" : "feedback-incorrect"}`;
        feedback.innerHTML = `<strong>${correct ? "Correct" : "Not quite"}</strong><p>${escapeHTML(question.explanation || "Review the explanation and try the next question.")}</p>${question.optionExplanations?.[selected] ? `<small>${escapeHTML(question.optionExplanations[selected])}</small>` : ""}`;
        document.getElementById("quiz-next").disabled = false;
      }));

      document.getElementById("quiz-next").addEventListener("click", () => {
        if (!answered) return;
        if (index === questions.length - 1) {
          finishQuiz();
          return;
        }
        index += 1;
        renderQuestion();
      });
    }

    function finishQuiz() {
      const percentage = Math.round((score / questions.length) * 100);
      window.DIMStorage.saveQuizAttempt({ topicId, score, total: questions.length, percentage, completedAt: new Date().toISOString() });
      app.innerHTML = `<div class="quiz-result"><p class="eyebrow">Quiz complete</p><h1>${escapeHTML(topic.name)} results</h1><div class="result-score"><strong>${score}/${questions.length}</strong><span>${percentage}%</span></div><p>${percentage >= 80 ? "Strong work. Keep refining the explanations behind each answer." : "Use the explanations to review the concepts, then try the quiz again."}</p><div class="quiz-actions"><a class="button button-secondary" href="${window.DIM.getTopicUrl(topicId)}">Review topic</a><button id="retry-quiz" class="button button-primary" type="button">Try again</button></div></div>`;
      document.getElementById("retry-quiz").addEventListener("click", () => { index = 0; score = 0; answers.length = 0; renderQuestion(); });
    }

    renderQuestion();
  }

  document.addEventListener("DOMContentLoaded", renderQuiz);
})();