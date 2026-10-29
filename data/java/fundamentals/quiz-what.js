/* Java Fundamentals — what quiz questions */
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-001",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 1,
  "question": "What is the primary purpose of the Java Virtual Machine (JVM)?",
  "code": null,
  "options": [
    "To compile Java source code into bytecode",
    "To execute Java bytecode on any platform",
    "To write Java source code",
    "To manage database connections"
  ],
  "correctAnswer": 1,
  "explanation": "The JVM executes Java bytecode. The compiler (javac) compiles source to bytecode, not the JVM.",
  "optionExplanations": [
    "Incorrect. javac compiles source code; the JVM executes bytecode.",
    "Correct. The JVM runs bytecode on any platform with a compatible JVM.",
    "Incorrect. Source code is written by developers, not by the JVM.",
    "Incorrect. Database connections are managed by application code, not the JVM."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-002",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 2,
  "question": "Which of the following is the correct main method signature?",
  "code": null,
  "options": [
    "public void main(String[] args)",
    "public static void main(String[] args)",
    "static public void main(String args[])",
    "public static int main(String[] args)"
  ],
  "correctAnswer": 1,
  "explanation": "The JVM requires the exact signature: public static void main(String[] args). Order of public/static doesn't matter, but void return type is required.",
  "optionExplanations": [
    "Incorrect. Missing static modifier.",
    "Correct. This is the exact signature the JVM looks for.",
    "Incorrect. While this compiles, the conventional and expected order is public static.",
    "Incorrect. main must return void, not int."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-003",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 3,
  "question": "What is the best description of Java Fundamentals checkpoint 3?",
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
  "id": "java-fundamentals-quiz-what-004",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 4,
  "question": "Which access modifier makes a member visible only within its own class?",
  "code": null,
  "options": [
    "public",
    "protected",
    "private",
    "default"
  ],
  "correctAnswer": 2,
  "explanation": "private restricts access to the declaring class only. default/package-private allows same-package access.",
  "optionExplanations": [
    "Incorrect. public is visible everywhere.",
    "Incorrect. protected is visible to subclasses and same package.",
    "Correct. private is visible only within the declaring class.",
    "Incorrect. default/package-private is visible within the same package."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-005",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 5,
  "question": "What is the result of comparing two String objects with == ?",
  "code": null,
  "options": [
    "Compares their character content",
    "Compares their object references",
    "Always returns true for equal content",
    "Throws an exception"
  ],
  "correctAnswer": 1,
  "explanation": "For objects, == compares references (memory addresses), not content. Use .equals() to compare string content.",
  "optionExplanations": [
    "Incorrect. .equals() compares content, not ==.",
    "Correct. == compares object references.",
    "Incorrect. == returns true only if both refer to the same object.",
    "Incorrect. == does not throw for String comparison."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-006",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 6,
  "question": "What is a wrapper class in Java?",
  "code": null,
  "options": [
    "A class that wraps primitive values in objects",
    "A class that wraps methods in interfaces",
    "A class that wraps exceptions in try-catch",
    "A class that wraps threads in pools"
  ],
  "correctAnswer": 0,
  "explanation": "Wrapper classes like Integer, Boolean, Character wrap primitive types into objects so they can be used in collections and generics.",
  "optionExplanations": [
    "Correct. Wrapper classes wrap primitives in objects.",
    "Incorrect. This describes an adapter or decorator pattern, not wrapper classes.",
    "Incorrect. This describes exception handling, not wrapper classes.",
    "Incorrect. This describes thread pools, not wrapper classes."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-007",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 7,
  "question": "What is the default value of an int instance variable?",
  "code": null,
  "options": [
    "0",
    "1",
    "null",
    "undefined"
  ],
  "correctAnswer": 0,
  "explanation": "Instance variables of type int are automatically initialized to 0 if no explicit value is assigned.",
  "optionExplanations": [
    "Correct. int instance variables default to 0.",
    "Incorrect. The default is 0, not 1.",
    "Incorrect. null is for reference types, not primitives.",
    "Incorrect. Java does not have undefined for variables."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-008",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 8,
  "question": "What is the best description of Java Fundamentals checkpoint 8?",
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
  "id": "java-fundamentals-quiz-what-009",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 9,
  "question": "What is the string pool?",
  "code": null,
  "options": [
    "A collection of all String objects in memory",
    "A memory area storing unique string literals for reuse",
    "A pool of StringBuilder objects",
    "A thread-safe String cache"
  ],
  "correctAnswer": 1,
  "explanation": "The string pool stores unique string literals so identical literals share one instance, saving memory.",
  "optionExplanations": [
    "Incorrect. It stores only interned literals, not every String object.",
    "Correct. It stores unique string literals for reuse.",
    "Incorrect. StringBuilder is unrelated to the string pool.",
    "Incorrect. It is not inherently thread-safe; it's a JVM memory area."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-010",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 10,
  "question": "What does autoboxing convert?",
  "code": null,
  "options": [
    "Primitive to wrapper object",
    "Wrapper object to primitive",
    "String to Integer",
    "Integer to String"
  ],
  "correctAnswer": 0,
  "explanation": "Autoboxing is the automatic conversion of a primitive (e.g., int) to its wrapper class (e.g., Integer).",
  "optionExplanations": [
    "Correct. Autoboxing converts primitives to wrappers.",
    "Incorrect. Wrapper to primitive is unboxing.",
    "Incorrect. String to Integer is parsing, not autoboxing.",
    "Incorrect. Integer to String is conversion, not autoboxing."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-011",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 11,
  "question": "What is an enum in Java?",
  "code": null,
  "options": [
    "A fixed set of constants, each an instance of the enum type",
    "A class that can only have static methods",
    "A loop structure for iterating collections",
    "A type of exception"
  ],
  "correctAnswer": 0,
  "explanation": "An enum defines a fixed set of constants. Each constant is an instance of the enum type and can have fields and methods.",
  "optionExplanations": [
    "Correct. Enums are type-safe fixed sets of constants.",
    "Incorrect. Enums are not restricted to static methods.",
    "Incorrect. For-each loops iterate collections; enums define constants.",
    "Incorrect. Enums are not exceptions."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-012",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 12,
  "question": "What does the instanceof operator return?",
  "code": null,
  "options": [
    "An object of the specified type",
    "A boolean indicating type membership",
    "The class name as a string",
    "A casted reference"
  ],
  "correctAnswer": 1,
  "explanation": "instanceof returns true if the object is an instance of the specified type, false otherwise (including for null).",
  "optionExplanations": [
    "Incorrect. instanceof does not create or return objects.",
    "Correct. instanceof returns a boolean.",
    "Incorrect. instanceof does not return class names.",
    "Incorrect. instanceof does not cast; it only checks."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-013",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 13,
  "question": "What is the best description of Java Fundamentals checkpoint 13?",
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
  "id": "java-fundamentals-quiz-what-014",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 14,
  "question": "What is a package in Java?",
  "code": null,
  "options": [
    "A compressed archive of Java classes",
    "A namespace grouping related classes and interfaces",
    "A JAR file containing resources",
    "A collection of import statements"
  ],
  "correctAnswer": 1,
  "explanation": "A package is a namespace that groups related classes, prevents name clashes, and controls access.",
  "optionExplanations": [
    "Incorrect. JAR files are archives; packages are namespaces.",
    "Correct. Packages group related classes into namespaces.",
    "Incorrect. JAR files contain compiled classes; packages organize source.",
    "Incorrect. import statements reference packages; they are not packages."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-015",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 15,
  "question": "What is the difference between == and .equals() for String?",
  "code": null,
  "options": [
    "== compares content; .equals() compares references",
    "== compares references; .equals() compares content",
    "Both compare content identically",
    "Both compare references identically"
  ],
  "correctAnswer": 1,
  "explanation": "For objects, == compares references. .equals() compares the actual character content of strings.",
  "optionExplanations": [
    "Incorrect. This is backwards; == compares references.",
    "Correct. == compares references; .equals() compares content.",
    "Incorrect. They behave differently for objects.",
    "Incorrect. .equals() compares content, not references."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-016",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 16,
  "question": "What is a constructor?",
  "code": null,
  "options": [
    "A method with the same name as the class and no return type",
    "A static method that creates objects",
    "A method that destroys objects",
    "A method with void return type"
  ],
  "correctAnswer": 0,
  "explanation": "A constructor has the same name as its class, no return type (not even void), and runs automatically when new is used.",
  "optionExplanations": [
    "Correct. Same name as class, no return type.",
    "Incorrect. Constructors are not static factory methods.",
    "Incorrect. Finalizers (deprecated) handle cleanup, not constructors.",
    "Incorrect. Constructors have no return type at all."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-017",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 17,
  "question": "What is the this keyword?",
  "code": null,
  "options": [
    "A reference to the current object instance",
    "A reference to the parent class",
    "A keyword for creating threads",
    "A keyword for defining constants"
  ],
  "correctAnswer": 0,
  "explanation": "this refers to the current object instance and disambiguates fields from parameters with the same name.",
  "optionExplanations": [
    "Correct. this refers to the current object instance.",
    "Incorrect. super refers to the parent class.",
    "Incorrect. Thread is used for creating threads.",
    "Incorrect. final is used for constants/prevention."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-018",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 18,
  "question": "What is the super keyword?",
  "code": null,
  "options": [
    "A reference to the parent class object",
    "A reference to the current object instance",
    "A keyword for static methods",
    "A keyword for interfaces"
  ],
  "correctAnswer": 0,
  "explanation": "super refers to the parent class object and is used to call parent methods or constructors.",
  "optionExplanations": [
    "Correct. super refers to the parent class object.",
    "Incorrect. this refers to the current object instance.",
    "Incorrect. static is a modifier, not super.",
    "Incorrect. interface is a keyword, but super is not for interfaces."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-019",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 19,
  "question": "What are generics used for?",
  "code": null,
  "options": [
    "Enforcing type safety at compile time for collections",
    "Making code run faster at runtime",
    "Converting primitives to objects automatically",
    "Creating threads"
  ],
  "correctAnswer": 0,
  "explanation": "Generics provide compile-time type safety for collections and methods, eliminating the need for casts and preventing ClassCastException.",
  "optionExplanations": [
    "Correct. Generics enforce type safety at compile time.",
    "Incorrect. Type erasure means generics don't affect runtime speed.",
    "Incorrect. Autoboxing converts primitives to objects.",
    "Incorrect. Threads are created with Thread or ExecutorService."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-what-020",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 20,
  "question": "What is an immutable object?",
  "code": null,
  "options": [
    "An object whose state cannot change after creation",
    "An object that cannot be serialized",
    "An object that cannot be cloned",
    "An object that cannot be garbage collected"
  ],
  "correctAnswer": 0,
  "explanation": "An immutable object's state cannot be modified after it is created. String is a classic example.",
  "optionExplanations": [
    "Correct. Immutable objects cannot change after creation.",
    "Incorrect. Serialization is unrelated to immutability.",
    "Incorrect. Cloning is unrelated to immutability.",
    "Incorrect. Immutable objects can still be garbage collected."
  ]
});
