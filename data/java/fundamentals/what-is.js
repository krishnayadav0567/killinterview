/* Java Fundamentals — what learning questions */
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-001",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 1,
  "question": "What is Java?",
  "answer": "Java is a high-level, class-based, object-oriented language designed for few implementation dependencies. It compiles to bytecode that runs on the JVM, enabling write-once-run-anywhere (WORA).",
  "explanation": "javac turns .java source into platform-independent .class bytecode. The JVM interprets or JIT-compiles that bytecode into native instructions at runtime, so the same .class file runs on any device with a compatible JVM.",
  "codeExample": "public class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}",
  "realWorldUseCase": "Backend services, Android apps, embedded devices, and enterprise systems where portability matters.",
  "commonMistakes": "Confusing Java with JavaScript; assuming .java files run without compilation.",
  "interviewReadyAnswer": "Java is a portable, object-oriented language whose bytecode runs on the JVM."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-002",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 2,
  "question": "What is the JVM?",
  "answer": "The Java Virtual Machine (JVM) is the runtime engine that executes Java bytecode. It provides memory management, garbage collection, security, and platform abstraction.",
  "explanation": "The JVM loads .class files, verifies them, allocates memory in heap/stack regions, executes instructions via interpreter or JIT compiler, and reclaims unreachable objects with GC.",
  "codeExample": "javac Hello.java → Hello.class\njava Hello          // JVM launches and runs main()",
  "realWorldUseCase": "Running the same compiled application on Windows, Linux, and macOS without recompiling.",
  "commonMistakes": "Believing the JVM compiles Java source; it only runs bytecode produced by javac.",
  "interviewReadyAnswer": "The JVM loads, verifies, and executes Java bytecode while managing memory and security."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-003",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 3,
  "question": "What is the difference between JDK, JRE, and JVM?",
  "answer": "JDK is the development toolkit including compiler and debugger. JRE is the runtime library set needed to run Java programs. JVM is the engine inside the JRE that executes bytecode.",
  "explanation": "JDK = JRE + development tools. JRE = JVM + core class libraries. You need the JDK to compile and the JRE to run compiled code.",
  "codeExample": "javac is inside the JDK, not the JRE.\njava is inside both the JDK and JRE.",
  "realWorldUseCase": "Build machines install the JDK; production containers may ship only the JRE.",
  "commonMistakes": "Thinking all three are the same thing.",
  "interviewReadyAnswer": "JDK is for development, JRE is for running, JVM is the bytecode engine inside both."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-004",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 4,
  "question": "What is Java bytecode?",
  "answer": "Bytecode is the intermediate, platform-independent instruction set produced by the Java compiler, stored in .class files and executed by the JVM.",
  "explanation": "javac translates source into bytecode instructions. The JVM interprets bytecode or JIT-compiles it to native machine code at runtime.",
  "codeExample": "String s = \"hi\"; // compiles to bytecode that loads the string reference and invokes println",
  "realWorldUseCase": "Distributing .jar files with bytecode that run on any JVM regardless of CPU or OS.",
  "commonMistakes": "Assuming bytecode is human-readable source; it is a binary instruction format.",
  "interviewReadyAnswer": "Bytecode is the platform-independent intermediate code the JVM executes or JIT-compiles."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-005",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 5,
  "question": "What is the main method signature in Java?",
  "answer": "The entry point is public static void main(String[] args). It must be public, static, return void, be named main, and accept a String array.",
  "explanation": "The JVM looks for this exact signature. static lets the JVM call it without an instance; void returns nothing; String[] args receives command-line arguments.",
  "codeExample": "public static void main(String[] args) {\n    System.out.println(args.length);\n}",
  "realWorldUseCase": "Running a program from the command line: java MyApp arg1 arg2.",
  "commonMistakes": "Writing Main() with a capital M, forgetting String[] args, or making the method non-static.",
  "interviewReadyAnswer": "The JVM entry point must be public static void main(String[] args)."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-006",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 6,
  "question": "What is a class in Java?",
  "answer": "A class is a blueprint or template that defines the state (fields) and behavior (methods) of objects of that type.",
  "explanation": "Classes define structure but do not occupy object memory themselves. Memory is allocated when you create an instance with new.",
  "codeExample": "public class Account {\n    private double balance;\n    public void deposit(double amount) { balance += amount; }\n}",
  "realWorldUseCase": "Modeling real-world entities such as bank accounts, users, or products in an enterprise application.",
  "commonMistakes": "Confusing the class definition with an object instance.",
  "interviewReadyAnswer": "A class is a blueprint that defines an object's fields and methods."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-007",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 7,
  "question": "What is an object in Java?",
  "answer": "An object is a runtime instance of a class, with its own state stored in fields and behavior exposed through methods.",
  "explanation": "When you use new, the JVM allocates heap memory for the object, initializes fields, runs the constructor, and returns a reference.",
  "codeExample": "Account a = new Account();\na.deposit(100);",
  "realWorldUseCase": "Each user in a system is a separate User object holding that user's data.",
  "commonMistakes": "Thinking a class and an object are interchangeable.",
  "interviewReadyAnswer": "An object is a concrete instance of a class with its own state and behavior."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-008",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 8,
  "question": "What is a constructor in Java?",
  "answer": "A constructor is a special method with the same name as the class that initializes a new object. It has no return type, not even void.",
  "explanation": "Constructors run automatically when new is called. They set initial field values and perform setup. If you do not define one, Java supplies a no-arg default constructor.",
  "codeExample": "public class Point {\n    int x, y;\n    Point(int x, int y) { this.x = x; this.y = y; }\n}",
  "realWorldUseCase": "Ensuring every Order object starts with a valid order ID and timestamp.",
  "commonMistakes": "Adding a return type such as void, which turns it into an ordinary method.",
  "interviewReadyAnswer": "A constructor initializes a new object and has the same name as its class with no return type."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-009",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 9,
  "question": "What is the default constructor?",
  "answer": "The default constructor is a no-argument constructor automatically provided when you do not declare any constructor. It initializes fields to default values.",
  "explanation": "As soon as you declare any constructor, Java stops adding the default one, so you must explicitly add a no-arg constructor if needed.",
  "codeExample": "class Box {} // compiler adds Box() {}",
  "realWorldUseCase": "Quickly creating objects when no custom initialization is required.",
  "commonMistakes": "Assuming the default constructor exists after writing a parameterized constructor.",
  "interviewReadyAnswer": "A no-arg constructor Java adds only when no constructors are declared."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-010",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 10,
  "question": "What is the this keyword in Java?",
  "answer": "this is a reference to the current object instance. It distinguishes instance fields from parameters or local variables with the same name.",
  "explanation": "Use this.field when a parameter shadows a field. this() can also call another constructor in the same class.",
  "codeExample": "public class User {\n    String name;\n    User(String name) { this.name = name; }\n}",
  "realWorldUseCase": "Clarifying which variable belongs to the object when parameter names match field names.",
  "commonMistakes": "Using this in a static context, where there is no current instance.",
  "interviewReadyAnswer": "this refers to the current object instance and resolves naming conflicts between fields and parameters."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-011",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 11,
  "question": "What is the static keyword in Java?",
  "answer": "static members belong to the class itself rather than to any object instance. They are shared by all instances and can be accessed without creating an object.",
  "explanation": "Static fields are initialized when the class is loaded. Static methods cannot directly access instance fields or this because they run without a target object.",
  "codeExample": "public class Utils {\n    public static int add(int a, int b) { return a + b; }\n}\nint sum = Utils.add(2, 3);",
  "realWorldUseCase": "Utility classes such as Math or Collections that provide behavior without state.",
  "commonMistakes": "Calling an instance method from a static method without an object reference.",
  "interviewReadyAnswer": "static members belong to the class, not instances, and are shared across all objects."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-012",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 12,
  "question": "What is the final keyword in Java?",
  "answer": "final prevents modification. A final variable cannot be reassigned, a final method cannot be overridden, and a final class cannot be subclassed.",
  "explanation": "final variables must be assigned exactly once. final classes such as String and Integer cannot be extended, protecting their invariants.",
  "codeExample": "final int MAX = 100;\nfinal class Helper {}",
  "realWorldUseCase": "Marking configuration values or security-sensitive classes as immutable from extension.",
  "commonMistakes": "Confusing final (cannot change reference) with immutable (object state cannot change).",
  "interviewReadyAnswer": "final blocks reassignment, overriding, or inheritance depending on where it is applied."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-013",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 13,
  "question": "What is a package in Java?",
  "answer": "A package is a namespace that groups related classes and interfaces, preventing name clashes and controlling access.",
  "explanation": "The package statement goes at the top of a source file. Classes in the same package can access package-private (no modifier) members.",
  "codeExample": "package com.company.invoice;\npublic class Invoice {}",
  "realWorldUseCase": "Organizing large codebases into domains such as com.company.payroll and com.company.shipping.",
  "commonMistakes": "Forgetting the package declaration or putting unrelated classes together.",
  "interviewReadyAnswer": "A package groups related classes into a namespace to avoid name conflicts and manage access."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-014",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 14,
  "question": "What are access modifiers in Java?",
  "answer": "Access modifiers control which classes can see a member. Java has private, package-private (default), protected, and public.",
  "explanation": "private = same class only; package-private = same package; protected = same package plus subclasses; public = everywhere.",
  "codeExample": "private int ssn;\npublic String name;",
  "realWorldUseCase": "Protecting sensitive fields such as passwords while exposing safe getters.",
  "commonMistakes": "Making everything public and losing encapsulation.",
  "interviewReadyAnswer": "Access modifiers restrict visibility: private, default/package-private, protected, and public."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-015",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 15,
  "question": "What is the difference between public and private?",
  "answer": "public members are accessible from any class. private members are accessible only within the class where they are declared.",
  "explanation": "public forms the public API; private hides implementation details so internal logic can change without breaking callers.",
  "codeExample": "public void withdraw(double amount) { ... }\nprivate boolean validatePin(int pin) { ... }",
  "realWorldUseCase": "Exposing deposit and withdrawal operations while keeping PIN validation internal.",
  "commonMistakes": "Assuming private members are visible to subclasses in other packages.",
  "interviewReadyAnswer": "public is visible everywhere; private is visible only inside its own class."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-016",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 16,
  "question": "What is method overloading in Java?",
  "answer": "Method overloading is defining multiple methods with the same name but different parameter lists in the same class. Java resolves which one to call at compile time.",
  "explanation": "Overloaded methods may differ in parameter number, type, or order. Return type alone is not enough to overload. The compiler picks the most specific matching signature.",
  "codeExample": "int add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }",
  "realWorldUseCase": "Providing flexible APIs such as print(String) and print(int, int) for different callers.",
  "commonMistakes": "Thinking changing only the return type creates an overload.",
  "interviewReadyAnswer": "Overloading means same method name, different parameter list, resolved at compile time."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-017",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 17,
  "question": "What is method overriding in Java?",
  "answer": "Method overriding is when a subclass provides a specific implementation of a method already defined in its superclass, with the same signature.",
  "explanation": "Overriding is resolved at runtime based on the actual object type (dynamic dispatch). The overriding method cannot reduce visibility or throw broader checked exceptions.",
  "codeExample": "class Animal { void speak() { ... } }\nclass Dog extends Animal { void speak() { ... } }",
  "realWorldUseCase": "Letting different shapes implement draw() differently through a common superclass reference.",
  "commonMistakes": "Overloading a method instead of overriding by changing the parameter list.",
  "interviewReadyAnswer": "Overriding redefines a superclass method in a subclass and is resolved at runtime."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-018",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 18,
  "question": "What is the super keyword in Java?",
  "answer": "super is a reference to the parent class object. It is used to call parent methods or constructors from a subclass.",
  "explanation": "super.method() invokes the overridden parent method. super() calls a parent constructor and must be the first statement in a constructor if used.",
  "codeExample": "class Employee extends Person {\n    Employee(String n) { super(n); }\n}",
  "realWorldUseCase": "Reusing parent initialization logic while adding subclass-specific fields.",
  "commonMistakes": "Calling super() after other statements in the constructor.",
  "interviewReadyAnswer": "super refers to the parent class and is used to invoke parent methods or constructors."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-019",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 19,
  "question": "What is an array in Java?",
  "answer": "An array is a fixed-size, ordered collection of elements of the same type, stored contiguously in memory.",
  "explanation": "Arrays are objects in Java. You access elements by index starting at 0. The length is fixed after creation and available via the length field.",
  "codeExample": "int[] nums = new int[5];\nnums[0] = 10;",
  "realWorldUseCase": "Storing a fixed number of sensor readings or tabular results where size is known upfront.",
  "commonMistakes": "Confusing arrays with dynamic lists such as ArrayList.",
  "interviewReadyAnswer": "An array is a fixed-size, ordered collection of same-type elements accessed by index."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-020",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 20,
  "question": "What is a String in Java?",
  "answer": "A String is an immutable sequence of characters represented by the java.lang.String class. String literals are stored in the string pool.",
  "explanation": "Because String is immutable, operations like concatenation create new String objects rather than modifying the existing one.",
  "codeExample": "String greeting = \"Hello\";\ngreeting = greeting + \" World\"; // creates a new String",
  "realWorldUseCase": "Using strings as keys in HashMap where stable hash codes and safe sharing are important.",
  "commonMistakes": "Using == to compare string values instead of .equals().",
  "interviewReadyAnswer": "A String is an immutable object representing text, with literals pooled for reuse."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-021",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 21,
  "question": "What is the string pool?",
  "answer": "The string pool is a memory region in the JVM heap where Java stores unique string literals to reuse them and save memory.",
  "explanation": "When you write a string literal, Java checks the pool first. If the same string exists, it returns the existing reference. Strings created with new String() go outside the pool unless intern() is called.",
  "codeExample": "String a = \"hi\"; String b = \"hi\"; // same reference\nString c = new String(\"hi\"); // different object",
  "realWorldUseCase": "Reducing memory when many parts of an app use the same constant strings such as status codes.",
  "commonMistakes": "Assuming all strings are pooled; only literals and interned strings are.",
  "interviewReadyAnswer": "The string pool stores unique string literals so identical literals share one instance."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-022",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 22,
  "question": "What is a wrapper class?",
  "answer": "A wrapper class is an object representation of a primitive type, such as Integer for int or Boolean for boolean.",
  "explanation": "Wrappers let primitives be used where objects are required, such as in collections. They also provide utility methods like parseInt and toString.",
  "codeExample": "Integer n = Integer.valueOf(42);\nint prim = n.intValue();",
  "realWorldUseCase": "Storing integers in an ArrayList<Integer> because collections hold objects, not primitives.",
  "commonMistakes": "Assuming wrappers behave exactly like primitives with == comparisons.",
  "interviewReadyAnswer": "A wrapper class wraps a primitive value in an object so it can be used in object contexts."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-023",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 23,
  "question": "What is autoboxing?",
  "answer": "Autoboxing is the automatic conversion the Java compiler performs between a primitive and its wrapper class, such as int to Integer.",
  "explanation": "The compiler inserts calls to Integer.valueOf() and similar methods. The reverse is unboxing. It adds convenience but can create hidden objects and NullPointerException risks.",
  "codeExample": "List<Integer> list = new ArrayList<>();\nlist.add(5); // 5 is autoboxed to Integer",
  "realWorldUseCase": "Putting primitive values into generic collections without manual wrapping.",
  "commonMistakes": "Assuming autoboxing is free; repeated conversions in loops create many objects.",
  "interviewReadyAnswer": "Autoboxing automatically converts primitives to their wrapper objects where objects are expected."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-024",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 24,
  "question": "What is an enum in Java?",
  "answer": "An enum is a special type representing a fixed set of constants. Each enum constant is an instance of the enum type.",
  "explanation": "Enums can have fields, methods, and constructors. They implement Comparable and Serializable and are implicitly final.",
  "codeExample": "public enum Day { MONDAY, TUESDAY, WEDNESDAY }",
  "realWorldUseCase": "Representing fixed choices such as order status, days of the week, or transaction types.",
  "commonMistakes": "Using int constants instead of enums and losing type safety.",
  "interviewReadyAnswer": "An enum is a type-safe fixed set of constants, each of which is an instance of the enum."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-025",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 25,
  "question": "What is the instanceof operator?",
  "answer": "instanceof checks whether an object is an instance of a given class, subclass, or interface, returning a boolean.",
  "explanation": "It returns false for null references. Java 14+ pattern matching lets you combine the check and cast in one expression.",
  "codeExample": "if (obj instanceof String s) { System.out.println(s.length()); }",
  "realWorldUseCase": "Safely narrowing an Object reference to a specific type before calling type-specific methods.",
  "commonMistakes": "Using instanceof on primitives, which is not allowed.",
  "interviewReadyAnswer": "instanceof tests whether an object belongs to a type and returns true or false."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-026",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 26,
  "question": "What is a variable in Java?",
  "answer": "A variable is a named storage location that holds a value of a specific type. Every variable has a type, a name, and a scope.",
  "explanation": "Variables must be declared before use. Local variables must be initialized before reading; instance and static fields get default values.",
  "codeExample": "int count = 0;\nString name = \"Ada\";",
  "realWorldUseCase": "Tracking values such as loop counters, user input, or calculation results.",
  "commonMistakes": "Using a local variable before initializing it.",
  "interviewReadyAnswer": "A variable is a typed, named location that stores a value within a scope."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-027",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 27,
  "question": "What is a local variable in Java?",
  "answer": "A local variable is declared inside a method, constructor, or block and exists only while that code is executing.",
  "explanation": "Local variables live on the stack, have no default value, and must be explicitly initialized before use.",
  "codeExample": "void compute() { int x = 10; System.out.println(x); }",
  "realWorldUseCase": "Holding temporary results inside a method without exposing them outside.",
  "commonMistakes": "Assuming local variables get default values like instance fields do.",
  "interviewReadyAnswer": "A local variable is declared inside a method or block and must be initialized before use."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-028",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 28,
  "question": "What is an instance variable in Java?",
  "answer": "An instance variable is a non-static field declared in a class. Each object has its own copy.",
  "explanation": "Instance variables are initialized when an object is created and get default values if not explicitly assigned.",
  "codeExample": "class Circle { double radius; }",
  "realWorldUseCase": "Storing per-object data such as a circle's radius or a user's email.",
  "commonMistakes": "Confusing instance variables with static variables shared by all objects.",
  "interviewReadyAnswer": "An instance variable belongs to each object and holds per-object state."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-029",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 29,
  "question": "What is a static variable in Java?",
  "answer": "A static variable is a field declared with the static keyword. It belongs to the class and is shared by all instances.",
  "explanation": "There is only one copy of a static variable regardless of how many objects are created. It is initialized when the class is loaded.",
  "codeExample": "class Counter { static int count = 0; }",
  "realWorldUseCase": "Tracking how many objects of a class have been created across all instances.",
  "commonMistakes": "Assuming each object has its own copy of a static variable.",
  "interviewReadyAnswer": "A static variable is class-level state shared by all instances of the class."
});
window.JAVAQuestions.addLearning({
  "id": "java-fundamentals-what-030",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "what",
  "sectionOrder": 30,
  "question": "What is the difference between == and .equals() in Java?",
  "answer": "== compares references for objects and values for primitives. .equals() compares logical content as defined by the class.",
  "explanation": "Two different String objects with the same characters are == false but .equals() true. For primitives, == compares the actual values.",
  "codeExample": "\"hi\".equals(\"hi\") // true\nnew String(\"hi\") == new String(\"hi\") // false",
  "realWorldUseCase": "Comparing user input or database values by content rather than object identity.",
  "commonMistakes": "Using == to compare string contents.",
  "interviewReadyAnswer": "== checks object identity for references; .equals() checks logical equality."
});
