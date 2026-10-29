(function () {
  const topicId = "inheritance";
  const topicName = "Inheritance";

  window.JAVA_TOPIC_THEORY = window.JAVA_TOPIC_THEORY || {};
  window.JAVA_TOPIC_THEORY[topicId] = {
    introduction: "Inheritance lets a Java class extend one direct superclass and specialize an inherited contract. It enables reuse and runtime polymorphism, but it also creates coupling, so a strong design uses inheritance for genuine substitutability and composition when behavior should vary independently.",
    sections: [
      {
        title: "1. Extending a class",
        summary: "The extends keyword creates a class relationship in which the child is a subtype of its parent.",
        points: [
          "A Java class extends at most one direct superclass, and every class ultimately extends Object unless it has another parent.",
          "A subclass inherits accessible members and can add new state or behavior.",
          "The subclass object contains the parent portion and the child portion of its class state, subject to language access rules.",
          "The child can be assigned to a variable of the parent type through widening reference conversion.",
          "Inheritance should express an is-a relationship that clients can safely rely on."
        ],
        nuances: [
          "Private parent fields exist as part of the object state but are not directly accessible by the child; use protected or methods carefully.",
          "A subclass is coupled to parent behavior and lifecycle, so changes to the parent can affect all descendants."
        ],
        code: "class Vehicle {\n    void move() { System.out.println(\"moving\"); }\n}\n\nclass Car extends Vehicle {\n    void openTrunk() { }\n}"
      },
      {
        title: "2. Constructors and initialization order",
        summary: "Constructing a child object initializes parent state before executing the child constructor body.",
        points: [
          "A constructor does not get inherited, but a child constructor can invoke a parent constructor with super(...).",
          "If the first statement is omitted, Java inserts super() when a no-argument parent constructor is available.",
          "Object construction proceeds through parent initialization before child initialization.",
          "Field initializers and instance initialization blocks run as part of each class's initialization phase.",
          "A parent constructor should not call overridable child methods before the child is fully initialized."
        ],
        nuances: [
          "If the parent has no accessible no-argument constructor, every child constructor must explicitly select an accessible parent constructor.",
          "Calling overridable methods from constructors can expose default or partially initialized child state."
        ],
        code: "class Account {\n    Account(String id) { }\n}\n\nclass SavingsAccount extends Account {\n    SavingsAccount(String id) {\n        super(id);\n    }\n}"
      },
      {
        title: "3. Method overriding",
        summary: "A subclass can provide a compatible implementation for an inherited instance method.",
        points: [
          "An overriding method keeps the same signature after type erasure and has a compatible return type.",
          "Use @Override so the compiler verifies that overriding was intended.",
          "An overriding method cannot reduce visibility or throw broader checked exceptions than the parent contract allows.",
          "A subclass may call the parent implementation with super.method().",
          "Final methods cannot be overridden, and private methods are not inherited for overriding."
        ],
        nuances: [
          "A different parameter list creates an overload rather than an override.",
          "Static methods are hidden, not overridden, because static dispatch follows the type rather than the runtime object."
        ],
        code: "class Formatter {\n    String format(Object value) { return String.valueOf(value); }\n}\n\nclass JsonFormatter extends Formatter {\n    @Override\n    String format(Object value) { return \"{...}\"; }\n}"
      },
      {
        title: "4. Runtime polymorphism",
        summary: "A parent reference can refer to a child object, and overridden instance behavior is selected at runtime.",
        points: [
          "The declared reference type controls what members the compiler allows the caller to access.",
          "The runtime object controls which overridden instance method implementation executes.",
          "A child-specific method is not directly visible through a parent reference without a safe cast or a better abstraction.",
          "Polymorphism lets collections and services work with multiple subtype implementations uniformly.",
          "Dynamic dispatch is different from overload resolution, which is selected at compile time."
        ],
        nuances: [
          "Field access does not use dynamic method dispatch; fields can be hidden and are resolved by the reference type.",
          "Casting should be minimized by designing a parent contract that exposes the behavior clients genuinely need."
        ],
        code: "List<Vehicle> fleet = List.of(new Car(), new Truck());\nfor (Vehicle vehicle : fleet) {\n    vehicle.move();\n}"
      },
      {
        title: "5. Access modifiers and inherited members",
        summary: "Inheritance interacts with public, protected, package-private, and private access in specific ways.",
        points: [
          "Public members are accessible wherever the normal type and package rules permit.",
          "Protected members are accessible to subclasses and classes in the same package, with additional rules across packages.",
          "Package-private members are accessible only within the declaring package and are not generally available to a subclass in another package.",
          "Private members are limited to the declaring class and cannot be directly referenced by subclasses.",
          "Prefer protected behavior methods over exposing mutable protected fields when a subclass extension point is needed."
        ],
        nuances: [
          "A subclass in another package can access a protected member through an appropriate subclass context, not arbitrary parent instances.",
          "Overusing protected state makes the parent and descendants tightly coupled to representation."
        ],
        code: "class BaseJob {\n    private String id;\n    protected void validate() { }\n    public void run() { validate(); }\n}"
      },
      {
        title: "6. Abstract classes and template behavior",
        summary: "Abstract classes provide shared implementation and can require subclasses to fill in selected operations.",
        points: [
          "An abstract class cannot be instantiated directly.",
          "It may contain fields, constructors, concrete methods, and abstract methods.",
          "A concrete subclass must implement inherited abstract methods unless it remains abstract.",
          "Template-method designs put invariant workflow steps in the parent and variable steps in protected or abstract hooks.",
          "Abstract classes are useful when descendants share meaningful state or lifecycle behavior."
        ],
        nuances: [
          "An abstract class can have no abstract methods, but its abstract status still prevents direct construction.",
          "Template methods should protect the algorithm's invariant and avoid exposing unsafe hooks."
        ],
        code: "abstract class ImportJob {\n    final void run() {\n        read();\n        validate();\n        persist();\n    }\n\n    protected abstract void read();\n    protected abstract void persist();\n    private void validate() { }\n}"
      },
      {
        title: "7. final, sealed, and controlled hierarchies",
        summary: "Java provides modifiers that limit method overriding, class extension, or the permitted set of subclasses.",
        points: [
          "A final method cannot be overridden, and a final class cannot be extended.",
          "A sealed class or interface lists the types permitted to extend or implement it.",
          "A non-sealed permitted subtype reopens extension below a sealed parent.",
          "A sealed hierarchy can make exhaustive reasoning and pattern matching safer.",
          "Use restricted extension when the domain has a known, controlled set of variants."
        ],
        nuances: [
          "final on a reference field prevents reassignment of the reference, not subclassing of the referenced object's class.",
          "Sealed types still need correct contracts; limiting subclasses does not automatically make behavior safe."
        ],
        code: "sealed interface Result permits Success, Failure { }\nfinal class Success implements Result { }\nfinal class Failure implements Result { }"
      },
      {
        title: "8. Inheritance and Object methods",
        summary: "Every ordinary Java class inherits behavior from Object, including identity, equality, string conversion, and monitor methods.",
        points: [
          "toString provides a text representation and is commonly overridden for useful diagnostics.",
          "equals defines logical equality when a value type needs it, and hashCode must be consistent with equals.",
          "getClass reports the runtime class of an object, while instanceof checks compatible type relationships.",
          "wait, notify, and notifyAll are inherited monitor methods but should be used only with a correct synchronization design.",
          "clone is inherited but is generally less preferred than explicit copy construction or factories."
        ],
        nuances: [
          "Overriding equals without hashCode breaks hash-based collections and violates the general contract.",
          "Using getClass in equals versus instanceof changes equality behavior for subclasses and must be an intentional choice."
        ],
        code: "class User {\n    private final String id;\n\n    @Override\n    public boolean equals(Object other) {\n        return other instanceof User user && id.equals(user.id);\n    }\n\n    @Override\n    public int hashCode() { return id.hashCode(); }\n}"
      },
      {
        title: "9. Inheritance versus composition",
        summary: "Inheritance couples a type to a parent contract; composition assembles behavior through collaborators.",
        points: [
          "Use inheritance when the child is genuinely substitutable for the parent and shares lifecycle assumptions.",
          "Use composition when the relationship is has-a, uses-a, or behavior should vary independently.",
          "Composition allows a collaborator to be replaced without changing the outer class's type hierarchy.",
          "Inheritance can provide convenient protected hooks but may expose fragile implementation coupling.",
          "A strategy, decorator, or adapter often solves a variation problem without a new subclass."
        ],
        nuances: [
          "Composition is not always superior; a stable, meaningful subtype hierarchy can be clearer and more expressive.",
          "Choose based on domain semantics, change patterns, testing needs, and lifecycle ownership."
        ],
        code: "class ReportService {\n    private final Formatter formatter;\n\n    ReportService(Formatter formatter) { this.formatter = formatter; }\n}\n// Formatter behavior varies without subclassing ReportService"
      },
      {
        title: "10. Safe inheritance design",
        summary: "Good inheritance design protects parent invariants, documents extension points, and preserves substitutability.",
        points: [
          "Keep constructors and methods from exposing partially initialized objects.",
          "Document which methods are safe to override and which invariants subclasses must preserve.",
          "Favor private state and stable protected hooks over protected mutable representation.",
          "Avoid making a class extensible by accident when overriding could break security or correctness.",
          "Test parent behavior with representative subclasses and verify the parent contract remains true."
        ],
        nuances: [
          "The fragile base class problem occurs when parent changes unexpectedly break subclass assumptions.",
          "If extension is not a supported use case, final or composition can make the design more robust."
        ],
        code: "class Parser {\n    public final Result parse(String input) {\n        String normalized = normalize(input);\n        return build(normalized);\n    }\n\n    protected String normalize(String input) { return input.trim(); }\n    protected Result build(String input) { return new Result(input); }\n}"
      }
    ],
    takeaways: [
      "Inheritance should express a substitutable is-a relationship, not merely share implementation.",
      "Constructors initialize parent state first, and overridden instance methods dispatch by runtime type.",
      "Use @Override, protect invariants, and understand access modifiers, final methods, and abstract contracts.",
      "Choose composition when behavior or ownership should vary independently of the class hierarchy."
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
    ["What is inheritance in Java?", "Inheritance lets a class extend one parent class and reuse or specialize its accessible behavior.", "The child becomes a subtype of the parent and can participate in polymorphism.", "class Car extends Vehicle { }", "It models related types with a shared contract.", "Using inheritance only to reuse a helper method.", "Inheritance creates a parent-child type relationship with reusable and overridable behavior."],
    ["What does extends mean?", "extends declares that a class inherits from another class.", "A class has one direct superclass, and the relationship enables widening reference conversion and inherited members.", "class Dog extends Animal { }", "It establishes an is-a relationship when the subtype is valid.", "Extending a class because it has convenient code rather than a valid contract.", "extends creates a class inheritance relationship."],
    ["What is method overriding?", "Overriding is a subclass implementation of a compatible inherited instance method.", "The subclass keeps the method contract and can provide more specific behavior.", "@Override\nvoid move() { }", "It enables dynamic dispatch.", "Changing parameters and accidentally overloading instead.", "Overriding specializes inherited instance behavior with the same method contract."],
    ["What is method overloading?", "Overloading defines multiple methods with the same name but different parameter lists.", "The compiler selects an overload using the declared argument types and available signatures.", "void log(String s) {}\nvoid log(int n) {}", "It offers convenient APIs for related inputs.", "Calling overload resolution runtime polymorphism.", "Overloading is compile-time selection among different method signatures."],
    ["What is the super keyword?", "super refers to the parent portion of the current object and can invoke parent constructors or methods.", "A super constructor call must be the first statement in a constructor.", "super(id);\nsuper.run();", "It reuses parent initialization or behavior intentionally.", "Using super to access private parent fields directly.", "super selects parent construction or implementation from a subclass."],
    ["Are constructors inherited?", "No. Constructors belong to the class that declares them and must be invoked through a child constructor's super call.", "A child constructor can select an accessible parent constructor but does not inherit it as a callable method.", "Child(String id) { super(id); }", "It lets subclasses initialize required parent state.", "Expecting new Child(...) to expose every parent constructor automatically.", "Constructors are not inherited; child constructors invoke parent constructors."],
    ["What is runtime polymorphism?", "Runtime polymorphism is dispatching an overridden instance method according to the object's runtime class.", "A parent reference can point to a child and still invoke the child's override.", "Animal animal = new Dog();\nanimal.speak();", "It enables interchangeable implementations in collections and services.", "Confusing it with compile-time overload selection.", "Runtime polymorphism chooses overridden instance behavior from the runtime object."],
    ["What is an abstract class?", "An abstract class is a non-instantiable class that can contain shared implementation and abstract methods.", "Concrete descendants must implement inherited abstract methods.", "abstract class Job { abstract void run(); }", "It shares lifecycle or state across closely related types.", "Instantiating an abstract class directly.", "An abstract class provides an incomplete shared base contract."],
    ["What is a final class?", "A final class cannot be extended by another class.", "final can protect invariants, prevent unsafe extension, or make a type hierarchy intentionally closed.", "final class Money { }", "It is useful for immutable or security-sensitive types.", "Thinking final makes every referenced object immutable.", "A final class prevents subclassing."],
    ["What is the fragile base class problem?", "It is the risk that changes to a parent class unexpectedly break subclasses that depend on its implementation details.", "Inheritance couples descendants to parent behavior, lifecycle, and extension hooks.", "class Child extends Base { }", "It motivates documented extension points and composition.", "Assuming inherited code is isolated from parent changes.", "The fragile base class problem is unintended subclass breakage caused by parent changes." ]
  ]);

  addLearningQuestions("why", [
    ["Why use inheritance?", "Use inheritance when a subtype genuinely conforms to a parent contract and benefits from shared behavior or lifecycle.", "It supports substitutability and runtime polymorphism for related types.", "List<Vehicle> vehicles;", "It can express stable domain taxonomies.", "Choosing inheritance solely for implementation reuse.", "Inheritance is valuable for meaningful, substitutable type hierarchies."],
    ["Why call super in a constructor?", "A child calls super to initialize required parent state and satisfy the parent constructor contract.", "Parent initialization must occur before the child relies on inherited state.", "Child(String id) { super(id); }", "It initializes common identity or configuration once in the base class.", "Leaving out super when the parent has no no-arg constructor.", "super initializes the parent portion of a child object."],
    ["Why use @Override?", "@Override asks the compiler to verify that a method actually overrides an inherited method.", "It catches spelling, parameter, visibility, and signature mistakes that would otherwise create an overload.", "@Override\npublic String toString() { }", "It makes extension intent visible in code review.", "Omitting it and missing an accidental overload.", "@Override protects against mistaken overriding declarations."],
    ["Why can inheritance increase coupling?", "A child depends on parent methods, state, constructor behavior, and extension assumptions.", "Changes to the parent may affect every descendant, even when the child did not change.", "class CsvParser extends Parser { }", "It explains why composition may be safer for independent variation.", "Treating inherited implementation as a private copy.", "Inheritance couples descendants to parent contracts and implementation details."],
    ["Why prefer composition for independent behavior?", "Composition allows a collaborator to change without changing the outer class's type hierarchy.", "Strategies and delegates can be injected, replaced, or mocked.", "new SortService(comparator);", "It supports runtime configuration and focused tests.", "Using a subclass for every algorithm variation.", "Composition makes independently varying behavior replaceable."],
    ["Why should constructors avoid calling overridable methods?", "The child portion of the object may not be initialized when the parent constructor invokes the method.", "The override can observe default fields or perform work against an incomplete invariant.", "Base() { configure(); }", "Avoiding it prevents partially initialized behavior.", "Assuming dynamic dispatch waits until child construction is complete.", "Overridable calls during construction can expose incomplete child state."],
    ["Why use an abstract class instead of duplicating workflow code?", "A template method can keep invariant steps in one place while subclasses implement variable steps.", "It prevents related classes from drifting apart in lifecycle behavior.", "final void run() { read(); validate(); persist(); }", "Import jobs and processing pipelines often share a fixed workflow.", "Allowing subclasses to bypass required steps.", "Abstract classes centralize shared workflow while leaving controlled extension points."],
    ["Why restrict inheritance with final or sealed types?", "Controlled hierarchies prevent unsupported extensions and make the set of valid variants easier to reason about.", "This can protect invariants, security assumptions, and exhaustive handling.", "sealed interface Result permits Success, Failure {}", "Closed domain models benefit from known variants.", "Assuming a closed hierarchy never needs a versioning strategy.", "Restrict extension when the valid subtype set is intentionally controlled."],
    ["Why must equals and hashCode be changed together?", "Hash-based collections require equal objects to produce the same hash code.", "Overriding equals alone can make logically equal objects land in different buckets.", "@Override public int hashCode() { return id.hashCode(); }", "It preserves Set and Map behavior for inherited Object contracts.", "Overriding equals but leaving identity hashCode.", "equals and hashCode must agree for value-based inheritance designs."],
    ["Why should protected mutable fields be avoided?", "Protected representation lets descendants mutate parent state without a controlled invariant-preserving operation.", "It tightly couples subclasses to storage details and makes parent changes harder.", "protected List<Item> items;", "Protected methods can expose safer extension points.", "Assuming protected is equivalent to private with inheritance access.", "Prefer protected behavior hooks over protected mutable representation." ]
  ]);

  addLearningQuestions("how", [
    ["How do you override a method safely?", "Keep a compatible signature, use @Override, preserve the parent contract, and narrow behavior only when substitutability remains valid.", "The child can call super when it needs to extend rather than replace parent behavior.", "@Override\nvoid save() { super.save(); audit(); }", "It adds auditing or metrics while keeping base persistence behavior.", "Changing parameters and creating an overload.", "Override with @Override and preserve the inherited contract."],
    ["How does constructor order work for a child object?", "Java initializes the parent portion first, then the child fields and constructor body.", "The chain continues to Object before the most specific constructor finishes.", "new Child(); // parent constructor before child body", "It ensures inherited state exists before child setup.", "Expecting child fields to be initialized when parent construction runs.", "Parent construction precedes child construction."],
    ["How do you invoke a parent constructor?", "Use super(arguments) as the first statement in the child constructor.", "The arguments must match an accessible constructor in the direct parent.", "Child(String id) { super(id); }", "It passes required shared state to the base class.", "Putting code before super or calling a grandparent constructor directly.", "Use a first-statement super call to select the direct parent constructor."],
    ["How do you access parent behavior from an override?", "Call super.method() from the child implementation.", "This allows the child to extend the parent behavior instead of duplicating it.", "super.validate();\nvalidateMore();", "It keeps common validation or logging centralized.", "Calling the method without super and causing recursive self-calls.", "super.method() invokes the parent implementation."],
    ["How do you use a child through a parent reference?", "Assign the child to the parent type and call behavior exposed by the parent contract.", "Overridden instance methods use the child implementation at runtime.", "Vehicle vehicle = new Car();\nvehicle.move();", "It enables lists and services to work with many implementations.", "Trying to call child-only methods through the parent type.", "Use the parent contract for common behavior and dynamic dispatch for overrides."],
    ["How do you expose child-specific behavior safely?", "Add the behavior to a suitable abstraction or perform a justified checked cast after verifying the runtime type.", "A better parent contract is usually preferable to scattered instanceof branches.", "if (vehicle instanceof Car car) car.openTrunk();", "Pattern matching can handle a rare subtype-specific operation.", "Casting every parent reference because the abstraction is incomplete.", "Prefer a complete contract; cast only after a safe, justified type check."],
    ["How do you implement a template method?", "Make the invariant workflow final and delegate variable steps to protected or abstract hooks.", "Subclasses customize the hooks without reordering required steps.", "final void run() { read(); validate(); persist(); }", "Batch jobs can share setup, validation, and cleanup rules.", "Making the whole workflow overridable and losing the invariant.", "Keep the algorithm stable and expose narrow extension hooks."],
    ["How do you prevent overriding?", "Declare the method final.", "A final method can still be inherited and called, but subclasses cannot replace its implementation.", "public final void close() { }", "It protects lifecycle or security-critical behavior.", "Confusing final method with final field.", "final on a method prevents overriding."],
    ["How do you design a sealed inheritance hierarchy?", "Declare a sealed parent and list permitted direct subclasses, then make each permitted type final, sealed, or non-sealed.", "The compiler enforces the direct subtype list.", "sealed interface State permits Ready, Failed { }", "It models a closed set of domain states.", "Forgetting to make permitted subclasses explicitly final, sealed, or non-sealed.", "Sealed types make permitted inheritance explicit and compiler-checked."],
    ["How do you decide between inheritance and composition?", "Ask whether the relationship is a substitutable is-a type or a has-a/uses-a collaboration that can vary independently.", "Use inheritance for shared contract and lifecycle; use composition for replaceable behavior and lower coupling.", "class Service { private final Policy policy; }", "The decision predicts how future changes and tests will work.", "Choosing based only on which option requires fewer lines today.", "Choose by substitutability, ownership, variation, and change boundaries." ]
  ]);

  const quizQuestions = [
    ["output", "What is the output?", "class Parent { void run() { System.out.println(\"parent\"); } }\nclass Child extends Parent { @Override void run() { System.out.println(\"child\"); } }\nParent value = new Child();\nvalue.run();", ["parent", "child", "Compilation error", "No output"], 1, "The overridden instance method is dynamically dispatched to Child."],
    ["output", "What is the output?", "class Parent { int value = 1; }\nclass Child extends Parent { int value = 2; }\nParent value = new Child();\nSystem.out.println(value.value);", ["1", "2", "Compilation error", "NullPointerException"], 0, "Field access is resolved using the declared reference type, so Parent.value is read."],
    ["output", "What is the output?", "class Parent { Parent() { System.out.println(\"P\"); } }\nclass Child extends Parent { Child() { System.out.println(\"C\"); } }\nnew Child();", ["C then P", "P then C", "P only", "Compilation error"], 1, "The parent constructor completes before the child constructor body."],
    ["output", "What is the output?", "class Parent { static void show() { System.out.println(\"P\"); } }\nclass Child extends Parent { static void show() { System.out.println(\"C\"); } }\nParent value = new Child();\nvalue.show();", ["P", "C", "Compilation error", "Both"], 0, "Static methods are hidden and resolved by the declared reference type, not dynamically dispatched."],
    ["output", "What is the output?", "class Parent { String name() { return \"P\"; } }\nclass Child extends Parent { @Override String name() { return super.name() + \"C\"; } }\nSystem.out.println(new Child().name());", ["P", "C", "PC", "Compilation error"], 2, "The child override calls the parent implementation and appends C."],
    ["what", "Which keyword declares class inheritance?", null, ["implements", "extends", "inherits", "super"], 1, "extends declares that a class inherits from another class."],
    ["what", "How many direct superclasses can a Java class have?", null, ["Zero only", "One", "Two", "Unlimited"], 1, "Java classes have single class inheritance."],
    ["what", "Which annotation verifies intended overriding?", null, ["@Inherited", "@Override", "@Parent", "@Extends"], 1, "@Override asks the compiler to check that the method overrides an inherited method."],
    ["what", "Which member cannot be overridden?", null, ["A final method", "A public method", "An abstract method", "A protected method"], 0, "A final method cannot be replaced by a subclass."],
    ["what", "What is inherited from Object by ordinary classes?", null, ["Only constructors", "Methods such as equals and toString", "Every private field of all ancestors", "Only static fields"], 1, "Classes ultimately inherit Object behavior such as equals, hashCode, and toString."],
    ["what", "What does an abstract class allow?", null, ["Direct instantiation only", "Shared implementation and abstract methods", "Multiple class inheritance", "No constructors"], 1, "Abstract classes can share state and implementation while requiring subclass behavior."],
    ["what", "What is method hiding?", null, ["A private method override", "A subclass declaring a static method with the same signature", "A final method call", "A constructor call"], 1, "Static methods are hidden rather than dynamically overridden."],
    ["what", "What does a sealed type control?", null, ["Which direct types may extend or implement it", "Which variables are final", "Which methods are private", "Which objects are garbage collected"], 0, "sealed types declare their permitted direct subtypes."],
    ["what", "What does super() invoke?", null, ["The child constructor", "The direct parent constructor", "Object.toString only", "A static method"], 1, "super() selects the no-argument constructor of the direct parent."],
    ["what", "Which relationship best describes inheritance?", null, ["has-a", "is-a", "uses-a only", "owns-a database"], 1, "Inheritance should model a substitutable is-a relationship."],
    ["why", "Why should a subclass preserve the parent contract?", null, ["To support substitutability", "To avoid all methods", "To disable dynamic dispatch", "To make fields public"], 0, "Clients should be able to use the subtype wherever the parent type is expected."],
    ["why", "Why avoid calling overridable methods from constructors?", null, ["The child may be partially initialized", "Constructors cannot call methods", "It always causes recursion", "The parent cannot compile"], 0, "Dynamic dispatch can invoke child code before child initialization is complete."],
    ["why", "Why can composition be safer than inheritance?", null, ["It removes all dependencies", "It allows behavior to vary without a rigid hierarchy", "It prevents interfaces", "It makes all methods static"], 1, "Collaborators can be replaced without coupling the outer class to a parent implementation."],
    ["why", "Why override hashCode when overriding equals?", null, ["Hash collections require equal objects to share a hash code", "equals cannot compile otherwise", "It prevents inheritance", "hashCode changes the object"], 0, "Hash-based collections depend on the equals/hashCode contract."],
    ["why", "Why use final on a class?", null, ["To prevent subclassing", "To force multiple inheritance", "To allow all fields to change", "To enable overload resolution"], 0, "A final class cannot be extended and can protect its extension assumptions."],
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