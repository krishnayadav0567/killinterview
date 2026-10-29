/* Java Fundamentals — output quiz questions */
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-001",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 1,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        String a = \"Java\";\n        String b = \"Java\";\n        System.out.println(a == b);\n    }\n}",
  "options": [
    "true",
    "false",
    "Compilation error",
    "Runtime error"
  ],
  "correctAnswer": 0,
  "explanation": "String literals with the same contents are interned in the string pool, so a and b refer to the same instance. Therefore == returns true.",
  "optionExplanations": [
    "Correct. Both literals refer to the same pooled instance.",
    "Incorrect. Literals are pooled, so the references are equal.",
    "Incorrect. The code compiles.",
    "Incorrect. There is no runtime error."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-002",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 2,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        String a = new String(\"Java\");\n        String b = new String(\"Java\");\n        System.out.println(a == b);\n    }\n}",
  "options": [
    "true",
    "false",
    "Compilation error",
    "Runtime error"
  ],
  "correctAnswer": 1,
  "explanation": "new String() creates a new heap object each time, so a and b are different objects even with identical contents. == compares references, so it returns false.",
  "optionExplanations": [
    "Incorrect. == compares object references, not contents.",
    "Correct. Each new String() is a distinct object.",
    "Incorrect. The code compiles.",
    "Incorrect. There is no runtime error."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-003",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 3,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        Integer a = 127;\n        Integer b = 127;\n        System.out.println(a == b);\n    }\n}",
  "options": [
    "true",
    "false",
    "Compilation error",
    "Runtime error"
  ],
  "correctAnswer": 0,
  "explanation": "Java caches Integer values in the range -128 to 127. Autoboxing 127 uses Integer.valueOf(), which returns the cached instance, so a and b refer to the same object and == is true.",
  "optionExplanations": [
    "Correct. Values in the cached range share instances.",
    "Incorrect. 127 is within the Integer cache.",
    "Incorrect. The code compiles.",
    "Incorrect. There is no runtime error."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-004",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 4,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        Integer a = 128;\n        Integer b = 128;\n        System.out.println(a == b);\n    }\n}",
  "options": [
    "true",
    "false",
    "Compilation error",
    "Runtime error"
  ],
  "correctAnswer": 1,
  "explanation": "The Integer cache covers -128 to 127. Autoboxing 128 creates new Integer instances outside the cache, so a and b are distinct objects and == returns false.",
  "optionExplanations": [
    "Incorrect. 128 is outside the cache range.",
    "Correct. New instances are created outside the cache.",
    "Incorrect. The code compiles.",
    "Incorrect. There is no runtime error."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-005",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 5,
  "question": "What is the output?",
  "code": "public class Main {\n    static int x = 10;\n    public static void main(String[] args) {\n        System.out.println(x);\n    }\n}",
  "options": [
    "10",
    "0",
    "Compilation error",
    "Runtime error"
  ],
  "correctAnswer": 0,
  "explanation": "Static fields are initialized when the class is loaded, before main() runs. x is initialized to 10 and prints 10.",
  "optionExplanations": [
    "Correct. Static initialization runs before main.",
    "Incorrect. x is explicitly initialized to 10.",
    "Incorrect. The code compiles.",
    "Incorrect. There is no runtime error."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-006",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 6,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        int a = 5;\n        int b = 2;\n        System.out.println(a / b);\n    }\n}",
  "options": [
    "2",
    "2.5",
    "3",
    "Compilation error"
  ],
  "correctAnswer": 0,
  "explanation": "Both operands are int, so Java performs integer division. 5 / 2 truncates toward zero and produces 2.",
  "optionExplanations": [
    "Correct. Integer division truncates 2.5 to 2.",
    "Incorrect. Both operands are int, so the result is int.",
    "Incorrect. 5 / 2 is 2, not 3.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-007",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 7,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        String s = \"Hello\";\n        s = s + \" World\";\n        System.out.println(s);\n    }\n}",
  "options": [
    "Hello",
    "Hello World",
    "Compilation error",
    "NullPointerException"
  ],
  "correctAnswer": 1,
  "explanation": "String concatenation creates a new String with the combined contents. s now refers to \"Hello World\", which is printed.",
  "optionExplanations": [
    "Incorrect. Concatenation appends \" World\".",
    "Correct. s becomes \"Hello World\".",
    "Incorrect. The code compiles.",
    "Incorrect. There is no null involved."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-008",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 8,
  "question": "Output checkpoint 8: which statement is correct?",
  "code": "// Java Fundamentals output checkpoint 8",
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
  "id": "java-fundamentals-quiz-output-009",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 9,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        String s = null;\n        System.out.println(s.length());\n    }\n}",
  "options": [
    "0",
    "null",
    "Compilation error",
    "NullPointerException"
  ],
  "correctAnswer": 3,
  "explanation": "s is null, so calling an instance method on it throws NullPointerException at runtime.",
  "optionExplanations": [
    "Incorrect. There is no object to call length on.",
    "Incorrect. null is not printed by length().",
    "Incorrect. The code compiles.",
    "Correct. Calling a method on null throws NullPointerException."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-010",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 10,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        String a = \"abc\";\n        String b = new String(\"abc\");\n        System.out.println(a.equals(b));\n    }\n}",
  "options": [
    "true",
    "false",
    "Compilation error",
    "Runtime error"
  ],
  "correctAnswer": 0,
  "explanation": "equals() compares the actual character sequence, not object identity. Both strings contain \"abc\", so it returns true.",
  "optionExplanations": [
    "Correct. equals compares content, which matches.",
    "Incorrect. equals ignores object identity.",
    "Incorrect. The code compiles.",
    "Incorrect. There is no runtime error."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-011",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 11,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        String a = \"abc\";\n        String b = new String(\"abc\");\n        System.out.println(a == b);\n    }\n}",
  "options": [
    "true",
    "false",
    "Compilation error",
    "Runtime error"
  ],
  "correctAnswer": 1,
  "explanation": "a refers to the pooled literal; b is a new heap object. == compares references, so it returns false even though the contents match.",
  "optionExplanations": [
    "Incorrect. == compares references for objects.",
    "Correct. They are different objects.",
    "Incorrect. The code compiles.",
    "Incorrect. There is no runtime error."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-012",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 12,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        Integer a = 1000;\n        Integer b = 1000;\n        System.out.println(a == b);\n    }\n}",
  "options": [
    "true",
    "false",
    "Compilation error",
    "Runtime error"
  ],
  "correctAnswer": 1,
  "explanation": "1000 is outside the Integer cache range (-128 to 127), so autoboxing creates two distinct objects. == returns false.",
  "optionExplanations": [
    "Incorrect. 1000 is not cached.",
    "Correct. New instances are created outside the cache.",
    "Incorrect. The code compiles.",
    "Incorrect. There is no runtime error."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-013",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 13,
  "question": "Output checkpoint 13: which statement is correct?",
  "code": "// Java Fundamentals output checkpoint 13",
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
  "id": "java-fundamentals-quiz-output-014",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 14,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(10 + 20 + \"30\");\n        System.out.println(\"30\" + 10 + 20);\n    }\n}",
  "options": [
    "3030 / 301020",
    "60 / 301020",
    "3060 / 301020",
    "60 / 3030"
  ],
  "correctAnswer": 0,
  "explanation": "Left-to-right evaluation: 10 + 20 is 30, then \"30\" + \"30\" is \"3030\". Second: \"30\" + 10 is \"3010\", then + 20 is \"301020\".",
  "optionExplanations": [
    "Correct. 3030 then 301020.",
    "Incorrect. String concatenation converts numbers after arithmetic where possible.",
    "Incorrect. The result is 3030, not 3060.",
    "Incorrect. The first result is 3030, not 60."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-015",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 15,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        int x = 5;\n        System.out.println(x++ + ++x);\n    }\n}",
  "options": [
    "11",
    "10",
    "12",
    "Compilation error"
  ],
  "correctAnswer": 0,
  "explanation": "x++ evaluates to 5 then x becomes 6. ++x evaluates to 7. The expression is 5 + 7 = 11.",
  "optionExplanations": [
    "Correct. 5 + 7 = 11.",
    "Incorrect. Post-increment returns the old value.",
    "Incorrect. The sum is 11.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-016",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 16,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        String s = \"\";\n        s += \"A\";\n        s += \"B\";\n        System.out.println(s);\n    }\n}",
  "options": [
    "AB",
    "A",
    "B",
    "Compilation error"
  ],
  "correctAnswer": 0,
  "explanation": "Compound assignment s += \"A\" is equivalent to s = s + \"A\", which creates a new String. After two appends, s holds \"AB\".",
  "optionExplanations": [
    "Correct. s becomes \"A\" then \"AB\".",
    "Incorrect. Both appends are applied.",
    "Incorrect. Both appends are applied.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-017",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 17,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        char c = 'A';\n        System.out.println(c + 1);\n    }\n}",
  "options": [
    "66",
    "B",
    "A1",
    "Compilation error"
  ],
  "correctAnswer": 0,
  "explanation": "The char 'A' is promoted to int (65) in arithmetic. 65 + 1 = 66, which is printed as an integer.",
  "optionExplanations": [
    "Correct. 'A' is 65, plus 1 equals 66.",
    "Incorrect. The result is an int, not a char.",
    "Incorrect. Arithmetic is performed, not string concatenation.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-018",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 18,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        boolean b = false;\n        System.out.println(!b && true || false);\n    }\n}",
  "options": [
    "true",
    "false",
    "Compilation error",
    "Runtime error"
  ],
  "correctAnswer": 0,
  "explanation": "!b is true. true && true is true. true || false is true. Logical operators evaluate left to right with && having higher precedence than ||.",
  "optionExplanations": [
    "Correct. !false && true || false = true && true || false = true.",
    "Incorrect. The result is true.",
    "Incorrect. The code compiles.",
    "Incorrect. There is no runtime error."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-019",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 19,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        Object o = \"Hello\";\n        System.out.println(o instanceof String);\n    }\n}",
  "options": [
    "true",
    "false",
    "Compilation error",
    "Runtime error"
  ],
  "correctAnswer": 0,
  "explanation": "o holds a reference to a String object. instanceof checks the runtime type, which is String, so it returns true.",
  "optionExplanations": [
    "Correct. The runtime type of o is String.",
    "Incorrect. o refers to a String instance.",
    "Incorrect. The code compiles.",
    "Incorrect. There is no runtime error."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "java-fundamentals-quiz-output-020",
  "topicId": "java-fundamentals",
  "topicName": "Java Fundamentals",
  "section": "output",
  "sectionOrder": 20,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3};\n        System.out.println(arr.length);\n    }\n}",
  "options": [
    "3",
    "2",
    "4",
    "Compilation error"
  ],
  "correctAnswer": 0,
  "explanation": "The array has three elements initialized by the literal. arr.length returns 3.",
  "optionExplanations": [
    "Correct. The array contains 1, 2, 3 — three elements.",
    "Incorrect. Indices are 0, 1, 2 but length is 3.",
    "Incorrect. There are only three elements.",
    "Incorrect. The code compiles."
  ]
});
