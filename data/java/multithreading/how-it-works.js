/* Multithreading — how learning questions */
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-001",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 1,
  "question": "How does Java create and start a thread?",
  "answer": "Creating a Thread object only allocates the object. Calling start() tells the JVM to create a new thread of execution, allocate a stack, and schedule run() on it.",
  "explanation": "start() returns immediately. The new thread moves from NEW to RUNNABLE and runs the run() method. Calling run() directly just executes on the current thread.",
  "codeExample": "Thread t = new Thread(() -> System.out.println(\"run\"));\nt.start();",
  "realWorldUseCase": "Launching a background task without blocking the caller.",
  "commonMistakes": "Calling run() instead of start() and expecting a new thread.",
  "interviewReadyAnswer": "start() creates the real thread; run() is the code it executes."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-002",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 2,
  "question": "What happens internally when we call start()?",
  "answer": "start() registers the thread with the JVM's thread scheduler, creates a native OS thread and stack, and transitions the state from NEW to RUNNABLE. The JVM then invokes run() on the new thread.",
  "explanation": "The calling thread continues independently while the new thread schedules run(). If run() has already been called or the thread is not NEW, start() throws IllegalThreadStateException.",
  "codeExample": "t.start(); // new thread begins run()",
  "realWorldUseCase": "Starting many worker threads from main.",
  "commonMistakes": "Calling start() twice on the same thread.",
  "interviewReadyAnswer": "start() creates a native thread and schedules run() on it."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-003",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 3,
  "question": "What is the difference between calling start() and calling run()?",
  "answer": "start() creates a new thread and runs run() on that thread. Calling run() directly executes the code on the current thread as an ordinary method call, with no new thread.",
  "explanation": "With start(), output order is not deterministic because threads run concurrently. With direct run(), the code runs sequentially on the caller.",
  "codeExample": "t.run(); // runs on current thread\nt.start(); // runs on new thread",
  "realWorldUseCase": "Seeing \"Child\" print before \"Main\" only with direct run(), not guaranteed with start().",
  "commonMistakes": "Calling run() and assuming concurrency.",
  "interviewReadyAnswer": "start() creates concurrency; run() alone is a normal method call."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-004",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 4,
  "question": "How interview checkpoint 4: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-005",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 5,
  "question": "How does thread scheduling work?",
  "answer": "Thread scheduling uses priorities and preemption to choose which RUNNABLE thread runs. Exact policy is delegated to the operating system and varies by platform.",
  "explanation": "Java cannot guarantee that the highest-priority thread always runs first. Threads may be time-sliced or preempted depending on the OS.",
  "codeExample": "thread.setPriority(Thread.NORM_PRIORITY);",
  "realWorldUseCase": "Giving a hint that a UI thread is more important than a background thread.",
  "commonMistakes": "Writing code that depends on a specific scheduling order.",
  "interviewReadyAnswer": "Thread scheduling is platform-dependent and priority-based but not guaranteed."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-006",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 6,
  "question": "How does synchronization work internally?",
  "answer": "Every object has an intrinsic monitor lock. synchronized acquires the lock, runs the block, and releases it on exit, even via exceptions. Other threads block until the lock is free.",
  "explanation": "The lock is reentrant, so the same thread can re-enter synchronized code on the same object. The JVM tracks lock ownership and waiting threads.",
  "codeExample": "synchronized (this) { balance += amount; }",
  "realWorldUseCase": "Serializing updates to a shared balance.",
  "commonMistakes": "Synchronizing on different objects for the same data.",
  "interviewReadyAnswer": "Synchronization uses per-object reentrant monitor locks."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-007",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 7,
  "question": "How does the monitor lock work?",
  "answer": "The monitor lock is associated with each Java object. A synchronized block compiles to monitorenter and monitorexit bytecode instructions that acquire and release the object's lock.",
  "explanation": "Only one thread holds the lock at a time. Waiting threads enter an entry set and are woken when the lock is released or notify/notifyAll is called.",
  "codeExample": "synchronized (lock) { ... } // monitorenter/monitorexit",
  "realWorldUseCase": "Protecting a shared counter with one lock.",
  "commonMistakes": "Assuming synchronized locks the variable rather than the object.",
  "interviewReadyAnswer": "The monitor lock is per-object and acquired/released around synchronized blocks."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-008",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 8,
  "question": "How does the Java Memory Model affect threads?",
  "answer": "The JMM defines how threads see shared memory, operation ordering, and happens-before guarantees. Without synchronization, writes may not be visible to other threads and operations can be reordered.",
  "explanation": "Synchronization and volatile create memory barriers so writes by one thread become visible to another in a predictable order.",
  "codeExample": "volatile boolean ready = true; // visibility edge",
  "realWorldUseCase": "Reasoning whether a worker sees a shutdown flag set by main.",
  "commonMistakes": "Assuming writes are instantly visible to all threads.",
  "interviewReadyAnswer": "The JMM defines visibility and ordering guarantees across threads."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-009",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 9,
  "question": "How interview checkpoint 9: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-010",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 10,
  "question": "How does ExecutorService manage thread pools?",
  "answer": "ExecutorService keeps a set of worker threads and a task queue. Submitted tasks are queued; idle workers dequeue and run them. It handles lifecycle via shutdown() and awaitTermination().",
  "explanation": "Fixed pools keep a constant thread count; cached pools grow and shrink; scheduled pools run delayed or periodic tasks.",
  "codeExample": "ExecutorService pool = Executors.newFixedThreadPool(4);\npool.submit(task);",
  "realWorldUseCase": "Reusing four threads for many requests instead of creating threads per request.",
  "commonMistakes": "Never shutting down the pool, keeping threads alive.",
  "interviewReadyAnswer": "ExecutorService reuses workers from a pool to run queued tasks."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-011",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 11,
  "question": "How does CompletableFuture manage async stages?",
  "answer": "CompletableFuture holds a result that may complete later. When completed, dependent stages (thenApply, thenAccept) run on a supplied or common fork-join pool.",
  "explanation": "Exceptions propagate through exceptionally() or handle(). Methods like allOf() and anyOf() combine multiple futures without blocking the caller.",
  "codeExample": "CompletableFuture.supplyAsync(() -> compute())\n    .thenApply(x -> x * 2)\n    .exceptionally(ex -> 0);",
  "realWorldUseCase": "Chaining async service calls without blocking threads.",
  "commonMistakes": "Ignoring exceptions in async chains.",
  "interviewReadyAnswer": "CompletableFuture chains dependent async stages via callbacks on executors."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-012",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 12,
  "question": "How does the Java Memory Model define happens-before?",
  "answer": "A happens-before edge guarantees that writes by one action are visible to and ordered before another. Rules include program order within a thread, monitor lock release/acquire, volatile write/read, thread start, and termination.",
  "explanation": "If action A happens-before B, A's memory effects are visible to B and appear to precede it.",
  "codeExample": "Unlocking a monitor happens-before locking the same monitor.",
  "realWorldUseCase": "Establishing that a writer's update reaches a reader through a lock.",
  "commonMistakes": "Assuming program order alone creates cross-thread visibility.",
  "interviewReadyAnswer": "Happens-before rules create visibility and ordering edges between actions."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-013",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 13,
  "question": "How does wait() differ from sleep()?",
  "answer": "sleep() pauses the current thread for a time and keeps any locks it holds. wait() releases the monitor lock and waits until another thread calls notify() or notifyAll() on the same object.",
  "explanation": "sleep() is static on Thread and does not release locks. wait() must be called inside a synchronized block and releases the lock while waiting.",
  "codeExample": "Thread.sleep(1000);\nsynchronized (lock) { lock.wait(); }",
  "realWorldUseCase": "Pausing a task versus coordinating producer/consumer on a shared queue.",
  "commonMistakes": "Calling wait() outside synchronized, which throws IllegalMonitorStateException.",
  "interviewReadyAnswer": "sleep keeps locks; wait releases the lock and waits for a signal."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-014",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 14,
  "question": "How interview checkpoint 14: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-015",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 15,
  "question": "How does thread interrupt work?",
  "answer": "interrupt() sets a boolean interrupt status on the target thread. It does not stop the thread forcibly; the target code must check the flag and stop cooperatively.",
  "explanation": "Blocking methods like sleep() or wait() detect the flag and throw InterruptedException, clearing the status. Code can check Thread.currentThread().isInterrupted().",
  "codeExample": "thread.interrupt();\nif (Thread.currentThread().isInterrupted()) { return; }",
  "realWorldUseCase": "Requesting a long import task to cancel.",
  "commonMistakes": "Believing interrupt() kills the thread instantly.",
  "interviewReadyAnswer": "Interrupt sets a flag that cooperative code checks to stop."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-016",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 16,
  "question": "How does thread yield() work internally?",
  "answer": "yield() is a static hint telling the scheduler the current thread is willing to pause. The scheduler may move it to RUNNABLE and let equal-priority threads run.",
  "explanation": "It does not release locks, does not block, and may be ignored by the scheduler. It is rarely useful in production.",
  "codeExample": "Thread.yield();",
  "realWorldUseCase": "Giving a progress-reporting thread a chance to run.",
  "commonMistakes": "Relying on yield() for correctness or fairness.",
  "interviewReadyAnswer": "yield() is a non-binding hint to let same-priority threads run."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-017",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 17,
  "question": "How does ThreadLocal store per-thread values?",
  "answer": "Each ThreadLocal holds a map inside each Thread object mapping the ThreadLocal instance to that thread's value. get() returns the current thread's entry.",
  "explanation": "Values are independent per thread. In thread pools, values can leak across tasks if you forget to remove() them after use.",
  "codeExample": "ThreadLocal<String> id = ThreadLocal.withInitial(() -> \"unknown\");\nid.set(\"req-123\");",
  "realWorldUseCase": "Storing the current request ID so any code in the thread can read it.",
  "commonMistakes": "Storing large objects and never removing them in pooled threads.",
  "interviewReadyAnswer": "ThreadLocal keeps a separate value per thread inside each thread."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-018",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 18,
  "question": "How does a thread pool execute tasks?",
  "answer": "A thread pool creates workers up front. Tasks go into a blocking queue. Workers continuously take tasks, run them, and return to the queue. When shut down, workers stop after current tasks.",
  "explanation": "ExecutorService manages submission, queueing, worker lifecycle, and rejection policies when the queue is full.",
  "codeExample": "ExecutorService pool = Executors.newFixedThreadPool(4);\npool.submit(task);",
  "realWorldUseCase": "Reusing four threads for a stream of short tasks.",
  "commonMistakes": "Submitting blocking I/O tasks to a small compute pool and starving it.",
  "interviewReadyAnswer": "Workers pull tasks from a shared queue and run them repeatedly."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-019",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 19,
  "question": "How interview checkpoint 19: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-020",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 20,
  "question": "How does ConcurrentHashMap allow concurrency?",
  "answer": "ConcurrentHashMap divides the map into segments or buckets and locks only the affected portion during writes. Reads are usually lock-free using volatile arrays and CAS.",
  "explanation": "Multiple threads can read and write different parts of the map simultaneously without blocking each other.",
  "codeExample": "ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();\nmap.merge(\"key\", 1, Integer::sum);",
  "realWorldUseCase": "Sharing a frequency map among many threads with minimal contention.",
  "commonMistakes": "Assuming the whole map is locked for every operation.",
  "interviewReadyAnswer": "ConcurrentHashMap locks only the affected bucket or segment during writes."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-021",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 21,
  "question": "How does CopyOnWriteArrayList work?",
  "answer": "CopyOnWriteArrayList creates a fresh copy of the underlying array on every write operation. Readers access the existing array without locks and see a consistent snapshot.",
  "explanation": "Writes are expensive but reads are fast and wait-free. It is ideal for read-mostly lists such as event listener lists.",
  "codeExample": "CopyOnWriteArrayList<String> listeners = new CopyOnWriteArrayList<>();",
  "realWorldUseCase": "Maintaining a list of event listeners that is read frequently and changed rarely.",
  "commonMistakes": "Using it for write-heavy lists, where copying is too slow.",
  "interviewReadyAnswer": "Reads are lock-free snapshots; writes copy the whole array."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-022",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 22,
  "question": "How does synchronization prevent race conditions?",
  "answer": "Synchronization lets only one thread hold an object's monitor at a time. Threads executing synchronized code on the same lock are serialized, so interleaved reads and writes cannot corrupt state.",
  "explanation": "It establishes happens-before edges: unlocking a lock happens-before locking the same lock, making writes visible to the next thread.",
  "codeExample": "synchronized (this) { balance += amount; }",
  "realWorldUseCase": "Serializing balance updates so no deposit is lost.",
  "commonMistakes": "Locking different objects for the same shared data.",
  "interviewReadyAnswer": "Synchronization serializes access to critical sections with a monitor lock."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-023",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 23,
  "question": "How does deadlock happen at the lock level?",
  "answer": "Deadlock happens when thread A holds lock L1 and waits for L2, while thread B holds L2 and waits for L1. Neither can release what it holds until it gets the other lock.",
  "explanation": "The JVM does not break deadlocks automatically. Prevention uses consistent lock ordering, tryLock timeouts, and avoiding nested locks.",
  "codeExample": "A: lock(L1); lock(L2); B: lock(L2); lock(L1);",
  "realWorldUseCase": "Two transfers locking accounts in opposite order.",
  "commonMistakes": "Assuming deadlock needs many threads.",
  "interviewReadyAnswer": "Deadlock is a circular wait on locks with no escape."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-024",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 24,
  "question": "How interview checkpoint 24: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-025",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 25,
  "question": "How does ExecutorService submit() differ from execute()?",
  "answer": "submit() accepts Runnable or Callable and returns a Future, letting you retrieve the result or check completion. execute() accepts only Runnable and returns nothing.",
  "explanation": "submit() wraps checked exceptions from Callable into the Future; execute() throws uncaught exceptions to the thread's UncaughtExceptionHandler.",
  "codeExample": "Future<Integer> f = pool.submit(() -> 42);\npool.execute(() -> System.out.println(\"done\"));",
  "realWorldUseCase": "Getting a computed value back from a background task.",
  "commonMistakes": "Using execute() when you need the result.",
  "interviewReadyAnswer": "submit() returns a Future; execute() is fire-and-forget."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-026",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 26,
  "question": "How does CompletableFuture.thenApply work?",
  "answer": "thenApply() registers a function that transforms the result when the future completes normally. The function runs on the completing thread or a supplied executor, and returns a new CompletableFuture.",
  "explanation": "If the source future completes exceptionally, the function is skipped and the exception propagates to the returned future.",
  "codeExample": "future.thenApply(result -> result.toUpperCase());",
  "realWorldUseCase": "Transforming a fetched user name to uppercase after it loads.",
  "commonMistakes": "Assuming thenApply runs even when the source fails.",
  "interviewReadyAnswer": "thenApply transforms a completed result into a new future."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-027",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 27,
  "question": "How does ForkJoinPool work?",
  "answer": "ForkJoinPool uses work-stealing: threads run tasks from their own deque and steal tasks from other threads' deques when idle. It is designed for recursive divide-and-conquer tasks.",
  "explanation": "ForkJoinTask subclasses split work with fork() and join results with join(). CompletableFuture uses the common ForkJoinPool by default.",
  "codeExample": "ForkJoinPool.commonPool().submit(task);",
  "realWorldUseCase": "Parallelizing a recursive sort or search across cores.",
  "commonMistakes": "Using it for long blocking I/O tasks, which can stall the pool.",
  "interviewReadyAnswer": "ForkJoinPool balances work by stealing tasks between threads."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-028",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 28,
  "question": "How does ScheduledExecutorService run delayed tasks?",
  "answer": "ScheduledExecutorService schedules tasks to run once after a delay or periodically at fixed rate/delay. It uses an internal delayed work queue and a time-based scheduler.",
  "explanation": "schedule() runs once; scheduleAtFixedRate() maintains fixed intervals between start times; scheduleWithFixedDelay() waits for completion before the next start.",
  "codeExample": "ScheduledExecutorService s = Executors.newScheduledThreadPool(1);\ns.scheduleAtFixedRate(job, 0, 5, TimeUnit.SECONDS);",
  "realWorldUseCase": "Running a health check every 30 seconds.",
  "commonMistakes": "Using scheduleAtFixedRate for tasks that may overlap if they take longer than the period.",
  "interviewReadyAnswer": "It queues timed tasks and runs them when their delay elapses."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-029",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 29,
  "question": "How does the JVM handle uncaught exceptions in threads?",
  "answer": "If a thread's run() throws an uncaught exception, the JVM calls the thread's UncaughtExceptionHandler. The default handler prints the stack trace and terminates the thread.",
  "explanation": "You can set a custom handler with setUncaughtExceptionHandler() to log or alert on thread failures. The thread then terminates.",
  "codeExample": "thread.setUncaughtExceptionHandler((t, e) -> log(t, e));",
  "realWorldUseCase": "Capturing background task failures in a log file instead of silent death.",
  "commonMistakes": "Assuming an exception in one thread crashes the whole JVM.",
  "interviewReadyAnswer": "Uncaught exceptions go to the thread's UncaughtExceptionHandler and end that thread."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-how-030",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "how",
  "sectionOrder": 30,
  "question": "How does shutdown() differ from shutdownNow()?",
  "answer": "shutdown() initiates an orderly shutdown: previously submitted tasks run, but no new tasks are accepted. shutdownNow() attempts to stop running tasks via interrupt and returns queued, unstarted tasks.",
  "explanation": "Neither waits for completion by default; call awaitTermination() to wait. shutdownNow() is best-effort and cannot interrupt code that ignores interrupts.",
  "codeExample": "pool.shutdown();\npool.awaitTermination(1, TimeUnit.MINUTES);",
  "realWorldUseCase": "Letting in-flight requests finish before stopping a server pool.",
  "commonMistakes": "Calling shutdownNow() and expecting all tasks to stop immediately.",
  "interviewReadyAnswer": "shutdown() stops new tasks and finishes queued ones; shutdownNow() interrupts running tasks."
});
