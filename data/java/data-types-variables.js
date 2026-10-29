(function () {
  const topicId = "data-types-variables";
  const topicName = "Data Types and Variables";

  window.JAVA_TOPIC_THEORY = window.JAVA_TOPIC_THEORY || {};
  window.JAVA_TOPIC_THEORY[topicId] = {
    introduction: "Java variables are typed names that hold either a primitive value or a reference value. Understanding the difference between values, objects, scopes, conversions, and initialization rules is essential for explaining Java behavior in interviews.",
    sections: [
      {
        title: "1. Java's type categories",
        summary: "Java divides types into eight primitive types and reference types. The distinction affects storage, default values, equality, nullability, and method behavior.",
        points: [
          "The primitive types are byte, short, int, long, float, double, char, and boolean.",
          "Reference types include classes, interfaces, arrays, enums, records, and other object types.",
          "A primitive variable contains a value directly; a reference variable contains a value that identifies an object or contains null.",
          "Every Java variable has a declared type that controls which values and operations are allowed at compile time.",
          "Wrapper classes such as Integer and Boolean are reference types, not primitive types."
        ],
        nuances: [
          "Java does not specify a simple source-level rule that every primitive is stored on the stack and every object is stored on the heap. The JVM and JIT may optimize representation, but language semantics remain the same.",
          "A reference is not the object itself. Copying a reference copies the way to reach the object, not the object state."
        ],
        code: "int count = 3;\nString name = \"Ava\";\nString alias = name;"
      },
      {
        title: "2. Primitive types and ranges",
        summary: "Primitive types provide fixed language-level value categories for numeric values, characters, and booleans.",
        points: [
          "byte, short, int, and long are signed integer types with widths of 8, 16, 32, and 64 bits respectively.",
          "float and double are binary floating-point types; double has greater precision and is the default type for decimal literals.",
          "char is a 16-bit unsigned UTF-16 code unit, not necessarily a complete Unicode code point.",
          "boolean has the values true and false and cannot be converted to an integer in Java.",
          "Integer arithmetic normally promotes byte, short, and char operands to int before calculation."
        ],
        nuances: [
          "Floating-point arithmetic can contain rounding error; use BigDecimal or a domain-specific strategy for exact decimal requirements such as money.",
          "The exact in-memory representation of boolean is intentionally abstracted by the Java language specification."
        ],
        code: "byte attempts = 3;\nlong population = 8_000_000_000L;\nchar initial = 'J';\nboolean active = true;"
      },
      {
        title: "3. Reference values and null",
        summary: "Reference variables point to objects, and null represents the absence of a reference to an object.",
        points: [
          "A reference can point to an object whose runtime type is a subtype of the variable's declared type.",
          "Several references may point to the same mutable object, so a change through one reference can be visible through another.",
          "null is permitted for reference variables but not for primitive variables.",
          "Dereferencing null produces NullPointerException when code tries to access a field, call an instance method, or index through it.",
          "Arrays are objects, so an array variable is a reference even when its elements are primitives."
        ],
        nuances: [
          "Assigning null does not immediately destroy an object; it only removes one reference. Garbage collection depends on reachability from live roots.",
          "Use a clear absence policy at API boundaries instead of allowing unexpected null values to spread through the application."
        ],
        code: "List<String> names = new ArrayList<>();\nList<String> other = names;\nother.add(\"Sam\");\n// names now also contains \"Sam\""
      },
      {
        title: "4. Variables, declarations, and initialization",
        summary: "A declaration gives a variable a name and type; initialization gives it its first value. Java applies different rules to locals, fields, and parameters.",
        points: [
          "A local variable must be definitely assigned before it is read.",
          "Instance fields and static fields receive default values when their object or class state is initialized.",
          "Method parameters are initialized from argument values when a method is invoked.",
          "A declaration can be combined with initialization, but declaration and later assignment are separate operations.",
          "The compiler checks that a variable is used only within a scope where its declaration is visible."
        ],
        nuances: [
          "The compiler's definite-assignment analysis is stricter than simply asking whether a programmer can see that a branch will run.",
          "An instance field with a default value is not the same as a local variable that was forgotten to initialize."
        ],
        code: "int total;\n// System.out.println(total); // compile-time error\ntotal = 0;\nSystem.out.println(total);"
      },
      {
        title: "5. Scope and shadowing",
        summary: "Scope determines where a variable name can be used. Shadowing happens when a nearer declaration hides a declaration with the same name.",
        points: [
          "A local variable is visible from its declaration to the end of its enclosing statement block.",
          "An instance field is accessed through an object and is available according to the class member's access rules.",
          "A static field belongs to the class and can be accessed through the class name.",
          "A parameter or local variable can shadow a field with the same name.",
          "The this qualifier makes it explicit that a field on the current object is intended."
        ],
        nuances: [
          "Shadowing is legal but can reduce readability. Clear names or explicit this.field access usually make intent easier to review.",
          "A local variable declared in an outer block cannot be redeclared with the same name in an overlapping inner block in Java."
        ],
        code: "class User {\n    private String name;\n\n    User(String name) {\n        this.name = name;\n    }\n}"
      },
      {
        title: "6. Assignment and references",
        summary: "Assignment copies a value. For object variables, that value is a reference, so assignment can create aliases to the same object.",
        points: [
          "Primitive assignment copies the primitive value.",
          "Reference assignment copies the reference value and does not clone the referenced object.",
          "A final variable may be assigned only once, but a final reference can still point to a mutable object whose contents change.",
          "The compiler permits assignment when the source type is compatible with the destination type, including valid widening reference conversions.",
          "An explicit cast can request a narrowing reference conversion, which may fail at runtime with ClassCastException."
        ],
        nuances: [
          "final protects the variable binding, not the complete object graph reachable through that binding.",
          "Use copy constructors, factories, or immutable types when independent object state is required."
        ],
        code: "final List<String> tags = new ArrayList<>();\ntags.add(\"java\"); // allowed\n// tags = new ArrayList<>(); // compile-time error"
      },
      {
        title: "7. Conversions and casting",
        summary: "Java supports widening conversions that preserve a value category and narrowing conversions that require an explicit cast because information may be lost.",
        points: [
          "An int can be widened to long, float, or double without an explicit cast in assignment contexts.",
          "A double-to-int conversion requires a cast and discards the fractional part after range behavior is applied.",
          "Casting does not change the original object; it changes the type through which the compiler views a reference.",
          "A narrowing reference cast is checked against the object's runtime type.",
          "Use instanceof or pattern matching when a runtime type check is needed before accessing subtype-specific behavior."
        ],
        nuances: [
          "Widening a large long to double can still lose integer precision because floating-point types have finite precision.",
          "A cast can make code compile but cannot make an invalid runtime object relationship valid."
        ],
        code: "int count = 42;\nlong bigger = count;\ndouble average = 4.75;\nint whole = (int) average; // 4"
      },
      {
        title: "8. Primitive promotion and overflow",
        summary: "Arithmetic applies binary numeric promotion, and fixed-width integer operations can overflow without throwing an exception.",
        points: [
          "byte, short, and char operands are usually promoted to int during arithmetic.",
          "If either operand is long, float, or double, promotion follows the wider participating type.",
          "Integer overflow wraps according to two's-complement arithmetic rather than automatically raising an exception.",
          "Underscores can improve readability in numeric literals when placed between digits.",
          "Use Math.addExact, Math.multiplyExact, or a larger numeric type when overflow must be detected."
        ],
        nuances: [
          "The expression byte + byte has type int, so assigning it back to byte requires an explicit cast and can lose information.",
          "Floating-point overflow produces infinity rather than the same wraparound behavior as integer overflow."
        ],
        code: "int max = Integer.MAX_VALUE;\nint wrapped = max + 1;\nint checked = Math.addExact(10, 20);"
      },
      {
        title: "9. Arrays and variable types",
        summary: "An array variable is a reference to a fixed-length object whose elements all have one declared component type.",
        points: [
          "Array length is fixed after creation and is accessed through the length field.",
          "Primitive arrays store primitive elements; reference arrays store references to objects.",
          "Array elements receive default values when the array is created.",
          "Array indexing is zero-based and an invalid index produces ArrayIndexOutOfBoundsException.",
          "Reference arrays are covariant, which can move some type errors from compile time to runtime."
        ],
        nuances: [
          "String[] can be assigned to Object[] because arrays are covariant, but storing a non-String Object then fails with ArrayStoreException.",
          "Use generics and collection interfaces when a resizable or more expressive data structure is needed."
        ],
        code: "String[] names = new String[2];\nnames[0] = \"Mia\";\nSystem.out.println(names.length); // 2"
      },
      {
        title: "10. Method arguments and pass-by-value",
        summary: "Java always passes arguments by value. For a reference parameter, the copied value is the reference, which explains both mutation and reassignment behavior.",
        points: [
          "A method receives a copy of each argument value.",
          "A method can mutate an object through a copied reference if the object is mutable.",
          "Reassigning a reference parameter does not replace the caller's variable.",
          "A method cannot swap two caller references merely by assigning to its parameters.",
          "Returning a new object or using a mutable result holder makes replacement explicit."
        ],
        nuances: [
          "Saying Java passes objects by reference is inaccurate. Java passes the reference value by value.",
          "Immutable objects make this distinction easier to reason about because mutation through the reference is unavailable."
        ],
        code: "void addTag(List<String> tags) {\n    tags.add(\"interview\"); // caller sees mutation\n    tags = new ArrayList<>(); // caller reference unchanged\n}"
      }
    ],
    takeaways: [
      "State whether a variable is primitive or a reference before explaining its behavior.",
      "Remember that Java is always pass-by-value, including when the value copied is an object reference.",
      "Separate language guarantees from implementation details such as likely stack or heap placement.",
      "For conversions, explain whether the operation is widening, narrowing, boxing, or unboxing and whether data can be lost."
    ]
  };

  const learningSections = [
    {
      section: "what",
      items: [
        ["What is a data type in Java?", "A data type defines the kind of value a variable can hold and the operations that are valid for it.", "The compiler uses the declared type to check assignments, method calls, and operators before the program runs.", "int age = 30;", "It prevents accidental mixing of unrelated values in APIs.", "Treating a variable's declared type as merely documentation.", "A Java type constrains values and operations at compile time."],
        ["What are Java's primitive types?", "Java has byte, short, int, long, float, double, char, and boolean primitive types.", "Primitive values are language-level values rather than references to wrapper objects.", "int count = 4;\nboolean ready = true;", "They are useful for compact values and arithmetic without object allocation semantics.", "Forgetting that String and Integer are reference types.", "Java has eight primitives covering integers, floating point, characters, and booleans."],
        ["What is a reference type?", "A reference type describes objects, arrays, interfaces, enums, records, and other non-primitive values.", "A reference variable stores a value that identifies an object or null; it does not contain the object's full state directly.", "String message = \"hello\";", "References enable polymorphism and object-oriented APIs.", "Saying that the reference variable and object are the same thing.", "A reference variable holds an object reference or null."],
        ["What is the difference between a primitive and a reference?", "A primitive variable contains a direct value, while a reference variable contains a reference to an object or null.", "The distinction affects nullability, equality, copying, default values, and available methods.", "int a = 1;\nInteger b = 1;", "It explains why object mutation can be shared but primitive assignment copies values.", "Assuming all variables behave like object references.", "Primitives hold values; references point to objects."],
        ["What is a variable?", "A variable is a named, typed storage location whose value can be read or changed according to its declaration.", "The declared type controls what can be assigned and how the value can be used.", "double price = 19.99;", "Variables give meaningful names to state in methods and objects.", "Thinking a variable name determines the runtime type of every object it can reference.", "A variable is a typed name bound to a value within a scope."],
        ["What is a local variable?", "A local variable is declared inside a method, constructor, or block and is usable only within its scope.", "Local variables have no automatic default value and must be definitely assigned before use.", "void run() { int attempts = 0; }", "They hold temporary computation state without becoming object state.", "Assuming locals automatically receive zero or null like fields.", "A local variable is block-scoped and must be initialized before reading."],
        ["What is an instance variable?", "An instance variable is a non-static field whose state belongs to one object instance.", "Each object normally has its own field value, initialized through defaults, field initializers, or constructors.", "class User { String name; }", "It represents per-object state such as a user's name.", "Confusing it with a static field shared by the class.", "An instance variable is object-specific field state."],
        ["What is a static variable?", "A static variable is a class field with one class-level binding shared by instances.", "It is associated with the class rather than one particular object and is normally accessed through the class name.", "class Counter { static int total; }", "It is useful for class-wide constants or shared counters when shared state is intentional.", "Using static mutable state as a substitute for dependency design.", "A static variable belongs to the class and is shared across instances."],
        ["What is a final variable?", "A final variable can be assigned only once after it has been initialized.", "For a reference, final prevents reassignment of the reference but does not make the referenced object immutable.", "final int limit = 10;", "It documents invariants and prevents accidental rebinding.", "Claiming final makes a mutable object immutable.", "final protects one variable binding, not necessarily the object it references."],
        ["What does null mean?", "null is the absence of an object reference and can be assigned only to reference variables.", "Using a null reference as though it pointed to an object causes NullPointerException.", "String value = null;", "It can represent an optional or not-yet-created object when the API contract permits it.", "Calling methods on null without checking or defining an absence policy.", "null means a reference currently points to no object." ]
      ]
    },
    {
      section: "why",
      items: [
        ["Why does Java have primitive types?", "Primitives provide efficient language-level values for common numeric, character, and boolean operations.", "They avoid requiring every simple value to be represented as a general object and support direct arithmetic semantics.", "long id = 42L;", "Counters, indexes, flags, and measurements often begin as primitive values.", "Assuming primitive efficiency means the JVM always uses a visible stack slot.", "Primitives provide simple value semantics without requiring an object reference."],
        ["Why is Java statically typed?", "Static typing lets the compiler detect many incompatible assignments and invalid operations before execution.", "A variable's declared type makes API contracts explicit and improves tooling, refactoring, and readability.", "String id = \"A-1\";", "Large codebases benefit from errors being found during compilation rather than after deployment.", "Thinking static typing eliminates all runtime errors.", "Static typing catches many type errors early while runtime checks still remain."],
        ["Why are reference values useful?", "References enable objects, polymorphism, shared state, and dynamic dispatch.", "A variable can use an interface or superclass type while referring to a concrete implementation.", "List<String> items = new ArrayList<>();", "Callers depend on abstractions rather than concrete implementations.", "Sharing mutable references without documenting ownership.", "References support object identity and polymorphic behavior."],
        ["Why must local variables be initialized?", "The definite-assignment rule prevents code from reading an unpredictable local value.", "Unlike fields, locals are often temporary control-flow state, so the compiler requires proof that every read follows an assignment.", "int result;\nif (ok) result = 1;\n// result may not be assigned", "It catches missing branches and initialization bugs at compile time.", "Assuming the compiler will infer an intended default.", "Local initialization rules make reads deterministic and safe."],
        ["Why do fields receive default values?", "Object and class initialization establishes a predictable initial state before application code uses a field.", "Numeric fields default to zero, boolean to false, char to the null character, and references to null.", "class Config { int retries; }", "It lets object construction begin from a defined baseline.", "Assuming the same rule applies to local variables.", "Fields receive defaults during object or class initialization; locals do not."],
        ["Why use final variables?", "final communicates that a binding should not change after initialization.", "The restriction helps protect constants, constructor-established state, and assumptions used by readers and tools.", "private static final int MAX_RETRIES = 3;", "It makes invariants easier to reason about and prevents accidental reassignment.", "Using final everywhere without considering whether the referenced object is mutable.", "final prevents reassignment and makes intent explicit."],
        ["Why does Java pass arguments by value?", "Passing copies isolates a method's parameter binding from the caller's variable binding.", "For references, the copied value still points to the same object, allowing mutation but not caller-reference replacement.", "void rename(User user) { user.setName(\"New\"); }", "The rule gives method calls predictable assignment semantics.", "Calling this pass-by-reference because a method can mutate an object.", "Java copies every argument value; a reference value may point to shared mutable state."],
        ["Why should reference equality usually not be used for values?", "Reference equality checks whether two variables identify the same object, not whether their contents are logically equal.", "Value objects normally define equals for content comparison, while == remains appropriate for identity or primitives.", "a.equals(b)", "It prevents bugs when separately created objects represent the same data.", "Using == for String or wrapper value comparison.", "Use == for primitive values or intentional identity checks; use equals for object value equality."],
        ["Why do widening conversions exist?", "Widening conversions make compatible values easier to use in broader numeric or reference contexts.", "The language permits many widening conversions without a cast because the destination category can represent the source category under the conversion rules.", "int count = 4;\nlong total = count;", "They make method calls and arithmetic less verbose while preserving ordinary values.", "Assuming every widening conversion preserves exact precision, especially long to float or double.", "Widening is convenient, but floating-point precision can still be limited."],
        ["Why do narrowing conversions require casts?", "Narrowing can discard range, precision, or type information, so Java requires the programmer to make that risk explicit.", "An explicit cast documents intent but does not prevent data loss or runtime type failures.", "double value = 3.9;\nint whole = (int) value;", "It makes potentially lossy conversions visible during code review.", "Treating a cast as a validation step rather than a request to convert.", "A cast permits a narrowing conversion; it does not guarantee that information is preserved." ]
      ]
    },
    {
      section: "how",
      items: [
        ["How do you declare and initialize a variable?", "Write the type and name, then assign a compatible value either in the declaration or in a later statement.", "The compiler checks the assignment against the declared type and definite-assignment rules.", "int count = 0;\ncount = count + 1;", "It separates the variable's contract from the values it receives over time.", "Using a local variable before its first assignment.", "Declare with a type and initialize before reading."],
        ["How does Java resolve a shadowed field?", "A nearer local variable or parameter wins by default, and this.field or ClassName.field can qualify the intended field.", "Name lookup follows lexical scope, while explicit qualification removes ambiguity.", "class Box { int size;\n Box(int size) { this.size = size; } }", "Constructors commonly use same-named parameters and fields.", "Writing size = size and believing it assigns the field.", "Use this for the current instance field and the class name for static state."],
        ["How does reference assignment work?", "It copies the reference value, so both variables can identify the same object after assignment.", "The object is not copied unless code explicitly creates a copy.", "List<Integer> a = new ArrayList<>();\nList<Integer> b = a;", "Aliases can intentionally share state, but ownership must be clear.", "Expecting b = a to create an independent list.", "Reference assignment aliases an object; it does not clone it."],
        ["How does Java pass an object to a method?", "Java copies the reference value into the parameter, so the method can mutate the object but cannot rebind the caller's variable.", "Parameter reassignment changes only the local parameter binding.", "void add(List<String> list) { list.add(\"x\"); }", "Methods can update mutable aggregates while keeping caller bindings separate.", "Promising that a method can replace the caller's object reference without returning it.", "An object reference is passed by value."],
        ["How does numeric casting work?", "A cast requests a conversion between compatible numeric types and may lose precision or range.", "The runtime result follows the target type's conversion rules; the original variable is unchanged.", "long value = 10L;\nint smaller = (int) value;", "It is useful at boundaries where a narrower API is required and the range has been validated.", "Casting without checking whether the source value fits.", "Numeric casts convert the expression and can lose information."],
        ["How are byte, short, and char used in arithmetic?", "They are usually promoted to int before binary arithmetic is performed.", "This prevents many intermediate operations from overflowing the narrow declared type, but assignment back requires a cast.", "byte a = 1;\nbyte b = 2;\nint sum = a + b;", "It explains why small numeric expressions often have type int.", "Writing byte sum = a + b without a cast.", "Small integral operands are promoted to int during arithmetic."],
        ["How does a final reference behave?", "The reference can be assigned once, but methods can still mutate the referenced object if it is mutable.", "final constrains the variable binding rather than recursively freezing the object graph.", "final StringBuilder log = new StringBuilder();\nlog.append(\"ok\");", "It supports stable dependencies and constructor-assigned collaborators.", "Assuming final means deeply immutable.", "final prevents rebinding, not mutation of a mutable referent."],
        ["How does an array variable work?", "The variable references a fixed-length array object whose elements share one component type.", "The array object stores default-initialized elements and checks bounds at runtime.", "int[] values = new int[3];\nvalues[0] = 7;", "Arrays provide compact indexed storage when length is known.", "Using length() instead of the length field or indexing from one.", "Arrays are reference objects with zero-based fixed-length storage."],
        ["How does var work for local variables?", "var asks the compiler to infer a local variable's static type from its initializer.", "It does not make Java dynamically typed and cannot be used for fields, parameters, or an uninitialized local.", "var names = List.of(\"A\", \"B\");", "It reduces repetition when the initializer already makes the type obvious.", "Believing var changes the runtime type or permits later unrelated assignments.", "var is compile-time local type inference, not dynamic typing."],
        ["How do you avoid null-related failures?", "Define whether null is allowed, validate at boundaries, and use non-null defaults or explicit result types when appropriate.", "A check, Objects.requireNonNull, or an API such as Optional can make absence handling visible.", "String name = Objects.requireNonNull(input, \"input\");", "It turns an accidental null failure into a deliberate contract decision.", "Adding random null checks without deciding what absence means.", "Prevent null at boundaries and make absence part of the API contract." ]
      ]
    }
  ];

  learningSections.forEach(({ section, items }) => items.forEach((item, index) => {
    window.JAVAQuestions.addLearning({
      id: `${topicId}-${section}-${String(index + 1).padStart(3, "0")}`,
      topicId,
      topicName,
      section,
      sectionOrder: index + 1,
      question: item[0],
      answer: item[1],
      explanation: item[2],
      codeExample: item[3] || null,
      realWorldUseCase: item[4],
      commonMistakes: item[5],
      interviewReadyAnswer: item[6]
    });
  }));

  const quizQuestions = [
    ["output", "What is the output?", "int a = 10;\nlong b = a;\nSystem.out.println(b);", ["10", "10L", "Compilation error", "Runtime error"], 0, "The int value widens to long and prints as 10."],
    ["output", "What is the output?", "byte a = 1;\nbyte b = 2;\nSystem.out.println(a + b);", ["3", "Compilation error", "12", "0"], 0, "byte operands are promoted to int, and 1 + 2 is 3."],
    ["output", "What is the output?", "int value = Integer.MAX_VALUE;\nSystem.out.println(value + 1);", ["2147483648", "-2147483648", "Compilation error", "ArithmeticException"], 1, "Integer overflow wraps to the minimum int value; ordinary integer arithmetic does not throw."],
    ["output", "What is the output?", "double value = 9.8;\nint result = (int) value;\nSystem.out.println(result);", ["9", "10", "9.8", "Compilation error"], 0, "Casting from double to int discards the fractional part."],
    ["output", "What is the output?", "List<String> first = new ArrayList<>();\nList<String> second = first;\nsecond.add(\"Java\");\nSystem.out.println(first.size());", ["0", "1", "Compilation error", "NullPointerException"], 1, "Both variables reference the same list, so the mutation is visible through first."],
    ["what", "Which declaration is a valid local variable declaration?", null, ["int count = 1;", "int count; System.out.println(count);", "number count = 1;", "final count = 1;"], 0, "A local variable needs a valid Java type, and reading it requires definite assignment."],
    ["what", "Which value can be assigned to a primitive int variable?", null, ["null", "42", "new Integer()", "\"42\""], 1, "42 is an integer literal compatible with int; null and strings are not primitive int values."],
    ["what", "What does a reference variable contain?", null, ["The complete object bytes only", "A reference to an object or null", "Always a primitive int", "A method body"], 1, "A reference variable contains a reference value that can identify an object or be null."],
    ["what", "Which variable is shared by all instances of a class?", null, ["A local variable", "A parameter", "A static field", "An array element"], 2, "A static field is associated with the class rather than one instance."],
    ["what", "What does final prevent for a variable?", null, ["All object mutation", "Garbage collection", "A second assignment to the variable", "Method calls"], 2, "final prevents rebinding or reassignment; a mutable referenced object may still change."],
    ["what", "What happens when a null reference is dereferenced?", null, ["It becomes an empty object", "NullPointerException is typically thrown", "The compiler boxes it", "It becomes false"], 1, "Accessing an instance member through null requires an object and therefore fails at runtime."],
    ["what", "What is the default value of an int instance field?", null, ["null", "false", "0", "It has no value"], 2, "Numeric fields receive zero by default. Local int variables must be initialized explicitly."],
    ["what", "Which type is a reference type?", null, ["boolean", "char", "double", "String"], 3, "String is a class and therefore a reference type; the other options are primitives."],
    ["what", "What does Java pass to a method when an object is an argument?", null, ["The object by reference", "A copy of the reference value", "The object's source code", "A pointer that can replace the caller variable"], 1, "Java copies the reference value. The method can mutate the object but cannot reassign the caller's variable."],
    ["why", "Why does narrowing conversion require an explicit cast?", null, ["It can lose range or precision", "The JVM cannot run it", "All assignments require casts", "It creates a new thread"], 0, "The cast makes a potentially lossy conversion explicit."],
    ["why", "Why can a method mutate a caller's list but not replace the caller's list by reassigning its parameter?", null, ["Lists are immutable", "Java copies the reference value", "Parameters are global", "The compiler ignores assignments"], 1, "The parameter and caller hold separate variable bindings that initially contain the same reference value."],
    ["why", "Why are local variables required to be definitely assigned?", null, ["To avoid reading an undefined local value", "To make all fields static", "To enable garbage collection", "To force boxing"], 0, "Compile-time definite-assignment analysis prevents reads that may occur before initialization."],
    ["why", "Why is == usually wrong for comparing String contents?", null, ["String has no value", "== compares references for objects", "Strings are primitive values", "equals compares memory addresses"], 1, "For object references, == checks identity; equals is used for logical content equality."],
    ["why", "Why are byte and short expressions often assigned to int results?", null, ["They are promoted to int during arithmetic", "int is a reference type", "byte cannot store numbers", "The JVM converts every value to String"], 0, "Binary numeric promotion converts byte and short operands to int for most arithmetic."],
    ["why", "Why is var not dynamic typing?", null, ["The compiler still infers one static type", "var stores only strings", "var works only at runtime", "var removes all type checks"], 0, "var is local variable type inference; the inferred static type remains fixed after compilation."]
  ];

  quizQuestions.forEach((item, index) => window.JAVAQuestions.addQuiz({
    id: `${topicId}-quiz-${String(index + 1).padStart(3, "0")}`,
    topicId,
    topicName,
    section: item[0],
    sectionOrder: index + 1,
    question: item[1],
    code: item[2],
    options: item[3],
    correctAnswer: item[4],
    explanation: item[5]
  }));
})();