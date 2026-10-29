/* Java Fundamentals — why quiz questions */
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-001",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 1,
  "question": "Why is Java platform independent?",
  "code": null,
  "options": [
    "Because source code runs on any OS",
    "Because bytecode runs on any JVM",
    "Because it uses an interpreter only",
    "Because it has no dependencies"
  ],
  "correctAnswer": 1,
  "explanation": "Java compiles to bytecode, which runs on any platform with a JVM. The source code itself is not portable without compilation.",
  "optionExplanations": [
    "Incorrect. Source code must be compiled first.",
    "Correct. Bytecode runs on any JVM regardless of OS.",
    "Incorrect. The JVM can JIT-compile, not just interpret.",
    "Incorrect. Java has dependencies such as the JVM and class library."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-002",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 2,
  "question": "Why is the main method static?",
  "code": null,
  "options": [
    "So the JVM can call it without creating an instance",
    "So it can access instance variables directly",
    "So it can be overridden",
    "So it returns a value to the OS"
  ],
  "correctAnswer": 0,
  "explanation": "static methods belong to the class, so the JVM can invoke main() without instantiating the class.",
  "optionExplanations": [
    "Correct. The JVM calls ClassName.main() with no object.",
    "Incorrect. Static methods cannot directly access instance variables.",
    "Incorrect. Static methods cannot be overridden.",
    "Incorrect. main returns void, not a value to the OS."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-003",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 3,
  "question": "Why is the best description of Java Fundamentals checkpoint 3?",
  "code": null,
  "options": [
    "The core Java rule for Java Fundamentals is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Java Fundamentals should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-004",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 4,
  "question": "Why use access modifiers?",
  "code": null,
  "options": [
    "To hide implementation details and expose a safe public API",
    "To make all code run faster",
    "To allow every class to access every member",
    "To eliminate the need for testing"
  ],
  "correctAnswer": 0,
  "explanation": "Access modifiers encapsulate internals and expose only what callers should use, protecting class invariants.",
  "optionExplanations": [
    "Correct. Access modifiers hide internals and expose a safe API.",
    "Incorrect. Access control does not directly affect speed.",
    "Incorrect. Access modifiers restrict, not allow universal, access.",
    "Incorrect. Access control does not eliminate testing."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-005",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 5,
  "question": "Why use constructors?",
  "code": null,
  "options": [
    "To guarantee objects start in a valid initialized state",
    "To destroy objects when they are no longer needed",
    "To make classes run faster",
    "To convert primitives to objects"
  ],
  "correctAnswer": 0,
  "explanation": "Constructors run automatically when new is used, ensuring objects are initialized before they are used.",
  "optionExplanations": [
    "Correct. Constructors ensure objects are properly initialized.",
    "Incorrect. Garbage collection handles object destruction.",
    "Incorrect. Constructors do not affect class speed.",
    "Incorrect. Autoboxing/wrappers convert primitives to objects."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-006",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 6,
  "question": "Why use the this keyword?",
  "code": null,
  "options": [
    "To refer to the current object instance and disambiguate fields from parameters",
    "To create a new object",
    "To call the parent class constructor",
    "To define a constant"
  ],
  "correctAnswer": 0,
  "explanation": "this refers to the current object instance and resolves naming conflicts when parameters shadow fields.",
  "optionExplanations": [
    "Correct. this refers to the current object instance.",
    "Incorrect. new creates objects; this refers to the current one.",
    "Incorrect. super calls parent constructors.",
    "Incorrect. final defines constants/prevention."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-007",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 7,
  "question": "Why is Java not purely object-oriented?",
  "code": null,
  "options": [
    "Because it supports primitive types that are not objects",
    "Because it does not support classes",
    "Because it does not support inheritance",
    "Because it does not support polymorphism"
  ],
  "correctAnswer": 0,
  "explanation": "Java has primitive types (int, char, boolean, etc.) that are not objects, so it is not purely object-oriented.",
  "optionExplanations": [
    "Correct. Primitives are not objects in Java.",
    "Incorrect. Java fully supports classes.",
    "Incorrect. Java fully supports inheritance.",
    "Incorrect. Java fully supports polymorphism."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-008",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 8,
  "question": "Why is the best description of Java Fundamentals checkpoint 8?",
  "code": null,
  "options": [
    "The core Java rule for Java Fundamentals is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Java Fundamentals should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-009",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 9,
  "question": "Why use packages?",
  "code": null,
  "options": [
    "To organize related classes into namespaces and avoid name collisions",
    "To compile code faster",
    "To run code without a JVM",
    "To automatically create objects"
  ],
  "correctAnswer": 0,
  "explanation": "Packages create namespaces so classes with the same name can coexist in different packages.",
  "optionExplanations": [
    "Correct. Packages group classes into namespaces and prevent name collisions.",
    "Incorrect. Packages do not directly affect compile speed.",
    "Incorrect. All Java code needs a JVM to run.",
    "Incorrect. Packages do not create objects."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-010",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 10,
  "question": "Why use method overriding?",
  "code": null,
  "options": [
    "To let subclasses specialize inherited behavior polymorphically",
    "To create multiple methods with the same name in one class",
    "To make methods run faster",
    "To prevent method calls"
  ],
  "correctAnswer": 0,
  "explanation": "Overriding lets subclasses provide specific implementations of inherited methods, enabling polymorphism.",
  "optionExplanations": [
    "Correct. Overriding enables polymorphic specialization.",
    "Incorrect. Same name with different parameters is overloading.",
    "Incorrect. Overriding does not affect speed.",
    "Incorrect. Overriding enables, not prevents, method calls."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-011",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 11,
  "question": "Why use exception handling?",
  "code": null,
  "options": [
    "To separate error handling from normal logic and allow graceful recovery",
    "To make programs run faster",
    "To eliminate all bugs automatically",
    "To compile code without errors"
  ],
  "correctAnswer": 0,
  "explanation": "Exceptions let programs handle errors gracefully instead of crashing, separating error handling from normal flow.",
  "optionExplanations": [
    "Correct. Exception handling isolates errors and enables recovery.",
    "Incorrect. Exception handling has overhead and does not speed up programs.",
    "Incorrect. Exception handling does not eliminate bugs.",
    "Incorrect. Exception handling does not affect compilation."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-012",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 12,
  "question": "Why use collections?",
  "code": null,
  "options": [
    "To store and manipulate groups of objects efficiently",
    "To replace all arrays in every situation",
    "To make objects immutable",
    "To compile code faster"
  ],
  "correctAnswer": 0,
  "explanation": "The Collections Framework provides efficient data structures for groups of objects with documented performance characteristics.",
  "optionExplanations": [
    "Correct. Collections store and manipulate groups of objects efficiently.",
    "Incorrect. Arrays are still appropriate for fixed-size data.",
    "Incorrect. Collections do not make objects immutable.",
    "Incorrect. Collections do not affect compile speed."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-013",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 13,
  "question": "Why is the best description of Java Fundamentals checkpoint 13?",
  "code": null,
  "options": [
    "The core Java rule for Java Fundamentals is applied according to its documented contract",
    "It always bypasses the JVM and compiler",
    "It is unrelated to program behavior",
    "It can never affect performance or correctness"
  ],
  "correctAnswer": 0,
  "explanation": "Java Fundamentals should be understood through its documented Java semantics and practical trade-offs.",
  "optionExplanations": [
    "Correct. This reflects the concept contract and its observable behavior.",
    "Incorrect. Java concepts execute within the language and JVM rules.",
    "Incorrect. The concept affects how code behaves or is designed.",
    "Incorrect. Design and runtime trade-offs can matter."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-014",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 14,
  "question": "Why use lambda expressions?",
  "code": null,
  "options": [
    "To express behavior concisely for functional interfaces",
    "To create classes automatically",
    "To replace all loops in Java",
    "To make variables volatile"
  ],
  "correctAnswer": 0,
  "explanation": "Lambdas reduce boilerplate compared to anonymous classes for functional interfaces and stream operations.",
  "optionExplanations": [
    "Correct. Lambdas express behavior concisely for functional interfaces.",
    "Incorrect. Lambdas do not create classes.",
    "Incorrect. Loops are still appropriate in many situations.",
    "Incorrect. volatile is a modifier, not created by lambdas."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-015",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 15,
  "question": "Why use Optional?",
  "code": null,
  "options": [
    "To explicitly model the presence or absence of a value",
    "To make all variables nullable",
    "To replace exceptions entirely",
    "To create threads"
  ],
  "correctAnswer": 0,
  "explanation": "Optional forces callers to handle the empty case explicitly, reducing NullPointerException.",
  "optionExplanations": [
    "Correct. Optional makes absence explicit.",
    "Incorrect. Optional does not make variables nullable.",
    "Incorrect. Optional complements, not replaces, exceptions.",
    "Incorrect. Threads are created with Thread or ExecutorService."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-016",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 16,
  "question": "Why use the Stream API?",
  "code": null,
  "options": [
    "To process collections declaratively without manual loops",
    "To store data permanently",
    "To replace all collections",
    "To make code compile faster"
  ],
  "correctAnswer": 0,
  "explanation": "Streams express filtering, mapping, and reducing operations declaratively, making data-transformation intent obvious.",
  "optionExplanations": [
    "Correct. Streams process collections declaratively.",
    "Incorrect. Streams do not store data.",
    "Incorrect. Streams work on collections, not replace them.",
    "Incorrect. Streams do not affect compile speed."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-017",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 17,
  "question": "Why use synchronization?",
  "code": null,
  "options": [
    "To prevent multiple threads from corrupting shared mutable state",
    "To make single-threaded code faster",
    "To create objects automatically",
    "To compile code without errors"
  ],
  "correctAnswer": 0,
  "explanation": "Synchronization uses locks to ensure mutual exclusion, preventing race conditions on shared mutable state.",
  "optionExplanations": [
    "Correct. Synchronization prevents concurrent corruption of shared state.",
    "Incorrect. Synchronization adds overhead in single-threaded code.",
    "Incorrect. new creates objects, not synchronization.",
    "Incorrect. Synchronization does not affect compilation."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-018",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 18,
  "question": "Why use volatile?",
  "code": null,
  "options": [
    "To guarantee visibility of variable updates across threads",
    "To make compound operations atomic",
    "To prevent all thread switching",
    "To make objects immutable"
  ],
  "correctAnswer": 0,
  "explanation": "volatile ensures visibility and ordering across threads, but does not make compound operations like count++ atomic.",
  "optionExplanations": [
    "Correct. volatile guarantees cross-thread visibility and ordering.",
    "Incorrect. volatile does not make count++ atomic.",
    "Incorrect. volatile does not prevent thread switching.",
    "Incorrect. volatile does not make objects immutable."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-019",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 19,
  "question": "Why use ExecutorService?",
  "code": null,
  "options": [
    "To manage thread pools and task lifecycle",
    "To create objects automatically",
    "To compile code faster",
    "To replace all loops"
  ],
  "correctAnswer": 0,
  "explanation": "ExecutorService manages thread creation, reuse, queuing, and shutdown, avoiding the cost of raw threads per task.",
  "optionExplanations": [
    "Correct. ExecutorService manages thread pools and task lifecycle.",
    "Incorrect. new creates objects, not ExecutorService.",
    "Incorrect. ExecutorService does not affect compile speed.",
    "Incorrect. Loops are unrelated to ExecutorService."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-why-020",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 20,
  "question": "Why use design patterns?",
  "code": null,
  "options": [
    "To apply proven, reusable solutions to common design problems",
    "To write code faster without thinking",
    "To eliminate all bugs",
    "To run code without a JVM"
  ],
  "correctAnswer": 0,
  "explanation": "Design patterns capture proven solutions to recurring design problems, giving teams a shared vocabulary.",
  "optionExplanations": [
    "Correct. Design patterns are proven templates for recurring problems.",
    "Incorrect. Patterns require thoughtful application.",
    "Incorrect. Patterns do not eliminate all bugs.",
    "Incorrect. All Java code needs a JVM to run."
  ]
});
