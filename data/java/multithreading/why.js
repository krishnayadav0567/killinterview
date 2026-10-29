/* Multithreading — why learning questions */
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-001",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 1,
  "question": "Why do we need multithreading?",
  "answer": "We need multithreading to perform multiple tasks concurrently, improving responsiveness and CPU utilization on multi-core processors.",
  "explanation": "Threads let an application handle UI events while downloading data, or process many requests at once, without blocking the whole program.",
  "codeExample": "Thread t = new Thread(() -> process());\nt.start();",
  "realWorldUseCase": "A web server handling many client requests simultaneously using separate threads.",
  "commonMistakes": "Assuming multithreading always makes programs faster; contention can slow them down.",
  "interviewReadyAnswer": "Multithreading improves responsiveness and throughput by running tasks concurrently."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-002",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 2,
  "question": "Why is multithreading useful in server applications?",
  "answer": "Servers must handle many simultaneous client connections. Multithreading lets each connection be processed independently without blocking others.",
  "explanation": "A thread pool accepts connections and dispatches them to worker threads, so one slow request does not stall all clients.",
  "codeExample": "ExecutorService pool = Executors.newFixedThreadPool(200);\npool.submit(clientHandler);",
  "realWorldUseCase": "Handling hundreds of HTTP requests concurrently in a Java web server.",
  "commonMistakes": "Creating one thread per request forever, exhausting memory under load.",
  "interviewReadyAnswer": "Multithreading lets servers handle many clients concurrently."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-003",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 3,
  "question": "Why do we need synchronization?",
  "answer": "We need synchronization to prevent threads from corrupting shared mutable state and to guarantee mutual exclusion when accessing shared data.",
  "explanation": "Without synchronization, concurrent reads and writes can produce inconsistent results, lost updates, or visibility problems across CPU cores.",
  "codeExample": "synchronized (this) { balance += amount; }",
  "realWorldUseCase": "Preventing two tellers from updating the same account balance at once.",
  "commonMistakes": "Assuming local variables need synchronization; they are thread-confined.",
  "interviewReadyAnswer": "Synchronization protects shared mutable state from concurrent corruption."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-004",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 4,
  "question": "Why interview checkpoint 4: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-005",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 5,
  "question": "Why do we need ExecutorService?",
  "answer": "ExecutorService manages thread creation, reuse, queuing, and shutdown so you do not create raw threads for every task. Creating threads is expensive and unbounded creation risks resource exhaustion.",
  "explanation": "It pools workers, accepts tasks via submit(), and provides lifecycle control through shutdown() and awaitTermination().",
  "codeExample": "ExecutorService pool = Executors.newFixedThreadPool(10);\npool.submit(task);",
  "realWorldUseCase": "Reusing ten threads to handle hundreds of short-lived tasks.",
  "commonMistakes": "Submitting tasks but never shutting down, leaving threads alive.",
  "interviewReadyAnswer": "ExecutorService manages reusable threads and safe task lifecycle."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-006",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 6,
  "question": "Why is creating too many threads a problem?",
  "answer": "Each thread consumes memory for its stack and costs CPU for context switching. Too many threads cause thrashing, where the OS spends more time switching than executing.",
  "explanation": "Operating systems and the JVM have thread limits. Unbounded thread creation can lead to OutOfMemoryError or degraded responsiveness.",
  "codeExample": "new Thread(task).start() inside a loop with no bound.",
  "realWorldUseCase": "Launching a new thread for every tiny job in a high-traffic service.",
  "commonMistakes": "Assuming more threads always mean more parallel speed.",
  "interviewReadyAnswer": "Too many threads waste memory and CPU on context switching."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-007",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 7,
  "question": "Why can shared mutable data cause problems?",
  "answer": "Shared mutable data can be read and written by multiple threads at once, causing race conditions, lost updates, and inconsistent reads if not coordinated.",
  "explanation": "Without happens-before guarantees, one thread may never see another's writes, and compound operations like count++ are not atomic.",
  "codeExample": "Two threads incrementing a shared counter and getting a lower result than expected.",
  "realWorldUseCase": "A shared shopping cart updated by concurrent requests.",
  "commonMistakes": "Assuming reading a shared int is always safe.",
  "interviewReadyAnswer": "Shared mutable state needs synchronization to remain consistent."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-008",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 8,
  "question": "Why do we need thread-safe collections?",
  "answer": "Regular collections such as ArrayList and HashMap are not designed for concurrent modification. Concurrent use can throw ConcurrentModificationException or corrupt internal structures.",
  "explanation": "Thread-safe or concurrent collections coordinate access internally so multiple threads can use them safely without external locking.",
  "codeExample": "Map<String, Integer> cache = new ConcurrentHashMap<>();",
  "realWorldUseCase": "Sharing a read-mostly cache among request threads.",
  "commonMistakes": "Wrapping every access in synchronized blocks instead of using concurrent collections.",
  "interviewReadyAnswer": "Thread-safe collections prevent corruption during concurrent access."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-009",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 9,
  "question": "Why interview checkpoint 9: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-010",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 10,
  "question": "Why can deadlocks occur?",
  "answer": "Deadlocks occur when threads hold locks and wait for locks held by each other, forming a circular wait that no thread can break.",
  "explanation": "Lock ordering, tryLock with timeouts, and avoiding nested locks reduce deadlock risk. The JVM cannot automatically recover from deadlock.",
  "codeExample": "Thread A locks account1 then waits account2; Thread B locks account2 then waits account1.",
  "realWorldUseCase": "Transferring money between accounts locked in different orders.",
  "commonMistakes": "Assuming deadlock requires many threads; two threads can deadlock.",
  "interviewReadyAnswer": "Deadlock is a circular lock wait with no escape."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-011",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 11,
  "question": "Why do we need thread-safe collections?",
  "answer": "Ordinary collections fail under concurrent use: iterators may throw ConcurrentModificationException, and internal arrays or buckets can be left in corrupt states.",
  "explanation": "Concurrent collections such as ConcurrentHashMap use lock stripping or compare-and-swap to allow high concurrency while staying consistent.",
  "codeExample": "ConcurrentHashMap map = new ConcurrentHashMap<>();",
  "realWorldUseCase": "Letting many threads update a shared counter map without a single global lock.",
  "commonMistakes": "Assuming Collections.synchronizedList scales like ConcurrentHashMap under heavy write load.",
  "interviewReadyAnswer": "Thread-safe collections keep collections correct under concurrent readers and writers."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-012",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 12,
  "question": "Why can shared mutable data cause problems?",
  "answer": "When multiple threads read and write the same data without coordination, operations can interleave and produce wrong results, stale values, or corrupted objects.",
  "explanation": "The Java Memory Model permits threads to cache variables. Only synchronization, volatile, or atomic types establish visibility and atomicity.",
  "codeExample": "boolean running = true; // one thread sets false, another may never see it",
  "realWorldUseCase": "A cancellation flag that the worker thread never observes.",
  "commonMistakes": "Thinking that reading a primitive is always thread-safe.",
  "interviewReadyAnswer": "Shared mutable data requires coordination to stay consistent."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-013",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 13,
  "question": "Why do we need CompletableFuture?",
  "answer": "CompletableFuture lets you compose asynchronous stages without blocking threads. You can chain transformations, combine multiple futures, and handle failures declaratively.",
  "explanation": "It decouples task submission from result consumption, letting the main thread continue while work runs on a supplied executor.",
  "codeExample": "CompletableFuture.supplyAsync(() -> fetchUser())\n    .thenApply(user -> fetchOrders(user));\n",
  "realWorldUseCase": "Calling two services in parallel and combining results when both finish.",
  "commonMistakes": "Using CompletableFuture for simple tasks where a plain thread is clearer.",
  "interviewReadyAnswer": "CompletableFuture enables non-blocking composition of async work."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-014",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 14,
  "question": "Why interview checkpoint 14: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-015",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 15,
  "question": "Why use atomic classes?",
  "answer": "Atomic classes such as AtomicInteger provide lock-free thread-safe updates for single variables, often faster than synchronized for counters and flags.",
  "explanation": "They use hardware compare-and-swap instructions to avoid thread blocking, though they only cover individual variable operations.",
  "codeExample": "AtomicInteger requests = new AtomicInteger();\nrequests.incrementAndGet();",
  "realWorldUseCase": "Counting served requests across threads without locks.",
  "commonMistakes": "Assuming an AtomicInteger makes an entire method atomic.",
  "interviewReadyAnswer": "Atomic classes give fast, lock-free safety for single variables."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-016",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 16,
  "question": "Why use thread pools instead of raw threads?",
  "answer": "Thread pools reuse threads, reducing creation overhead and letting you bound concurrency. Raw threads created per task can exhaust memory and CPU under load.",
  "explanation": "ExecutorService lets you queue rejected tasks, reuse workers, and shut down cleanly.",
  "codeExample": "ExecutorService pool = Executors.newFixedThreadPool(16);",
  "realWorldUseCase": "Handling a burst of tasks with a fixed number of workers instead of unbounded threads.",
  "commonMistakes": "Submitting long blocking tasks to a small pool and starving it.",
  "interviewReadyAnswer": "Thread pools bound concurrency and reuse expensive threads."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-017",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 17,
  "question": "Why is creating too many threads a problem?",
  "answer": "Each thread uses stack memory and scheduling cycles. Too many threads cause excessive context switching and can throw OutOfMemoryError.",
  "explanation": "Bounded thread pools and task queues keep resource use predictable under load.",
  "codeExample": "Starting a thread per request in a high-traffic service.",
  "realWorldUseCase": "A server slowing down under thousands of short-lived threads.",
  "commonMistakes": "Assuming unlimited threads equal unlimited parallelism.",
  "interviewReadyAnswer": "Too many threads waste memory and CPU on context switching."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-018",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 18,
  "question": "Why do we need thread-local variables?",
  "answer": "ThreadLocal lets each thread keep its own copy of a variable, avoiding sharing and synchronization for per-thread state such as request context or non-thread-safe formatters.",
  "explanation": "It removes the need to pass context through every method call and avoids contention on shared instances.",
  "codeExample": "ThreadLocal<SimpleDateFormat> formatter = ThreadLocal.withInitial(() -> new SimpleDateFormat());",
  "realWorldUseCase": "Giving each thread its own date formatter instead of synchronizing one shared instance.",
  "commonMistakes": "Storing large objects in ThreadLocal and forgetting to remove them in thread pools.",
  "interviewReadyAnswer": "ThreadLocal provides per-thread state without synchronization."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-019",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 19,
  "question": "Why interview checkpoint 19: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-020",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 20,
  "question": "Why do we need ExecutorService?",
  "answer": "ExecutorService manages thread creation, pooling, task queuing, and shutdown, so you avoid the cost and risk of creating raw threads for every task.",
  "explanation": "It offers submit() returning Future, shutdown(), and awaitTermination(), letting you control concurrency safely.",
  "codeExample": "ExecutorService pool = Executors.newFixedThreadPool(8);\npool.submit(task);",
  "realWorldUseCase": "Running many tasks on a fixed set of reused worker threads.",
  "commonMistakes": "Submitting tasks but never calling shutdown(), keeping the JVM alive.",
  "interviewReadyAnswer": "ExecutorService centralizes and bounds thread management."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-021",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 21,
  "question": "Why is thread priority not reliable for correctness?",
  "answer": "Thread priority is only a scheduling hint and is platform-dependent. The OS may ignore it, so it cannot guarantee ordering or mutual exclusion.",
  "explanation": "Never use priority to replace synchronization; correctness must come from locks, atomics, or coordination.",
  "codeExample": "thread.setPriority(Thread.MAX_PRIORITY);",
  "realWorldUseCase": "Giving a UI thread a hint to run more often than a background indexer.",
  "commonMistakes": "Believing a MAX_PRIORITY thread always runs before a MIN_PRIORITY thread.",
  "interviewReadyAnswer": "Priority is a hint, not a synchronization tool."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-022",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 22,
  "question": "Why can shared mutable data cause problems?",
  "answer": "Unsynchronized shared mutable data lets threads observe partially updated values, lost writes, or corrupted objects due to interleaved operations.",
  "explanation": "Coordination with synchronized, volatile, or atomics establishes visibility and atomicity so shared state stays consistent.",
  "codeExample": "Two threads incrementing the same counter and losing one update.",
  "realWorldUseCase": "A shared counter corrupted by concurrent increments.",
  "commonMistakes": "Thinking simple reads and writes are always safe.",
  "interviewReadyAnswer": "Shared mutable state must be coordinated to avoid corruption."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-023",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 23,
  "question": "Why can deadlocks occur?",
  "answer": "Deadlocks occur when threads hold locks and wait for locks held by each other, forming a circular dependency that blocks everyone.",
  "explanation": "Consistent lock ordering, tryLock with timeouts, and minimizing nested locks prevent circular wait conditions.",
  "codeExample": "A holds lock1 waits lock2; B holds lock2 waits lock1.",
  "realWorldUseCase": "Two fund transfers locking accounts in opposite order.",
  "commonMistakes": "Assuming deadlock needs many threads; two threads can deadlock.",
  "interviewReadyAnswer": "Deadlock is a circular lock wait that blocks all involved threads."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-024",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 24,
  "question": "Why interview checkpoint 24: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-025",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 25,
  "question": "Why do we need thread-safe collections?",
  "answer": "Standard collections are not safe for concurrent modification and can throw exceptions or corrupt internal state when shared across threads.",
  "explanation": "Thread-safe collections coordinate access internally or use lock-free techniques so multiple threads can read and write safely.",
  "codeExample": "ConcurrentHashMap map = new ConcurrentHashMap<>();",
  "realWorldUseCase": "Sharing a configuration cache among request threads safely.",
  "commonMistakes": "Assuming Collections.synchronizedList offers the same concurrency as ConcurrentHashMap.",
  "interviewReadyAnswer": "Thread-safe collections keep data correct under concurrent access."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-026",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 26,
  "question": "Why is volatile insufficient for atomic increment?",
  "answer": "volatile gives visibility and ordering but not atomicity. count++ reads, modifies, and writes, so two threads can read the same value and overwrite each other.",
  "explanation": "Use AtomicInteger.incrementAndGet() or synchronized to make the whole operation indivisible.",
  "codeExample": "volatile int count = 0;\ncount++; // lost updates possible",
  "realWorldUseCase": "Generating unique sequence numbers with volatile and seeing duplicates.",
  "commonMistakes": "Believing volatile makes compound operations thread-safe.",
  "interviewReadyAnswer": "volatile does not make count++ atomic."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-027",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 27,
  "question": "Why use synchronization?",
  "answer": "Synchronization enforces mutual exclusion so only one thread executes guarded code for a lock at a time, preventing races and ensuring visibility.",
  "explanation": "It is the simplest way to protect multi-step invariants that span several variables or method calls.",
  "codeExample": "synchronized (account) { transfer(amount); }",
  "realWorldUseCase": "Moving money between accounts without another thread seeing an intermediate state.",
  "commonMistakes": "Over-synchronizing everything and destroying performance.",
  "interviewReadyAnswer": "Synchronization guards critical sections with mutual exclusion."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-028",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 28,
  "question": "Why can starvation happen?",
  "answer": "Starvation occurs when a thread is repeatedly denied CPU or lock access because other threads or higher-priority threads monopolize resources.",
  "explanation": "It can be caused by thread priority abuse, long synchronized blocks, or greedy thread pools.",
  "codeExample": "A low-priority housekeeping thread never runs while high-priority threads stay busy.",
  "realWorldUseCase": "Background cleanup starving under user-request traffic.",
  "commonMistakes": "Confusing starvation with deadlock; the thread is alive but never scheduled.",
  "interviewReadyAnswer": "Starvation is a thread being perpetually denied CPU or locks."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-029",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 29,
  "question": "Why use atomic classes instead of synchronized for simple counters?",
  "answer": "Atomic classes use lock-free compare-and-swap instructions and avoid thread blocking, making them faster for single-variable updates than acquiring a lock.",
  "explanation": "They scale better under contention because threads do not park and context-switch as often.",
  "codeExample": "AtomicInteger hits = new AtomicInteger();\nhits.incrementAndGet();",
  "realWorldUseCase": "Counting cache hits across many threads without lock contention.",
  "commonMistakes": "Using atomic classes when multiple variables must change together atomically.",
  "interviewReadyAnswer": "Atomic classes give lock-free speed for single-variable updates."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-why-030",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "why",
  "sectionOrder": 30,
  "question": "Why do we need CompletableFuture?",
  "answer": "CompletableFuture lets you express asynchronous pipelines, combine multiple results, and handle failures without blocking threads or managing callbacks manually.",
  "explanation": "It supports chaining, composition, and exception handling across stages, making async code readable and maintainable.",
  "codeExample": "future1.thenCombine(future2, (a, b) -> a + b);",
  "realWorldUseCase": "Fetching profile and preferences in parallel, then merging them.",
  "commonMistakes": "Using CompletableFuture when simple sequential code is clearer.",
  "interviewReadyAnswer": "CompletableFuture makes async composition declarative and non-blocking."
});
