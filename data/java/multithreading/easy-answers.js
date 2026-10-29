/* Multithreading — easy-to-understand learning answers
 *
 * The original questions and code examples stay unchanged. This file only
 * replaces the explanations shown on the learning cards with simpler wording.
 */
(function () {
  const easyAnswers = {
    what: {
      1: {
        answer: "Multithreading means doing more than one task at the same time in one Java program. Each task runs in its own thread, and the threads share the program's memory.",
        explanation: "For example, one thread can read a file while another thread handles a user request. On one CPU core the tasks take turns; on multiple cores they may run at the same time.",
        interviewReadyAnswer: "Multithreading lets one Java program run multiple tasks concurrently by using multiple threads."
      },
      2: {
        answer: "A thread is one path of work inside a program. It has its own stack, but it shares the program's heap memory with other threads.",
        explanation: "Java can create a thread with Thread or Runnable. Calling start() makes the JVM run the task on a separate thread.",
        interviewReadyAnswer: "A thread is a small unit of work that runs inside a process and shares that process's memory."
      },
      3: {
        answer: "A process is a complete running program with its own memory. A thread is a smaller worker inside that process and shares the process memory.",
        explanation: "Processes are more isolated but usually cost more to create. Threads are lighter and communicate easily, but shared memory must be protected.",
        interviewReadyAnswer: "A process owns its memory; threads inside the process share that memory."
      },
      4: {
        answer: "Explain multithreading in three steps: say what it is, say why it is useful, and give a small Java example.",
        explanation: "A good interview answer should also mention that shared data needs coordination and that more threads do not always mean better performance.",
        interviewReadyAnswer: "Define multithreading, explain its benefit and risk, then give a simple practical example."
      },
      5: {
        answer: "A thread usually moves from NEW, to RUNNABLE, to a waiting state, and finally to TERMINATED.",
        explanation: "NEW means it has not started. RUNNABLE means it can run. BLOCKED, WAITING, and TIMED_WAITING mean it is waiting for a lock, another thread, or time. TERMINATED means its work is finished.",
        interviewReadyAnswer: "A thread starts in NEW, becomes RUNNABLE, may wait, and ends in TERMINATED."
      },
      6: {
        answer: "Java has six thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED.",
        explanation: "NEW is before start(). RUNNABLE means ready or running. BLOCKED means waiting for a lock. WAITING and TIMED_WAITING mean waiting without or with a time limit. TERMINATED means finished.",
        interviewReadyAnswer: "The six states describe whether a thread has started, can run, is waiting, or has finished."
      },
      7: {
        answer: "The main thread is the first thread created by the JVM. It runs the main() method and can start other threads.",
        explanation: "A Java program begins on the main thread. Other worker threads can continue running even after main() finishes, unless the JVM has no other non-daemon threads left.",
        interviewReadyAnswer: "The main thread is the JVM-created thread that runs the main() method."
      },
      8: {
        answer: "A daemon thread is a background helper thread. The JVM does not wait for daemon threads when all normal threads have finished.",
        explanation: "Use daemon threads for support work such as cleanup. Do not use them for important work that must finish, because they can stop when the JVM exits.",
        interviewReadyAnswer: "A daemon thread provides background service and does not keep the JVM alive by itself."
      },
      9: {
        answer: "Thread priority is a number from 1 to 10 that gives the scheduler a hint about which thread may run first.",
        explanation: "The default priority is 5. Priority is only a hint, so a program must never depend on it for correctness or ordering.",
        interviewReadyAnswer: "Priority is a scheduling hint, not a guarantee."
      },
      10: {
        answer: "Context switching is when the CPU pauses one thread, saves its progress, and starts or resumes another thread.",
        explanation: "Switching lets many threads share the CPU, but each switch has a cost. Too many switches can reduce performance.",
        interviewReadyAnswer: "Context switching lets the CPU move between threads by saving and restoring their state."
      },
      11: {
        answer: "Thread scheduling decides which ready thread gets CPU time and when it gets to run.",
        explanation: "The operating system and JVM work together to schedule threads. The exact order is not guaranteed, so code should not depend on a particular order.",
        interviewReadyAnswer: "Scheduling chooses which runnable thread gets CPU time, and the order is not guaranteed."
      },
      12: {
        answer: "Interrupting a thread sends it a request to stop or change what it is doing. It does not forcefully kill the thread.",
        explanation: "The target thread should check the interrupt flag or handle InterruptedException, clean up, and finish safely.",
        interviewReadyAnswer: "interrupt() is a cooperative request for a thread to stop or respond to cancellation."
      },
      13: {
        answer: "sleep() pauses the current thread for a period and keeps its locks. wait() pauses the thread and releases the lock while it waits for a notification.",
        explanation: "sleep() belongs to Thread. wait() belongs to Object and must be called while holding that object's monitor.",
        interviewReadyAnswer: "sleep() waits without releasing locks; wait() waits and releases the object's lock."
      },
      14: {
        answer: "Explain multithreading by covering the basic idea, the reason for using it, and how Java coordinates threads.",
        explanation: "Keep the answer practical: mention shared data, synchronization, and a small example instead of listing difficult terms only.",
        interviewReadyAnswer: "Give the definition, purpose, coordination rule, and one simple example."
      },
      15: {
        answer: "yield() is a hint that tells the scheduler the current thread is willing to let another thread run.",
        explanation: "The scheduler may ignore this hint. It does not pause the thread for a fixed time and should not be used for program correctness.",
        interviewReadyAnswer: "yield() is an optional scheduling hint, not a reliable way to control thread order."
      },
      16: {
        answer: "ThreadLocal gives each thread its own separate copy of a variable.",
        explanation: "A value stored in ThreadLocal by one thread is not automatically seen by another thread. This can avoid sharing for data such as a request ID.",
        interviewReadyAnswer: "ThreadLocal stores a separate value for each thread."
      },
      17: {
        answer: "A thread pool is a group of reusable worker threads. Tasks are placed in a queue and the workers execute them.",
        explanation: "Reusing a limited number of threads is safer and cheaper than creating a new thread for every task.",
        interviewReadyAnswer: "A thread pool reuses a fixed group of workers to run many tasks."
      },
      18: {
        answer: "A race condition happens when the result changes depending on which thread reaches shared data first.",
        explanation: "For example, two threads can read the same counter, both add one, and lose one update. Locks or atomic classes can prevent this.",
        interviewReadyAnswer: "A race condition is a timing problem caused by unsafe access to shared data."
      },
      19: {
        answer: "For this interview question, define the concept, explain why it matters, and give a short Java example.",
        explanation: "Focus on the main rule first. Then mention one benefit, one risk, and the Java feature that handles the risk.",
        interviewReadyAnswer: "State the definition, purpose, risk, and a practical Java example."
      },
      20: {
        answer: "A monitor lock is a lock attached to every Java object. A synchronized method or block must get that lock before it can run.",
        explanation: "Only one thread can hold the same monitor lock at a time. The lock is released when the synchronized code finishes.",
        interviewReadyAnswer: "A monitor lock allows only one thread at a time to enter synchronized code for an object."
      },
      21: {
        answer: "Deadlock happens when threads wait for locks held by one another, so none of them can continue.",
        explanation: "A common example is thread A holding lock 1 and waiting for lock 2 while thread B holds lock 2 and waits for lock 1.",
        interviewReadyAnswer: "Deadlock is a circular wait where threads hold locks and wait forever for each other."
      },
      22: {
        answer: "Livelock happens when threads keep reacting to one another but never finish useful work.",
        explanation: "Unlike deadlock, the threads are still active. They keep changing their state, but their actions prevent progress.",
        interviewReadyAnswer: "Livelock means threads are running but repeatedly prevent each other from making progress."
      },
      23: {
        answer: "Starvation happens when a thread keeps waiting because other threads keep taking the CPU, lock, or resource it needs.",
        explanation: "The thread is not necessarily stuck forever by a lock cycle; it simply does not get a fair chance to run.",
        interviewReadyAnswer: "Starvation is unfair waiting for CPU time or a shared resource."
      },
      24: {
        answer: "Explain the idea in simple words, show its normal Java use, and mention the main safety rule or trade-off.",
        explanation: "Interviewers usually want to hear how the concept behaves in real code, not only a textbook definition.",
        interviewReadyAnswer: "Define the concept, explain its use, and mention its main trade-off."
      },
      25: {
        answer: "The Java Memory Model explains how threads read and write shared memory and when one thread is guaranteed to see another thread's changes.",
        explanation: "It gives rules for visibility, ordering, and safe communication between threads. synchronized, volatile, and thread start/join create important guarantees.",
        interviewReadyAnswer: "The Java Memory Model defines how shared data becomes visible and ordered between threads."
      },
      26: {
        answer: "A happens-before relationship means one action is guaranteed to be visible before another action starts.",
        explanation: "For example, unlocking a synchronized block happens-before another thread locks the same object. This gives the second thread a safe view of the first thread's changes.",
        interviewReadyAnswer: "Happens-before is a Java rule that guarantees visibility and ordering between thread actions."
      },
      27: {
        answer: "An atomic class safely updates one value without using a normal synchronized block. AtomicInteger is a common example.",
        explanation: "An atomic operation finishes as one step for that variable. It does not automatically make a group of variables or a whole method safe.",
        interviewReadyAnswer: "Atomic classes make single-variable updates safe without a traditional lock."
      },
      28: {
        answer: "ExecutorService manages worker threads and the tasks sent to them. It also provides methods to shut the pool down.",
        explanation: "Instead of creating raw threads yourself, submit tasks to an ExecutorService and let it reuse a controlled number of workers.",
        interviewReadyAnswer: "ExecutorService manages a thread pool, task execution, and shutdown."
      },
      29: {
        answer: "CompletableFuture represents a result that will be available later. It lets you connect steps that run after the result is ready.",
        explanation: "You can start work in the background, transform the result, combine results, and handle errors without writing nested callbacks.",
        interviewReadyAnswer: "CompletableFuture helps build asynchronous work as a chain of steps."
      },
      30: {
        answer: "Thread interference happens when threads change the same shared data at overlapping times and produce a wrong result.",
        explanation: "For example, two threads incrementing one counter can overwrite each other's updates. Synchronization or atomic classes can protect the counter.",
        interviewReadyAnswer: "Thread interference is unsafe, overlapping access to shared data."
      }
    },
    why: {
      1: {
        answer: "We use multithreading so a program can work on more than one task without making the user wait for every task to finish.",
        explanation: "For example, an application can download data in the background while still responding to clicks. It can also process several requests at once.",
        interviewReadyAnswer: "Multithreading improves responsiveness and can increase throughput."
      },
      2: {
        answer: "A server may receive many requests at the same time. Threads let it work on several requests instead of waiting for one request to finish first.",
        explanation: "A thread pool is usually used so the server has a controlled number of workers and does not create unlimited threads.",
        interviewReadyAnswer: "Multithreading helps a server handle many client requests concurrently."
      },
      3: {
        answer: "We need synchronization when multiple threads use the same changing data and those operations must stay correct.",
        explanation: "Synchronization makes a protected section run one thread at a time and helps threads see each other's updates.",
        interviewReadyAnswer: "Synchronization protects shared mutable data from conflicting updates."
      },
      4: {
        answer: "For this interview question, explain what multithreading is, why we use it, and how we keep shared data safe.",
        explanation: "A short example such as a server handling requests is usually clearer than a long list of definitions.",
        interviewReadyAnswer: "Cover the definition, benefit, safety rule, and one practical example."
      },
      5: {
        answer: "We use ExecutorService so Java can reuse and control worker threads instead of creating raw threads for every task.",
        explanation: "It provides task queues, a limited number of workers, Future results, and shutdown methods.",
        interviewReadyAnswer: "ExecutorService makes task execution easier to manage and safer to limit."
      },
      6: {
        answer: "Too many threads use memory and make the CPU spend too much time switching between them.",
        explanation: "They can also compete for locks and slow each other down. A bounded thread pool is usually a better choice.",
        interviewReadyAnswer: "Too many threads cause memory use, context-switching cost, and contention."
      },
      7: {
        answer: "Shared changing data is risky because two threads can read or update it at the same time and lose or corrupt changes.",
        explanation: "Use synchronization, volatile, atomic classes, or a thread-safe collection based on the problem you need to solve.",
        interviewReadyAnswer: "Shared mutable data needs coordination so concurrent updates remain correct."
      },
      8: {
        answer: "We need thread-safe collections when several threads read or change the same collection.",
        explanation: "They provide safe operations designed for concurrency. A normal ArrayList or HashMap can break when changed by multiple threads without protection.",
        interviewReadyAnswer: "Thread-safe collections protect collection operations when threads share them."
      },
      9: {
        answer: "Explain the main purpose first, then say what can go wrong when threads share data and how Java avoids that problem.",
        explanation: "Use a simple real-world example so the interviewer can see that you understand the behavior, not just the vocabulary.",
        interviewReadyAnswer: "Start with the purpose, explain the risk, and show the Java solution."
      },
      10: {
        answer: "Deadlocks can occur when two or more threads hold locks and wait for locks held by each other.",
        explanation: "Because every thread is waiting, no one can release its lock. Consistent lock order and timeouts can reduce the risk.",
        interviewReadyAnswer: "Deadlock is caused by a circular wait for locks."
      },
      11: {
        answer: "We need thread-safe collections because normal collections are not automatically safe when multiple threads change them together.",
        explanation: "A concurrent collection handles the required coordination for common operations, but a multi-step business rule may still need extra synchronization.",
        interviewReadyAnswer: "Use concurrent collections when shared collection operations must be safe."
      },
      12: {
        answer: "Shared changing data can give different or incorrect results because threads may read and write it in an unsafe order.",
        explanation: "Protect the data with a lock, an atomic class, or another design that gives the required visibility and atomicity.",
        interviewReadyAnswer: "Unprotected shared state can cause lost updates and inconsistent results."
      },
      13: {
        answer: "We use CompletableFuture to run asynchronous tasks, connect their results, and handle errors in a readable way.",
        explanation: "It is useful when independent tasks can run together and later be combined, such as loading a profile and its orders.",
        interviewReadyAnswer: "CompletableFuture makes asynchronous work easier to compose and handle."
      },
      14: {
        answer: "Explain why the feature exists, how it behaves, and when you would use it in a Java application.",
        explanation: "Keep the answer simple and include one trade-off or common mistake to show practical understanding.",
        interviewReadyAnswer: "Give the purpose, behavior, use case, and main caution."
      },
      15: {
        answer: "We use atomic classes when one shared value, such as a counter, must be updated safely without a larger lock.",
        explanation: "They are a good fit for simple single-variable updates. They are not enough when several values must change together.",
        interviewReadyAnswer: "Atomic classes safely update individual shared values."
      },
      16: {
        answer: "Thread pools are better than raw threads because they reuse workers, limit concurrency, and make shutdown easier.",
        explanation: "Creating a new thread for every task can use too much memory and reduce performance under load.",
        interviewReadyAnswer: "Thread pools control and reuse workers instead of creating unlimited raw threads."
      },
      17: {
        answer: "Creating too many threads can exhaust memory, increase context switching, and make threads compete for the same locks.",
        explanation: "The result can be slower than using fewer, well-managed workers. Choose the pool size for the type of work.",
        interviewReadyAnswer: "More threads are not always faster because thread management also has a cost."
      },
      18: {
        answer: "Thread-local variables are useful when every thread needs its own value and sharing that value would be unsafe or inconvenient.",
        explanation: "A request ID or formatter can be kept separately for each thread, so threads do not overwrite one another's values.",
        interviewReadyAnswer: "ThreadLocal avoids sharing one value by giving each thread its own copy."
      },
      19: {
        answer: "For this interview question, explain the reason for the feature and connect it to a simple problem it solves.",
        explanation: "A clear example is more useful than memorizing a long definition. Mention a limitation when it matters.",
        interviewReadyAnswer: "Explain the problem, the solution, and a practical example."
      },
      20: {
        answer: "We need ExecutorService to run tasks with a controlled number of reusable threads and to manage their shutdown.",
        explanation: "It separates the task you want to run from the details of creating and managing worker threads.",
        interviewReadyAnswer: "ExecutorService controls task execution without manually managing every thread."
      },
      21: {
        answer: "Thread priority is not reliable because it is only a hint and the operating system may schedule threads differently.",
        explanation: "Use locks, atomic classes, or clear coordination for correctness. Never use priority to guarantee the order of operations.",
        interviewReadyAnswer: "Priority may influence scheduling, but it cannot guarantee correctness or order."
      },
      22: {
        answer: "Shared mutable data can be changed by two threads at once, which can cause lost updates or a partly changed object.",
        explanation: "The solution is to reduce sharing or use synchronization, atomic classes, immutable objects, or concurrent collections.",
        interviewReadyAnswer: "Concurrent access to changing shared data must be coordinated."
      },
      23: {
        answer: "Deadlocks occur when threads take locks in different orders and then wait for each other's locks.",
        explanation: "Use one consistent lock order, avoid unnecessary nested locks, or use a timeout when trying to get a lock.",
        interviewReadyAnswer: "Inconsistent lock order can create a circular wait and deadlock."
      },
      24: {
        answer: "Give a simple definition, explain the reason for the feature, and describe its everyday Java use.",
        explanation: "Also mention the main limitation so your answer sounds practical and complete.",
        interviewReadyAnswer: "Define it, explain why it is used, and mention its main limitation."
      },
      25: {
        answer: "We need thread-safe collections when multiple threads share a collection and need safe reads or updates.",
        explanation: "They reduce the need to write collection-level locking yourself, although larger multi-step operations may still need coordination.",
        interviewReadyAnswer: "Concurrent collections make common shared collection operations safer."
      },
      26: {
        answer: "volatile makes a value visible to all threads, but it does not combine a read and a write into one safe operation.",
        explanation: "count++ is really read, add one, and write. Two threads can do those steps at the same time and lose an update. Use AtomicInteger or synchronization.",
        interviewReadyAnswer: "volatile gives visibility, but it does not make compound operations such as count++ atomic."
      },
      27: {
        answer: "We use synchronization when a complete critical section must be protected, especially when several values must change together.",
        explanation: "It lets one thread at a time execute the protected code and helps later threads see completed changes.",
        interviewReadyAnswer: "Synchronization protects a group of related operations as one safe section."
      },
      28: {
        answer: "Starvation can happen when one thread keeps losing access to the CPU, a lock, or another shared resource.",
        explanation: "Long lock sections, unfair scheduling, or too much higher-priority work can cause it. Fair locks and shorter tasks can help.",
        interviewReadyAnswer: "Starvation is when a thread remains ready but does not get a fair chance to proceed."
      },
      29: {
        answer: "Atomic classes can be simpler and faster for one counter because they update one value without making other threads wait for a lock.",
        explanation: "Use synchronization instead when several values or several steps must stay consistent together.",
        interviewReadyAnswer: "Use an atomic class for simple single-value updates; use synchronization for larger critical sections."
      },
      30: {
        answer: "We need CompletableFuture when several asynchronous steps must be connected, combined, or given error handling.",
        explanation: "It avoids deeply nested callbacks and can keep the calling thread from waiting unnecessarily.",
        interviewReadyAnswer: "CompletableFuture helps compose asynchronous tasks and handle their results."
      }
    },
    how: {
      1: {
        answer: "Create a Thread or give a Runnable task, then call start(). The JVM creates a new execution path and calls run() for the task.",
        explanation: "Calling start() returns quickly. Calling run() directly does not create a new thread; it runs like a normal method call.",
        interviewReadyAnswer: "Use start() to create the new thread; run() contains the work it performs."
      },
      2: {
        answer: "start() changes the thread from NEW to a runnable state and asks the JVM to schedule its run() method on a new thread.",
        explanation: "The thread that calls start() continues its own work. A thread can be started only once.",
        interviewReadyAnswer: "start() schedules run() on a new thread and cannot be called twice on the same Thread object."
      },
      3: {
        answer: "start() creates a new thread. run() by itself is just a normal method call on the current thread.",
        explanation: "Use start() when you want concurrent work. Use run() directly only when you intentionally want normal, same-thread execution.",
        interviewReadyAnswer: "start() gives concurrency; run() alone does not."
      },
      4: {
        answer: "Explain the steps clearly: create or submit the work, let Java run it, and use coordination when threads share data.",
        explanation: "A small example is enough. Avoid explaining every internal detail unless the interviewer asks for it.",
        interviewReadyAnswer: "Describe the basic flow, the safety rule, and one simple example."
      },
      5: {
        answer: "The scheduler chooses a runnable thread, gives it CPU time, and later may switch to another runnable thread.",
        explanation: "Because the order depends on the operating system and timing, code should not assume which thread runs first.",
        interviewReadyAnswer: "Scheduling decides which ready thread gets CPU time, but the order is not guaranteed."
      },
      6: {
        answer: "Synchronization uses a lock. A thread must get the lock before entering synchronized code, and it releases the lock when the code ends.",
        explanation: "If another thread already has the lock, the second thread waits. This prevents conflicting operations on the protected data.",
        interviewReadyAnswer: "Synchronization uses a lock to let one thread at a time enter protected code."
      },
      7: {
        answer: "Every Java object can act as a monitor. A synchronized block locks that object, and only one thread can hold the lock at a time.",
        explanation: "When the thread leaves the synchronized block, Java releases the monitor automatically, including when an exception is thrown.",
        interviewReadyAnswer: "A monitor lock controls entry to synchronized methods and blocks for an object."
      },
      8: {
        answer: "The Java Memory Model tells the JVM how threads may see shared values and how certain actions are ordered.",
        explanation: "Without a memory rule, one thread might not immediately see another thread's update. Locks, volatile, start(), and join() provide visibility guarantees.",
        interviewReadyAnswer: "The Java Memory Model defines visibility and ordering for shared data between threads."
      },
      9: {
        answer: "Explain what happens step by step, then mention how Java keeps the shared data correct.",
        explanation: "The best answer connects the internal behavior to a real example and avoids relying on a particular thread order.",
        interviewReadyAnswer: "Explain the flow, the coordination method, and the practical result."
      },
      10: {
        answer: "ExecutorService keeps a group of worker threads and a task queue. Workers take tasks, run them, and then take more tasks.",
        explanation: "When the service is shut down, it stops accepting new work and eventually stops its workers.",
        interviewReadyAnswer: "ExecutorService queues tasks and runs them with reusable worker threads."
      },
      11: {
        answer: "CompletableFuture stores a result that will arrive later and lets you attach the next step to that result.",
        explanation: "Methods such as thenApply transform a result, thenCombine joins two results, and exceptionally handles an error.",
        interviewReadyAnswer: "CompletableFuture builds asynchronous work by connecting dependent stages."
      },
      12: {
        answer: "Happens-before means Java guarantees that one action is visible before another action.",
        explanation: "For example, a thread's unlock happens-before another thread's lock on the same object. The second thread can safely see the earlier changes.",
        interviewReadyAnswer: "Happens-before gives a guaranteed visibility and ordering relationship between actions."
      },
      13: {
        answer: "wait() releases the object's lock while the thread waits. sleep() pauses the thread but keeps any locks it already has.",
        explanation: "wait() is used with notify or notifyAll for thread coordination. sleep() is used for a time delay.",
        interviewReadyAnswer: "wait() releases a monitor; sleep() does not release locks."
      },
      14: {
        answer: "Explain the normal flow first, then describe what happens when threads need the same data or resource.",
        explanation: "Use plain words and a small example. Add deeper JVM details only when they help answer the question.",
        interviewReadyAnswer: "Explain the flow, the coordination, and the result using a simple example."
      },
      15: {
        answer: "interrupt() sets a request on the target thread. The target code must notice the request and decide how to stop safely.",
        explanation: "Blocking methods may throw InterruptedException. Good code cleans up, restores the interrupt status when needed, and exits or responds.",
        interviewReadyAnswer: "Interrupt is a cooperative cancellation request, not a forceful kill."
      },
      16: {
        answer: "yield() tells the scheduler that the current thread is willing to let another thread run.",
        explanation: "The scheduler may ignore the hint, so yield() cannot be used to guarantee timing or ordering.",
        interviewReadyAnswer: "yield() is only an optional hint to the scheduler."
      },
      17: {
        answer: "Each Thread object keeps its own value for a ThreadLocal variable. When a thread calls get(), it receives its own value.",
        explanation: "This prevents different threads from overwriting one shared value. Remove values when long-lived pool threads no longer need them.",
        interviewReadyAnswer: "ThreadLocal stores one independent value per thread."
      },
      18: {
        answer: "A pool places submitted tasks in a queue. A worker takes one task, runs it, and then takes the next task.",
        explanation: "This reuses workers and limits how many tasks run at once. Shutdown tells the workers when no more work should be accepted.",
        interviewReadyAnswer: "Workers repeatedly take tasks from a queue and execute them."
      },
      19: {
        answer: "For this question, describe the steps in order and explain the Java feature that keeps those steps safe.",
        explanation: "A short example makes the process easier to understand and remember for an interview.",
        interviewReadyAnswer: "Explain the steps, the safety mechanism, and a simple example."
      },
      20: {
        answer: "ConcurrentHashMap lets multiple threads use different parts of a map at the same time while protecting updates.",
        explanation: "It is designed for concurrent access and provides useful atomic methods such as putIfAbsent and computeIfAbsent.",
        interviewReadyAnswer: "ConcurrentHashMap supports safe concurrent map operations without one lock for the whole map."
      },
      21: {
        answer: "CopyOnWriteArrayList copies its internal array whenever it is changed. Readers can read the old array without blocking.",
        explanation: "It works well when reads are frequent and writes are rare. Every write is more expensive because a new copy is made.",
        interviewReadyAnswer: "CopyOnWriteArrayList makes reads easy to share by copying the list on each write."
      },
      22: {
        answer: "Synchronization allows only one thread at a time to run the protected read-and-write steps for the same lock.",
        explanation: "Because the steps cannot overlap, one thread cannot overwrite another thread's update in the middle of the operation.",
        interviewReadyAnswer: "Synchronization prevents races by making a critical section run one thread at a time."
      },
      23: {
        answer: "At the lock level, deadlock occurs when thread A holds lock 1 and waits for lock 2 while thread B holds lock 2 and waits for lock 1.",
        explanation: "Neither thread can continue or release its current lock. Use a consistent lock order or a timed lock attempt to reduce this risk.",
        interviewReadyAnswer: "Deadlock is a circular wait for locks held by other threads."
      },
      24: {
        answer: "Explain how the operation works in simple steps, then mention what happens when several threads use it together.",
        explanation: "This shows both the normal behavior and the concurrency concern without making the answer unnecessarily complex.",
        interviewReadyAnswer: "Describe the steps, the shared-data rule, and one practical example."
      },
      25: {
        answer: "submit() accepts a task and returns a Future, so you can later get its result or check its status. execute() accepts a Runnable and returns nothing.",
        explanation: "Use submit() when you need a result or task status. Use execute() for fire-and-forget work.",
        interviewReadyAnswer: "submit() returns a Future; execute() only starts a Runnable task."
      },
      26: {
        answer: "thenApply() takes the successful result of one future, changes it, and returns another future with the new result.",
        explanation: "If the first future fails, thenApply() is skipped and the failure continues to the new future.",
        interviewReadyAnswer: "thenApply transforms one asynchronous result into another result."
      },
      27: {
        answer: "ForkJoinPool splits a large task into smaller tasks. Idle workers can take tasks from busy workers to keep the pool balanced.",
        explanation: "This work-stealing design is useful for CPU-heavy divide-and-conquer work, but long blocking I/O can reduce its effectiveness.",
        interviewReadyAnswer: "ForkJoinPool balances split tasks by letting idle workers steal work."
      },
      28: {
        answer: "ScheduledExecutorService puts a task on a time-based queue and runs it after a delay or on a schedule.",
        explanation: "schedule() runs once. scheduleAtFixedRate() uses regular start times, while scheduleWithFixedDelay() waits after each run finishes.",
        interviewReadyAnswer: "ScheduledExecutorService runs tasks later or repeatedly according to a time schedule."
      },
      29: {
        answer: "If a thread ends because of an uncaught exception, Java sends the exception to its UncaughtExceptionHandler and ends that thread.",
        explanation: "You can install a handler to log the error or send an alert. An exception in one thread does not normally end every other thread.",
        interviewReadyAnswer: "An uncaught exception is handled by the thread's handler and terminates that thread."
      },
      30: {
        answer: "shutdown() stops new tasks but lets already submitted tasks finish. shutdownNow() tries to interrupt running tasks and returns tasks that never started.",
        explanation: "shutdownNow() is a best effort; a task that ignores interruption may keep running. Use awaitTermination() when you need to wait for shutdown.",
        interviewReadyAnswer: "shutdown() finishes accepted work; shutdownNow() requests faster interruption."
      }
    }
  };

  (window.JAVA_LEARNING_QUESTIONS || [])
    .filter((question) => question.topicId === "multithreading")
    .forEach((question) => {
      const replacement = easyAnswers[question.section]?.[question.sectionOrder];
      if (replacement) Object.assign(question, replacement);
    });
})();