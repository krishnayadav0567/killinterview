(function () {
  window.JAVA_TOPIC_THEORY = {
    "java-fundamentals": {
      introduction: "Java is a statically typed, class-based programming language designed around portability, object-oriented design, safety, and a managed runtime. A strong interview explanation connects the language syntax to the JVM execution model, the object model, memory behavior, and the contracts used by the standard library.",
      sections: [
        {
          title: "1. Java platform and execution model",
          summary: "Java source code is compiled into platform-independent bytecode. The JVM loads, verifies, and executes that bytecode on the operating system where the application runs.",
          points: [
            "JDK means Java Development Kit. It includes the tools needed to compile, package, inspect, and run Java applications.",
            "JRE describes the runtime pieces needed to run Java applications. In modern JDK distributions, the runtime is supplied as part of the JDK rather than always being installed as a separate product.",
            "The JVM is the execution engine. It is responsible for class loading, bytecode verification, memory areas, garbage collection, interpretation, and JIT compilation.",
            "The usual flow is source code (.java) → compiler (javac) → bytecode (.class) → class loader and verifier → interpreter/JIT execution.",
            "Java is portable because the bytecode targets the JVM contract, not a particular operating system. The JVM implementation still depends on the operating system and processor."
          ],
          nuances: [
            "Write once, run anywhere does not mean every application behaves identically: file paths, default encodings, time zones, native libraries, and JVM versions can still affect behavior.",
            "The JIT compiler optimizes hot code at runtime, so performance is influenced by warm-up, profiling, allocation patterns, and the selected garbage collector."
          ],
          code: "public class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Runs on a JVM\");\n    }\n}"
        },
        {
          title: "2. Types, variables, and memory references",
          summary: "Java has primitive types for direct values and reference types for objects. Variables store either a primitive value or a reference value; the variable itself is not the object.",
          points: [
            "The eight primitive types are byte, short, int, long, float, double, char, and boolean. Their sizes and ranges are defined by Java, except boolean representation details are intentionally abstracted.",
            "A reference can point to an object or be null. Multiple references can point to the same object, so changing a mutable object through one reference can be observed through another.",
            "Local variables must be definitely assigned before use. Instance fields and static fields receive default values when their containing object or class is initialized.",
            "Java is always pass-by-value. For an object argument, the value copied is the reference; the method can mutate the referenced object but cannot replace the caller's reference.",
            "Widening conversions are generally safe, while narrowing conversions can lose information and require an explicit cast."
          ],
          nuances: [
            "A final reference cannot point to a different object after assignment, but the referenced object may still be mutable.",
            "Integer caching makes some boxed comparisons appear to work with == for a small range. Use equals for value comparison instead of relying on cache behavior."
          ],
          code: "void update(List<String> values) {\n    values.add(\"Java\"); // mutates the shared object\n}\n\nvoid replace(List<String> values) {\n    values = new ArrayList<>(); // only replaces the local copy\n}"
        },
        {
          title: "3. Object-oriented design and contracts",
          summary: "Java's object model uses classes, objects, inheritance, interfaces, composition, and access control to model responsibilities and protect invariants.",
          points: [
            "Encapsulation keeps state and the operations that protect its rules together. Private fields with controlled methods are usually safer than exposing mutable state.",
            "Abstraction exposes the behavior a caller needs while hiding implementation details. Interfaces describe contracts; abstract classes can share state and implementation.",
            "Inheritance expresses an is-a relationship, but composition is often preferred when behavior should be assembled without creating a rigid hierarchy.",
            "Polymorphism allows code to depend on a parent type or interface while the runtime object supplies the implementation.",
            "Overloading is compile-time selection based on the method signature. Overriding is runtime dispatch for an inherited or interface method."
          ],
          nuances: [
            "Java classes have single inheritance, but a class can implement multiple interfaces. This avoids many forms of multiple-state inheritance while keeping contracts composable.",
            "A private method is not overridden because it is not visible to subclasses. Static methods are hidden, not dynamically overridden."
          ],
          code: "interface Payment {\n    void pay();\n}\n\nclass CardPayment implements Payment {\n    public void pay() {\n        System.out.println(\"Paid by card\");\n    }\n}\n\nPayment payment = new CardPayment();\npayment.pay(); // runtime dispatch"
        },
        {
          title: "4. Equality, identity, String, and immutability",
          summary: "Identity answers whether two references point to the same object. Equality answers whether two values should be considered logically equivalent.",
          points: [
            "The == operator compares primitive values or reference identity. The equals method is intended for logical equality.",
            "If a class overrides equals, it should also override hashCode. Equal objects must have equal hash codes so hash-based collections can locate them correctly.",
            "String is immutable. Operations such as concatenation create a new value rather than changing an existing String object.",
            "The String pool can reuse equal string literals, but application code should not depend on interning for general equality decisions.",
            "An immutable class normally has private final state, no mutators, validation during construction, and defensive copies for mutable inputs and outputs."
          ],
          nuances: [
            "A mutable object used as a HashMap key can become unreachable from the map if fields involved in hashCode change after insertion.",
            "StringBuilder is preferred for repeated single-threaded concatenation; StringBuffer adds synchronization and is usually chosen only when that legacy behavior is required."
          ],
          code: "final class UserId {\n    private final String value;\n\n    UserId(String value) {\n        this.value = Objects.requireNonNull(value);\n    }\n\n    public String value() {\n        return value;\n    }\n}"
        },
        {
          title: "5. Exceptions and reliable failure handling",
          summary: "Exceptions separate normal control flow from failure paths. Good code preserves useful context, handles failures at the right boundary, and does not silently hide errors.",
          points: [
            "Checked exceptions are part of a method's compile-time contract. Unchecked exceptions usually represent programming errors, invalid state, or invalid arguments.",
            "try, catch, finally, and try-with-resources control failure handling and resource cleanup.",
            "try-with-resources closes AutoCloseable resources in reverse declaration order, even when an exception is thrown.",
            "catch blocks should be specific enough to respond correctly. Catching Exception everywhere can hide defects and make recovery impossible.",
            "When wrapping an exception, preserve the original cause so logs and diagnostics retain the failure chain."
          ],
          nuances: [
            "finally normally runs even when returning from try or catch, but it should not contain a return statement because that can suppress an earlier return or exception.",
            "An exception message is for diagnosis, not a stable machine-readable API. Use a clear exception type and structured error data when callers need to react programmatically."
          ],
          code: "try (BufferedReader reader = Files.newBufferedReader(path)) {\n    return reader.readLine();\n} catch (IOException error) {\n    throw new UncheckedIOException(\"Could not read config\", error);\n}"
        },
        {
          title: "6. Collections, generics, and type safety",
          summary: "The Collections Framework provides standard data structures with defined contracts. Generics move many type errors from runtime to compile time.",
          points: [
            "List preserves order and allows duplicates. Set models uniqueness. Map associates keys with values. Queue and Deque model processing order.",
            "ArrayList gives fast indexed access and good locality. LinkedList is rarely the best general-purpose List, but can be useful for deque operations when used through the Deque contract.",
            "HashMap depends on hashCode and equals. TreeMap depends on ordering. LinkedHashMap preserves a defined encounter order and can support LRU-style designs.",
            "Generics are primarily compile-time metadata. Java implements them through type erasure, so most generic type arguments are not available as runtime type information.",
            "Producer Extends, Consumer Super (PECS) is a practical rule: use ? extends when reading values and ? super when writing values."
          ],
          nuances: [
            "HashMap permits one null key and multiple null values; ConcurrentHashMap does not permit null keys or values because null would be ambiguous in concurrent lookups.",
            "Fail-fast iterators are a best-effort bug detector, not a thread-safety guarantee. Use the correct concurrent collection or synchronization strategy."
          ],
          code: "List<? extends Number> numbers = List.of(1, 2, 3);\nNumber first = numbers.get(0);\n\nList<? super Integer> output = new ArrayList<Number>();\noutput.add(42);"
        },
        {
          title: "7. Lambdas, streams, and Optional",
          summary: "Modern Java supports passing behavior as values and building declarative data-processing pipelines while keeping execution lazy until a terminal operation runs.",
          points: [
            "A lambda needs a target functional interface. The compiler uses the target type to infer parameter and return types.",
            "A stream is not a data structure. It describes a pipeline over a source and can be consumed only once.",
            "Intermediate operations such as map and filter are lazy. Terminal operations such as collect, reduce, count, and forEach trigger evaluation.",
            "Streams should avoid side effects in intermediate operations. Parallel streams are not automatically faster and require associative, thread-safe operations.",
            "Optional models a value that may be absent. It is most useful as a return type, not as a field, method parameter, or replacement for every null check."
          ],
          nuances: [
            "A stream pipeline may short-circuit with operations such as findFirst, findAny, anyMatch, or limit.",
            "A lambda can capture local variables only when they are final or effectively final. This prevents confusing mutation across an asynchronous or deferred execution boundary."
          ],
          code: "List<String> names = users.stream()\n    .filter(User::isActive)\n    .map(User::name)\n    .sorted()\n    .toList();"
        },
        {
          title: "8. Memory, performance, and interview reasoning",
          summary: "Interview-quality Java answers explain not only what an API does, but also allocation, complexity, mutability, thread-safety, and the trade-off behind the choice.",
          points: [
            "Objects are generally allocated on the heap, while each thread has its own stack frames for method calls and local execution state. The JVM may optimize allocations internally, so treat this as a conceptual model rather than an absolute implementation rule.",
            "Garbage collection identifies objects that are no longer reachable and reclaims their memory. It does not guarantee immediate cleanup of external resources such as files or sockets.",
            "Prefer measured performance analysis. Big-O complexity, allocation rate, object lifetime, cache behavior, I/O, and contention can all matter.",
            "Use clear contracts: document null behavior, ordering, duplicate handling, mutability, thread-safety, and failure behavior.",
            "When answering an interview question, define the concept, explain why it exists, describe the internal mechanism, give a small example, and state a limitation or trade-off."
          ],
          nuances: [
            "A memory leak in a garbage-collected language usually means reachable objects are retained accidentally, for example by static collections, listeners, caches without eviction, or ThreadLocal misuse.",
            "The best implementation choice depends on workload. A data structure that is optimal for random access may be poor for insertion patterns, memory locality, or concurrency."
          ],
          code: "// A useful interview answer structure\n// What: define the concept\n// Why: explain the problem it solves\n// How: describe the runtime or algorithm\n// Trade-off: state when another choice is better"
        }
      ],
      takeaways: [
        "Java source becomes bytecode, and the JVM provides the runtime portability and execution services.",
        "The most important object contracts are equality, hashCode, ordering, mutability, and ownership of mutable state.",
        "Collections and streams should be selected based on their contract, complexity, memory behavior, and concurrency requirements.",
        "A strong interview answer connects a simple definition to an internal mechanism and a practical trade-off."
      ]
    },
    multithreading: {
      introduction: "Multithreading is the execution of multiple independent flows of control within one process. It can improve responsiveness and throughput, but it also introduces shared-state risks: visibility, atomicity, ordering, contention, deadlock, starvation, and lifecycle management.",
      sections: [
        {
          title: "1. Processes, threads, and task design",
          summary: "A process owns an address space and operating-system resources. Threads are execution paths inside that process and share its heap while keeping their own stacks and program counters.",
          points: [
            "A thread is not the same as a task. A task is work to be performed; a thread is one possible worker that executes tasks.",
            "Creating a raw Thread is useful for simple demonstrations, but production code usually submits tasks to an ExecutorService so thread creation and lifecycle are managed centrally.",
            "Concurrency means multiple tasks are in progress; parallelism means tasks are executing at the same time on multiple cores.",
            "Every thread has its own stack and execution context, while ordinary objects and static state can be shared through the heap.",
            "A thread should have a clear ownership and shutdown policy. Unbounded thread creation can exhaust memory and scheduler resources."
          ],
          nuances: [
            "The number of useful threads depends on the workload. CPU-bound work is generally limited by available cores; I/O-bound work can tolerate more waiting threads, but still needs bounded resources.",
            "Calling run directly executes on the current thread. Calling start asks the JVM to create a new execution path and then invoke run on it."
          ],
          code: "ExecutorService pool = Executors.newFixedThreadPool(4);\nFuture<Integer> result = pool.submit(() -> 40 + 2);\npool.shutdown();"
        },
        {
          title: "2. The Java Memory Model: visibility, atomicity, and ordering",
          summary: "The Java Memory Model defines when one thread is guaranteed to observe another thread's actions. Correct concurrent code needs a happens-before relationship for shared state.",
          points: [
            "Visibility means a write performed by one thread becomes observable by another. Without a guarantee, a thread may repeatedly read a stale value.",
            "Atomicity means an operation happens as one indivisible unit. The expression count++ is a read, modify, and write sequence, so it is not atomic by itself.",
            "Ordering concerns the permitted reordering of operations by the compiler, processor, and runtime. Synchronization constructs establish ordering guarantees.",
            "Starting a thread happens-before actions in that thread; actions in a thread happen-before a successful join returns; unlocking a monitor happens-before a later lock on that monitor.",
            "Safe publication ensures another thread sees a fully initialized object, using final fields, static initialization, volatile references, locks, concurrent collections, or other defined mechanisms."
          ],
          nuances: [
            "A volatile field provides visibility and ordering for that field, but it does not make a compound read-modify-write operation atomic.",
            "Correctness must be reasoned about with the memory model, not inferred from a test that happened to pass on one machine."
          ],
          code: "class Flag {\n    private volatile boolean ready;\n\n    void publish() {\n        ready = true;\n    }\n\n    boolean isReady() {\n        return ready;\n    }\n}"
        },
        {
          title: "3. synchronized, monitors, and explicit locks",
          summary: "Mutual exclusion prevents multiple threads from entering a protected critical section at the same time. Java provides intrinsic monitors through synchronized and more configurable locks through java.util.concurrent.locks.",
          points: [
            "Every Java object can act as a monitor lock. A synchronized instance method locks this; a synchronized static method locks the Class object.",
            "A synchronized block lets the program choose a lock object and keep the critical section small.",
            "Synchronization provides mutual exclusion, visibility, and ordering for actions protected by the same lock.",
            "ReentrantLock supports features such as tryLock, interruptible lock acquisition, fairness configuration, and multiple Conditions.",
            "Lock acquisition must be paired with unlock in a finally block so exceptions do not leave a lock held."
          ],
          nuances: [
            "Synchronizing on publicly reachable objects such as String literals or this can create accidental lock contention. Prefer a private final lock when appropriate.",
            "A fair lock can reduce starvation but may reduce throughput. Locks should be chosen for a clear correctness or operational requirement, not merely because they look more advanced."
          ],
          code: "private final Object lock = new Object();\nprivate int count;\n\nvoid increment() {\n    synchronized (lock) {\n        count++;\n    }\n}"
        },
        {
          title: "4. Atomic classes and lock-free updates",
          summary: "Atomic classes use compare-and-set style operations to update individual values safely without an application-level lock.",
          points: [
            "AtomicInteger, AtomicLong, AtomicReference, and related classes support atomic reads, writes, updates, and compare-and-set operations.",
            "Compare-and-set succeeds only when the current value matches the expected value; otherwise the caller can retry or take another path.",
            "LongAdder is often effective for highly contended counters where exact instantaneous reads are less important than high update throughput.",
            "Atomic variables solve a narrower problem than a lock. If several fields must change consistently as one invariant, a single atomic field may not be enough.",
            "The ABA problem occurs when a value changes from A to B and back to A before a compare-and-set check. Versioned or stamped references can detect that history."
          ],
          nuances: [
            "Lock-free does not mean wait-free. A thread can still retry repeatedly under contention.",
            "Atomic operations are not automatically cheaper than locks in every workload; contention, cache-line traffic, and the size of the protected invariant matter."
          ],
          code: "AtomicInteger sequence = new AtomicInteger();\nint next = sequence.incrementAndGet();\n\nAtomicReference<String> state = new AtomicReference<>(\"NEW\");\nstate.compareAndSet(\"NEW\", \"RUNNING\");"
        },
        {
          title: "5. Executors, futures, and CompletableFuture",
          summary: "Executors separate task submission from thread management. Futures represent a result that may become available later, while CompletableFuture composes asynchronous stages.",
          points: [
            "ExecutorService manages worker threads, task queues, submission, shutdown, and result retrieval.",
            "shutdown stops accepting new tasks while allowing submitted tasks to finish. shutdownNow attempts interruption but cannot guarantee that every task stops.",
            "A Future can report completion, return a result, cancel work, and expose an exception through get.",
            "CompletableFuture supports dependent stages such as thenApply, thenCompose, thenCombine, exceptionally, handle, and whenComplete.",
            "Async stages without an explicit executor use a common pool by default. A custom executor is often safer when workload, latency, or isolation requirements are known."
          ],
          nuances: [
            "An executor queue and pool size should be bounded or deliberately chosen. An unbounded queue can hide overload until latency and memory use become unacceptable.",
            "Always define exceptional completion and cancellation behavior. An asynchronous pipeline that has no error path is incomplete."
          ],
          code: "CompletableFuture\n    .supplyAsync(this::loadUser, executor)\n    .thenApply(User::name)\n    .exceptionally(error -> \"unknown\")\n    .thenAccept(this::sendGreeting);"
        },
        {
          title: "6. Coordination: wait, notify, conditions, and interruption",
          summary: "Coordination lets threads wait for a state change instead of repeatedly polling. Correct coordination protects the condition and responds to interruption.",
          points: [
            "Object.wait, notify, and notifyAll must be used while holding that object's monitor. wait releases the monitor while waiting and reacquires it before returning.",
            "Always wait in a while loop that rechecks the condition because wakeups can be spurious and another thread may consume the condition first.",
            "Condition provides the same idea with an explicit Lock and can support separate wait sets such as notEmpty and notFull.",
            "Thread interruption is a cooperative cancellation signal. Blocking methods often throw InterruptedException and clear the interrupted status when they do so.",
            "Code that cannot rethrow InterruptedException should normally restore the flag with Thread.currentThread().interrupt() after cleanup."
          ],
          nuances: [
            "notify wakes an arbitrary waiter; notifyAll wakes all waiters, which is usually safer when multiple conditions share a monitor but can create a wake-up surge.",
            "Sleeping does not release a monitor lock. Waiting does release the monitor associated with wait."
          ],
          code: "synchronized (queue) {\n    while (queue.isEmpty()) {\n        queue.wait();\n    }\n    return queue.remove();\n}"
        },
        {
          title: "7. Concurrent collections and safe data sharing",
          summary: "Concurrent collections provide operations designed for multi-threaded access and are preferable to manually wrapping ordinary collections in ad hoc synchronization.",
          points: [
            "ConcurrentHashMap supports concurrent access and atomic compound methods such as putIfAbsent, computeIfAbsent, and merge.",
            "CopyOnWriteArrayList is useful when reads and iteration greatly outnumber writes. Each mutation copies the backing array, so it is expensive for write-heavy workloads.",
            "BlockingQueue supports producer-consumer designs by combining thread-safe access with waiting or timed operations.",
            "ConcurrentLinkedQueue is non-blocking and useful when producers and consumers should not wait for capacity, but it does not provide backpressure by itself.",
            "Thread-safe individual operations do not automatically make a multi-step business transaction atomic. The entire invariant may still need a lock or atomic design."
          ],
          nuances: [
            "ConcurrentHashMap does not permit null keys or values because a null result from a concurrent lookup cannot distinguish absence from a stored null.",
            "Iteration over concurrent collections is usually weakly consistent: it can proceed while updates occur, but it is not a snapshot of one single instant."
          ],
          code: "BlockingQueue<String> queue = new ArrayBlockingQueue<>(100);\nqueue.put(\"task\");\nString task = queue.take();"
        },
        {
          title: "8. Deadlock, starvation, race conditions, and safe design",
          summary: "Most concurrency failures are coordination failures. Design around ownership, lock ordering, bounded resources, and explicit lifecycle rules.",
          points: [
            "A race condition occurs when the result depends on timing between unsynchronized operations on shared state.",
            "Deadlock requires a cycle of waiting, commonly caused by acquiring multiple locks in inconsistent orders.",
            "Starvation occurs when a thread cannot obtain the CPU, lock, or resource it needs. Livelock occurs when threads remain active but make no useful progress.",
            "Reduce risk by minimizing shared mutable state, keeping critical sections small, using consistent lock ordering, preferring immutable messages, and using timeouts where appropriate.",
            "A concurrent design should define what happens on cancellation, timeout, interruption, executor rejection, partial failure, and shutdown."
          ],
          nuances: [
            "Thread dumps are valuable for diagnosing blocked threads, deadlocks, and unexpected pool saturation. Logging task identifiers and durations helps connect symptoms to work.",
            "Adding synchronization until a race disappears is not enough. The design needs a documented invariant and a happens-before argument explaining why it is correct."
          ],
          code: "// Consistent lock ordering prevents circular waits\nObject first = lockA;\nObject second = lockB;\n\nsynchronized (first) {\n    synchronized (second) {\n        transfer();\n    }\n}"
        }
      ],
      takeaways: [
        "Separate tasks from threads and prefer managed executors for production work.",
        "Every shared-state answer should address visibility, atomicity, ordering, and safe publication.",
        "Use synchronized, locks, volatile, atomics, or concurrent collections according to the invariant being protected.",
        "A complete concurrent design includes cancellation, interruption, overload, failure, timeout, and shutdown behavior."
      ]
    }
  };
})();