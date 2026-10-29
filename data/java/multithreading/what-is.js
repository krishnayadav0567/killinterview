/* Multithreading — what learning questions */
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-001",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 1,
  "question": "What is multithreading in Java?",
  "answer": "Multithreading is the ability of a program to execute multiple threads concurrently. Each thread is an independent path of execution that shares the same process memory space.",
  "explanation": "The JVM schedules threads on available CPU cores. Threads share heap memory but have their own stacks, so they can run tasks in parallel or interleaved on a single core.",
  "codeExample": "Thread t = new Thread(() -> System.out.println(\"task\"));\nt.start();",
  "realWorldUseCase": "A web server handling multiple client requests at the same time using separate threads.",
  "commonMistakes": "Assuming multithreading always makes every program faster; coordination overhead can slow it down.",
  "interviewReadyAnswer": "Multithreading runs multiple threads concurrently within one process."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-002",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 2,
  "question": "What is a thread?",
  "answer": "A thread is the smallest unit of execution that the operating system can schedule. In Java, threads are represented by java.lang.Thread or by implementing Runnable.",
  "explanation": "Each thread has its own call stack and program counter but shares the heap and method area with other threads in the same process.",
  "codeExample": "Thread t = new Thread(task);\nt.start();",
  "realWorldUseCase": "Running a background email sender while the main thread handles user input.",
  "commonMistakes": "Confusing a Thread object with the actual thread of execution; start() creates the real thread.",
  "interviewReadyAnswer": "A thread is a scheduled unit of execution with its own stack, sharing process memory."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-003",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 3,
  "question": "What is the difference between a process and a thread?",
  "answer": "A process is an independent program in execution with its own memory space. A thread is a unit of execution inside a process that shares that process's memory.",
  "explanation": "Processes are isolated and expensive to create and switch between. Threads are lightweight and share memory, making communication faster but risking interference.",
  "codeExample": "One browser process can have many threads for tabs, rendering, and networking.",
  "realWorldUseCase": "Running separate microservices as processes and request handlers as threads inside each service.",
  "commonMistakes": "Assuming threads have isolated memory like processes.",
  "interviewReadyAnswer": "A process owns memory; threads inside it share that memory and are lighter weight."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-004",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 4,
  "question": "What interview checkpoint 4: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-005",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 5,
  "question": "What is the thread lifecycle in Java?",
  "answer": "The lifecycle states are NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED, as defined by Thread.State.",
  "explanation": "NEW: created but not started. RUNNABLE: executing or ready in the JVM. BLOCKED: waiting for a monitor lock. WAITING: waiting indefinitely for another thread. TIMED_WAITING: waiting with a timeout. TERMINATED: finished.",
  "codeExample": "Thread.State state = thread.getState();",
  "realWorldUseCase": "Monitoring a thread pool's health by inspecting thread states.",
  "commonMistakes": "Thinking RUNNABLE means the thread is definitely running; it may be waiting for CPU time.",
  "interviewReadyAnswer": "Threads move among NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-006",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 6,
  "question": "What are the different thread states in Java?",
  "answer": "Java defines six thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED. They describe where a thread is in its execution and waiting lifecycle.",
  "explanation": "NEW before start(). RUNNABLE when running or queued for CPU. BLOCKED when waiting to enter a synchronized block. WAITING when awaiting notify() or join(). TIMED_WAITING when sleeping or waiting with timeout. TERMINATED after run() completes.",
  "codeExample": "switch (thread.getState()) { case BLOCKED: ... }",
  "realWorldUseCase": "Debugging why a thread pool appears stuck by checking if threads are BLOCKED on locks.",
  "commonMistakes": "Assuming a thread in WAITING will wake up by itself; it needs notify or interrupt.",
  "interviewReadyAnswer": "The six states are NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-007",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 7,
  "question": "What is the main thread?",
  "answer": "The main thread is the initial thread created by the JVM to execute the public static void main method. It is the parent thread from which other threads are often created.",
  "explanation": "It is a non-daemon thread, so the JVM will not exit while it is alive. It is represented by Thread.currentThread() at program start and has the name \"main\".",
  "codeExample": "Thread main = Thread.currentThread();\nSystem.out.println(main.getName()); // main",
  "realWorldUseCase": "Launching worker threads from main and then letting main finish while workers continue.",
  "commonMistakes": "Assuming all threads behave like main; daemon threads behave differently at shutdown.",
  "interviewReadyAnswer": "The main thread runs the main method and is the default starting thread."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-008",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 8,
  "question": "What is a daemon thread?",
  "answer": "A daemon thread is a low-priority service thread that runs in the background. The JVM exits when only daemon threads remain, because they exist to serve user threads.",
  "explanation": "Use setDaemon(true) before start(). Daemon threads are abruptly terminated when the JVM shuts down and should not perform critical cleanup.",
  "codeExample": "Thread cleaner = new Thread(cleanupTask);\ncleaner.setDaemon(true);\ncleaner.start();",
  "realWorldUseCase": "Garbage collection, JIT compilation, and housekeeping tasks that should not keep the JVM alive.",
  "commonMistakes": "Making a critical payment-processing thread a daemon and losing work on shutdown.",
  "interviewReadyAnswer": "Daemon threads are background services that do not prevent JVM shutdown."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-009",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 9,
  "question": "What is thread priority?",
  "answer": "Thread priority is a hint from 1 (MIN_PRIORITY) to 10 (MAX_PRIORITY), with 5 (NORM_PRIORITY) as default. The scheduler may use it to decide which thread gets CPU time.",
  "explanation": "Priority is only a suggestion and is platform-dependent. It should not be used to guarantee correctness or synchronization.",
  "codeExample": "thread.setPriority(Thread.MAX_PRIORITY);",
  "realWorldUseCase": "Giving a UI refresh thread higher priority than a background indexing thread.",
  "commonMistakes": "Assuming higher priority threads always run to completion before lower ones.",
  "interviewReadyAnswer": "Thread priority is a scheduling hint, not a correctness guarantee."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-010",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 10,
  "question": "What is context switching?",
  "answer": "Context switching is the process of saving the state of one thread and loading the state of another so the CPU can switch execution between threads.",
  "explanation": "The OS kernel saves registers, program counter, and stack pointer for the outgoing thread and restores them for the incoming thread. Frequent switching adds overhead.",
  "codeExample": "The OS preempts thread A to run thread B, then later restores A where it left off.",
  "realWorldUseCase": "Sharing a single CPU among many server request threads.",
  "commonMistakes": "Believing context switching is free; it consumes CPU cycles and can hurt performance.",
  "interviewReadyAnswer": "Context switching swaps thread state so the CPU can alternate execution."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-011",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 11,
  "question": "What is thread scheduling?",
  "answer": "Thread scheduling is the mechanism by which the OS or JVM decides which RUNNABLE thread gets CPU time and for how long, using preemptive or time-sliced policies.",
  "explanation": "Java threads are usually preemptively scheduled. Higher-priority threads are favored, but exact behavior depends on the underlying operating system.",
  "codeExample": "The scheduler switches among Runnable threads so each makes progress.",
  "realWorldUseCase": "Sharing CPU cores among a web server's request-handling threads.",
  "commonMistakes": "Assuming Java lets you control the scheduler precisely; it mostly delegates to the OS.",
  "interviewReadyAnswer": "Thread scheduling decides which thread runs on the CPU at any moment."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-012",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 12,
  "question": "What is thread interrupt in Java?",
  "answer": "Interrupting a thread is a mechanism to signal that it should stop what it is doing. It sets an internal interrupt status flag on the target thread.",
  "explanation": "Calling interrupt() does not forcibly kill the thread. It sets the flag, and methods like sleep() or wait() throw InterruptedException. Code should check Thread.interrupted() and respond cooperatively.",
  "codeExample": "thread.interrupt(); // sets flag\nif (Thread.currentThread().isInterrupted()) { ... }",
  "realWorldUseCase": "Asking a long-running import task to cancel gracefully.",
  "commonMistakes": "Believing interrupt() immediately stops a thread; it only signals and the thread must respond.",
  "interviewReadyAnswer": "Interrupt sets a flag that cooperative code checks to cancel work."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-013",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 13,
  "question": "What is the difference between sleep() and wait()?",
  "answer": "sleep() is a static Thread method that pauses the current thread for a time without releasing any locks. wait() is an Object method that releases the monitor lock and waits for notify/notifyAll.",
  "explanation": "sleep(millis) keeps ownership of synchronized locks. wait() must be called inside a synchronized block and releases the lock until reacquired upon notification.",
  "codeExample": "Thread.sleep(1000);\nsynchronized (lock) { lock.wait(); }",
  "realWorldUseCase": "Pausing a periodic job with sleep versus coordinating producer-consumer with wait/notify.",
  "commonMistakes": "Calling wait() outside a synchronized block, which throws IllegalMonitorStateException.",
  "interviewReadyAnswer": "sleep pauses without releasing locks; wait releases the lock and waits for a signal."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-014",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 14,
  "question": "What interview checkpoint 14: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-015",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 15,
  "question": "What is thread yield?",
  "answer": "yield() is a static hint that the current thread is willing to pause and let other threads of equal priority run. It moves the thread from running to runnable.",
  "explanation": "The scheduler may ignore yield(). It does not release locks or guarantee any other thread will run. It is rarely needed in production code.",
  "codeExample": "Thread.yield();",
  "realWorldUseCase": "Suggesting the scheduler let a progress-reporting thread run briefly.",
  "commonMistakes": "Relying on yield() for correctness or synchronization.",
  "interviewReadyAnswer": "yield() is a weak hint to let same-priority threads run."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-016",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 16,
  "question": "What is thread-local storage?",
  "answer": "ThreadLocal provides variables that are scoped to a single thread. Each thread accessing a ThreadLocal gets its own independent copy.",
  "explanation": "ThreadLocal is useful for per-thread context such as user transactions or SimpleDateFormat instances that are not thread-safe. Remove values to avoid memory leaks in pooled threads.",
  "codeExample": "ThreadLocal<String> user = ThreadLocal.withInitial(() -> \"guest\");\nuser.set(\"alice\");",
  "realWorldUseCase": "Storing the current request's user ID so any code in the thread can access it without passing parameters.",
  "commonMistakes": "Forgetting to remove ThreadLocal values in thread pools, causing memory leaks.",
  "interviewReadyAnswer": "ThreadLocal gives each thread its own independent copy of a variable."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-017",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 17,
  "question": "What is a thread pool?",
  "answer": "A thread pool is a group of pre-created worker threads that reuse threads to execute multiple tasks, avoiding the cost of creating and destroying threads per task.",
  "explanation": "ExecutorService manages the pool. Tasks are queued if all workers are busy. Pools improve response time and resource control.",
  "codeExample": "ExecutorService pool = Executors.newFixedThreadPool(8);\npool.submit(task);",
  "realWorldUseCase": "Handling many short HTTP requests with a fixed number of worker threads.",
  "commonMistakes": "Creating an unbounded pool that spawns too many threads under load.",
  "interviewReadyAnswer": "A thread pool reuses workers to run many tasks efficiently."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-018",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 18,
  "question": "What is a race condition?",
  "answer": "A race condition occurs when the outcome of a program depends on the unpredictable timing of threads accessing shared mutable data without synchronization.",
  "explanation": "When two threads read, modify, and write the same variable concurrently, lost updates or inconsistent state can result. Synchronization or atomic types prevent races.",
  "codeExample": "int count = 0;\n// two threads both do count++ and one update is lost",
  "realWorldUseCase": "Two tellers updating the same account balance simultaneously.",
  "commonMistakes": "Assuming that simple operations like count++ are atomic.",
  "interviewReadyAnswer": "A race condition is timing-dependent corruption from unsynchronized shared access."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-019",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 19,
  "question": "What interview checkpoint 19: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-020",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 20,
  "question": "What is a monitor lock?",
  "answer": "Every Java object has an intrinsic monitor lock. A thread must acquire an object's lock before entering a synchronized block or method on that object.",
  "explanation": "The lock is reentrant: a thread that already holds it can re-enter synchronized code on the same object. It is released automatically when the block exits, even via exception.",
  "codeExample": "synchronized (this) { ... } // acquires this thread's lock",
  "realWorldUseCase": "Serializing access to a shared cache so only one thread updates it.",
  "commonMistakes": "Assuming synchronized is about variables rather than object locks.",
  "interviewReadyAnswer": "A monitor lock is a per-object reentrant lock used by synchronized."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-021",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 21,
  "question": "What is deadlock?",
  "answer": "Deadlock occurs when two or more threads are blocked forever, each waiting for a lock held by the other. None can make progress.",
  "explanation": "Classic deadlock needs mutual exclusion, hold and wait, no preemption, and circular wait. Lock ordering and timed locks help prevent it.",
  "codeExample": "Thread A holds lock1, waits lock2. Thread B holds lock2, waits lock1.",
  "realWorldUseCase": "Two bank transfers locking accounts in opposite order and freezing.",
  "commonMistakes": "Assuming deadlock only happens with many threads; two threads can deadlock.",
  "interviewReadyAnswer": "Deadlock is a circular wait where threads block each other indefinitely."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-022",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 22,
  "question": "What is livelock?",
  "answer": "Livelock occurs when threads keep changing state in response to each other but none makes real progress. They are not blocked, yet they are stuck.",
  "explanation": "Threads repeatedly back off and retry when they detect contention, like two people stepping aside in a hallway and always blocking each other.",
  "codeExample": "Two threads backing off and retrying a transaction forever.",
  "realWorldUseCase": "Retrying a contended operation with random backoff can still livelock if timings align.",
  "commonMistakes": "Assuming livelock means threads are blocked; they are active but unproductive.",
  "interviewReadyAnswer": "Livelock is active but unproductive contention among threads."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-023",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 23,
  "question": "What is starvation?",
  "answer": "Starvation happens when a thread is perpetually denied access to resources or CPU time because other threads monopolize them.",
  "explanation": "It can result from thread priority misuse, long-held synchronized blocks, or thread pools where short tasks are always queued behind long ones.",
  "codeExample": "A low-priority thread never gets CPU because high-priority threads run constantly.",
  "realWorldUseCase": "Background cleanup threads starving under a flood of high-priority user tasks.",
  "commonMistakes": "Confusing starvation with deadlock; starvation threads are not blocked, just ignored.",
  "interviewReadyAnswer": "Starvation is a thread being perpetually denied CPU or lock access."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-024",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 24,
  "question": "What interview checkpoint 24: what should you explain about Multithreading?",
  "answer": "Multithreading is best explained by defining the idea, describing its trade-offs, and connecting it to a practical Java example.",
  "explanation": "A strong interview answer for Multithreading should state the core rule, explain why it exists, and mention a realistic use case.",
  "codeExample": "// Explain Multithreading with a small, focused example.",
  "realWorldUseCase": "Use Multithreading when designing maintainable Java applications and explaining implementation choices.",
  "commonMistakes": "Giving a definition without explaining the trade-offs or the runtime behavior of Multithreading.",
  "interviewReadyAnswer": "Multithreading should be explained with its definition, purpose, behavior, and practical trade-offs."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-025",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 25,
  "question": "What is the Java Memory Model?",
  "answer": "The Java Memory Model (JMM) defines how threads see writes made by other threads, the ordering of operations, and happens-before guarantees for multithreaded programs.",
  "explanation": "Without proper synchronization, the JMM allows threads to cache values locally and reorder operations. Synchronization and volatile create happens-before edges.",
  "codeExample": "volatile flag = true; // establishes happens-before with reads",
  "realWorldUseCase": "Reasoning whether one thread's update will be seen by another.",
  "commonMistakes": "Assuming the JMM guarantees instant visibility of all writes.",
  "interviewReadyAnswer": "The JMM defines visibility and ordering guarantees for shared memory."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-026",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 26,
  "question": "What is a happens-before relationship?",
  "answer": "A happens-before relationship guarantees that memory writes by one statement are visible to another statement that follows it, with ordering preserved.",
  "explanation": "Actions synchronized on the same monitor, volatile write-then-read, thread start, and thread termination all establish happens-before edges.",
  "codeExample": "Unlocking a lock happens-before locking the same lock.",
  "realWorldUseCase": "Ensuring a writer's changes are visible to a reader through a lock.",
  "commonMistakes": "Assuming program order alone guarantees visibility across threads.",
  "interviewReadyAnswer": "Happens-before guarantees visibility and ordering between actions."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-027",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 27,
  "question": "What is an atomic class?",
  "answer": "Atomic classes such as AtomicInteger and AtomicReference perform lock-free compare-and-swap operations on single variables using low-level CPU instructions.",
  "explanation": "They guarantee atomic read-modify-write for individual variables but do not make multi-variable sequences atomic. They are faster than locks for simple counters.",
  "codeExample": "AtomicInteger count = new AtomicInteger();\ncount.incrementAndGet();",
  "realWorldUseCase": "Tracking request counts across threads without synchronized blocks.",
  "commonMistakes": "Assuming AtomicInteger makes a whole method atomic; it only protects one variable.",
  "interviewReadyAnswer": "Atomic classes enable lock-free atomic updates to single variables."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-028",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 28,
  "question": "What is ExecutorService?",
  "answer": "ExecutorService is an interface managing a pool of threads and the lifecycle of submitted tasks. It decouples task submission from thread creation.",
  "explanation": "It offers submit() returning Future, shutdown(), shutdownNow(), and awaitTermination(). Common implementations come from Executors factory methods.",
  "codeExample": "ExecutorService pool = Executors.newFixedThreadPool(4);\nFuture<Integer> f = pool.submit(() -> 42);",
  "realWorldUseCase": "Running many short tasks on a fixed set of reused threads.",
  "commonMistakes": "Forgetting to shut down the pool and preventing JVM exit.",
  "interviewReadyAnswer": "ExecutorService manages worker threads and task execution."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-029",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 29,
  "question": "What is CompletableFuture?",
  "answer": "CompletableFuture is a class for asynchronous programming. It represents a future result and lets you chain dependent stages that run when prior stages complete.",
  "explanation": "It supports thenApply, thenAccept, thenCompose, exceptionally, and allOf/anyOf for combining futures. It runs stages on supplied executors without blocking the caller.",
  "codeExample": "CompletableFuture.supplyAsync(() -> compute())\n    .thenApply(r -> r * 2);",
  "realWorldUseCase": "Fetching user and order data in parallel, then combining results.",
  "commonMistakes": "Ignoring exceptions in async stages, causing silent failures.",
  "interviewReadyAnswer": "CompletableFuture chains asynchronous stages non-blockingly."
});
window.JAVAQuestions.addLearning({
  "id": "multithreading-what-030",
  "topicId": "multithreading",
  "topicName": "Multithreading",
  "section": "what",
  "sectionOrder": 30,
  "question": "What is thread interference?",
  "answer": "Thread interference occurs when two threads access the same shared data and their operations interleave, producing inconsistent or corrupted results.",
  "explanation": "It happens when reads and writes to shared variables are not atomic. Synchronization or atomic types prevent thread interference.",
  "codeExample": "Two threads incrementing the same counter without synchronization.",
  "realWorldUseCase": "A shared counter corrupted by concurrent increments from multiple request threads.",
  "commonMistakes": "Assuming that reading and writing a primitive is always atomic.",
  "interviewReadyAnswer": "Thread interference is unsynchronized interleaved access to shared data."
});
