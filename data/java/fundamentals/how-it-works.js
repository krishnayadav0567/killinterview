/* Java Fundamentals — how learning questions */
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-001",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 1,
  "question": "How does Java compile and run a program?",
  "answer": "javac compiles .java source into .class bytecode. The JVM then loads the class, verifies it, allocates memory, and executes main() via the interpreter or JIT compiler.",
  "explanation": "Compile: javac Hello.java. Run: java Hello. The JVM starts the main thread and invokes public static void main(String[] args).",
  "codeExample": "javac Hello.java\njava Hello",
  "realWorldUseCase": "Building a .jar from bytecode that any JVM can run.",
  "commonMistakes": "Thinking java compiles source; javac compiles, java runs.",
  "interviewReadyAnswer": "javac produces bytecode and the JVM executes it."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-002",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 2,
  "question": "How does the JVM execute bytecode?",
  "answer": "The JVM loads bytecode, verifies it for safety, then runs it either by interpreting instructions or by JIT-compiling hot methods to native machine code.",
  "explanation": "The interpreter starts quickly; the JIT compiler profiles frequently executed code and compiles it to optimized native code for better speed.",
  "codeExample": "javac emits bytecode; JVM interprets or JIT-compiles to native instructions.",
  "realWorldUseCase": "Balancing fast startup with peak performance in long-running servers.",
  "commonMistakes": "Assuming the JVM always interprets; modern JVMs JIT-compile hot code.",
  "interviewReadyAnswer": "The JVM verifies bytecode and executes it via interpretation or JIT compilation."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-003",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 3,
  "question": "How does garbage collection work?",
  "answer": "The garbage collector tracks object references and reclaims memory from objects no longer reachable, running automatically without programmer intervention.",
  "explanation": "Modern collectors divide the heap into generations. Young objects are collected frequently; older objects survive to older generations and are collected less often.",
  "codeExample": "String s = new String(\"temp\");\ns = null; // object becomes eligible for GC",
  "realWorldUseCase": "Freeing memory from short-lived request objects automatically in a web server.",
  "commonMistakes": "Calling System.gc() and expecting immediate collection; it is only a hint.",
  "interviewReadyAnswer": "GC reclaims memory from unreachable objects automatically."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-004",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 4,
  "question": "How interview checkpoint 4: what should you explain about Java Fundamentals?",
  "answer": "Java Fundamentals is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Java Fundamentals should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Java Fundamentals with a small, focused example.",
  "realWorldUseCase": "Use Java Fundamentals when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Java Fundamentals.",
  "interviewReadyAnswer": "Java Fundamentals should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-005",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 5,
  "question": "How does method overriding work internally?",
  "answer": "Overriding uses dynamic method dispatch: the JVM looks at the actual runtime object type, not the reference type, to decide which method body to execute.",
  "explanation": "The JVM uses a virtual method table (vtable) to find the overridden method at runtime. The reference type determines access; the object type determines which runs.",
  "codeExample": "Animal a = new Dog();\na.speak(); // runs Dog's speak",
  "realWorldUseCase": "Calling draw() on a Shape reference that points to a Circle or Rectangle.",
  "commonMistakes": "Confusing overriding with overloading when signatures differ.",
  "interviewReadyAnswer": "Overriding is resolved at runtime using the actual object's type."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-006",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 6,
  "question": "How does the this reference work internally?",
  "answer": "this is an implicit parameter passed to instance methods, pointing to the object on which the method was invoked. The compiler resolves this.field to the object's field.",
  "explanation": "When you call obj.method(), the JVM pushes obj as the hidden this argument so the method knows which instance's fields to access.",
  "codeExample": "this.name = name; // assigns the field of the current object",
  "realWorldUseCase": "Distinguishing the object's field from a constructor parameter.",
  "commonMistakes": "Using this in static methods, where no implicit object argument exists.",
  "interviewReadyAnswer": "this is an implicit reference to the current object instance."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-007",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 7,
  "question": "How does static binding work?",
  "answer": "Static binding resolves method calls at compile time based on the reference type. It applies to static methods, private methods, final methods, and constructors.",
  "explanation": "Because the compiler knows the exact type, it can directly call the method without runtime lookup. Overriding does not apply to statically bound methods.",
  "codeExample": "ClassName.staticMethod(); // resolved at compile time",
  "realWorldUseCase": "Calling a utility method on the class name rather than an object.",
  "commonMistakes": "Assuming static methods can be overridden like instance methods.",
  "interviewReadyAnswer": "Static binding fixes the method call at compile time using the reference type."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-008",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 8,
  "question": "How does dynamic binding work?",
  "answer": "Dynamic binding resolves overridden instance methods at runtime based on the actual object type. The JVM checks the object's class and its parents for the most specific override.",
  "explanation": "This enables polymorphism. Even if a variable is declared as the superclass type, calling an overridden method runs the subclass version.",
  "codeExample": "Shape s = new Circle();\ns.draw(); // runs Circle.draw at runtime",
  "realWorldUseCase": "Rendering a list of mixed shapes through a common Shape interface.",
  "commonMistakes": "Applying dynamic binding to static or private methods, which are not overridable.",
  "interviewReadyAnswer": "Dynamic binding chooses the overridden method at runtime using the actual object type."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-009",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 9,
  "question": "How interview checkpoint 9: what should you explain about Java Fundamentals?",
  "answer": "Java Fundamentals is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Java Fundamentals should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Java Fundamentals with a small, focused example.",
  "realWorldUseCase": "Use Java Fundamentals when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Java Fundamentals.",
  "interviewReadyAnswer": "Java Fundamentals should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-010",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 10,
  "question": "How does the string pool work?",
  "answer": "The string pool stores unique string literals. When code uses a literal, Java checks the pool and reuses the existing instance if present, otherwise adds it.",
  "explanation": "Strings created with new String() are separate heap objects unless you call intern(), which adds them to the pool and returns the canonical reference.",
  "codeExample": "String a = \"hi\"; String b = \"hi\"; // same pooled instance\nString c = new String(\"hi\").intern(); // pooled",
  "realWorldUseCase": "Saving memory when thousands of parts of an app use the same status strings.",
  "commonMistakes": "Assuming all strings, including new String(), are automatically pooled.",
  "interviewReadyAnswer": "The pool reuses string literals and intern() adds dynamically created strings."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-011",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 11,
  "question": "How does the JVM load a class?",
  "answer": "Class loading happens in three steps: loading (reading the .class file), linking (verification, preparation, resolution), and initialization (running static initializers and assignments).",
  "explanation": "The class loader reads the bytecode, verifies it is well-formed, allocates static storage, and then executes the static blocks and field initializers.",
  "codeExample": "java Hello // triggers loading, linking, initializing Hello",
  "realWorldUseCase": "Loading JDBC drivers or service providers dynamically at runtime.",
  "commonMistakes": "Assuming initialization happens immediately when the class file is read.",
  "interviewReadyAnswer": "Class loading is loading, linking, then initialization of static state."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-012",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 12,
  "question": "How does memory divide in the JVM?",
  "answer": "The JVM memory areas include the heap (objects), stack per thread (local variables and calls), method area (class metadata), PC registers, and native method stacks.",
  "explanation": "Each thread has its own stack. The heap is shared across threads and is where garbage collection operates. The method area stores class structures and the constant pool.",
  "codeExample": "new Object() goes on the heap; local int goes on the stack.",
  "realWorldUseCase": "Understanding where objects live when debugging memory or stack overflow errors.",
  "commonMistakes": "Thinking all memory is one shared heap; each thread has its own stack.",
  "interviewReadyAnswer": "JVM memory splits into per-thread stacks and shared heap/method areas."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-013",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 13,
  "question": "How does object creation work in memory?",
  "answer": "new allocates memory on the heap, initializes instance fields to defaults, runs the constructor, and returns a reference stored on the stack or in another object.",
  "explanation": "The JVM may use TLABs (thread-local allocation buffers) for fast allocation. The object header contains metadata such as class pointer and lock info.",
  "codeExample": "Point p = new Point(1, 2); // heap object, reference on stack",
  "realWorldUseCase": "Creating many short-lived objects during request processing.",
  "commonMistakes": "Believing the reference itself lives on the heap; it usually lives on the stack.",
  "interviewReadyAnswer": "new allocates a heap object and returns a reference to it."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-014",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 14,
  "question": "How interview checkpoint 14: what should you explain about Java Fundamentals?",
  "answer": "Java Fundamentals is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Java Fundamentals should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Java Fundamentals with a small, focused example.",
  "realWorldUseCase": "Use Java Fundamentals when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Java Fundamentals.",
  "interviewReadyAnswer": "Java Fundamentals should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-015",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 15,
  "question": "How does access control work at runtime?",
  "answer": "Access modifiers are enforced by the compiler and the JVM. The compiler checks visibility during compilation; the JVM verifies access during reflective or linkage operations.",
  "explanation": "private members are inaccessible outside the class. protected members are accessible to subclasses. The JVM enforces these rules when resolving field or method references.",
  "codeExample": "private int ssn; // cannot be read from another class",
  "realWorldUseCase": "Preventing external code from tampering with internal account state.",
  "commonMistakes": "Assuming private fields are invisible even within the same class.",
  "interviewReadyAnswer": "Access control restricts member visibility at compile time and linkage time."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-016",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 16,
  "question": "How does the finalize method work?",
  "answer": "finalize() is a method on Object that the garbage collector may call before reclaiming an object, giving it a chance to clean up resources. It is deprecated and unreliable.",
  "explanation": "The JVM does not guarantee when or if finalize() runs. You should not depend on it; use try-with-resources or AutoCloseable for deterministic cleanup.",
  "codeExample": "protected void finalize() throws Throwable { // deprecated }",
  "realWorldUseCase": "Legacy code may use finalize to close files, but modern code uses try-with-resources.",
  "commonMistakes": "Relying on finalize for critical resource cleanup.",
  "interviewReadyAnswer": "finalize is deprecated and not guaranteed; use try-with-resources instead."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-017",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 17,
  "question": "How does Java handle pass-by-value?",
  "answer": "Java is strictly pass-by-value. For primitives, the value is copied. For object references, the reference (address) is copied, so both variables point to the same object.",
  "explanation": "You cannot change which object a caller's reference points to, but you can mutate the object's fields through the copied reference.",
  "codeExample": "void update(Point p) { p.x = 99; } // mutates shared object\np = new Point(); // does not affect caller",
  "realWorldUseCase": "Swapping object references inside a method and seeing it does not affect the caller.",
  "commonMistakes": "Believing Java passes objects by reference.",
  "interviewReadyAnswer": "Java passes primitive values and object references by value."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-018",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 18,
  "question": "How does method resolution work for overloaded methods?",
  "answer": "The compiler picks an overload in phases: first without boxing/unboxing or varargs, then with them, then with variable arity. More specific signatures are preferred.",
  "explanation": "If an int argument matches both a long method and an Object method, the compiler chooses the most specific applicable one after applying conversion rules.",
  "codeExample": "print(10) // int, not long or Object",
  "realWorldUseCase": "Choosing between print(int) and print(long) for a literal.",
  "commonMistakes": "Thinking the JVM picks the overload at runtime.",
  "interviewReadyAnswer": "Overload resolution is a compile-time process favoring the most specific signature."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-019",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 19,
  "question": "How interview checkpoint 19: what should you explain about Java Fundamentals?",
  "answer": "Java Fundamentals is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Java Fundamentals should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Java Fundamentals with a small, focused example.",
  "realWorldUseCase": "Use Java Fundamentals when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Java Fundamentals.",
  "interviewReadyAnswer": "Java Fundamentals should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-020",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 20,
  "question": "How does type erasure affect generics?",
  "answer": "Type erasure removes generic type parameters at runtime, replacing them with their bounds or Object, and inserts casts where needed for backward compatibility.",
  "explanation": "List<String> and List<Integer> become the same raw List type at runtime. You cannot use instanceof with List<String> or create T[] directly.",
  "codeExample": "List<String> list = new ArrayList<>(); // String exists only at compile time",
  "realWorldUseCase": "Using generic collections while staying compatible with older Java versions.",
  "commonMistakes": "Trying to write new T() or instanceof List<String>.",
  "interviewReadyAnswer": "Generics are a compile-time feature erased at runtime."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-021",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 21,
  "question": "How does the JVM start a thread?",
  "answer": "The JVM creates a native thread and calls the Thread's run method on that new thread when start() is invoked. It does not run run() on the calling thread.",
  "explanation": "start() registers the thread with the thread scheduler, allocates a stack, and transitions the thread from NEW to RUNNABLE.",
  "codeExample": "Thread t = new Thread(runnable);\nt.start(); // new thread runs run()",
  "realWorldUseCase": "Running a background task while the main thread keeps serving requests.",
  "commonMistakes": "Calling run() directly instead of start(), which runs on the current thread.",
  "interviewReadyAnswer": "start() creates a new thread and schedules run() on it."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-022",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 22,
  "question": "How does synchronization use locks?",
  "answer": "Every Java object has an intrinsic monitor lock. synchronized blocks or methods acquire the lock, run, and release it, even if an exception is thrown.",
  "explanation": "Only one thread can hold a given object's lock at a time. Other threads block until the lock is released, providing mutual exclusion.",
  "codeExample": "synchronized (this) { balance += amount; }",
  "realWorldUseCase": "Protecting a shared counter during concurrent increments.",
  "commonMistakes": "Synchronizing on different objects and expecting mutual exclusion.",
  "interviewReadyAnswer": "Intrinsic locks ensure only one thread executes a synchronized section per object."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-023",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 23,
  "question": "How does volatile establish visibility?",
  "answer": "A volatile write creates a happens-before relationship with subsequent volatile reads of the same variable, so writing threads' updates are visible to reading threads.",
  "explanation": "The compiler and CPU are prevented from reordering volatile accesses with nearby memory operations, but compound actions like count++ remain non-atomic.",
  "codeExample": "volatile boolean stopped = false;",
  "realWorldUseCase": "Signaling a background thread to stop using a shared boolean flag.",
  "commonMistakes": "Believing volatile makes read-modify-write atomic.",
  "interviewReadyAnswer": "volatile guarantees visibility and ordering, not atomicity."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-024",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 24,
  "question": "How interview checkpoint 24: what should you explain about Java Fundamentals?",
  "answer": "Java Fundamentals is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Java Fundamentals should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Java Fundamentals with a small, focused example.",
  "realWorldUseCase": "Use Java Fundamentals when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Java Fundamentals.",
  "interviewReadyAnswer": "Java Fundamentals should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-025",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 25,
  "question": "How does ExecutorService manage threads?",
  "answer": "ExecutorService maintains a pool of worker threads. Tasks are submitted to a queue, and idle workers pull and run them. It handles lifecycle, reuse, and shutdown.",
  "explanation": "Fixed thread pools keep a constant number of threads. Cached pools create threads as needed. Scheduled pools run tasks after delays or periodically.",
  "codeExample": "ExecutorService pool = Executors.newFixedThreadPool(4);\npool.submit(task);",
  "realWorldUseCase": "Reusing four threads to handle many incoming tasks without creating threads per task.",
  "commonMistakes": "Submitting tasks without shutting down the executor, leaking threads.",
  "interviewReadyAnswer": "ExecutorService reuses worker threads from a pool to run submitted tasks."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-026",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 26,
  "question": "How does CompletableFuture work internally?",
  "answer": "CompletableFuture represents an asynchronous result that may not be ready yet. It lets you chain stages that run when the prior stage completes, using a supplied executor.",
  "explanation": "When the future completes, dependent actions (thenApply, thenAccept) are triggered. Exceptional completion triggers exceptionally handlers. It supports non-blocking composition.",
  "codeExample": "CompletableFuture.supplyAsync(() -> compute())\n    .thenApply(r -> r * 2)\n    .thenAccept(System.out::println);",
  "realWorldUseCase": "Fetching data from multiple services and combining results without blocking threads.",
  "commonMistakes": "Ignoring exceptions in async chains, causing silent failures.",
  "interviewReadyAnswer": "CompletableFuture chains dependent async stages non-blockingly."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-027",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 27,
  "question": "How does Optional avoid nulls?",
  "answer": "Optional wraps a value that may or may not exist. Methods like orElse, ifPresent, and map force the caller to handle both present and absent cases explicitly.",
  "explanation": "Instead of returning null and risking NullPointerException, a method returns Optional.empty() when there is no result. The caller decides the default behavior.",
  "codeExample": "Optional<String> name = Optional.ofNullable(user.getName());\nString show = name.orElse(\"(none)\");",
  "realWorldUseCase": "Returning an optional middle name so callers cannot forget to handle absence.",
  "commonMistakes": "Using Optional for fields or returning Optional<Optional>, which are anti-patterns.",
  "interviewReadyAnswer": "Optional makes absence explicit and reduces NullPointerException."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-028",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 28,
  "question": "How does reflection work?",
  "answer": "Reflection lets programs inspect classes, fields, methods, and constructors at runtime and invoke them dynamically through the java.lang.reflect API.",
  "explanation": "The JVM maintains Class objects for every loaded type. Reflection can read private members if accessibility is overridden, but it is slower and breaks encapsulation.",
  "codeExample": "Class<?> cls = Class.forName(\"com.example.User\");\nMethod m = cls.getMethod(\"getName\");",
  "realWorldUseCase": "Building frameworks that serialize objects or invoke methods by name.",
  "commonMistakes": "Using reflection for everyday code where normal calls are faster and safer.",
  "interviewReadyAnswer": "Reflection inspects and invokes types dynamically at runtime."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-029",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 29,
  "question": "How does serialization work?",
  "answer": "Serialization converts an object's state into a byte stream using ObjectOutputStream. Deserialization reconstructs it using ObjectInputStream. Classes must implement Serializable.",
  "explanation": "The process writes class metadata, field values, and handles object graphs via references. transient fields are skipped, and serialVersionUID controls version compatibility.",
  "codeExample": "ObjectOutputStream out = new ObjectOutputStream(file);\nout.writeObject(order);",
  "realWorldUseCase": "Saving game state or sending objects over a network socket.",
  "commonMistakes": "Serializing objects with non-serializable fields and getting NotSerializableException.",
  "interviewReadyAnswer": "Serialization turns object state into bytes for storage or transport."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-how-030",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "how",
  "sectionOrder": 30,
  "question": "How does the class loader hierarchy work?",
  "answer": "Java uses a delegation hierarchy: Bootstrap, Extension, and Application class loaders. A loader first delegates to its parent before attempting to load a class itself.",
  "explanation": "This prevents duplicate loading and ensures core Java classes are loaded by the trusted bootstrap loader. Each loader has its own namespace, so the same class loaded by two loaders is distinct.",
  "codeExample": "AppClassLoader loads application classes; Bootstrap loads rt.java classes.",
  "realWorldUseCase": "Loading different versions of a library in separate class loaders for modular apps.",
  "commonMistakes": "Assuming a child loader cannot see classes loaded by its parent.",
  "interviewReadyAnswer": "Class loaders delegate upward to parents before loading classes themselves."
});
