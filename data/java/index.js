/* Developer Interview Master — Java question registry
 *
 * This file initializes the global question arrays that every Java topic
 * section file pushes into. Keep this file loaded before any topic file.
 *
 * Question data shape (learning):
 *   { id, topicId, topicName, section, sectionOrder, question, answer,
 *     explanation, codeExample, realWorldUseCase, commonMistakes, interviewReadyAnswer }
 *
 * Quiz data shape:
 *   { id, topicId, topicName, section, sectionOrder, question, code, options,
 *     correctAnswer, explanation, optionExplanations }
 */

window.JAVA_LEARNING_QUESTIONS = window.JAVA_LEARNING_QUESTIONS || [];
window.JAVA_QUIZ_QUESTIONS = window.JAVA_QUIZ_QUESTIONS || [];

function addLearning(q) {
  window.JAVA_LEARNING_QUESTIONS.push(q);
}

function addQuiz(q) {
  window.JAVA_QUIZ_QUESTIONS.push(q);
}

window.JAVAQuestions = { addLearning, addQuiz };