(function () {
  const topicId = "oop-concepts";
  const topicName = "OOP Concepts";

  window.JAVA_TOPIC_THEORY = window.JAVA_TOPIC_THEORY || {};
  window.JAVA_TOPIC_THEORY[topicId] = {
    introduction: "Object-oriented programming organizes software around objects that combine state and behavior. Strong Java design uses encapsulation, abstraction, inheritance, and polymorphism deliberately, while also using composition, interfaces, and clear contracts to keep change localized.",
    sections: [
      {
        title: "1. Classes and objects",
        summary: "A class defines a type's structure and behavior; an object is a runtime instance of that type.",
        points: [
          "A class can declare fields, constructors, methods, nested types, and initialization logic.",
          "An object has identity, state, and behavior exposed through its class contract.",
          "A variable may be declared using a class or interface type while referring to a concrete object.",
          "Constructors establish the initial state and can enforce invariants before an object is published.",
          "The new expression creates an object and returns a reference to it, unless a factory or another mechanism supplies the instance."
        ],
        nuances: [
          "A class is not itself an object instance, although Class objects represent loaded types at runtime.",
          "Prefer small, cohesive classes with one clear responsibility rather than classes that become global containers for unrelated behavior."
        ],
        code: "class Account {\n    private final String id;\n\n    Account(String id) {\n        this.id = id;\n    }\n}\n\nAccount account = new Account(\"A-1\");"
      },
      {
        title: "2. Encapsulation",
        summary: "Encapsulation protects object invariants by controlling how state is read and changed.",
        points: [
          "Private fields prevent callers from changing representation directly.",
          "Methods can validate input and preserve business rules before changing state.",
          "A public API should expose what clients need rather than every implementation detail.",
          "Returning mutable internal collections can break encapsulation even when the field itself is private.",
          "Immutability is a strong form of encapsulation because state cannot change after construction."
        ],
        nuances: [
          "Getters and setters do not automatically provide good encapsulation; a setter that accepts every value may expose the invariant.",
          "Defensive copies or unmodifiable views may be needed when exposing collection-valued state."
        ],
        code: "class BankAccount {\n    private long cents;\n\n    void withdraw(long amount) {\n        if (amount <= 0 || amount > cents) throw new IllegalArgumentException();\n        cents -= amount;\n    }\n}"
      },
      {
        title: "3. Abstraction",
        summary: "Abstraction exposes essential behavior while hiding details that callers should not depend on.",
        points: [
          "An interface describes capabilities through a contract without requiring one implementation strategy.",
          "An abstract class can share state or implementation while leaving selected behavior to subclasses.",
          "Abstraction reduces the number of details a caller must understand to use a component.",
          "Good abstractions are shaped around stable responsibilities and client needs.",
          "Leaking implementation-specific return types or mutable internals weakens an abstraction."
        ],
        nuances: [
          "Abstraction is not the same as hiding every detail; useful contracts must expose enough behavior to be usable.",
          "An interface is often the better boundary when clients need a capability rather than shared implementation."
        ],
        code: "interface PaymentGateway {\n    Receipt charge(Money amount);\n}\n\nclass Checkout {\n    private final PaymentGateway gateway;\n\n    Checkout(PaymentGateway gateway) { this.gateway = gateway; }\n}"
      },
      {
        title: "4. Inheritance",
        summary: "Inheritance creates a subtype relationship in which a child class reuses or specializes behavior from a parent class.",
        points: [
          "A Java class can extend one direct superclass.",
          "A subclass inherits accessible members and can add or override behavior.",
          "Inheritance should model a genuine substitutable is-a relationship, not merely code reuse.",
          "The parent constructor runs as part of constructing a subclass object.",
          "Composition is often safer when behavior should be assembled rather than constrained by a hierarchy."
        ],
        nuances: [
          "Private members are not directly accessible to subclasses, and static methods are hidden rather than overridden.",
          "A deep hierarchy increases coupling and makes changes harder to reason about."
        ],
        code: "class Vehicle {\n    void move() { System.out.println(\"moving\"); }\n}\n\nclass Car extends Vehicle {\n    @Override void move() { System.out.println(\"driving\"); }\n}"
      },
      {
        title: "5. Polymorphism",
        summary: "Polymorphism lets one contract represent different concrete behaviors.",
        points: [
          "A parent reference or interface reference can point to a compatible subtype object.",
          "Overridden instance methods are selected by the runtime object's type through dynamic dispatch.",
          "Overloading is compile-time selection based on the declared argument types and method signature.",
          "Polymorphism reduces conditional code by moving behavior into implementations.",
          "The declared reference type controls which members are available to the compiler."
        ],
        nuances: [
          "Fields are not polymorphic in the same way methods are; field access is resolved by the reference type.",
          "Static methods are resolved by the declared type and are hidden rather than dynamically dispatched."
        ],
        code: "Shape shape = new Circle(2);\nshape.draw(); // Circle implementation\n\nList<Shape> shapes = List.of(new Circle(1), new Square(2));"
      },
      {
        title: "6. Composition and delegation",
        summary: "Composition builds behavior by giving an object collaborators and delegating work to them.",
        points: [
          "A composed object owns or references other objects that perform parts of its work.",
          "Composition can change behavior by replacing collaborators without changing the outer class hierarchy.",
          "Dependency injection supplies collaborators from outside, improving testing and configuration.",
          "Delegation keeps responsibilities focused when one class should coordinate rather than implement everything.",
          "Composition usually creates looser coupling than inheriting implementation from a parent."
        ],
        nuances: [
          "Composition does not mean every field should be an interface; choose boundaries where variation or substitution is valuable.",
          "A composed collaborator's lifecycle and ownership should be explicit."
        ],
        code: "class ReportService {\n    private final Formatter formatter;\n\n    ReportService(Formatter formatter) { this.formatter = formatter; }\n\n    String render(Report report) { return formatter.format(report); }\n}"
      },
      {
        title: "7. Interfaces and contracts",
        summary: "Interfaces define contracts that unrelated classes can implement, enabling substitution without shared class ancestry.",
        points: [
          "A class can implement multiple interfaces even though it can extend only one class.",
          "Interface references allow clients to depend on capabilities instead of concrete classes.",
          "Default methods can provide reusable behavior, but they should not turn an interface into an unrelated utility holder.",
          "A good interface is cohesive and does not force clients to implement methods they do not need.",
          "Interface contracts include behavior, error handling, side effects, and performance expectations where relevant."
        ],
        nuances: [
          "Interface compatibility is more than matching method signatures; implementations must honor behavioral substitutability.",
          "Multiple interfaces can create default-method conflicts that the implementing class must resolve explicitly."
        ],
        code: "interface Cache<K, V> {\n    V get(K key);\n    void put(K key, V value);\n}\n\nclass MemoryCache implements Cache<String, String> { /* ... */ }"
      },
      {
        title: "8. Cohesion, coupling, and maintainability",
        summary: "Maintainable object-oriented design keeps related responsibilities together and unnecessary dependencies apart.",
        points: [
          "High cohesion means a class's methods and state support one focused responsibility.",
          "Low coupling means a class depends on fewer concrete implementation details of other classes.",
          "Encapsulation, interfaces, and dependency injection can reduce coupling at change boundaries.",
          "A class that knows too much about another object's internals often indicates a design smell.",
          "Tests are easier when collaborators are replaceable and responsibilities are explicit."
        ],
        nuances: [
          "Splitting every method into a new class is not automatically good design; excessive indirection can reduce clarity.",
          "Coupling is not always bad—some dependencies are necessary. The goal is intentional, stable dependency direction."
        ],
        code: "class InvoiceService {\n    private final TaxCalculator taxes;\n    private final InvoiceRepository repository;\n\n    InvoiceService(TaxCalculator taxes, InvoiceRepository repository) {\n        this.taxes = taxes;\n        this.repository = repository;\n    }\n}"
      },
      {
        title: "9. Substitutability and design principles",
        summary: "A subtype or implementation should be usable wherever its contract is expected without surprising clients.",
        points: [
          "The Liskov Substitution Principle asks whether subtypes preserve the expectations of the parent contract.",
          "A subclass that rejects valid parent inputs or changes promised results may violate substitutability.",
          "The Open/Closed Principle favors extending behavior without modifying stable client code for every new variation.",
          "The Single Responsibility Principle focuses a class on one reason to change.",
          "Principles are design heuristics, not excuses to add abstractions without a real change boundary."
        ],
        nuances: [
          "Inheritance is not automatically polymorphic design; a subtype relationship must preserve the useful contract.",
          "A practical design balances principles with simplicity, performance, and the actual volatility of the system."
        ],
        code: "interface DiscountPolicy {\n    Money discount(Order order);\n}\n\nclass NoDiscount implements DiscountPolicy {\n    public Money discount(Order order) { return Money.zero(); }\n}"
      },
      {
        title: "10. Choosing an OOP design",
        summary: "Use object-oriented features to make responsibilities, variation, and invariants explicit rather than to satisfy a checklist.",
        points: [
          "Start with the behavior and invariants the domain requires, then choose the smallest useful abstraction.",
          "Prefer composition when a relationship is has-a, uses-a, or can vary independently.",
          "Use inheritance when the subtype truly conforms to the parent contract and shared lifecycle is meaningful.",
          "Expose interfaces at boundaries where implementations may change or need replacement in tests.",
          "Keep constructors valid, methods cohesive, and state transitions observable through a clear API."
        ],
        nuances: [
          "An OOP answer is incomplete if it names the four pillars without discussing trade-offs and contracts.",
          "Functional and procedural techniques can coexist with OOP; Java design is not required to use objects for every tiny operation."
        ],
        code: "interface NotificationSender {\n    void send(Message message);\n}\n\nclass AlertService {\n    private final NotificationSender sender;\n    AlertService(NotificationSender sender) { this.sender = sender; }\n}"
      }
    ],
    takeaways: [
      "Encapsulation protects invariants, abstraction defines useful boundaries, inheritance models substitutable is-a relationships, and polymorphism enables interchangeable behavior.",
      "Composition and delegation are often safer than inheriting implementation.",
      "A good OOP design explains responsibilities, contracts, coupling, and likely change—not only class syntax.",
      "Use interfaces and dependency injection where behavior needs to vary or be replaced in tests."
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
    ["What is object-oriented programming?", "Object-oriented programming organizes software around objects that combine state and behavior behind contracts.", "Java uses classes, objects, encapsulation, abstraction, inheritance, and polymorphism to model responsibilities.", "class User { String name; void login() {} }", "It helps model business entities and isolate behavior.", "Reciting the four pillars without explaining contracts or trade-offs.", "OOP organizes state and behavior into collaborating objects with explicit contracts."],
    ["What is a class?", "A class is a blueprint and type definition that declares possible state, behavior, and construction rules.", "Objects are runtime instances of classes, while a class defines what those instances can do.", "class Invoice { private Money total; }", "It creates a reusable domain type.", "Calling a class an object instance.", "A class defines the structure and behavior of its instances."],
    ["What is an object?", "An object is a runtime instance with identity, state, and behavior described by its class or interfaces.", "A reference variable points to an object, and the object's methods operate on its state.", "Invoice invoice = new Invoice();", "Objects represent concrete domain or service collaborators.", "Assuming every variable is an object; primitives are not objects.", "An object is a runtime entity with state, identity, and behavior."],
    ["What is encapsulation?", "Encapsulation controls access to state and exposes operations that preserve the object's invariants.", "Private fields plus validated methods keep callers from putting an object into an invalid state.", "class Account { private long cents; }", "It protects balances, permissions, and lifecycle rules.", "Thinking private fields alone guarantee good encapsulation.", "Encapsulation protects state and invariants through a controlled API."],
    ["What is abstraction?", "Abstraction exposes essential behavior while hiding implementation details that callers should not depend on.", "Interfaces and abstract classes are common Java tools for defining abstractions.", "interface Storage { void save(Item item); }", "Clients can use storage without knowing whether it is in memory or remote.", "Hiding so much that the API cannot be used or tested.", "Abstraction presents a useful contract while hiding unnecessary detail."],
    ["What is inheritance?", "Inheritance creates a subtype relationship in which a child class extends a parent class.", "The child can reuse accessible behavior, add members, and override compatible instance methods.", "class Dog extends Animal { }", "It can model a genuine is-a relationship with shared contract behavior.", "Using inheritance only to reuse a few lines of code.", "Inheritance creates a parent-child type relationship with substitutable behavior."],
    ["What is polymorphism?", "Polymorphism allows one parent or interface type to represent objects with different concrete implementations.", "Overridden instance methods dispatch according to the runtime object.", "Animal pet = new Dog();\npet.speak();", "It lets new implementations fit existing client code.", "Confusing overriding with overloading.", "Polymorphism lets clients call a common contract while implementations vary."],
    ["What is composition?", "Composition builds a class from collaborating objects instead of inheriting their implementation.", "The outer object delegates parts of its work to injected or owned collaborators.", "class Checkout { private PaymentGateway gateway; }", "It supports replaceable payment, logging, or persistence strategies.", "Calling every association composition without defining ownership.", "Composition assembles behavior through collaborators and delegation."],
    ["What is an interface?", "An interface is a reference type that defines a contract a class can implement.", "A class can implement multiple interfaces, enabling capability-based substitution.", "class FileStore implements Store { }", "It separates clients from concrete implementations.", "Treating an interface as only a marker when behavior is needed.", "An interface defines a capability contract independent of one class hierarchy."],
    ["What is method overriding?", "Overriding is a subclass or implementation providing a compatible implementation of an inherited instance method.", "Runtime dispatch chooses the most specific override for the actual object.", "@Override\nvoid draw() { }", "It enables runtime polymorphism.", "Changing the method signature and accidentally overloading instead.", "Overriding replaces inherited instance behavior for a subtype." ]
  ]);

  addLearningQuestions("why", [
    ["Why use encapsulation?", "Encapsulation prevents callers from bypassing validation and protects invariants as implementation changes.", "A controlled method can reject invalid state transitions and preserve consistency.", "account.withdraw(amount);", "It protects money, permissions, and workflow state.", "Exposing public mutable fields because a getter exists.", "Encapsulation reduces invalid states and limits change impact."],
    ["Why use abstraction?", "Abstraction reduces the details clients must understand and lets implementations change behind a stable contract.", "Clients depend on behavior rather than storage, protocol, or algorithm details.", "PaymentGateway gateway;", "It makes integrations replaceable and easier to test.", "Creating abstractions before identifying a real variation or boundary.", "Abstraction keeps clients focused on stable behavior."],
    ["Why prefer composition in many designs?", "Composition avoids rigid hierarchies and lets behavior vary by replacing collaborators.", "A composed dependency can be configured, mocked, or changed without changing the class's parent type.", "new ReportService(csvFormatter);", "It supports strategy and dependency injection patterns.", "Assuming composition automatically removes all coupling.", "Composition offers flexible reuse and often lower coupling than inheritance."],
    ["Why is inheritance more than code reuse?", "Inheritance promises that a subtype can be used wherever the parent contract is expected.", "A subclass that reuses code but violates parent expectations is a dangerous design.", "List<Animal> animals = List.of(new Dog());", "It preserves client assumptions through substitutability.", "Extending a class solely to access protected helpers.", "Inheritance should express a valid is-a relationship, not just reuse implementation."],
    ["Why use polymorphism?", "Polymorphism removes repeated type checks and lets behavior vary behind a common contract.", "Adding a new implementation can require little or no change to clients that depend on the abstraction.", "for (Shape s : shapes) s.draw();", "It supports extensible payment, notification, and pricing systems.", "Building a giant switch over concrete class names instead.", "Polymorphism localizes variation in implementations."],
    ["Why keep classes cohesive?", "High cohesion keeps related state and behavior together, making a class easier to understand and change.", "A class with unrelated responsibilities accumulates reasons to change and becomes difficult to test.", "InvoiceCalculator calculates invoice totals only.", "Focused services have clearer tests and dependencies.", "Calling a large utility class cohesive because all methods are static.", "Cohesion keeps a class focused on one related responsibility."],
    ["Why reduce coupling?", "Lower unnecessary coupling lets one component change without forcing unrelated components to change.", "Interfaces, encapsulation, and dependency injection make dependency direction more intentional.", "new AlertService(sender);", "It limits the blast radius of implementation changes.", "Removing every dependency even when collaboration is required.", "Reduce unstable concrete dependencies while keeping necessary collaboration explicit."],
    ["Why use dependency injection?", "Dependency injection supplies collaborators from outside instead of constructing them inside the class.", "The class depends on a contract and callers choose the implementation, configuration, or test double.", "Service(Repository repository)", "It makes infrastructure replaceable and unit tests focused.", "Injecting every primitive or creating an abstraction with no variation.", "Dependency injection improves substitution and testability at real boundaries."],
    ["Why can a public setter weaken an invariant?", "A public setter may allow callers to change state without enforcing the rules that keep related fields consistent.", "State transitions are often safer as meaningful operations that validate and update together.", "order.cancel();", "Domain methods can prevent illegal lifecycle changes.", "Adding setters for every private field automatically.", "Expose valid operations rather than unrestricted state mutation."],
    ["Why should an interface be cohesive?", "A cohesive interface gives clients a focused contract and avoids forcing implementations to support unrelated operations.", "Large interfaces increase coupling and often produce empty or unsupported methods.", "interface Printer { void print(Document d); }", "Small capability interfaces are easier to implement and substitute.", "Putting every related operation in one universal interface.", "Cohesive interfaces keep client and implementation responsibilities focused." ]
  ]);

  addLearningQuestions("how", [
    ["How does dynamic dispatch work?", "When an overridden instance method is called through a parent or interface reference, the runtime object determines the implementation.", "The compiler checks the declared type, then the JVM dispatches to the most specific applicable override.", "Shape shape = new Circle();\nshape.draw();", "A list of interface values can invoke different implementations uniformly.", "Assuming fields and static methods dispatch the same way.", "Dynamic dispatch selects overridden instance behavior from the runtime object."],
    ["How do you protect a collection field?", "Keep the field private and expose an unmodifiable view or defensive copy rather than the mutable internal collection.", "This prevents callers from changing state without going through validation.", "return List.copyOf(items);", "It protects an object's internal list of roles or line items.", "Returning the raw mutable list from a getter.", "Expose a safe view or copy when collection state is encapsulated."],
    ["How do you choose between an interface and an abstract class?", "Use an interface for a capability or contract and an abstract class when shared state or implementation is central to the hierarchy.", "A class can implement multiple interfaces but extend only one class.", "interface Cache { }\nabstract class BaseJob { }", "Interfaces suit replaceable collaborators; abstract classes suit shared lifecycle code.", "Choosing an abstract class merely to share one helper method.", "Choose interfaces for capability and abstract classes for meaningful shared base behavior."],
    ["How do you replace inheritance with composition?", "Move the varying behavior into a collaborator and delegate to it from the coordinating class.", "The outer class can receive a different implementation without changing its parent type.", "class SortService { private final Comparator comparator; }", "Strategies such as pricing, formatting, and retry policy become replaceable.", "Moving code to a collaborator but keeping the same hidden global dependency.", "Extract variable behavior into an injected collaborator and delegate."],
    ["How do you implement runtime polymorphism?", "Define a common interface or parent contract, implement it in multiple classes, and use the contract type in client code.", "Calls to overridden instance methods dispatch to the concrete object.", "List<PaymentMethod> methods;\nmethod.pay();", "Payment methods can be added without changing checkout orchestration.", "Using instanceof branches for every implementation.", "Program to an abstraction and let implementations provide behavior."],
    ["How do you make a class immutable?", "Make the class final or prevent unsafe extension, keep fields private and final, validate in the constructor, and avoid leaking mutable state.", "If a mutable input is accepted, make a defensive copy; if mutable state is returned, return a safe copy or view.", "final class Money { private final long cents; }", "Immutable value objects are safe to share and cache.", "Returning a mutable internal Date or list directly.", "Immutability requires protecting the whole reachable state, not only declaring fields final."],
    ["How do you preserve substitutability in a subtype?", "Honor the parent method's input, output, exception, and state expectations rather than surprising callers.", "A subtype should not require stronger preconditions or provide weaker guarantees than the parent contract.", "class ReadOnlyClock implements Clock { }", "Clients can use different implementations without special-case checks.", "Throwing UnsupportedOperationException for behavior the parent promises.", "A subtype must preserve the useful behavioral contract of its parent."],
    ["How do you prevent a class from being extended?", "Declare the class final, or make construction and extension controlled through a different design when appropriate.", "A final class cannot have subclasses, which can protect invariants and simplify reasoning.", "public final class Money { }", "It prevents unsafe extension of immutable or security-sensitive types.", "Using final as a substitute for good encapsulation everywhere.", "final prevents class inheritance but does not make every field immutable."],
    ["How do you resolve an interface default-method conflict?", "The implementing class overrides the conflicting method and chooses or combines the desired behavior explicitly.", "Java cannot infer which unrelated default contract should win.", "class Report implements A, B { public void run() { A.super.run(); } }", "It makes behavior explicit when multiple capabilities overlap.", "Assuming the first interface in the implements list wins.", "Implement the conflicting method explicitly and delegate if useful."],
    ["How do you explain OOP in an interview?", "Define the four pillars, connect them to contracts and change, then compare inheritance with composition using a concrete example.", "A strong answer explains why a design choice protects invariants or enables substitution.", "PaymentGateway gateway = new StripeGateway();", "It demonstrates design judgment rather than keyword memorization.", "Listing encapsulation, abstraction, inheritance, and polymorphism without trade-offs.", "Explain OOP through responsibilities, contracts, substitution, and maintainability." ]
  ]);

  const quizQuestions = [
    ["output", "What is the output?", "class Animal {\n    void speak() { System.out.println(\"animal\"); }\n}\nclass Dog extends Animal {\n    @Override void speak() { System.out.println(\"dog\"); }\n}\nAnimal a = new Dog();\na.speak();", ["animal", "dog", "Compilation error", "No output"], 1, "Overridden instance methods use dynamic dispatch, so the Dog implementation runs."],
    ["output", "What is the output?", "class Parent { int value = 1; }\nclass Child extends Parent { int value = 2; }\nParent item = new Child();\nSystem.out.println(item.value);", ["1", "2", "Compilation error", "NullPointerException"], 0, "Fields are resolved using the declared reference type; field access is not dynamically dispatched like methods."],
    ["output", "What is the output?", "class Printer {\n    void print(Object value) { System.out.println(\"object\"); }\n    void print(String value) { System.out.println(\"string\"); }\n}\nnew Printer().print(\"Java\");", ["object", "string", "Both", "Compilation error"], 1, "Overload selection happens at compile time and String is the most specific matching parameter."],
    ["output", "What is the output?", "interface Task { default String name() { return \"task\"; } }\nclass Job implements Task { }\nSystem.out.println(new Job().name());", ["task", "null", "Compilation error", "Job"], 0, "Job inherits the interface default method because it does not override name."],
    ["output", "What is the output?", "class Base { Base() { System.out.println(\"base\"); } }\nclass Child extends Base { Child() { System.out.println(\"child\"); } }\nnew Child();", ["child then base", "base then child", "base only", "Compilation error"], 1, "The parent constructor runs before the child constructor body."],
    ["what", "Which OOP principle protects state through controlled access?", null, ["Encapsulation", "Inheritance", "Compilation", "Overloading"], 0, "Encapsulation controls state access and protects invariants."],
    ["what", "Which relationship is usually described as has-a?", null, ["Inheritance", "Composition", "Overriding", "Casting"], 1, "Composition models an object containing or using another object."],
    ["what", "Which type can a Java class implement multiple times?", null, ["One superclass", "Multiple interfaces", "One constructor", "One package"], 1, "A class can extend one class but implement multiple interfaces."],
    ["what", "What selects an overridden instance method at runtime?", null, ["Dynamic dispatch", "Field hiding", "Constructor overloading", "Static binding"], 0, "Dynamic dispatch uses the runtime object's implementation for overridden instance methods."],
    ["what", "What is a cohesive class?", null, ["A class with unrelated utilities", "A class whose responsibilities strongly belong together", "A class with no methods", "A class with only static fields"], 1, "Cohesion measures how closely a class's responsibilities and behavior fit together."],
    ["what", "What does an interface primarily define?", null, ["A capability contract", "A database table", "A concrete object", "A thread"], 0, "Interfaces define contracts that implementations can honor."],
    ["what", "Which feature prevents a class from being subclassed?", null, ["private", "final", "static", "volatile"], 1, "A final class cannot be extended."],
    ["what", "What is method overloading?", null, ["Replacing an inherited method", "Multiple methods with the same name but different parameter lists", "Calling a method through an interface", "Hiding a field"], 1, "Overloading is compile-time selection among methods with different signatures."],
    ["what", "What is a strong form of encapsulation?", null, ["Mutable public fields", "Immutability", "Global state", "Subclassing every class"], 1, "Immutable objects prevent state changes after construction and limit mutation paths."],
    ["what", "What does low coupling mean?", null, ["No classes collaborate", "Fewer unnecessary dependencies on unstable details", "Every method is static", "All classes inherit one base"], 1, "Low coupling limits unnecessary dependency impact while preserving required collaboration."],
    ["why", "Why prefer programming to an interface?", null, ["It prevents all runtime errors", "It lets clients depend on a stable capability contract", "It makes every object immutable", "It removes constructors"], 1, "Clients can use different implementations without depending on concrete details."],
    ["why", "Why can inheritance be dangerous when used only for code reuse?", null, ["It always makes code slower", "It creates a subtype contract and tight coupling", "It prevents polymorphism", "It cannot share methods"], 1, "Inheritance communicates substitutability and couples the child to parent behavior and lifecycle."],
    ["why", "Why use dependency injection?", null, ["To hide every dependency", "To supply replaceable collaborators from outside", "To avoid interfaces", "To make fields public"], 1, "Dependency injection improves substitution, configuration, and testing."],
    ["why", "Why should a public API avoid exposing mutable internals?", null, ["It makes code shorter", "Callers could bypass invariants by mutating internal state", "Java forbids lists", "It disables garbage collection"], 1, "Returning mutable internals lets callers change state outside the class's validation rules."],
    ["why", "Why is composition often more flexible than inheritance?", null, ["Composition cannot have behavior", "Collaborators can be replaced without changing the class hierarchy", "Inheritance cannot reuse code", "Composition removes all objects"], 1, "Composition allows behavior to vary through injected or owned collaborators."],
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