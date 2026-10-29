/* Java Fundamentals — topic registry
 * Loads all Java Fundamentals question sections into the global arrays.
 * Load order: data/java/index.js → this file → section files.
 */
window.JAVAQuestions.addLearning; // ensure reference exists
window.JAVAQuestions.addQuiz; // ensure reference exists

/* Section files are loaded individually via <script> tags in HTML.
   This file documents the intended load order:
   1. what-is.js      (30 learning questions)
   2. why.js          (30 learning questions)
   3. how-it-works.js (30 learning questions)
   4. quiz-output.js  (20 MCQs)
   5. quiz-what.js    (20 MCQs)
   6. quiz-why.js     (20 MCQs)
   Total: 90 learning + 60 quiz = 150 questions
 */