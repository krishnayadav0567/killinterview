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
    const answers = questions.map(() => ({ selected: null, checked: false }));
    const startedAt = Date.now();

    function getScore() { return answers.reduce((score, answer, questionIndex) => score + (answer.checked && answer.selected === questions[questionIndex].correctAnswer ? 1 : 0), 0); }
    function renderFeedback(question, answer) {
      if (!answer.checked) return "";
      const correct = answer.selected === question.correctAnswer;
      const explanations = (question.optionExplanations || []).map((explanation, optionIndex) => `<li><strong>${String.fromCharCode(65 + optionIndex)}. ${escapeHTML(question.options[optionIndex])}</strong> — ${escapeHTML(explanation)}</li>`).join("");
      return `<div id="quiz-feedback" class="quiz-feedback ${correct ? "feedback-correct" : "feedback-incorrect"}"><strong>${correct ? "Correct" : "Not quite"}</strong><p>${escapeHTML(question.explanation || "Review the explanation and continue.")}</p>${explanations ? `<div><strong>Option review</strong><ul>${explanations}</ul></div>` : ""}</div>`;
    }
    function renderQuestion() {
      const question = questions[index];
      const answer = answers[index];
      app.innerHTML = `<div class="quiz-header"><div><p class="eyebrow">${escapeHTML(topic.name)} practice</p><h1>Question ${index + 1} of ${questions.length}</h1></div><div class="quiz-score">Score <strong>${getScore()}</strong></div></div><div class="quiz-progress"><span style="width:${((index + 1) / questions.length) * 100}%"></span></div><article class="quiz-card"><div class="quiz-card-meta"><span class="section-label">${escapeHTML(question.section || "concept")}</span><span>${answer.checked ? "Answer checked" : "Select an option"}</span></div><h2>${escapeHTML(question.question)}</h2>${question.code ? `<div class="code-block"><div class="code-block-title"><span>Code</span></div><pre><code>${formatCode(question.code)}</code></pre></div>` : ""}<div class="quiz-options">${(question.options || []).map((option, optionIndex) => { const isCorrect = answer.checked && optionIndex === question.correctAnswer; const isIncorrect = answer.checked && optionIndex === answer.selected && optionIndex !== question.correctAnswer; return `<button class="quiz-option${optionIndex === answer.selected ? " selected" : ""}${isCorrect ? " correct" : ""}${isIncorrect ? " incorrect" : ""}" type="button" data-option-index="${optionIndex}" ${answer.checked ? "disabled" : ""}><span class="option-letter">${String.fromCharCode(65 + optionIndex)}</span><span>${escapeHTML(option)}</span></button>`; }).join("")}</div>${renderFeedback(question, answer)}<div class="quiz-actions"><a class="button button-secondary" href="${window.DIM.getTopicUrl(topicId)}">Back to topic</a><div class="quiz-actions-right"><button id="quiz-previous" class="button button-secondary" type="button" ${index === 0 ? "disabled" : ""}>Previous</button>${answer.checked ? `<button id="quiz-next" class="button button-primary" type="button">${index === questions.length - 1 ? "Finish quiz" : "Next question"} <span aria-hidden="true">→</span></button>` : `<button id="quiz-check" class="button button-primary" type="button" ${answer.selected === null ? "disabled" : ""}>Check answer</button>`}</div></div></article>`;
      app.querySelectorAll(".quiz-option").forEach((button) => button.addEventListener("click", () => { if (!answers[index].checked) { answers[index].selected = Number(button.dataset.optionIndex); renderQuestion(); } }));
      const checkButton = document.getElementById("quiz-check");
      if (checkButton) checkButton.addEventListener("click", () => { if (answers[index].selected !== null) { answers[index].checked = true; renderQuestion(); } });
      const previousButton = document.getElementById("quiz-previous");
      if (previousButton) previousButton.addEventListener("click", () => { if (index > 0) { index -= 1; renderQuestion(); } });
      const nextButton = document.getElementById("quiz-next");
      if (nextButton) nextButton.addEventListener("click", () => { if (index === questions.length - 1) finishQuiz(); else { index += 1; renderQuestion(); } });
    }
    function finishQuiz() {
      const score = getScore();
      const percentage = Math.round((score / questions.length) * 100);
      const unanswered = answers.filter((answer) => !answer.checked).length;
      const timeTaken = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
      window.DIMStorage.saveQuizAttempt({ topicId, score, total: questions.length, percentage, completedAt: new Date().toISOString(), timeTaken });
      app.innerHTML = `<div class="quiz-result"><p class="eyebrow">Quiz complete</p><h1>${escapeHTML(topic.name)} results</h1><div class="result-score"><strong>${score}/${questions.length}</strong><span>${percentage}%</span></div><div class="result-summary-grid"><div class="result-summary-item"><strong>${score}</strong><span>Correct answers</span></div><div class="result-summary-item"><strong>${questions.length - score - unanswered}</strong><span>Incorrect answers</span></div><div class="result-summary-item"><strong>${unanswered}</strong><span>Unanswered</span></div><div class="result-summary-item"><strong>${timeTaken}s</strong><span>Time taken</span></div></div><p>${percentage >= 80 ? "Strong work. Keep refining the explanations behind each answer." : "Use the explanations to review the concepts, then try the quiz again."}</p><div class="quiz-actions"><a class="button button-secondary" href="topics.html">Back to topics</a><div class="quiz-actions-right"><button id="review-answers" class="button button-secondary" type="button">Review answers</button><button id="retry-quiz" class="button button-primary" type="button">Retry quiz</button></div></div><div id="quiz-review" class="quiz-review" hidden>${questions.map((question, questionIndex) => { const answer = answers[questionIndex]; const result = answer.checked ? (answer.selected === question.correctAnswer ? "Correct" : "Incorrect") : "Unanswered"; return `<article class="quiz-review-item"><strong>${questionIndex + 1}. ${escapeHTML(question.question)}</strong><p>${result}${answer.selected !== null ? ` · Your answer: ${escapeHTML(question.options[answer.selected])}` : ""}</p><p>${escapeHTML(question.explanation || "")}</p></article>`; }).join("")}</div></div>`;
      document.getElementById("retry-quiz").addEventListener("click", () => { index = 0; answers.forEach((answer) => { answer.selected = null; answer.checked = false; }); renderQuestion(); });
      document.getElementById("review-answers").addEventListener("click", (event) => { const review = document.getElementById("quiz-review"); review.hidden = !review.hidden; event.currentTarget.textContent = review.hidden ? "Review answers" : "Hide review"; });
    }
    renderQuestion();
  }
  document.addEventListener("DOMContentLoaded", renderQuiz);
})();