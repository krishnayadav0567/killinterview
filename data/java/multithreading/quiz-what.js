/* Multithreading — what quiz questions */
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-001",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 1,
  "question": "What is a thread?",
  "code": null,
  "options": [
    "The smallest unit of execution that the OS can schedule",
    "A Java source file",
    "A class definition",
    "A method with multiple threads"
  ],
  "correctAnswer": 0,
  "explanation": "A thread is the smallest unit of execution that the operating system can schedule. In Java, threads are represented by java.lang.Thread or by implementing Runnable.",
  "optionExplanations": [
    "Correct. Thread = smallest OS-schedulable unit of execution.",
    "Incorrect. Source files are .java files.",
    "Incorrect. Class definitions are class declarations.",
    "Incorrect. Methods do not inherently create threads."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-002",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 2,
  "question": "What is the difference between a process and a thread?",
  "code": null,
  "options": [
    "A process has its own memory; a thread shares the process's memory",
    "A thread has its own memory; a process shares the thread's memory",
    "They are the same thing",
    "A process is faster than a thread"
  ],
  "correctAnswer": 0,
  "explanation": "A process is an independent program with its own memory space. A thread is a unit of execution inside a process that shares that process's memory.",
  "optionExplanations": [
    "Correct. Process = own memory; Thread = shared memory.",
    "Incorrect. It is the reverse.",
    "Incorrect. They are distinct concepts.",
    "Incorrect. Speed comparison is not the defining difference."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-003",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 3,
  "question": "What is the difference between Thread and Runnable?",
  "code": null,
  "options": [
    "Thread is a class; Runnable is a functional interface",
    "Runnable is a class; Thread is a functional interface",
    "They are the same",
    "Runnable creates Threads"
  ],
  "correctAnswer": 0,
  "explanation": "Thread is a class representing a thread of execution. Runnable is a functional interface representing a task to run. You can extend Thread or implement Runnable, then pass the Runnable to a Thread.",
  "optionExplanations": [
    "Correct. Thread = class; Runnable = functional interface.",
    "Incorrect. It is the reverse.",
    "Incorrect. They are distinct.",
    "Incorrect. Runnable does not create Threads on its own."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-004",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 4,
  "question": "What are the thread lifecycle states in Java?",
  "code": null,
  "options": [
    "NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED",
    "STARTED, RUNNING, STOPPED, DELETED",
    "INITIAL, ACTIVE, FINALIZED",
    "CREATED, RUNNING, SUSPENDED, TERMINATED"
  ],
  "correctAnswer": 0,
  "explanation": "Java defines six thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED, as defined by Thread.State.",
  "optionExplanations": [
    "Correct. The six states are as listed.",
    "Incorrect. Java uses the six states listed.",
    "Incorrect. Those are not the Java Thread states.",
    "Incorrect. Those are not the Java Thread states."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-005",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 5,
  "question": "What is the main thread?",
  "code": null,
  "options": [
    "The initial thread created by the JVM to execute the main method",
    "The thread with the highest priority",
    "A daemon thread",
    "The thread that handles garbage collection"
  ],
  "correctAnswer": 0,
  "explanation": "The main thread is the initial thread created by the JVM to execute the public static void main method. It is represented by Thread.currentThread() at program start and has the name \"main\".",
  "optionExplanations": [
    "Correct. The main thread runs the main method.",
    "Incorrect. The main thread is not necessarily the highest priority.",
    "Incorrect. The main thread is not inherently a daemon.",
    "Incorrect. GC has its own daemon threads."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-006",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 6,
  "question": "What is the best description of Multithreading checkpoint 6?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-007",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 7,
  "question": "What is the best description of Multithreading checkpoint 7?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-008",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 8,
  "question": "What is the best description of Multithreading checkpoint 8?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-009",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 9,
  "question": "What is the best description of Multithreading checkpoint 9?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-010",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 10,
  "question": "What is the best description of Multithreading checkpoint 10?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-011",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 11,
  "question": "What is the best description of Multithreading checkpoint 11?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-012",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 12,
  "question": "What is the best description of Multithreading checkpoint 12?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-013",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 13,
  "question": "What is the best description of Multithreading checkpoint 13?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-014",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 14,
  "question": "What is the best description of Multithreading checkpoint 14?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-015",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 15,
  "question": "What is the best description of Multithreading checkpoint 15?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-016",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 16,
  "question": "What is the best description of Multithreading checkpoint 16?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-017",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 17,
  "question": "What is the best description of Multithreading checkpoint 17?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-018",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 18,
  "question": "What is the best description of Multithreading checkpoint 18?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-019",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 19,
  "question": "What is the best description of Multithreading checkpoint 19?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-what-020",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 20,
  "question": "What is the best description of Multithreading checkpoint 20?",
  "code": null,
  "options": [
    "The core Java rule for Multithreading is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Multithreading should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
