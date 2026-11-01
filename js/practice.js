(function () {
  const config = window.JAVA_PRACTICE_CONFIG || {};
  const questions = Array.isArray(window.JAVA_PRACTICE_QUESTIONS) ? window.JAVA_PRACTICE_QUESTIONS : [];
  const state = { questionIndex: 0, lastCompile: null, lastSubmission: null, busy: false };

  function byId(id) { return document.getElementById(id); }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function currentQuestion() { return questions[state.questionIndex] || null; }

  function getPracticeProgress(questionId) {
    return questionId && window.DIMStorage?.getPracticeProgress
      ? window.DIMStorage.getPracticeProgress(questionId)
      : null;
  }

  function formatVerdict(verdict) {
    if (verdict === "judge0_error") return "Judge unavailable";
    return String(verdict || "").split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ") || "Not submitted";
  }

  function verdictClass(verdict) {
    return String(verdict || "").toLowerCase().replace(/[^a-z0-9]+/g, "-") || "unknown";
  }

  function savePracticeDraft(questionId, code, input) {
    if (!questionId || !window.DIMStorage?.savePracticeDraft) return;
    window.DIMStorage.savePracticeDraft(questionId, { code, input });
  }

  function collapseExactDuplicateMainCode(source) {
    const normalized = String(source || "").replace(/\r\n?/g, "\n");
    const firstIndex = normalized.indexOf("public class Main");
    if (firstIndex < 0) return source;
    const secondIndex = normalized.indexOf("public class Main", firstIndex + "public class Main".length);
    if (secondIndex < 0) return source;
    const prefix = normalized.slice(0, firstIndex);
    const normalizeProgram = (program) => program
      .replace(/[ \t]+$/gm, "")
      .trim();
    const firstProgram = normalizeProgram(normalized.slice(firstIndex, secondIndex));
    const secondProgram = normalizeProgram(normalized.slice(secondIndex));
    return firstProgram && firstProgram === secondProgram ? `${prefix}${firstProgram}` : source;
  }

  const JAVA_KEYWORDS = new Set(["abstract", "assert", "break", "case", "catch", "class", "const", "continue", "default", "do", "else", "enum", "extends", "final", "finally", "for", "if", "implements", "import", "instanceof", "interface", "native", "new", "package", "private", "protected", "public", "return", "static", "strictfp", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "try", "var", "void", "volatile", "while", "true", "false", "null"]);
  const JAVA_TYPES = new Set(["boolean", "byte", "char", "double", "float", "int", "long", "short", "String", "System", "Integer", "Double", "Boolean", "Character", "Object", "Math", "Arrays"]);

  function highlightJava(code) {
    let html = "";
    let index = 0;
    const addText = (value) => { html += escapeHTML(value); };
    while (index < code.length) {
      const current = code[index];
      const next = code[index + 1];
      if (current === "/" && next === "/") {
        const end = code.indexOf("\n", index);
        const value = code.slice(index, end === -1 ? code.length : end);
        html += `<span class="practice-code-comment">${escapeHTML(value)}</span>`;
        index += value.length;
        continue;
      }
      if (current === "/" && next === "*") {
        const end = code.indexOf("*/", index + 2);
        const value = code.slice(index, end === -1 ? code.length : end + 2);
        html += `<span class="practice-code-comment">${escapeHTML(value)}</span>`;
        index += value.length;
        continue;
      }
      if (current === "\"" || current === "'") {
        const quote = current;
        let end = index + 1;
        while (end < code.length) {
          if (code[end] === "\\") { end += 2; continue; }
          if (code[end] === quote) { end += 1; break; }
          end += 1;
        }
        html += `<span class="practice-code-string">${escapeHTML(code.slice(index, end))}</span>`;
        index = end;
        continue;
      }
      if (current === "@") {
        const match = code.slice(index).match(/^@[A-Za-z_$][\w$]*/);
        if (match) {
          html += `<span class="practice-code-annotation">${escapeHTML(match[0])}</span>`;
          index += match[0].length;
          continue;
        }
      }
      if (/\d/.test(current) && (index === 0 || !/[\w$]/.test(code[index - 1]))) {
        const match = code.slice(index).match(/^(?:0[xX][\da-fA-F]+|\d+(?:\.\d+)?[fFdDlL]?)/);
        if (match) {
          html += `<span class="practice-code-number">${escapeHTML(match[0])}</span>`;
          index += match[0].length;
          continue;
        }
      }
      if (/[A-Za-z_$]/.test(current)) {
        const match = code.slice(index).match(/^[A-Za-z_$][\w$]*/);
        if (match) {
          const word = match[0];
          const className = JAVA_KEYWORDS.has(word) ? "practice-code-keyword" : (JAVA_TYPES.has(word) ? "practice-code-type" : "");
          html += className ? `<span class="${className}">${word}</span>` : escapeHTML(word);
          index += word.length;
          continue;
        }
      }
      addText(current);
      index += 1;
    }
    return html || " ";
  }

  function refreshCodeEditor() {
    const code = byId("practice-code");
    const highlight = byId("practice-code-highlight");
    const lines = byId("practice-code-lines");
    if (!code || !highlight || !lines) return;
    const value = code.value || "";
    const lineCount = Math.max(1, value.split("\n").length);
    lines.textContent = Array.from({ length: lineCount }, (_, index) => String(index + 1)).join("\n");
    highlight.innerHTML = `${highlightJava(value)}${value.endsWith("\n") ? " " : ""}`;
    highlight.scrollTop = code.scrollTop;
    highlight.scrollLeft = code.scrollLeft;
    lines.style.transform = `translateY(${-code.scrollTop}px)`;
  }

  function getLineIndentation(line) {
    return (line.match(/^\s*/) || [""])[0];
  }

  function formatJavaCode(source) {
    const lines = String(source || "").replace(/\r\n?/g, "\n").split("\n");
    let level = 0;
    return lines.map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("}")) level = Math.max(0, level - 1);
      const formatted = `${"    ".repeat(level)}${trimmed}`;
      const structural = trimmed
        .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, "")
        .replace(/\/\/.*$/, "");
      const opens = (structural.match(/{/g) || []).length;
      const closes = (structural.match(/}/g) || []).length;
      level = Math.max(0, level + opens - closes);
      return formatted;
    }).join("\n");
  }

  function replaceEditorValue(code, value, cursorPosition = value.length) {
    code.value = value;
    code.selectionStart = cursorPosition;
    code.selectionEnd = cursorPosition;
    code.dispatchEvent(new Event("input", { bubbles: true }));
    refreshCodeEditor();
  }

  function handleCodeKeydown(event) {
    const code = event.currentTarget;
    const start = code.selectionStart;
    const end = code.selectionEnd;
    const value = code.value;
    if (event.key === "Tab") {
      event.preventDefault();
      code.setRangeText("    ", start, end, "end");
      code.dispatchEvent(new Event("input", { bubbles: true }));
      return;
    }
    if (event.key === "{") {
      event.preventDefault();
      const before = value.slice(0, start);
      const after = value.slice(end);
      const lineStart = before.lastIndexOf("\n") + 1;
      const baseIndent = getLineIndentation(before.slice(lineStart));
      const insertion = `{\n${baseIndent}    \n${baseIndent}}`;
      replaceEditorValue(code, `${before}${insertion}${after}`, start + baseIndent.length + 6);
      return;
    }
    if (event.key === "}") {
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const currentLine = value.slice(lineStart, start);
      const nextText = value.slice(start);
      if (!currentLine.trim() && nextText.startsWith("\n}")) {
        const prefix = value.slice(0, lineStart);
        const suffix = nextText.slice(2);
        replaceEditorValue(code, `${prefix}}${suffix}`, lineStart + 1);
        event.preventDefault();
        return;
      }
      if (nextText.startsWith("}")) {
        event.preventDefault();
        code.selectionStart = start + 1;
        code.selectionEnd = start + 1;
      }
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const before = value.slice(0, start);
      const after = value.slice(end);
      const currentLine = before.slice(before.lastIndexOf("\n") + 1);
      const currentIndent = getLineIndentation(currentLine);
      const trimmedLine = currentLine.trim();
      const extraIndent = /\{\s*$/.test(trimmedLine) ? "    " : "";
      if (after.startsWith("}") && extraIndent) {
        const replacement = `\n${currentIndent}${extraIndent}\n${currentIndent}`;
        replaceEditorValue(code, `${before}${replacement}${after}`, start + replacement.length);
        return;
      }
      replaceEditorValue(code, `${before}\n${currentIndent}${extraIndent}${after}`, start + 1 + currentIndent.length + extraIndent.length);
    }
  }

  function formatCurrentCode() {
    const code = byId("practice-code");
    if (!code) return;
    const formatted = formatJavaCode(code.value);
    replaceEditorValue(code, formatted, Math.min(code.selectionStart, formatted.length));
    setStatus(byId("practice-editor-status"), "Formatted", "status-success");
  }

  function initWorkspaceResizers() {
    const workspace = document.querySelector(".practice-workspace");
    const leftResizer = byId("practice-resizer-left");
    const rightResizer = byId("practice-resizer-right");
    if (!workspace || !leftResizer || !rightResizer) return;

    const updateResizeValue = (resizer, value) => {
      resizer.setAttribute("aria-valuenow", String(Math.round(value)));
    };
    const setColumnWidth = (variable, value, resizer) => {
      const bounded = Math.max(Number(resizer.dataset.min || 260), Math.min(Number(resizer.dataset.max || 1000), value));
      workspace.style.setProperty(variable, `${Math.round(bounded)}px`);
      updateResizeValue(resizer, bounded);
    };
    const startResize = (resizer, variable, getWidth, direction = 1) => {
      const startX = resizer.getBoundingClientRect().left;
      const initialWidth = getWidth();
      const handlePointerMove = (event) => {
        const delta = event.clientX - startX;
        setColumnWidth(variable, initialWidth + (delta * direction), resizer);
      };
      const stopResize = () => {
        document.body.classList.remove("practice-is-resizing");
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", stopResize);
        window.removeEventListener("pointercancel", stopResize);
      };
      document.body.classList.add("practice-is-resizing");
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", stopResize, { once: true });
      window.addEventListener("pointercancel", stopResize, { once: true });
    };
    const parseWidth = (variable, fallback) => parseFloat(getComputedStyle(workspace).getPropertyValue(variable)) || fallback;

    leftResizer.dataset.min = "260";
    leftResizer.dataset.max = "900";
    rightResizer.dataset.min = "260";
    rightResizer.dataset.max = "900";
    leftResizer.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      leftResizer.setPointerCapture?.(event.pointerId);
      startResize(leftResizer, "--question-width", () => parseWidth("--question-width", 260));
    });
    rightResizer.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      rightResizer.setPointerCapture?.(event.pointerId);
      startResize(rightResizer, "--results-width", () => parseWidth("--results-width", 260), -1);
    });
    leftResizer.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 20 : -20;
      setColumnWidth("--question-width", parseWidth("--question-width", 260) + direction, leftResizer);
    });
    rightResizer.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? -20 : 20;
      setColumnWidth("--results-width", parseWidth("--results-width", 260) + direction, rightResizer);
    });
  }

  function initFullscreenMode() {
    const page = document.querySelector(".practice-page");
    const button = byId("practice-fullscreen");
    const label = byId("practice-fullscreen-label");
    if (!page || !button) return;
    let fallbackFullscreen = false;

    const updateFullscreenUI = (active) => {
      page.classList.toggle("practice-fullscreen-mode", active);
      document.body.classList.toggle("practice-fullscreen-mode", active);
      button.setAttribute("aria-pressed", String(active));
      button.title = active ? "Exit fullscreen practice mode" : "Open fullscreen practice mode";
      if (label) label.textContent = active ? "Exit fullscreen" : "Fullscreen";
    };

    const isActive = () => Boolean(document.fullscreenElement) || fallbackFullscreen;
    button.addEventListener("click", async () => {
      if (document.fullscreenElement) {
        await document.exitFullscreen?.();
        return;
      }
      if (fallbackFullscreen) {
        fallbackFullscreen = false;
        updateFullscreenUI(false);
        return;
      }
      if (page.requestFullscreen) {
        try {
          await page.requestFullscreen();
          return;
        } catch (error) {
          // Use the CSS fullscreen fallback when browser fullscreen is unavailable.
        }
      }
      fallbackFullscreen = true;
      updateFullscreenUI(true);
    });
    document.addEventListener("fullscreenchange", () => updateFullscreenUI(isActive()));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && fallbackFullscreen) {
        fallbackFullscreen = false;
        updateFullscreenUI(false);
      }
    });
    updateFullscreenUI(false);
  }

  function getApiEndpoint(endpoint) {
    if (!endpoint) return "";
    if (/^https?:\/\//i.test(endpoint)) return endpoint;
    const isLocalBrowser = ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
    const openedFromAnotherLocalServer = isLocalBrowser && window.location.port && window.location.port !== String(config.localProxyPort || 3000);
    if (openedFromAnotherLocalServer) {
      return `http://${window.location.hostname === "[::1]" ? "[::1]" : "localhost"}:${config.localProxyPort || 3000}${endpoint}`;
    }
    return endpoint;
  }

  function setStatus(element, text, className) {
    if (!element) return;
    element.textContent = text;
    element.className = `practice-status${className ? ` ${className}` : ""}`;
  }

  function setBusy(isBusy) {
    state.busy = isBusy;
    [byId("practice-run"), byId("practice-submit"), byId("practice-check"), byId("practice-reset")].forEach((button) => {
      if (button) button.disabled = isBusy || (button.id === "practice-check" && (!state.lastCompile || !state.lastCompile.success));
    });
  }

  function renderQuestionList() {
    const list = byId("practice-question-list");
    if (!list) return;
    byId("practice-topic-tooltip")?.remove();
    if (!questions.length) {
      list.innerHTML = "<p class=\"practice-empty\">No practice questions have been added yet.</p>";
      return;
    }
    list.innerHTML = questions.map((question, index) => {
      const topicIndex = Math.min(10, Math.max(1, Number(question.topicIndex) || 1));
      const topic = question.topic || question.category || "Java practice";
      const active = index === state.questionIndex;
      const record = getPracticeProgress(question.id);
      const completed = Boolean(record?.completedAt);
      const failed = Boolean(record?.lastSubmissionVerdict && !completed && record.lastSubmissionVerdict !== "manual_review");
      const manualReview = question.topic === "Spring Boot" || record?.lastSubmissionVerdict === "manual_review";
      const stateClass = `${completed ? " completed" : ""}${failed ? " failed" : ""}${manualReview ? " manual-review" : ""}`;
      const status = completed ? "Accepted" : manualReview ? "Manual review" : record?.lastSubmissionVerdict ? formatVerdict(record.lastSubmissionVerdict) : "Not submitted";
      return `<button class="practice-question-number-option topic-${topicIndex}${active ? " active" : ""}${stateClass}" type="button" data-question-index="${index}" data-topic="${escapeHTML(topic)}" title="${escapeHTML(topic)}" aria-label="Question ${index + 1}: ${escapeHTML(question.title)} (${escapeHTML(topic)}; ${status})" aria-current="${active ? "true" : "false"}">${String(index + 1).padStart(2, "0")}</button>`;
    }).join("");
    const tooltip = document.createElement("div");
    tooltip.id = "practice-topic-tooltip";
    tooltip.className = "practice-topic-tooltip";
    tooltip.setAttribute("role", "tooltip");
    document.body.appendChild(tooltip);
    const hideTooltip = () => {
      tooltip.classList.remove("visible");
    };
    const showTooltip = (button) => {
      tooltip.textContent = button.dataset.topic || "Java practice";
      tooltip.classList.add("visible");
      const buttonRect = button.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const left = Math.min(window.innerWidth - tooltipRect.width - 12, Math.max(12, buttonRect.left + (buttonRect.width / 2) - (tooltipRect.width / 2)));
      const top = buttonRect.top > tooltipRect.height + 16 ? buttonRect.top - tooltipRect.height - 8 : buttonRect.bottom + 8;
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    };
    list.querySelectorAll("[data-question-index]").forEach((button) => button.addEventListener("click", () => {
      if (state.busy) return;
      state.questionIndex = Number(button.dataset.questionIndex);
      renderQuestion();
    }));
    list.querySelectorAll("[data-topic]").forEach((button) => {
      button.addEventListener("mouseenter", () => showTooltip(button));
      button.addEventListener("focus", () => showTooltip(button));
      button.addEventListener("mouseleave", hideTooltip);
      button.addEventListener("blur", hideTooltip);
    });
  }

  function renderExample(question) {
    const example = byId("practice-example");
    if (!example) return;
    if (!question.example) {
      example.innerHTML = "";
      return;
    }
    example.innerHTML = `<strong>Example</strong><div class="practice-example-row"><span>Input / setup</span><code>${escapeHTML(question.example.input)}</code></div><div class="practice-example-row"><span>Expected behavior</span><code>${escapeHTML(question.example.output)}</code></div>`;
  }

  function updatePracticeStatus() {
    const question = currentQuestion();
    if (!question) return;
    const record = getPracticeProgress(question.id);
    const editorStatus = byId("practice-editor-status");
    const compileStatus = byId("practice-compile-status");
    const aiStatus = byId("practice-ai-status");
    const complete = record && record.completedAt;
    const hasDraft = Boolean(record?.draftCode?.trim() || record?.draftInput?.trim());
    const readyToSubmit = Boolean(state.lastCompile?.success);
    if (complete) {
      setStatus(editorStatus, record.draftDirty ? "Accepted · draft changed" : "Saved solution", "status-success");
      setStatus(compileStatus, record.lastSubmissionVerdict === "accepted" ? "Accepted" : "Completed", "status-success");
      setStatus(aiStatus, record.aiReviewed ? "AI reviewed" : "Waiting for AI", record.aiReviewed ? "status-success" : "");
    } else if (question.topic === "Spring Boot") {
      setStatus(editorStatus, "Manual review", "status-loading");
      setStatus(compileStatus, "Not auto-judged", "status-loading");
      setStatus(aiStatus, "Run code for feedback", "");
    } else if (record?.lastSubmissionVerdict) {
      const statusClass = record.lastSubmissionVerdict === "manual_review" ? "status-loading" : "status-error";
      setStatus(editorStatus, formatVerdict(record.lastSubmissionVerdict), statusClass);
      setStatus(compileStatus, `${record.lastPassedTestCases}/${record.lastTotalTestCases || 0} tests`, statusClass);
      setStatus(aiStatus, "Submit after fixing code", "");
    } else if (readyToSubmit) {
      setStatus(editorStatus, "Ready to review", "status-loading");
      setStatus(compileStatus, "Run complete", "status-success");
      setStatus(aiStatus, "Waiting for a run", "");
    } else if (hasDraft) {
      setStatus(editorStatus, "Saved draft", "status-success");
      setStatus(compileStatus, "Not run yet", "");
      setStatus(aiStatus, "Waiting for a run", "");
    } else {
      setStatus(editorStatus, "Ready", "");
      setStatus(compileStatus, "Not run yet", "");
      setStatus(aiStatus, "Waiting for a run", "");
    }
  }

  function renderQuestion() {
    const question = currentQuestion();
    const code = byId("practice-code");
    const input = byId("practice-input");
    state.lastCompile = null;
    state.lastSubmission = null;
    if (!question) {
      byId("practice-question-title").textContent = "No question available";
      byId("practice-question-prompt").textContent = "Add Java questions in data/java/practice-questions.js.";
      if (code) code.value = "";
      if (input) input.value = "";
      refreshCodeEditor();
      renderQuestionList();
      renderSubmissionResult(null);
      setBusy(false);
      return;
    }
    const record = getPracticeProgress(question.id);
    const starterCode = question.starterCode || "public class Main {\n    public static void main(String[] args) {\n    }\n}";
    byId("practice-question-category").textContent = question.category || "Java coding question";
    byId("practice-question-title").textContent = question.title;
    byId("practice-question-difficulty").textContent = question.difficulty || "Practice";
    byId("practice-question-prompt").textContent = question.prompt;
    byId("practice-requirements-list").innerHTML = (question.requirements || []).map((requirement) => `<li>${escapeHTML(requirement)}</li>`).join("");
    const draftCode = record?.draftCode ?? starterCode;
    const cleanedDraftCode = collapseExactDuplicateMainCode(draftCode);
    if (record?.draftCode && cleanedDraftCode !== draftCode) {
      savePracticeDraft(question.id, cleanedDraftCode, record.draftInput ?? question.input ?? "");
    }
    if (code) code.value = cleanedDraftCode;
    if (input) input.value = record?.draftInput ?? question.input ?? "";
    refreshCodeEditor();
    renderExample(question);
    renderSubmissionResult(record?.lastSubmissionResult ? {
      ...record.lastSubmissionResult,
      verdict: record.lastSubmissionVerdict,
      message: record.lastSubmissionMessage,
      passedTestCases: record.lastPassedTestCases,
      totalTestCases: record.lastTotalTestCases
    } : null);
    byId("practice-feedback").innerHTML = record?.aiReviewed
      ? "<p>AI feedback is saved for this question. Run the current code again before requesting a new review.</p>"
      : "<p>Run your code first, then choose <strong>Check with AI</strong> to receive feedback.</p>";
    byId("practice-output").textContent = "Run your code to see compiler output here.";
    renderQuestionList();
    updatePracticeStatus();
    setBusy(false);
  }

  function renderSubmissionResult(result) {
    const container = byId("practice-submission-result");
    if (!container) return;
    if (!result || !result.verdict) {
      container.className = "practice-submission-empty";
      container.textContent = "Submit your solution to run the question's automated test suite.";
      return;
    }
    const verdict = String(result.verdict);
    const score = result.totalTestCases ? `${Number(result.passedTestCases) || 0} / ${Number(result.totalTestCases) || 0} tests passed` : "No automated tests available";
    const tests = Array.isArray(result.testCases) ? result.testCases : [];
    const testMarkup = tests.map((test) => {
      const label = test.hidden ? `Test ${test.index} · Hidden test case` : `Test ${test.index}`;
      const detail = test.passed ? "Passed" : (test.errors || (test.verdict === "wrong_answer" ? "Output did not match expected output." : formatVerdict(test.verdict)));
      const output = !test.passed && !test.hidden && (test.expectedOutput || test.actualOutput)
        ? `<pre>Expected:\n${escapeHTML(test.expectedOutput || "(no output)")}\n\nReceived:\n${escapeHTML(test.actualOutput || "(no output)")}</pre>`
        : "";
      return `<div class="practice-submission-test"><strong>${escapeHTML(label)}</strong> — ${escapeHTML(detail)}${output}</div>`;
    }).join("");
    container.className = `practice-submission-result verdict-${verdictClass(verdict)}`;
    container.innerHTML = `<div class="practice-submission-heading"><strong>${escapeHTML(formatVerdict(verdict))}</strong><span class="practice-submission-score">${escapeHTML(score)}</span></div><p class="practice-submission-message">${escapeHTML(result.message || "")}</p>${testMarkup ? `<div class="practice-submission-tests">${testMarkup}</div>` : ""}`;
  }

  async function readResponse(response) {
    const raw = await response.text();
    let data;
    try { data = raw ? JSON.parse(raw) : {}; } catch (error) { data = { output: raw }; }
    if (!response.ok) {
      if (response.status === 405) {
        throw new Error("The Practice Ground must run through node server.js. Stop the static/Python server and open http://localhost:3000/practice.html.");
      }
      throw new Error(data?.message || data?.error || raw || `Request failed with status ${response.status}`);
    }
    return data;
  }

  function firstValue(data, keys, fallback = "") {
    for (const key of keys) {
      if (data && data[key] !== undefined && data[key] !== null) return data[key];
    }
    return fallback;
  }

  function normalizeCompileResponse(data) {
    const errors = firstValue(data, ["error", "errors", "stderr", "compileError", "message"], "");
    const output = firstValue(data, ["output", "stdout", "result", "programOutput"], "");
    const explicitSuccess = firstValue(data, ["compileSuccess", "compiled", "success", "ok"], null);
    const exitCode = firstValue(data, ["exit_code", "exitCode", "code"], null);
    const status = firstValue(data, ["status"], "");
    return {
      success: explicitSuccess === null ? (status ? status === "success" && (exitCode === null || Number(exitCode) === 0) : !errors) : Boolean(explicitSuccess),
      output: typeof output === "string" ? output : JSON.stringify(output, null, 2),
      errors: typeof errors === "string" ? errors : JSON.stringify(errors, null, 2),
      exitCode,
      status,
      errorType: firstValue(data, ["errorType"], null),
      judgeStatusId: firstValue(data, ["judgeStatusId"], null),
      raw: data
    };
  }

  function normalizeReviewResponse(data) {
    return {
      correct: firstValue(data, ["correct", "isCorrect", "passed"], null),
      score: firstValue(data, ["score", "rating", "points"], null),
      feedback: firstValue(data, ["feedback", "explanation", "review", "message"], "AI returned feedback without a summary."),
      mistakes: firstValue(data, ["mistakes", "errors", "issues"], []),
      suggestions: firstValue(data, ["suggestions", "improvements", "recommendations"], []),
      betterSolution: firstValue(data, ["betterSolution", "suggestedSolution", "solution"], ""),
      raw: data
    };
  }

  function displayList(value) {
    if (Array.isArray(value)) return value;
    if (value === null || value === undefined || value === "") return [];
    return [String(value)];
  }

  function renderFeedback(review) {
    const feedback = byId("practice-feedback");
    if (!feedback) return;
    const resultLabel = review.correct === null ? "Review complete" : (review.correct ? "Looks correct" : "Needs changes");
    const resultClass = review.correct === null ? "" : (review.correct ? "feedback-good" : "feedback-needs-work");
    const score = review.score === null || review.score === "" ? "" : `<span class="practice-review-score">Score: ${escapeHTML(review.score)}</span>`;
    const renderList = (title, items) => {
      const values = displayList(items);
      return values.length ? `<div class="practice-review-section"><strong>${title}</strong><ul>${values.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul></div>` : "";
    };
    feedback.innerHTML = `<div class="practice-review-result ${resultClass}"><strong>${escapeHTML(resultLabel)}</strong>${score}</div><p class="practice-review-summary">${escapeHTML(review.feedback)}</p>${renderList("Mistakes to review", review.mistakes)}${renderList("Suggestions", review.suggestions)}${review.betterSolution ? `<div class="practice-review-section"><strong>Suggested solution</strong><pre>${escapeHTML(review.betterSolution)}</pre></div>` : ""}`;
  }

  function showRequestError(message, type) {
    if (type === "compile") {
      byId("practice-output").textContent = `Compiler request failed:\n${message}`;
      setStatus(byId("practice-editor-status"), "Request failed", "status-error");
      setStatus(byId("practice-compile-status"), "Unavailable", "status-error");
    } else {
      byId("practice-feedback").innerHTML = `<div class="practice-error"><strong>AI review request failed</strong><p>${escapeHTML(message)}</p><p>Check the endpoint in <code>data/java/practice-config.js</code>.</p></div>`;
      setStatus(byId("practice-ai-status"), "Unavailable", "status-error");
    }
  }

  async function runCode() {
    const question = currentQuestion();
    const code = byId("practice-code")?.value || "";
    const input = byId("practice-input")?.value || "";
    if (!question) return;
    if (!code.trim()) {
      showRequestError("Enter Java code before running the program.", "compile");
      return;
    }
    if (!config.compileEndpoint) {
      showRequestError("Add the Java compiler endpoint in data/java/practice-config.js first.", "compile");
      return;
    }
    savePracticeDraft(question.id, code, input);
    setBusy(true);
    setStatus(byId("practice-editor-status"), "Running...", "status-loading");
    setStatus(byId("practice-compile-status"), "Checking...", "status-loading");
    byId("practice-output").textContent = "Sending code to the Java compiler...";
    try {
      const response = await fetch(getApiEndpoint(config.compileEndpoint), {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(config.requestHeaders || {}) },
        credentials: config.includeCredentials ? "include" : "same-origin",
        body: JSON.stringify({ language: "java", questionId: question.id, code, source: code, input, stdin: input })
      });
      const result = normalizeCompileResponse(await readResponse(response));
      state.lastCompile = { ...result, code, input, questionId: question.id };
      const judgeUnavailable = result.errorType === "judge0_error" || Number(result.judgeStatusId) === 13;
      const output = [result.success ? result.output : "", result.errors ? `Errors:\n${result.errors}` : ""].filter(Boolean).join("\n\n") || (result.success ? "Program finished without output." : "The compiler rejected the code.");
      byId("practice-output").textContent = output;
      setStatus(byId("practice-editor-status"), result.success ? "Run complete" : judgeUnavailable ? "Judge unavailable" : "Fix code", result.success ? "status-success" : "status-error");
      setStatus(byId("practice-compile-status"), result.success ? "Compiled" : judgeUnavailable ? "Unavailable" : "Compile error", result.success ? "status-success" : "status-error");
      byId("practice-feedback").innerHTML = result.success
        ? "<p>Your code ran successfully. Choose <strong>Check with AI</strong> for a code review.</p>"
        : judgeUnavailable
          ? "<p>Judge0 could not execute this code. Check the local Judge0 service and sandbox configuration.</p>"
          : "<p>Fix the compiler errors before asking AI to review the solution.</p>";
      setStatus(byId("practice-ai-status"), result.success ? "Ready to review" : judgeUnavailable ? "Judge unavailable" : "Run after fixing code", result.success || judgeUnavailable ? "" : "status-error");
      if (window.DIMStorage?.recordPracticeRun) {
        window.DIMStorage.recordPracticeRun(question.id, {
          code,
          input,
          success: result.success,
          output: result.output,
          errors: result.errors,
          exitCode: result.exitCode
        });
      }
    } catch (error) {
      state.lastCompile = null;
      showRequestError(error.message, "compile");
    } finally {
      setBusy(false);
    }
  }

  async function submitSolution() {
    const question = currentQuestion();
    const code = byId("practice-code")?.value || "";
    const input = byId("practice-input")?.value || "";
    if (!question) return;
    if (!code.trim()) {
      renderSubmissionResult({ verdict: "judge_error", message: "Enter Java code before submitting.", passedTestCases: 0, totalTestCases: 0 });
      return;
    }
    if (!config.judgeEndpoint) {
      renderSubmissionResult({ verdict: "judge_error", message: "Add the Java judge endpoint in data/java/practice-config.js first.", passedTestCases: 0, totalTestCases: 0 });
      return;
    }

    savePracticeDraft(question.id, code, input);
    setBusy(true);
    setStatus(byId("practice-editor-status"), "Submitting...", "status-loading");
    setStatus(byId("practice-compile-status"), "Judging...", "status-loading");
    setStatus(byId("practice-ai-status"), "Waiting for submission", "");
    byId("practice-output").textContent = "Running the complete automated test suite...";
    renderSubmissionResult({ verdict: "judging", message: "Running the complete automated test suite...", passedTestCases: 0, totalTestCases: 0 });
    try {
      const response = await fetch(getApiEndpoint(config.judgeEndpoint), {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(config.requestHeaders || {}) },
        credentials: config.includeCredentials ? "include" : "same-origin",
        body: JSON.stringify({ language: "java", questionId: question.id, code, source: code, input, stdin: input })
      });
      const result = await readResponse(response);
      state.lastSubmission = { ...result, code, input, questionId: question.id };
      renderSubmissionResult(result);
      const output = Array.isArray(result.testCases)
        ? result.testCases.filter((test) => !test.hidden && (test.actualOutput || test.errors)).map((test) => test.errors || test.actualOutput).join("\n\n")
        : "";
      byId("practice-output").textContent = output || result.message || formatVerdict(result.verdict);
      const accepted = result.verdict === "accepted" || result.accepted === true;
      const statusClass = accepted ? "status-success" : result.verdict === "manual_review" ? "status-loading" : "status-error";
      setStatus(byId("practice-editor-status"), accepted ? "Accepted" : formatVerdict(result.verdict), statusClass);
      setStatus(byId("practice-compile-status"), result.totalTestCases ? `${result.passedTestCases}/${result.totalTestCases} tests` : formatVerdict(result.verdict), statusClass);
      window.DIMStorage?.recordPracticeSubmission?.(question.id, { ...result, code, input });
      renderQuestionList();
      updatePracticeStatus();
    } catch (error) {
      state.lastSubmission = null;
      renderSubmissionResult({ verdict: "judge_error", message: error.message, passedTestCases: 0, totalTestCases: 0 });
      byId("practice-output").textContent = `Judge request failed:\n${error.message}`;
      setStatus(byId("practice-editor-status"), "Judge unavailable", "status-error");
      setStatus(byId("practice-compile-status"), "Unavailable", "status-error");
    } finally {
      setBusy(false);
    }
  }

  async function checkWithAI() {
    const question = currentQuestion();
    if (!question || !state.lastCompile || !state.lastCompile.success) return;
    if (!config.aiCheckEndpoint) {
      showRequestError("Add the AI checking endpoint in data/java/practice-config.js first.", "review");
      return;
    }
    setBusy(true);
    setStatus(byId("practice-ai-status"), "Reviewing...", "status-loading");
    byId("practice-feedback").textContent = "Sending your question, code, and compiler result for AI review...";
    try {
      const response = await fetch(getApiEndpoint(config.aiCheckEndpoint), {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(config.requestHeaders || {}) },
        credentials: config.includeCredentials ? "include" : "same-origin",
        body: JSON.stringify({ language: "java", questionId: question.id, question: question.prompt, title: question.title, code: state.lastCompile.code, compilerOutput: state.lastCompile.output, compilerErrors: state.lastCompile.errors, compileSuccess: state.lastCompile.success, requirements: question.requirements || [], expectedRequirements: question.requirements || [], example: question.example || null })
      });
      const review = normalizeReviewResponse(await readResponse(response));
      renderFeedback(review);
      setStatus(byId("practice-ai-status"), "Review complete", "status-success");
      window.DIMStorage.savePracticeReview(question.id, review);
    } catch (error) {
      showRequestError(error.message, "review");
    } finally {
      setBusy(false);
    }
  }

  function init() {
    renderQuestion();
    initWorkspaceResizers();
    initFullscreenMode();
    byId("practice-run")?.addEventListener("click", runCode);
    byId("practice-submit")?.addEventListener("click", submitSolution);
    byId("practice-check")?.addEventListener("click", checkWithAI);
    byId("practice-reset")?.addEventListener("click", () => {
      const question = currentQuestion();
      if (!question) return;
      const starterCode = question.starterCode || "public class Main {\n    public static void main(String[] args) {\n    }\n}";
      savePracticeDraft(question.id, starterCode, question.input || "");
      renderQuestion();
    });
    byId("practice-format")?.addEventListener("click", formatCurrentCode);
    const codeEditor = byId("practice-code");
    codeEditor?.addEventListener("input", refreshCodeEditor);
    codeEditor?.addEventListener("scroll", refreshCodeEditor);
    codeEditor?.addEventListener("keydown", handleCodeKeydown);
    [codeEditor, byId("practice-input")].forEach((field) => field?.addEventListener("input", () => {
      const question = currentQuestion();
      if (question) savePracticeDraft(question.id, codeEditor?.value || "", byId("practice-input")?.value || "");
      if (!state.busy && state.lastCompile) {
        state.lastCompile = null;
        byId("practice-output").textContent = "Code changed. Run it again to refresh the compiler result.";
        setStatus(byId("practice-compile-status"), "Run again", "");
        setStatus(byId("practice-ai-status"), "Waiting for a run", "");
      } else if (!state.busy) {
        updatePracticeStatus();
      }
      if (!state.busy) setBusy(false);
    }));
  }

  document.addEventListener("DOMContentLoaded", init);
})();