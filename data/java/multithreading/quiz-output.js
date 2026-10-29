/* Multithreading — output quiz questions */
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-001",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 1,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        Thread t = new Thread(() ->\n            System.out.println(\"Child\")\n        );\n\n        t.run();\n        System.out.println(\"Main\");\n    }\n}",
  "options": [
    "Child, then Main",
    "Main, then Child",
    "Child only",
    "Compilation error"
  ],
  "correctAnswer": 0,
  "explanation": "Calling run() directly executes its body on the current thread. It does not create a new thread. Therefore \"Child\" is printed before \"Main\".",
  "optionExplanations": [
    "Correct. run() executes synchronously on the main thread.",
    "Incorrect. That order would be possible with start(), not direct run().",
    "Incorrect. The main thread continues after run() returns.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-002",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 2,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        Thread t = new Thread(() ->\n            System.out.println(\"Child\")\n        );\n\n        t.start();\n        System.out.println(\"Main\");\n    }\n}",
  "options": [
    "Child, then Main",
    "Main, then Child",
    "Either order is possible",
    "Compilation error"
  ],
  "correctAnswer": 2,
  "explanation": "start() creates a new thread that runs concurrently with main. The order of \"Child\" and \"Main\" is not deterministic and depends on the OS scheduler.",
  "optionExplanations": [
    "Incorrect. Not guaranteed with start().",
    "Incorrect. Not guaranteed with start().",
    "Correct. Thread scheduling order is non-deterministic.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-003",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 3,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i < 3; i++) {\n            new Thread(() -> System.out.print(i)).start();\n        }\n    }\n}",
  "options": [
    "012",
    "021",
    "Any permutation of 0,1,2",
    "Compilation error"
  ],
  "correctAnswer": 2,
  "explanation": "Each thread captures the loop variable i (effectively final in the lambda). The threads run concurrently, so the print order depends on thread scheduling.",
  "optionExplanations": [
    "Incorrect. Not guaranteed with concurrent threads.",
    "Incorrect. Not guaranteed with concurrent threads.",
    "Correct. Thread scheduling order is non-deterministic.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-004",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 4,
  "question": "Output checkpoint 4: which statement is correct?",
  "code": "// Multithreading output checkpoint 4",
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
  "id": "multithreading-quiz-output-005",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 5,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        Thread t = new Thread(() -> {\n            try { Thread.sleep(1000); } catch (InterruptedException e) {}\n            System.out.println(\"Child\");\n        });\n        t.start();\n        System.out.println(\"Main\");\n    }\n}",
  "options": [
    "Main, then Child",
    "Child, then Main",
    "Either order",
    "Compilation error"
  ],
  "correctAnswer": 0,
  "explanation": "The child thread sleeps for 1000ms before printing. Main prints immediately, so \"Main\" appears first.",
  "optionExplanations": [
    "Correct. Main prints before the sleeping child wakes up.",
    "Incorrect. The child sleeps for 1 second.",
    "Incorrect. Main prints immediately, so order is deterministic here.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-006",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 6,
  "question": "What is the output?",
  "code": "public class Main {\n    static int count = 0;\n    public static void main(String[] args) throws InterruptedException {\n        Thread t1 = new Thread(() -> { for (int i = 0; i < 1000; i++) count++; });\n        Thread t2 = new Thread(() -> { for (int i = 0; i < 1000; i++) count++; });\n        t1.start(); t2.start();\n        t1.join(); t2.join();\n        System.out.println(count);\n    }\n}",
  "options": [
    "2000",
    "A value less than 2000",
    "Either 2000 or less",
    "Compilation error"
  ],
  "correctAnswer": 2,
  "explanation": "count++ is not atomic. Both threads read-modify-write concurrently, causing lost updates. The final value is unpredictable and usually less than 2000.",
  "optionExplanations": [
    "Incorrect. Not guaranteed due to race conditions.",
    "Incorrect. Could be 2000 if lucky, but usually less.",
    "Correct. The result is unpredictable due to lost updates.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-007",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 7,
  "question": "What is the output?",
  "code": "public class Main {\n    public static synchronized void foo() { System.out.println(\"foo\"); }\n    public static void main(String[] args) {\n        new Thread(Main::foo).start();\n        new Thread(Main::foo).start();\n    }\n}",
  "options": [
    "foo, foo",
    "foo\nfoo",
    "Either order",
    "Compilation error"
  ],
  "correctAnswer": 2,
  "explanation": "synchronized serializes access but does not guarantee which thread runs first. Both print \"foo\", but order is non-deterministic.",
  "optionExplanations": [
    "Incorrect. Synchronization does not guarantee order.",
    "Incorrect. Same as A, order not guaranteed.",
    "Correct. Both threads print foo, order non-deterministic.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-008",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 8,
  "question": "What is the output?",
  "code": "public class Main {\n    volatile boolean running = true;\n    public static void main(String[] args) {\n        Main m = new Main();\n        new Thread(() -> { while (m.running) {} System.out.println(\"stopped\"); }).start();\n        m.running = false;\n    }\n}",
  "options": [
    "stopped",
    "Infinite loop",
    "Either stopped or infinite loop",
    "Compilation error"
  ],
  "correctAnswer": 0,
  "explanation": "volatile guarantees visibility, so the worker thread will eventually see running = false and print \"stopped\".",
  "optionExplanations": [
    "Correct. volatile ensures the worker sees the update.",
    "Incorrect. volatile prevents caching, so the loop terminates.",
    "Incorrect. volatile guarantees visibility.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-009",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 9,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        Thread t = new Thread(() -> System.out.println(\"daemon\"));\n        t.setDaemon(true);\n        t.start();\n        System.out.println(\"main done\");\n    }\n}",
  "options": [
    "main done, then daemon",
    "main done only",
    "daemon, then main done",
    "Either order"
  ],
  "correctAnswer": 1,
  "explanation": "The daemon thread may not get CPU time before main exits. When only daemon threads remain, the JVM exits, potentially without printing \"daemon\".",
  "optionExplanations": [
    "Incorrect. Not guaranteed; the JVM may exit first.",
    "Correct. main can finish and exit before the daemon runs.",
    "Incorrect. Not guaranteed.",
    "Incorrect. While order is non-deterministic, the JVM may exit before daemon runs."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-010",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 10,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        Thread t = Thread.currentThread();\n        System.out.println(t.getName() + \" \" + t.getPriority());\n    }\n}",
  "options": [
    "main 5",
    "main 10",
    "main 1",
    "Compilation error"
  ],
  "correctAnswer": 0,
  "explanation": "The main thread has name \"main\" and priority 5 (NORM_PRIORITY) by default.",
  "optionExplanations": [
    "Correct. Name is main, priority is NORM_PRIORITY (5).",
    "Incorrect. MAX_PRIORITY is 10, not default.",
    "Incorrect. MIN_PRIORITY is 1, not default.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-011",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 11,
  "question": "Output checkpoint 11: which statement is correct?",
  "code": "// Multithreading output checkpoint 11",
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
  "id": "multithreading-quiz-output-012",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 12,
  "question": "Output checkpoint 12: which statement is correct?",
  "code": "// Multithreading output checkpoint 12",
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
  "id": "multithreading-quiz-output-013",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 13,
  "question": "Output checkpoint 13: which statement is correct?",
  "code": "// Multithreading output checkpoint 13",
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
  "id": "multithreading-quiz-output-014",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 14,
  "question": "Output checkpoint 14: which statement is correct?",
  "code": "// Multithreading output checkpoint 14",
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
  "id": "multithreading-quiz-output-015",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 15,
  "question": "Output checkpoint 15: which statement is correct?",
  "code": "// Multithreading output checkpoint 15",
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
  "id": "multithreading-quiz-output-016",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 16,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(true || false);\n    }\n}",
  "options": [
    "true",
    "false",
    "Compilation error",
    "Runtime error"
  ],
  "correctAnswer": 0,
  "explanation": "The || operator returns true if at least one operand is true. true || false evaluates to true.",
  "optionExplanations": [
    "Correct. true || false is true.",
    "Incorrect. The result is true.",
    "Incorrect. The code compiles.",
    "Incorrect. There is no runtime error."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-017",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 17,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        int x = 5;\n        System.out.println(x++);\n    }\n}",
  "options": [
    "5",
    "6",
    "0",
    "Compilation error"
  ],
  "correctAnswer": 0,
  "explanation": "x++ is a postfix increment. It returns the current value 5, then increments x to 6.",
  "optionExplanations": [
    "Correct. Post-increment returns the old value.",
    "Incorrect. The printed value is 5, not 6.",
    "Incorrect. 0 is unrelated.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-018",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 18,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3};\n        System.out.println(arr[2]);\n    }\n}",
  "options": [
    "1",
    "2",
    "3",
    "ArrayIndexOutOfBoundsException"
  ],
  "correctAnswer": 2,
  "explanation": "arr[2] accesses index 2 of a 3-element array, which is the value 3.",
  "optionExplanations": [
    "Incorrect. arr[0] is 1, arr[1] is 2, arr[2] is 3.",
    "Incorrect. arr[1] is 2, arr[2] is 3.",
    "Correct. arr[2] is 3.",
    "Incorrect. Index 2 is valid for a 3-element array."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-019",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 19,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        String s = \"Hello\";\n        System.out.println(s.length());\n    }\n}",
  "options": [
    "5",
    "6",
    "Hello",
    "Compilation error"
  ],
  "correctAnswer": 0,
  "explanation": "s.length() returns 5, the number of characters in \"Hello\".",
  "optionExplanations": [
    "Correct. \"Hello\" has 5 characters.",
    "Incorrect. The length is 5, not 6.",
    "Incorrect. s.length() returns the length, not the string itself.",
    "Incorrect. The code compiles."
  ]
});
window.JAVAQuestions.addQuiz({
  "id": "multithreading-quiz-output-020",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "output",
  "sectionOrder": 20,
  "question": "What is the output?",
  "code": "public class Main {\n    public static void main(String[] args) {\n        Thread t = new Thread(() -> System.out.println(\"a\"));\n        Thread s = new Thread(() -> System.out.println(\"b\"));\n        t.start();\n        s.start();\n    }\n}",
  "options": [
    "a, then b",
    "b, then a",
    "Either order",
    "Compilation error"
  ],
  "correctAnswer": 2,
  "explanation": "Thread scheduling is non-deterministic. Both threads are started and may run in either order depending on the OS scheduler.",
  "optionExplanations": [
    "Incorrect. Not guaranteed with concurrent threads.",
    "Incorrect. Not guaranteed with concurrent threads.",
    "Correct. Thread scheduling order is non-deterministic.",
    "Incorrect. The code compiles."
  ]
});
