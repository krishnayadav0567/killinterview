/* Java Fundamentals — why learning questions */
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-001",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 1,
  "question": "Why do we need Java?",
  "answer": "We need Java because it offers platform independence, automatic memory management, strong typing, a rich standard library, and a mature ecosystem for enterprise and mobile development.",
  "explanation": "The JVM lets bytecode run anywhere. Garbage collection reduces memory leaks. Strong typing catches errors at compile time. The ecosystem provides libraries for nearly every domain.",
  "codeExample": "// Same .jar runs on Linux servers and Windows workstations.",
  "realWorldUseCase": "Building cross-platform backend services that must run on varied infrastructure.",
  "commonMistakes": "Assuming Java is only for web applets or legacy systems.",
  "interviewReadyAnswer": "Java is needed for portable, secure, maintainable applications with a vast ecosystem."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-002",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 2,
  "question": "Why is Java platform independent?",
  "answer": "Java is platform independent because source compiles to bytecode, not machine code. The JVM on each platform translates bytecode into native instructions at runtime.",
  "explanation": "The compiler targets the JVM, not a specific CPU or OS. As long as a JVM exists for the platform, the same bytecode runs unchanged.",
  "codeExample": "javac Hello.java → Hello.class (same file runs anywhere with a JVM)",
  "realWorldUseCase": "Shipping one build artifact to development, testing, and production environments.",
  "commonMistakes": "Confusing platform independence with source being portable without compilation.",
  "interviewReadyAnswer": "Bytecode plus a platform-specific JVM makes Java run anywhere."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-003",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 3,
  "question": "Why is Java called object-oriented?",
  "answer": "Java is called object-oriented because it organizes code around classes and objects and supports encapsulation, inheritance, and polymorphism.",
  "explanation": "Nearly everything in Java is inside a class. Objects model state and behavior together, and inheritance/polymorphism enable reuse and flexibility.",
  "codeExample": "class Car extends Vehicle { void drive() { ... } }",
  "realWorldUseCase": "Modeling business domains such as accounts, products, and orders as objects.",
  "commonMistakes": "Believing Java is pure object-oriented; primitives are not objects.",
  "interviewReadyAnswer": "Java organizes code around classes, objects, and the core OOP principles."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-004",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 4,
  "question": "Why interview checkpoint 4: what should you explain about Java Fundamentals?",
  "answer": "Java Fundamentals is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Java Fundamentals should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Java Fundamentals with a small, focused example.",
  "realWorldUseCase": "Use Java Fundamentals when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Java Fundamentals.",
  "interviewReadyAnswer": "Java Fundamentals should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-005",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 5,
  "question": "Why is Java not purely object-oriented?",
  "answer": "Java is not purely object-oriented because it supports primitive types (int, char, boolean, etc.) that are not objects, and it allows static members accessed without objects.",
  "explanation": "Pure OOP languages treat everything as an object. Java retains primitives for performance and uses static members for utility methods and entry points.",
  "codeExample": "int x = 5; // x is a primitive, not an object",
  "realWorldUseCase": "Using primitive int for performance-critical counters instead of Integer objects.",
  "commonMistakes": "Assuming every value in Java is an object.",
  "interviewReadyAnswer": "Primitives and static members mean Java is mostly but not purely object-oriented."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-006",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 6,
  "question": "Why do we need constructors?",
  "answer": "We need constructors to guarantee objects start in a valid, initialized state. Without them, fields could hold arbitrary default values and objects would be unsafe to use.",
  "explanation": "Constructors run automatically at object creation, letting you set required fields and validate input before the object is exposed.",
  "codeExample": "public Account(String owner) { this.owner = owner; }",
  "realWorldUseCase": "Ensuring every bank account has an owner before it can accept deposits.",
  "commonMistakes": "Creating objects without setting required fields, leaving them in an invalid state.",
  "interviewReadyAnswer": "Constructors ensure objects are properly initialized when created."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-007",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 7,
  "question": "Why use the this keyword?",
  "answer": "We use this to refer to the current object and to disambiguate instance fields from parameters or locals that share names.",
  "explanation": "Without this, the compiler cannot tell whether name refers to the field or the constructor parameter, causing bugs or confusion.",
  "codeExample": "User(String name) { this.name = name; }",
  "realWorldUseCase": "Writing constructors and setters where parameter names match field names for readability.",
  "commonMistakes": "Using this inside static methods where no instance exists.",
  "interviewReadyAnswer": "this clarifies that you mean the current object's field, not a parameter."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-008",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 8,
  "question": "Why use the static keyword?",
  "answer": "We use static for members that belong to the class rather than instances, such as utility methods, constants, and factory methods.",
  "explanation": "Static members save memory because there is one copy shared by all objects, and they can be called without instantiation.",
  "codeExample": "Math.max(2, 3) // no new Math() needed",
  "realWorldUseCase": "Providing stateless helper functions that any class can call.",
  "commonMistakes": "Using static for state that should be per-object, causing shared-state bugs.",
  "interviewReadyAnswer": "static is for class-level behavior and shared state accessible without instances."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-009",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 9,
  "question": "Why interview checkpoint 9: what should you explain about Java Fundamentals?",
  "answer": "Java Fundamentals is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Java Fundamentals should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Java Fundamentals with a small, focused example.",
  "realWorldUseCase": "Use Java Fundamentals when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Java Fundamentals.",
  "interviewReadyAnswer": "Java Fundamentals should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-010",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 10,
  "question": "Why use packages?",
  "answer": "We use packages to organize related classes, avoid name collisions, and control access through package-private visibility.",
  "explanation": "Packages create namespaces so two teams can define a class named Invoice without conflict. They also support access control and maintainability.",
  "codeExample": "package com.company.billing;\npackage com.company.shipping;",
  "realWorldUseCase": "Separating billing, shipping, and inventory classes into distinct namespaces.",
  "commonMistakes": "Placing all classes in the default package, losing namespace and access benefits.",
  "interviewReadyAnswer": "Packages organize code into namespaces and help manage access and name collisions."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-011",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 11,
  "question": "Why use method overloading?",
  "answer": "We use method overloading to provide multiple ways to call the same logical operation with different inputs, improving API readability and flexibility.",
  "explanation": "Overloading lets callers use the most convenient argument types without converting them first. The compiler chooses the matching overload at compile time.",
  "codeExample": "void print(String msg) { ... }\nvoid print(int code) { ... }",
  "realWorldUseCase": "Offering print(String) and print(int) so callers do not have to convert values manually.",
  "commonMistakes": "Thinking that changing only the return type creates an overload.",
  "interviewReadyAnswer": "Overloading gives callers flexible, type-specific entry points for one logical operation."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-012",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 12,
  "question": "Why use method overriding?",
  "answer": "We use overriding to let subclasses specialize behavior inherited from a superclass while keeping a common interface.",
  "explanation": "Overriding enables polymorphism: a superclass reference can call subclass-specific behavior at runtime based on the actual object type.",
  "codeExample": "class Animal { void speak() { ... } }\nclass Dog extends Animal { void speak() { ... } }",
  "realWorldUseCase": "Letting different shapes implement draw() differently through a Shape reference.",
  "commonMistakes": "Accidentally overloading by changing parameters instead of overriding.",
  "interviewReadyAnswer": "Overriding lets subclasses specialize inherited behavior polymorphically."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-013",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 13,
  "question": "Why use access modifiers?",
  "answer": "We use access modifiers to hide implementation details and expose only a safe public API, protecting class invariants from misuse.",
  "explanation": "Restricting visibility lets you change internal code without breaking external callers and prevents invalid states from outside.",
  "codeExample": "private int balance; public double getBalance() { ... }",
  "realWorldUseCase": "Protecting a bank account balance while exposing controlled deposit/withdrawal methods.",
  "commonMistakes": "Making everything public and losing the ability to enforce invariants.",
  "interviewReadyAnswer": "Access modifiers encapsulate internals and expose only what callers should use."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-014",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 14,
  "question": "Why interview checkpoint 14: what should you explain about Java Fundamentals?",
  "answer": "Java Fundamentals is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Java Fundamentals should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Java Fundamentals with a small, focused example.",
  "realWorldUseCase": "Use Java Fundamentals when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Java Fundamentals.",
  "interviewReadyAnswer": "Java Fundamentals should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-015",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 15,
  "question": "Why use wrapper classes?",
  "answer": "We use wrapper classes to treat primitive values as objects so they can be stored in collections, used with generics, and passed to APIs expecting Objects.",
  "explanation": "Collections such as ArrayList store objects, not primitives. Wrappers also provide utility methods such as parseInt and toString.",
  "codeExample": "List<Integer> list = new ArrayList<>();\nlist.add(5);",
  "realWorldUseCase": "Storing numeric settings in a collection or generic data structure.",
  "commonMistakes": "Assuming wrappers and primitives are interchangeable with == comparisons.",
  "interviewReadyAnswer": "Wrappers let primitives participate in object-oriented APIs and collections."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-016",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 16,
  "question": "Why use autoboxing?",
  "answer": "We use autoboxing to let the compiler automatically convert primitives to wrappers when objects are needed, reducing boilerplate when working with collections and generics.",
  "explanation": "The compiler inserts Integer.valueOf() or similar calls behind the scenes. It is convenient but can create objects and throw NullPointerException if unboxing null.",
  "codeExample": "List<Integer> list = new ArrayList<>();\nlist.add(5); // autoboxed",
  "realWorldUseCase": "Adding primitive values to a generic list without manually wrapping each one.",
  "commonMistakes": "Assuming autoboxing is cost-free in tight loops, where it can create many objects.",
  "interviewReadyAnswer": "Autoboxing reduces boilerplate by auto-converting primitives to wrappers where objects are expected."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-017",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 17,
  "question": "Why use enums?",
  "answer": "We use enums to represent a fixed set of constants with type safety, preventing invalid values and making code self-documenting.",
  "explanation": "Enum constants are instances, can hold fields and methods, and are comparable and serializable. They are better than int or String constants for fixed choices.",
  "codeExample": "public enum Status { NEW, SHIPPED, DELIVERED }",
  "realWorldUseCase": "Modeling order status or transaction types where only specific values are valid.",
  "commonMistakes": "Using int constants that allow meaningless values such as -1 or 999.",
  "interviewReadyAnswer": "Enums give type-safe, self-documenting fixed sets of constants."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-018",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 18,
  "question": "Why use the instanceof operator?",
  "answer": "We use instanceof to check an object's type before casting, avoiding ClassCastException and enabling safe downcasting.",
  "explanation": "It returns false for null, so it is a safe guard. Pattern matching in newer Java versions combines the check and cast concisely.",
  "codeExample": "if (obj instanceof String s) { System.out.println(s.length()); }",
  "realWorldUseCase": "Safely handling an Object received from a generic API or collection.",
  "commonMistakes": "Applying instanceof to primitive types, which is not allowed.",
  "interviewReadyAnswer": "instanceof safely checks an object's type before casting."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-019",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 19,
  "question": "Why interview checkpoint 19: what should you explain about Java Fundamentals?",
  "answer": "Java Fundamentals is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Java Fundamentals should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Java Fundamentals with a small, focused example.",
  "realWorldUseCase": "Use Java Fundamentals when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Java Fundamentals.",
  "interviewReadyAnswer": "Java Fundamentals should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-020",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 20,
  "question": "Why use exception handling?",
  "answer": "We use exception handling to separate normal program logic from error handling and to prevent crashes by letting the program respond to problems gracefully.",
  "explanation": "Exceptions propagate up the call stack until caught, giving you a central place to recover, log, or fail safely instead of terminating abruptly.",
  "codeExample": "try { readFile(); } catch (IOException e) { log(e); }",
  "realWorldUseCase": "Handling missing files or network failures without bringing down the whole service.",
  "commonMistakes": "Swallowing exceptions with empty catch blocks and hiding real problems.",
  "interviewReadyAnswer": "Exception handling isolates errors and lets programs recover or fail gracefully."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-021",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 21,
  "question": "Why use collections?",
  "answer": "We use collections to store, retrieve, and manipulate groups of objects efficiently without managing raw arrays or linked structures by hand.",
  "explanation": "The Collections Framework provides ready-made lists, sets, maps, and queues with documented performance, so you choose the right structure for access patterns.",
  "codeExample": "List<String> names = new ArrayList<>();\nnames.add(\"Ada\");",
  "realWorldUseCase": "Maintaining a dynamic list of users that grows and shrinks as people join or leave.",
  "commonMistakes": "Using a List when set uniqueness or map lookups would be more appropriate.",
  "interviewReadyAnswer": "Collections provide efficient, reusable data structures for groups of objects."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-022",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 22,
  "question": "Why use generics?",
  "answer": "We use generics to enforce type safety at compile time and avoid ClassCastException when retrieving elements from collections.",
  "explanation": "Generics let you write one class or method that works with different types while the compiler checks type correctness. Type erasure removes generic info at runtime for compatibility.",
  "codeExample": "List<String> names = new ArrayList<>();\nString first = names.get(0); // no cast",
  "realWorldUseCase": "Creating a type-safe list of orders so every retrieval is already a String.",
  "commonMistakes": "Using raw types such as List without a type parameter, losing compile-time checks.",
  "interviewReadyAnswer": "Generics catch type mistakes at compile time and eliminate manual casts."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-023",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 23,
  "question": "Why use lambda expressions?",
  "answer": "We use lambdas to express behavior concisely, especially for functional interfaces and collection operations such as filtering and sorting.",
  "explanation": "Lambdas reduce boilerplate compared to anonymous classes and enable functional-style pipelines with streams.",
  "codeExample": "list.sort((a, b) -> a.compareTo(b));",
  "realWorldUseCase": "Sorting a list of names in one readable line instead of a full Comparator class.",
  "commonMistakes": "Using lambdas where a named, reusable method is clearer.",
  "interviewReadyAnswer": "Lambdas provide concise behavior for functional interfaces and stream pipelines."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-024",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 24,
  "question": "Why interview checkpoint 24: what should you explain about Java Fundamentals?",
  "answer": "Java Fundamentals is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Java Fundamentals should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Java Fundamentals with a small, focused example.",
  "realWorldUseCase": "Use Java Fundamentals when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Java Fundamentals.",
  "interviewReadyAnswer": "Java Fundamentals should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-025",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 25,
  "question": "Why use Optional?",
  "answer": "We use Optional to explicitly model the presence or absence of a value, reducing NullPointerException and forcing callers to handle the empty case.",
  "explanation": "Optional is a container that either holds a value or is empty. It encourages methods such as orElse, ifPresent, and map instead of returning null.",
  "codeExample": "Optional<String> name = Optional.ofNullable(user.getName());",
  "realWorldUseCase": "Returning a user's middle name that may not exist, so callers handle absence explicitly.",
  "commonMistakes": "Using Optional as a field type or returning Optional<Optional>, which are anti-patterns.",
  "interviewReadyAnswer": "Optional makes absence explicit and helps prevent null pointer bugs."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-026",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 26,
  "question": "Why use multithreading?",
  "answer": "We use multithreading to perform multiple tasks concurrently, improving responsiveness and CPU utilization on multi-core processors.",
  "explanation": "Threads let an application handle UI events while downloading data, or process many requests at once, without blocking the whole program.",
  "codeExample": "Thread t = new Thread(() -> process());\nt.start();",
  "realWorldUseCase": "A web server handling many client requests simultaneously using separate threads.",
  "commonMistakes": "Assuming multithreading always makes programs faster; contention can slow them down.",
  "interviewReadyAnswer": "Multithreading improves responsiveness and throughput by running tasks concurrently."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-027",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 27,
  "question": "Why use synchronization?",
  "answer": "We use synchronization to prevent multiple threads from accessing shared mutable state at the same time, avoiding race conditions and inconsistent data.",
  "explanation": "Synchronization uses monitors/locks so only one thread executes a synchronized block or method for a given object at once.",
  "codeExample": "synchronized (lock) { balance += amount; }",
  "realWorldUseCase": "Protecting a bank balance during concurrent deposits and withdrawals.",
  "commonMistakes": "Over-synchronizing everything, which kills performance and can cause deadlocks.",
  "interviewReadyAnswer": "Synchronization guards shared mutable state so only one thread accesses it at a time."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-028",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 28,
  "question": "Why use volatile?",
  "answer": "We use volatile to guarantee visibility of variable updates across threads and prevent instruction reordering, without the cost of locks.",
  "explanation": "A volatile write happens-before subsequent volatile reads, so other threads see the latest value. It does not make compound actions atomic.",
  "codeExample": "volatile boolean running = true;",
  "realWorldUseCase": "Using a flag to signal a background thread to stop.",
  "commonMistakes": "Believing volatile makes count++ atomic; it does not.",
  "interviewReadyAnswer": "volatile ensures cross-thread visibility and ordering, not atomicity."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-029",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 29,
  "question": "Why use ExecutorService?",
  "answer": "We use ExecutorService to manage thread pools, separating task submission from thread creation and lifecycle management.",
  "explanation": "It reuses threads, queues tasks, supports shutdown, and provides Futures for results. It is preferable to creating raw threads for every task.",
  "codeExample": "ExecutorService pool = Executors.newFixedThreadPool(4);\npool.submit(task);",
  "realWorldUseCase": "Running many short-lived tasks without creating a new OS thread per task.",
  "commonMistakes": "Forgetting to shut down the executor, keeping the JVM alive.",
  "interviewReadyAnswer": "ExecutorService manages reusable threads and task submission cleanly."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-why-030",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "why",
  "sectionOrder": 30,
  "question": "Why use design patterns?",
  "answer": "We use design patterns to apply proven, reusable solutions to common design problems, making code easier to understand, extend, and maintain.",
  "explanation": "Patterns give teams a shared vocabulary and capture trade-offs so you do not reinvent solutions for creation, structure, or behavior.",
  "codeExample": "Singleton, Factory, Strategy, Observer.",
  "realWorldUseCase": "Choosing Strategy to swap pricing algorithms at runtime without changing clients.",
  "commonMistakes": "Applying patterns where simpler code would suffice, adding unnecessary complexity.",
  "interviewReadyAnswer": "Design patterns are proven templates for solving recurring design problems."
});
