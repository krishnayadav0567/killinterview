(function () {
  const topicId = "wrapper-classes";
  const topicName = "Wrapper Classes";

  window.JAVA_TOPIC_THEORY = window.JAVA_TOPIC_THEORY || {};
  window.JAVA_TOPIC_THEORY[topicId] = {
    introduction: "Wrapper classes represent primitive values as objects. They let primitive data participate in generic APIs, provide parsing and comparison utilities, expose useful constants, and make nullability explicit when a domain needs an absent value.",
    sections: [
      {
        title: "1. Wrapper class map",
        summary: "Java provides an object wrapper for each primitive type.",
        points: [
          "byte maps to Byte, short to Short, int to Integer, and long to Long.",
          "float maps to Float, double to Double, char to Character, and boolean to Boolean.",
          "Void is a utility class associated with void, but it is not a normal value wrapper that application code instantiates.",
          "Wrapper classes are reference types and can therefore be null.",
          "Wrapper classes expose conversion, parsing, comparison, and range constants."
        ],
        nuances: [
          "Wrappers are immutable value objects; an operation creates or returns a value rather than changing an existing wrapper instance.",
          "Use primitives by default when object identity and null are not part of the API requirement."
        ],
        code: "int primitive = 42;\nInteger wrapped = Integer.valueOf(42);\nInteger absent = null;"
      },
      {
        title: "2. Why wrappers are needed",
        summary: "Wrappers bridge primitive values and APIs designed around references.",
        points: [
          "Generic type arguments must be reference types, so List<Integer> is valid while List<int> is not.",
          "Collections, many framework APIs, and nullable fields use object references.",
          "Wrapper classes provide constants such as Integer.MAX_VALUE and methods such as Integer.compare.",
          "Parsing methods convert text to primitive values, while valueOf methods return wrapper objects.",
          "A wrapper reference can express absence with null when that meaning is part of the contract."
        ],
        nuances: [
          "Autoboxing makes generic code concise but can hide allocation and null-sensitive unboxing.",
          "Do not use wrappers everywhere merely to make primitive data look object-oriented."
        ],
        code: "List<Integer> scores = new ArrayList<>();\nscores.add(95);\nscores.add(null);"
      },
      {
        title: "3. Autoboxing and unboxing",
        summary: "The compiler can insert conversions between primitives and their wrappers in permitted contexts.",
        points: [
          "Autoboxing converts a primitive such as int to its wrapper such as Integer.",
          "Unboxing converts a wrapper to its primitive value when an expression requires it.",
          "Integer boxed = 10 is equivalent in intent to Integer.valueOf(10).",
          "int value = boxed can require an intValue call at runtime.",
          "Unboxing a null wrapper throws NullPointerException."
        ],
        nuances: [
          "Repeated boxing in a hot loop can cost memory and time; use primitive-specialized APIs when measurement justifies it.",
          "Overload selection and generic inference happen alongside boxing rules, so adding overloads can change behavior."
        ],
        code: "Integer boxed = 10;\nint primitive = boxed;\nInteger missing = null;\n// int failure = missing;"
      },
      {
        title: "4. Equality and identity",
        summary: "Wrapper value equality must be separated from object identity.",
        points: [
          "equals compares wrapper values, while == can compare references when both operands are wrappers.",
          "Some wrapper values are cached, so == can appear to work for one value and fail for another.",
          "The guaranteed Integer cache covers -128 through 127; implementations may cache additional values.",
          "Use equals, Objects.equals, or compare methods for wrapper values.",
          "compareTo and static compare methods express ordering without depending on identity."
        ],
        nuances: [
          "Never make correctness depend on wrapper cache behavior or object identity.",
          "Objects.equals is useful when either reference may be null."
        ],
        code: "Integer a = 128;\nInteger b = 128;\nSystem.out.println(a.equals(b)); // true\nSystem.out.println(a == b);       // identity check"
      },
      {
        title: "5. Parsing and conversion",
        summary: "Wrapper classes provide static APIs for parsing text and converting values.",
        points: [
          "Integer.parseInt returns an int, while Integer.valueOf returns an Integer.",
          "Other wrappers provide corresponding parse and valueOf methods for their primitive types.",
          "Invalid numeric text normally throws NumberFormatException.",
          "Parsing overloads can accept a radix such as 2, 8, 10, or 16.",
          "toString and format-specific methods convert values back to text."
        ],
        nuances: [
          "Normalize input such as whitespace according to the API contract before parsing.",
          "Use BigInteger or BigDecimal when fixed-width wrappers cannot represent the domain's required range or precision."
        ],
        code: "int decimal = Integer.parseInt(\"42\");\nint hex = Integer.parseInt(\"2A\", 16);\nInteger object = Integer.valueOf(42);"
      },
      {
        title: "6. Constants and comparisons",
        summary: "Wrapper classes centralize primitive limits and safe comparison helpers.",
        points: [
          "MIN_VALUE and MAX_VALUE document the range of fixed-width numeric primitives.",
          "SIZE exposes the number of bits in the primitive representation, while BYTES exposes byte width where available.",
          "Integer.compare avoids overflow that can occur in a subtraction-based comparator.",
          "Character exposes classification and case-conversion methods for char values.",
          "Boolean.parseBoolean recognizes true ignoring case and returns false for other text."
        ],
        nuances: [
          "Character works with UTF-16 code units; supplementary Unicode code points may require code-point APIs.",
          "Double values have special states such as NaN and positive or negative infinity."
        ],
        code: "int order = Integer.compare(left, right);\nboolean enabled = Boolean.parseBoolean(input);\nint highest = Integer.MAX_VALUE;"
      },
      {
        title: "7. Nullability and API design",
        summary: "Wrapper references can represent absence, but null must be handled before unboxing or instance calls.",
        points: [
          "A wrapper parameter can distinguish an absent value with null; a primitive parameter cannot.",
          "Use Objects.requireNonNull when null violates the method contract.",
          "Use a deliberate default when absence has valid domain meaning.",
          "Optional may model an expected missing return value, but it is not a universal replacement for wrapper fields.",
          "Validate wrapper inputs at boundaries so failures are close to their source."
        ],
        nuances: [
          "Do not silently convert null to zero unless zero is genuinely the domain default.",
          "Use Objects.equals for null-safe value equality."
        ],
        code: "Integer retries = config.getRetries();\nint safe = Objects.requireNonNullElse(retries, 3);"
      },
      {
        title: "8. Performance and choosing a type",
        summary: "Choose primitives or wrappers based on nullability, generic APIs, memory behavior, and domain meaning.",
        points: [
          "int[] stores primitive values compactly, while List<Integer> stores references to wrapper values.",
          "Primitive streams such as IntStream can avoid some boxing in numeric pipelines.",
          "Use primitives for required scalar values and arithmetic when null is not meaningful.",
          "Use wrappers for generic type arguments, nullable values, and object-based APIs.",
          "Measure before optimizing, but recognize boxing costs in large data paths."
        ],
        nuances: [
          "A clear collection API can be more valuable than maximum memory density for ordinary workloads.",
          "The best type is an API contract decision, not a blanket rule."
        ],
        code: "int[] compact = {1, 2, 3};\nList<Integer> boxed = List.of(1, 2, 3);\nint sum = boxed.stream().mapToInt(Integer::intValue).sum();"
      }
    ],
    takeaways: [
      "Use wrappers when an object, generic type argument, nullable value, or wrapper utility is required.",
      "Autoboxing is compiler convenience; unboxing null throws NullPointerException.",
      "Compare wrapper values with equals, Objects.equals, or compare methods, not cached identity.",
      "For high-volume numeric data, consider primitive arrays or primitive-specialized APIs after measuring."
    ]
  };

  const addLearningQuestions = (section, items) => items.forEach((item, index) => window.JAVAQuestions.addLearning({
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
  }));

  addLearningQuestions("what", [
    ["What is a wrapper class?", "A wrapper class represents a primitive value as an object.", "Byte, Short, Integer, Long, Float, Double, Character, and Boolean are the main primitive wrappers.", "Integer value = 42;", "Wrappers allow primitive values to work with object-based APIs.", "Treating every wrapper as a mutable container.", "A wrapper is an immutable object representation of a primitive value."],
    ["What is Integer?", "Integer is the final wrapper class for the primitive int type.", "It can be null as a reference and provides parsing, conversion, comparison, and range APIs.", "Integer count = 42;", "It is the element type used by List<Integer>.", "Using == instead of value equality for arbitrary Integer instances.", "Integer is the object form of int plus useful APIs."],
    ["What is the difference between parseInt and valueOf?", "parseInt returns a primitive int, while valueOf returns an Integer object.", "Both can parse text, but their result types suit different contexts.", "int a = Integer.parseInt(\"7\");\nInteger b = Integer.valueOf(\"7\");", "Use parseInt for immediate arithmetic and valueOf when an object is needed.", "Assuming their result types are interchangeable in every API.", "parseInt returns int; valueOf returns Integer."],
    ["What is autoboxing?", "Autoboxing is automatic conversion from a primitive to its wrapper object.", "The compiler can translate an int-to-Integer assignment into a valueOf-style conversion.", "Integer boxed = 5;", "It keeps generic and collection code concise.", "Forgetting that boxing can add allocation and nullability behavior.", "Autoboxing converts a primitive to a wrapper when the context requires an object."],
    ["What is unboxing?", "Unboxing is automatic conversion from a wrapper object to its primitive value.", "The compiler can insert an intValue-style operation when an Integer is used as an int.", "Integer boxed = 5;\nint value = boxed;", "It lets wrapper values participate in arithmetic.", "Unboxing a nullable wrapper without validation.", "Unboxing extracts the primitive and fails when the wrapper is null."],
    ["What is a nullable numeric value?", "A nullable numeric value is a wrapper reference such as Integer that can contain a number or null.", "An int cannot represent null, while Integer can represent an absent value.", "Integer optionalCount = null;", "It can model an optional database or configuration field.", "Treating null as automatically equivalent to zero.", "A wrapper can model absence; a primitive cannot hold null."],
    ["What is Integer.MAX_VALUE?", "It is the largest value representable by a signed 32-bit int.", "The wrapper constants document the limits of their corresponding primitive types.", "System.out.println(Integer.MAX_VALUE);", "Boundary validation and tests use it instead of hard-coded limits.", "Assuming adding one throws automatically.", "Wrapper constants expose primitive range limits."],
    ["What does Boolean.parseBoolean return for invalid text?", "It returns true only for true ignoring case and false for other text.", "Unlike numeric parsing, ordinary non-true text does not cause NumberFormatException.", "Boolean.parseBoolean(\"yes\") // false", "It can parse simple flags when the input contract is intentionally permissive.", "Assuming yes, 1, or enabled are automatically true.", "parseBoolean recognizes true ignoring case and otherwise returns false."],
    ["What is the wrapper for char?", "Character wraps the primitive char type.", "It provides classification and case methods such as isDigit and toUpperCase.", "Character.isDigit('7');", "It centralizes common character operations.", "Assuming one char always represents a complete Unicode code point.", "Character wraps char and provides character utilities."],
    ["What is the wrapper for boolean?", "Boolean wraps the primitive boolean type.", "It represents true or false as an object and provides parsing and logical helper methods.", "Boolean enabled = Boolean.TRUE;", "It is useful in generic APIs that require a reference type.", "Using a nullable Boolean without defining what null means.", "Boolean is the object form of boolean." ]
  ]);

  addLearningQuestions("why", [
    ["Why are wrappers needed for generics?", "Java generic type arguments must be reference types, so primitives need wrappers.", "List<int> is invalid, while List<Integer> is valid and may box values.", "List<Integer> scores = new ArrayList<>();", "Collections can store integer values through Integer.", "Assuming a generic collection stores primitive elements directly.", "Wrappers allow primitives to participate in generic type parameters."],
    ["Why use valueOf instead of new Integer?", "valueOf expresses value creation and can use the class's cache or construction policy.", "Explicit wrapper constructors are obsolete or discouraged in modern Java code.", "Integer value = Integer.valueOf(10);", "It avoids forcing a distinct object identity unnecessarily.", "Creating wrappers with constructors or relying on identity.", "Prefer valueOf or autoboxing over explicit wrapper constructors."],
    ["Why is unboxing null dangerous?", "There is no primitive value to extract from null, so unboxing throws NullPointerException.", "The compiler-generated conversion can be hidden inside an arithmetic expression.", "Integer count = null;\nint total = count + 1;", "It makes nullable input validation an explicit design concern.", "Assuming null behaves like zero.", "Validate or default a nullable wrapper before arithmetic."],
    ["Why should wrapper values not be compared with ==?", "For two wrapper references, == checks object identity rather than wrapped value equality.", "Caching can make identity comparisons appear correct for some values and fail for others.", "Objects.equals(left, right);", "Value comparison remains correct regardless of allocation or cache behavior.", "Depending on Integer cache behavior.", "Use value equality rather than wrapper identity."],
    ["Why do wrapper classes expose constants?", "Constants make primitive ranges and special values discoverable without hard-coded limits.", "Code using Integer.MAX_VALUE communicates intent and follows the type contract.", "if (value == Integer.MAX_VALUE) { }", "Boundary handling and tests become easier to review.", "Hard-coding limits from memory.", "Wrapper constants document primitive limits and special values."],
    ["Why can wrappers increase memory usage?", "A boxed collection can contain references and wrapper objects instead of compact primitive values.", "Object headers, allocation, and cache locality can make boxed data more expensive at scale.", "int[] values = new int[1_000_000];", "It informs decisions for large numeric datasets.", "Assuming a small benchmark describes every workload.", "Boxing can cost memory and performance in large data paths."],
    ["Why use primitive streams?", "IntStream and similar APIs can process primitive values without boxing every pipeline element.", "They provide numeric operations such as sum and average with primitive-specialized stages.", "IntStream.of(1, 2, 3).sum();", "Large numeric transformations can reduce wrapper overhead.", "Assuming primitive streams are always faster without measuring.", "Primitive streams are an option for reducing boxing in numeric pipelines."],
    ["Why are wrapper objects immutable?", "Immutability makes a wrapper's value stable and safe to share.", "An operation such as increment creates a new value and reassigns the variable rather than changing the old object.", "Integer n = 1;\nn++;", "Immutable values are easier to reason about in collections and concurrent code.", "Describing n++ as mutation of the old Integer object.", "Wrapper operations produce values; wrapper instances do not change."],
    ["Why use Objects.equals with wrappers?", "Objects.equals safely compares two references, including when either is null.", "It avoids calling equals on a possibly null receiver.", "boolean same = Objects.equals(expected, actual);", "It is useful for nullable fields and assertions.", "Calling expected.equals when expected may be null.", "Objects.equals provides null-safe value equality."],
    ["Why prefer Integer.compare over subtraction?", "Integer.compare avoids overflow that can make a subtraction-based comparator return the wrong sign.", "The compare method expresses ordering safely across the full int range.", "return Integer.compare(left, right);", "Sorting and comparator contracts remain correct at numeric boundaries.", "Implementing comparators as left - right.", "Use compare APIs for safe wrapper ordering." ]
  ]);

  addLearningQuestions("how", [
    ["How do you convert a String to an int?", "Call Integer.parseInt with the text and optionally provide a radix.", "It returns a primitive int and throws NumberFormatException for invalid input.", "int count = Integer.parseInt(\"42\");", "It converts command-line or configuration text before arithmetic.", "Ignoring invalid input or using the wrong radix.", "Use parseInt and handle invalid input at the boundary."],
    ["How do you create an Integer safely?", "Use autoboxing or Integer.valueOf rather than an explicit wrapper constructor.", "valueOf expresses value semantics and can use the wrapper's caching policy.", "Integer count = Integer.valueOf(42);", "It creates wrapper values for generic APIs and nullable fields.", "Using new Integer(42) or comparing the result with ==.", "Prefer valueOf or autoboxing for wrapper creation."],
    ["How does Integer participate in arithmetic?", "It is unboxed to int when an operator requires a primitive, and the result may be boxed again.", "The wrapper must be non-null before the arithmetic expression runs.", "Integer a = 2;\nInteger b = a + 3;", "Collection values can enter calculations after validation.", "Missing the hidden null-sensitive unboxing step.", "Arithmetic on Integer involves unboxing and possibly boxing the result."],
    ["How do you compare two nullable Integers?", "Use Objects.equals for equality or explicit null ordering logic for ordering.", "compareTo requires a non-null receiver, while == checks reference identity.", "boolean same = Objects.equals(a, b);", "It handles optional values without accidental null failures.", "Using a.equals when a may be null.", "Use null-safe equality and define ordering rules explicitly."],
    ["How do you parse a hexadecimal integer?", "Call Integer.parseInt with radix 16.", "The radix tells the parser how characters map to numeric digits.", "int value = Integer.parseInt(\"FF\", 16);", "It supports flags, colors, addresses, and encoded configuration.", "Parsing hexadecimal text with the decimal overload.", "Pass the correct radix for non-decimal input."],
    ["How do you guard against null before unboxing?", "Check the wrapper, provide a domain-valid default, or reject null before a primitive is required.", "requireNonNullElse is useful for a valid default; requireNonNull is useful when absence is invalid.", "int limit = Objects.requireNonNullElse(config.limit(), 10);", "It keeps null handling at the input boundary.", "Adding zero without confirming that zero is meaningful.", "Choose validation or a domain-specific default before unboxing."],
    ["How do you get the primitive from an Integer explicitly?", "Call intValue on a non-null Integer.", "Explicit extraction can make a conversion boundary clear, although unboxing is often concise.", "int value = boxed.intValue();", "It documents conversion in an API or calculation.", "Calling intValue on a potentially null reference.", "intValue extracts the primitive and requires a non-null wrapper."],
    ["How do you sum a List<Integer>?", "Use a loop with validated unboxing or map the stream to an IntStream before summing.", "mapToInt(Integer::intValue) makes the primitive conversion explicit.", "int sum = values.stream().mapToInt(Integer::intValue).sum();", "It avoids accumulating a boxed result for ordinary addition.", "Allowing null elements to reach intValue.", "Map boxed values to a primitive stream for numeric aggregation."],
    ["How do you compare wrapper values for ordering?", "Use compareTo for known non-null values or a static compare method for primitive values.", "Integer.compare avoids subtraction overflow.", "int order = Integer.compare(a, b);", "Sorting and range checks need a reliable ordering.", "Subtracting values in a comparator or ignoring null behavior.", "Use compare APIs and define how null should be ordered."],
    ["How do you choose between int and Integer in an API?", "Use int when the value is required and non-null; use Integer when null, generics, or an object contract is meaningful.", "The choice should communicate domain semantics rather than be made only for convenience.", "void retry(int count) {}\nvoid setQuota(Integer quota) {}", "It tells callers whether absence is valid and avoids unnecessary conversions.", "Using wrappers everywhere or treating null as an implicit default.", "Choose based on required value semantics, nullability, and API constraints." ]
  ]);

  const quizQuestions = [
    ["output", "What is the output?", "Integer value = 10;\nint result = value + 5;\nSystem.out.println(result);", ["10", "15", "Compilation error", "NullPointerException"], 1, "value is unboxed to int, 5 is added, and the result is 15."],
    ["output", "What happens when this code runs?", "Integer value = null;\nSystem.out.println(value + 1);", ["0", "1", "NullPointerException", "Compilation error"], 2, "The + operator requires unboxing, and unboxing null throws NullPointerException."],
    ["output", "What is the output?", "Integer value = Integer.parseInt(\"2A\", 16);\nSystem.out.println(value);", ["2A", "42", "16", "NumberFormatException"], 1, "2A in hexadecimal is 42 in decimal."],
    ["output", "What is the output?", "Integer a = 127;\nInteger b = 127;\nSystem.out.println(a == b);", ["true", "false", "Compilation error", "NullPointerException"], 0, "The Java specification guarantees caching for Integer values from -128 through 127."],
    ["output", "What is the output?", "Integer a = 128;\nInteger b = 128;\nSystem.out.println(a.equals(b));", ["true", "false", "Compilation error", "NullPointerException"], 0, "equals compares the wrapped int values, so the result is true."],
    ["what", "Which type is required for a List of int-like values?", null, ["List<int>", "List<Integer>", "List<primitive>", "List<number>"], 1, "Generic type arguments must be reference types, so Integer is used."],
    ["what", "Which method returns a primitive int?", null, ["Integer.valueOf(\"4\")", "Integer.parseInt(\"4\")", "Integer.class", "new Integer(4)"], 1, "parseInt returns int; valueOf returns Integer."],
    ["what", "What does autoboxing convert?", null, ["Integer to int", "int to Integer", "String to int", "null to zero"], 1, "Autoboxing converts a primitive to its corresponding wrapper object."],
    ["what", "Which wrapper represents char?", null, ["String", "Character", "Char", "CodePoint"], 1, "Character is Java's wrapper class for char."],
    ["what", "What does Integer.MAX_VALUE represent?", null, ["The largest long", "The largest int", "The number of Integer objects", "The default Integer"], 1, "It is the largest signed 32-bit int value."],
    ["what", "Which method is null-safe for comparing two wrapper references?", null, ["left == right", "left.equals(right)", "Objects.equals(left, right)", "left.compareTo(right)"], 2, "Objects.equals handles null on either side and compares values when both are non-null."],
    ["what", "What does Boolean.parseBoolean(\"yes\") return?", null, ["true", "false", "null", "NumberFormatException"], 1, "Only true ignoring case parses as true; other text returns false."],
    ["what", "Which operation can throw NullPointerException for a wrapper?", null, ["Reading Integer.MAX_VALUE", "Unboxing a null Integer", "Parsing valid integer text", "Comparing two primitive ints"], 1, "Unboxing requires a real wrapper object and cannot extract a value from null."],
    ["what", "What is the preferred modern way to obtain an Integer object from a value?", null, ["Integer.valueOf(5)", "new Integer(5)", "Integer.allocate(5)", "Integer.object(5)"], 0, "valueOf and autoboxing express value semantics and can use caching."],
    ["why", "Why can List<Integer> be more expensive than int[]?", null, ["Integer cannot store numbers", "It may store references and wrapper objects", "Arrays cannot be indexed", "Lists always use disk"], 1, "Boxed collections can involve references, object headers, allocation, and less compact storage."],
    ["why", "Why should you not use == for arbitrary Integer values?", null, ["Integer has no equals method", "== can compare object identity", "== always unboxes", "Integer values are random"], 1, "When both operands are references, == checks identity and caching can mislead."],
    ["why", "Why does Integer.parseInt throw NumberFormatException?", null, ["The input is invalid for the requested radix", "Integer is immutable", "The result is null", "The JVM cannot load Integer"], 0, "Parsing rejects text that is not a valid number in the selected format."],
    ["why", "Why use Integer.compare instead of a - b in a comparator?", null, ["It boxes both values", "It avoids subtraction overflow", "It sorts strings", "It permits null automatically"], 1, "Subtraction can overflow at integer boundaries; compare returns the correct ordering safely."],
    ["why", "Why can wrapper references represent a domain state that primitives cannot?", null, ["Wrappers can be null", "Wrappers never have values", "Primitives are objects", "Wrappers skip type checking"], 0, "A wrapper reference can distinguish a missing value with null from a present value."],
    ["why", "Why might IntStream be chosen over Stream<Integer>?", null, ["It avoids all iteration", "It can reduce boxing in numeric pipelines", "It changes int range", "It supports null elements"], 1, "IntStream is specialized for primitive int values and can avoid some boxing overhead."]
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