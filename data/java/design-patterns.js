(function () {
  const topicId = "design-patterns";
  const topicName = "Design Patterns";

  window.JAVA_TOPIC_THEORY = window.JAVA_TOPIC_THEORY || {};
  window.JAVA_TOPIC_THEORY[topicId] = {
    introduction: "A design pattern is a named, reusable way to solve a problem that appears again and again in software design. Patterns are not copy-paste libraries. They are simple ideas that help us decide which objects should exist, how objects should work together, and where change should be placed.",
    contents: [
      { id: "patterns-foundation", title: "Foundation", description: "Understand patterns, SOLID, and composition before memorizing names." },
      { id: "creational-patterns", title: "Creational patterns", description: "Choose the right way to create and configure objects." },
      { id: "structural-patterns", title: "Structural patterns", description: "Connect objects while keeping responsibilities and interfaces clear." },
      { id: "behavioral-patterns", title: "Behavioral patterns", description: "Organise communication, algorithms, events, and state changes." },
      { id: "java-application-patterns", title: "Java application patterns", description: "See how GoF ideas appear in Spring and layered applications." },
      { id: "pattern-selection", title: "Selection and interviews", description: "Choose the smallest useful design and explain trade-offs clearly." }
    ],
    chapters: [
      {
        id: "patterns-foundation",
        label: "Foundation",
        title: "Start with the design problem",
        summary: "Do not begin by choosing a pattern. First identify what is changing, what is coupled, and what the caller should not need to know.",
        subsections: [
          {
            id: "what-is-a-pattern",
            title: "What is a design pattern?",
            definition: "A design pattern is a named solution shape for a recurring design problem. It describes responsibilities and collaboration; it does not give you a complete class hierarchy to copy.",
            points: [
              "Patterns give a team a shared vocabulary: words such as Adapter, Strategy, or Builder communicate a design idea quickly.",
              "A pattern is useful when it keeps a likely change local, reduces coupling, or makes a collaboration easier to test.",
              "The same pattern can be implemented with classes, interfaces, records, lambdas, or framework features.",
              "A pattern should be introduced because the code has a real design pressure, not because the pattern name sounds advanced."
            ],
            when: "Use a pattern when the simple design is becoming difficult to change, test, or explain.",
            example: "CheckoutService depends on a PaymentMethod interface, so card, wallet, and bank-transfer implementations can vary independently.",
            tradeoff: "Patterns add names, classes, and indirection. A small problem may be clearer with a direct method or a simple conditional.",
            code: `interface PaymentMethod {
    void pay(double amount);
}

class CheckoutService {
    private final PaymentMethod paymentMethod;

    CheckoutService(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    void checkout(double amount) {
        paymentMethod.pay(amount);
    }
}`
          },
          {
            id: "solid-and-composition",
            title: "SOLID principles and composition",
            definition: "SOLID principles help us place responsibilities and dependencies. Composition lets an object use replaceable collaborators instead of building a rigid inheritance tree.",
            points: [
              "Single Responsibility: keep one cohesive reason to change in a class.",
              "Open/Closed: add a new behavior through extension when editing stable code would be risky.",
              "Liskov Substitution: a subtype must honor the contract expected by its parent type.",
              "Interface Segregation: clients should not depend on methods they do not use.",
              "Dependency Inversion: business code should depend on meaningful abstractions rather than infrastructure details.",
              "Prefer composition when behavior must be combined, replaced, or selected at runtime."
            ],
            when: "Use these principles while designing boundaries; do not treat them as a requirement to split every class into tiny pieces.",
            example: "OrderService receives an OrderRepository and a TaxPolicy through its constructor, so tests can pass fakes and production can pass database implementations.",
            tradeoff: "Too many abstractions can hide a simple flow. Keep an interface when it represents a real contract or a useful variation point.",
            code: `interface TaxPolicy {
    double taxFor(double price);
}

class Checkout {
    private final TaxPolicy taxPolicy;

    Checkout(TaxPolicy taxPolicy) {
        this.taxPolicy = taxPolicy;
    }

    double total(double price) {
        return price + taxPolicy.taxFor(price);
    }
}`
          }
        ],
        nuances: [
          "Patterns are tools for managing change. They are not a substitute for clear names, tests, modularity, or a good domain model.",
          "Composition and dependency injection often work together: one object owns a contract while another supplies the implementation."
        ]
      },
      {
        id: "creational-patterns",
        label: "GoF family 1 of 3",
        title: "Creational patterns: control object creation",
        summary: "Creational patterns move construction decisions out of business code and make object creation easier to change, validate, or test.",
        subsections: [
          {
            id: "singleton-pattern",
            title: "Singleton",
            definition: "Singleton provides one controlled instance of a class and one access point to it.",
            points: ["Use it only when one shared identity is part of the domain or application design.", "An enum singleton handles common serialization and reflection concerns safely.", "Prefer ordinary dependency injection when a class can receive the shared object from outside."],
            when: "A truly application-wide resource has one identity, such as a carefully designed registry or configuration object.",
            example: "enum AppConfig { INSTANCE } is safer than a manually written lazy singleton in many Java applications.",
            tradeoff: "Global access hides dependencies, makes tests harder to isolate, and can create shared mutable state.",
            code: `enum AppConfig {
    INSTANCE;

    private String environment = "production";

    public String environment() {
        return environment;
    }
}`
          },
          {
            id: "factory-method-pattern",
            title: "Factory Method",
            definition: "Factory Method lets a creator decide which concrete product to create while callers depend on the product interface.",
            points: ["The caller asks for a Report, not for a PdfReport constructor directly.", "New product implementations can be added without changing every caller.", "A static factory method is a useful Java technique, but it is not automatically the full GoF Factory Method pattern."],
            when: "The concrete type depends on input, configuration, environment, or a subclass decision.",
            example: "ReportFactory.create(\"pdf\") returns a Report implementation without exposing the construction details.",
            tradeoff: "A factory can become a large conditional method when too many unrelated products are placed in one class.",
            code: `interface Report {
    String render();
}

class PdfReport implements Report {
    public String render() {
        return "PDF report";
    }
}

class ReportFactory {
    static Report create(String format) {
        if ("pdf".equalsIgnoreCase(format)) return new PdfReport();
        throw new IllegalArgumentException("Unsupported format");
    }
}`
          },
          {
            id: "abstract-factory-pattern",
            title: "Abstract Factory",
            definition: "Abstract Factory creates a family of related objects that are designed to work together.",
            points: ["The factory exposes several product methods, such as createButton() and createCheckbox().", "A Windows factory returns Windows-compatible products; a Mac factory returns Mac-compatible products.", "The client uses product interfaces and does not know the concrete family classes."],
            when: "Several related products must share the same theme, platform, tenant, or environment.",
            example: "A UI toolkit creates Button and Checkbox objects from the same theme factory.",
            tradeoff: "Adding a new product type changes every concrete factory, so use it when the product family is stable."
          },
          {
            id: "builder-pattern",
            title: "Builder",
            definition: "Builder constructs a complex object step by step and makes optional configuration readable.",
            points: ["Required values can be collected in the builder constructor.", "Optional values can be named with methods instead of a long parameter list.", "build() is a good place for validation before the final object is created."],
            when: "An object has many optional fields, validation rules, or several construction steps.",
            example: "new User.Builder(\"Krishna\").city(\"New York\").newsletter(true).build() is easier to read than a seven-argument constructor.",
            tradeoff: "A builder is unnecessary for a small object with one or two obvious constructor arguments.",
            code: `User user = new User.Builder("Krishna")
    .city("New York")
    .newsletter(true)
    .build();`
          },
          {
            id: "prototype-pattern",
            title: "Prototype",
            definition: "Prototype creates a new object by copying an existing configured object.",
            points: ["It can avoid repeating expensive setup or a long list of configuration values.", "The copy contract must clearly define shallow and deep copying.", "Mutable nested objects need special care if the copy must be independent."],
            when: "A configured template is reused or constructing a fresh object is expensive.",
            example: "A report template is copied and then given a different title before it is exported.",
            tradeoff: "Copying graphs of mutable objects can be surprising and error-prone if the copy policy is not explicit.",
            code: `Report copy = original.copy();
copy.setTitle("New title");`
          }
        ],
        nuances: [
          "Factory chooses or hides creation; Builder explains the steps for one complex object; Abstract Factory creates a compatible family.",
          "Singleton is the pattern most likely to be overused. Ask whether one identity is really required before adding global access."
        ]
      },
      {
        id: "structural-patterns",
        label: "GoF family 2 of 3",
        title: "Structural patterns: connect objects safely",
        summary: "Structural patterns organize classes and objects so clients can use a stable interface while implementation details vary behind it.",
        subsections: [
          {
            id: "adapter-pattern",
            title: "Adapter",
            definition: "Adapter translates an existing interface into the interface expected by the client.",
            points: ["It is common at a legacy, vendor, or third-party integration boundary.", "The application keeps its own interface while the adapter handles the mismatch.", "Adapter changes the shape of an existing API; it does not redesign the whole subsystem."],
            when: "Existing code is useful but its interface does not match the interface your application wants.",
            example: "PrinterAdapter implements Printer and delegates to a legacy printer's printLine() method.",
            tradeoff: "Too many adapters may signal that an integration boundary or common contract needs redesign.",
            code: `interface Printer {
    void print(String text);
}

class PrinterAdapter implements Printer {
    private final LegacyPrinter printer;

    PrinterAdapter(LegacyPrinter printer) {
        this.printer = printer;
    }

    public void print(String text) {
        printer.printLine(text);
    }
}`
          },
          {
            id: "bridge-pattern",
            title: "Bridge",
            definition: "Bridge separates an abstraction from its implementation so both dimensions can change independently.",
            points: ["The abstraction holds an implementation object instead of creating a subclass for every combination.", "RemoteControl can work with TV, Radio, or Projector implementations.", "Bridge is designed before the combinations grow; Adapter usually fixes an existing mismatch."],
            when: "Two independent dimensions of variation would otherwise create a multiplication of subclasses.",
            example: "A RemoteControl abstraction delegates to a Device implementation.",
            tradeoff: "The extra abstraction is not worthwhile when there is only one stable implementation."
          },
          {
            id: "composite-pattern",
            title: "Composite",
            definition: "Composite lets a client treat one object and a group of objects through the same component interface.",
            points: ["It naturally models trees such as files and folders, UI components, or organization charts.", "Leaf and group objects implement the same operation, such as size() or render().", "The client does not need separate traversal logic for every tree level."],
            when: "The domain is a tree and callers should work uniformly with leaves and groups.",
            example: "A Folder and File both implement FileSystemItem.size().",
            tradeoff: "Do not force leaf objects to implement child-management methods that have no meaning for them."
          },
          {
            id: "decorator-pattern",
            title: "Decorator",
            definition: "Decorator wraps an object with the same interface and adds responsibilities without changing the wrapped class.",
            points: ["Decorators can be stacked for logging, compression, encryption, caching, or validation.", "Because the interface stays the same, the wrapped object remains substitutable.", "Java I/O streams are a familiar decorator-style example."],
            when: "Optional behavior should be combined around an object without creating a subclass for every combination.",
            example: "A LoggingPrinter wraps a Printer and logs before delegating to the real printer.",
            tradeoff: "Many layers can make debugging and object construction harder to follow."
          },
          {
            id: "facade-pattern",
            title: "Facade",
            definition: "Facade provides one simple entry point to a complicated subsystem.",
            points: ["The facade coordinates steps such as inventory, payment, and shipping.", "Clients learn one use-case API instead of every subsystem API.", "The underlying subsystem can remain available for advanced callers when needed."],
            when: "A subsystem is powerful but too complicated or tightly coupled for common callers.",
            example: "CheckoutFacade.placeOrder(order) hides reserve, charge, and ship coordination.",
            tradeoff: "A facade should coordinate a workflow, not become a giant class that owns every business rule."
          },
          {
            id: "flyweight-pattern",
            title: "Flyweight",
            definition: "Flyweight shares common intrinsic data between many similar objects and receives changing extrinsic data per use.",
            points: ["A text editor can share one immutable glyph object for many occurrences of the same character.", "Shared state must be stable or immutable so one client cannot accidentally change every other client.", "The caller supplies position or other context that changes for each use."],
            when: "A very large number of similar objects repeat the same immutable data and memory usage matters.",
            example: "A map renderer shares tile definitions while each draw call supplies the tile position.",
            tradeoff: "The design becomes more complex and can trade memory savings for lookups and indirection."
          },
          {
            id: "proxy-pattern",
            title: "Proxy",
            definition: "Proxy is a stand-in that controls access to another object while keeping a compatible client-facing contract.",
            points: ["A proxy can provide lazy loading, caching, authorization, logging, remote calls, or transaction behavior.", "The client uses the proxy as if it were the target interface.", "Remote or slow operations must still document latency, failure, and retry behavior."],
            when: "Access needs control or the real object is expensive, remote, protected, or not always needed.",
            example: "ImageProxy creates RealImage only when show() is called.",
            tradeoff: "Because a proxy looks local, it can hide expensive work or failures unless the contract is explicit.",
            code: `class ImageProxy implements Image {
    private final String file;
    private RealImage image;

    public void show() {
        if (image == null) image = new RealImage(file);
        image.show();
    }
}`
          }
        ],
        nuances: [
          "Adapter translates an interface, Facade simplifies a subsystem, Decorator adds behavior, and Proxy controls access.",
          "These patterns often use composition, so they can be combined without creating deep inheritance trees."
        ]
      },
      {
        id: "behavioral-patterns",
        label: "GoF family 3 of 3",
        title: "Behavioral patterns: organize collaboration",
        summary: "Behavioral patterns define how objects communicate, select algorithms, react to events, move through states, or process requests.",
        subsections: [
          { id: "chain-of-responsibility-pattern", title: "Chain of Responsibility", definition: "Passes a request through a sequence of handlers until one handles it or the chain ends.", points: ["Handlers can validate, authenticate, rate-limit, or process a request.", "Each handler decides whether to handle, reject, or forward the request.", "The chain order is part of the behavior and should be tested."], when: "A request may be handled by one of several handlers arranged as a pipeline.", example: "AuthenticationHandler → ValidationHandler → BusinessHandler.", tradeoff: "A request may be silently ignored or become slow when the chain is long or poorly configured." },
          { id: "command-pattern", title: "Command", definition: "Wraps an action or request in an object so it can be queued, logged, retried, scheduled, or undone.", points: ["The invoker stores a command without knowing the receiver's details.", "Commands are useful for job queues, button actions, audit logs, and undo stacks.", "The command object can hold the data needed to execute later."], when: "An action needs a lifecycle separate from the code that requests it.", example: "PlaceOrderCommand can be queued and executed by a worker later.", tradeoff: "A command class for every trivial method can add noise." },
          { id: "interpreter-pattern", title: "Interpreter", definition: "Represents a small grammar as objects and evaluates expressions in that language.", points: ["Each expression type knows how to interpret itself.", "It is useful for small rule languages, filters, or expressions.", "For a large language, use a parser or a dedicated language tool instead of a growing object tree."], when: "The grammar is small, stable, and evaluated frequently enough to justify a model.", example: "An expression tree evaluates price > 100 AND category = 'BOOK'.", tradeoff: "Many grammar rules can create a large, difficult-to-maintain class hierarchy." },
          { id: "iterator-pattern", title: "Iterator", definition: "Provides sequential access to a collection without exposing its internal representation.", points: ["The caller asks for the next item instead of knowing whether the collection uses an array, tree, or database cursor.", "Java's Iterable and Iterator interfaces are standard examples.", "Iteration contracts should define ordering and whether concurrent modification is allowed."], when: "Clients need traversal while the collection implementation should remain hidden.", example: "for (Order order : orders) hides how orders are stored.", tradeoff: "An iterator can hide expensive I/O or lazy work, so document its behavior." },
          { id: "mediator-pattern", title: "Mediator", definition: "Centralises communication between related objects so they do not all depend directly on one another.", points: ["A dialog mediator coordinates text fields, buttons, and validation.", "Colleagues communicate through the mediator instead of forming a many-to-many graph.", "The mediator should coordinate rather than become a god object."], when: "Many objects communicate in a tangled way and a central workflow coordinator can simplify the graph.", example: "ChatRoom mediates messages between User objects.", tradeoff: "Too much logic in one mediator simply moves the complexity into a different class." },
          { id: "memento-pattern", title: "Memento", definition: "Captures an object's state so it can be restored later without exposing its internal representation.", points: ["The originator creates a snapshot.", "A caretaker stores snapshots for undo or restore.", "Snapshots can consume significant memory for large state graphs."], when: "Undo, rollback, draft history, or checkpoint behavior is required.", example: "A text editor stores document snapshots in an undo stack.", tradeoff: "Snapshot frequency and size must be controlled." },
          { id: "observer-pattern", title: "Observer", definition: "Lets a subject notify subscribed observers when its state or an event changes.", points: ["Observers depend on an event contract rather than on the subject's internal implementation.", "It is useful for email, analytics, cache invalidation, and UI updates.", "Subscription removal, event ordering, and listener failure need an explicit policy."], when: "One change should be delivered to multiple independent consumers.", example: "OrderPlaced notifies email, inventory, and analytics listeners.", tradeoff: "Unmanaged subscriptions can cause memory leaks, surprising callbacks, or difficult debugging." },
          { id: "state-pattern", title: "State", definition: "Moves lifecycle-dependent behavior into state objects so a context behaves differently in each state.", points: ["The context delegates to its current state.", "A state can request a transition when an operation changes the lifecycle.", "It replaces a large conditional when states have substantial rules."], when: "An object's valid operations and behavior change as it moves through a lifecycle.", example: "An Order behaves differently when New, Paid, Shipped, or Delivered.", tradeoff: "For a small number of simple states, an enum and switch may be clearer." },
          { id: "strategy-pattern", title: "Strategy", definition: "Encapsulates interchangeable algorithms behind one interface so the caller can select or receive a behavior.", points: ["Each strategy represents one algorithm or business policy.", "The context does not need a growing if/else chain.", "Strategies are easy to unit test independently and can often be supplied with lambdas."], when: "Several algorithms vary independently and the caller or configuration chooses one.", example: "ShippingCost can be StandardShipping, ExpressShipping, or PickupShipping.", tradeoff: "Creating a strategy class for a one-line rule may be less clear than a direct function." },
          { id: "template-method-pattern", title: "Template Method", definition: "Defines an algorithm skeleton in a base class and lets subclasses customize selected steps.", points: ["The parent controls the order of operations.", "Subclasses implement hooks such as read() and parse().", "It uses inheritance, so changes in the base algorithm affect all subclasses."], when: "Several workflows share a fixed sequence but customize a few steps.", example: "DataImporter.importData() always reads, parses, and saves, while CSV and JSON importers customize the steps.", tradeoff: "Strategy is often better when the algorithm should be replaced at runtime or without inheritance." },
          { id: "visitor-pattern", title: "Visitor", definition: "Adds operations to a stable object structure without placing every operation inside the element classes.", points: ["Each element accepts a visitor and dispatches to the correct visit method.", "It is useful when many operations are added to a stable set of element types.", "Adding a new element type requires updating visitors."], when: "The object structure is stable but operations over it change frequently.", example: "A document tree accepts visitors for rendering, exporting, and accessibility analysis.", tradeoff: "Visitor is expensive when element types change often." }
        ],
        nuances: [
          "Strategy is usually selected from outside; State changes as the context moves through its lifecycle.",
          "Observer broadcasts changes, while Mediator coordinates communication through a central workflow object.",
          "Template Method uses inheritance; Strategy uses composition and is usually easier to replace at runtime."
        ]
      },
      {
        id: "java-application-patterns",
        label: "Java applications",
        title: "Patterns used in Spring and layered systems",
        summary: "Real Java applications combine GoF patterns with boundary patterns that keep controllers, business rules, persistence, and transport concerns separate.",
        subsections: [
          { id: "dependency-injection-pattern", title: "Dependency Injection", definition: "Supplies an object's collaborators from outside instead of making the object construct its own dependencies.", points: ["Constructor injection makes required dependencies visible.", "Tests can pass fakes or mocks without connecting to infrastructure.", "Spring's container creates and wires object graphs, but the underlying idea is still ordinary object composition."], when: "A class depends on a replaceable service, repository, client, clock, or policy.", example: "OrderService receives OrderRepository in its constructor.", tradeoff: "A container can hide wiring and lifecycle behavior if the team does not understand the object graph." },
          { id: "repository-dao-pattern", title: "Repository and DAO", definition: "Hides persistence details behind an application-facing contract expressed in domain language.", points: ["Repository methods describe what the application needs, not SQL or ORM details.", "DAO is often more database-oriented; Repository usually speaks in domain terms.", "The service should own business decisions while the repository focuses on data access."], when: "Business code should not depend directly on SQL, ORM sessions, or a remote persistence API.", example: "ProductRepository.findAvailableByCategory(category) hides query construction.", tradeoff: "A repository that mirrors every database method can become a thin wrapper with little value." },
          { id: "service-and-dto-pattern", title: "Service and DTO", definition: "A service coordinates a use case, while a DTO carries data across a boundary without exposing internal entities.", points: ["Controllers remain thin and delegate application work to services.", "DTOs can control the fields exposed through an API.", "Mapping between entities and DTOs makes the boundary explicit."], when: "A use case crosses an API, UI, messaging, or persistence boundary.", example: "UserService loads a User and returns UserDto(id, name) to the controller.", tradeoff: "Too many DTOs and mapping layers can slow a small application without improving a real boundary." },
          { id: "mvc-pattern", title: "MVC", definition: "Separates model data and rules, view presentation, and controller input coordination.", points: ["The model represents application data and behavior.", "The view renders a response or user interface.", "The controller translates input into a use-case call and selects the response."], when: "A UI or web application needs a clear separation between input handling, domain data, and presentation.", example: "A Spring MVC controller accepts an HTTP request, calls a service, and returns a view or response DTO.", tradeoff: "MVC alone does not define every domain boundary; keep business rules out of controllers." },
          { id: "layered-architecture-pattern", title: "Layered architecture", definition: "Organises an application into layers such as controller, service, repository, and infrastructure with clear dependency direction.", points: ["Each layer has a focused responsibility and a known direction of communication.", "The service layer can coordinate a use case without knowing HTTP details.", "The repository layer can change database technology without changing the controller contract."], when: "The application has enough business and infrastructure complexity to benefit from explicit boundaries.", example: "Controller → Service → Repository → Database.", tradeoff: "Blindly creating a layer for every class can create ceremony and pass-through methods." }
        ],
        nuances: [
          "Framework annotations often hide patterns. In an interview, explain the object collaboration underneath the annotation.",
          "A DTO is a boundary object, not automatically a domain model; keep business rules in the appropriate domain or service component."
        ]
      },
      {
        id: "pattern-selection",
        label: "Selection and interviews",
        title: "Choose the smallest design that solves the problem",
        summary: "A strong design answer starts with a concrete change, proposes a focused collaboration, and explains why the design should not be more complicated.",
        subsections: [
          {
            id: "choosing-a-pattern",
            title: "A practical decision guide",
            definition: "Start with the change you expect, then select the smallest pattern that keeps that change local.",
            points: [
              "Complicated construction: consider Builder or Factory.",
              "Incompatible external API: use Adapter.",
              "Optional behavior around an object: consider Decorator; access control or lazy loading: consider Proxy.",
              "Interchangeable algorithms: use Strategy; lifecycle-dependent behavior: use State.",
              "Many subscribers: use Observer with explicit subscription management.",
              "Difficult subsystem: use Facade without hiding every advanced operation."
            ],
            when: "The direct implementation has a concrete pain that is likely to grow or repeat.",
            example: "Write the simple ReceiptPrinter first. Add ReceiptFormat as a Strategy only when formats really vary.",
            tradeoff: "A pattern is successful when it makes the next change easier, not when it increases the number of classes.",
            code: `// Start simple
class ReceiptPrinter {
    String print(Order order) {
        return order.id() + ": " + order.total();
    }
}

// Add a strategy only when the algorithm really varies
interface ReceiptFormat {
    String format(Order order);
}`
          },
          {
            id: "pattern-comparisons",
            title: "Important interview comparisons",
            definition: "Interviewers usually test whether you can distinguish similar patterns by intent, not whether you can recite a definition.",
            points: [
              "Factory chooses which object to create; Builder constructs one complex object step by step.",
              "Adapter changes an existing interface; Decorator keeps the interface and adds behavior.",
              "Decorator adds responsibilities; Proxy controls access or represents another object.",
              "Strategy selects an algorithm; State changes behavior because the lifecycle state changes.",
              "Observer broadcasts changes; Mediator coordinates communication through a central object.",
              "Template Method uses inheritance and a fixed recipe; Strategy uses composition and replaceable algorithms."
            ],
            when: "The interviewer asks for a comparison, trade-off, or design choice between two related patterns.",
            example: "Say the intent first, then name the collaboration, Java example, trade-off, and one reason not to use the pattern.",
            tradeoff: "No pattern guarantees performance, thread safety, or clean code by itself; those properties depend on the implementation and workload."
          }
        ],
        nuances: [
          "A complete answer covers the problem, participants, collaboration, Java example, trade-off, and alternative.",
          "Mention lifecycle, thread safety, memory use, error handling, and testability when they affect the design."
        ]
      }
    ],
    sections: [
      {
        title: "1. What a design pattern really means",
        summary: "A pattern gives a common name to a design idea, so a team can discuss structure quickly.",
        points: [
          "A pattern describes a recurring problem, the forces or trade-offs involved, and a general solution shape.",
          "A pattern is not a complete application and it is not a framework. You adapt the idea to your codebase.",
          "Good patterns usually separate responsibilities, hide change, reduce coupling, or make collaboration clearer.",
          "The most important question is not 'Which pattern can I use?' but 'What change or design problem am I trying to handle?'.",
          "Patterns work best with interfaces, composition, small classes, and clear contracts."
        ],
        nuances: [
          "A pattern can make a small program worse if it adds unnecessary classes and indirection.",
          "The same pattern can look different in Java, Spring, Android, or a plain command-line application.",
          "Many real systems combine patterns. For example, a service may use dependency injection, a strategy, a repository, and an adapter together."
        ],
        code: `interface PaymentMethod {
    void pay(double amount);
}

class CheckoutService {
    private final PaymentMethod paymentMethod;

    CheckoutService(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    void checkout(double amount) {
        paymentMethod.pay(amount);
    }
}`
      },
      {
        title: "2. Principles behind good patterns: SOLID and composition",
        summary: "Patterns are easier to understand when you connect them to basic design principles.",
        points: [
          "Single Responsibility Principle: one class should have one main reason to change.",
          "Open/Closed Principle: add new behavior with extension rather than repeatedly editing stable code.",
          "Liskov Substitution Principle: a subtype should work wherever its parent type is expected.",
          "Interface Segregation Principle: clients should not depend on methods they do not need.",
          "Dependency Inversion Principle: high-level code should depend on abstractions, not concrete details.",
          "Prefer composition when you want to combine or replace behavior without creating a rigid inheritance tree."
        ],
        nuances: [
          "SOLID is guidance, not a rule that every class must have exactly one method or one field.",
          "An interface is useful when it represents a meaningful contract. Creating interfaces only to increase the class count is not good design.",
          "Dependency injection is a practical way to apply the Dependency Inversion Principle."
        ],
        code: `interface TaxPolicy {
    double taxFor(double price);
}

class Checkout {
    private final TaxPolicy taxPolicy;

    Checkout(TaxPolicy taxPolicy) {
        this.taxPolicy = taxPolicy;
    }

    double total(double price) {
        return price + taxPolicy.taxFor(price);
    }
}`
      },
      {
        title: "3. Creational patterns: controlling object creation",
        summary: "Creational patterns keep object creation in one understandable place and make creation easier to change or test.",
        points: [
          "Singleton provides one controlled instance, but it should be used carefully because it introduces global state.",
          "Factory Method lets a method or subclass decide which concrete product to create.",
          "Abstract Factory creates related families of objects, such as a Windows UI family or a Mac UI family.",
          "Builder creates a complex object step by step, especially when there are many optional fields.",
          "Prototype creates a new object by copying an existing object or prototype.",
          "In Java, constructors, static factory methods, builders, dependency injection containers, and enum singletons are common creation tools."
        ],
        nuances: [
          "A static factory method is not automatically the GoF Factory Method pattern; the important idea is that creation is separated from the caller.",
          "Use a builder for readability and validation, not simply because the class has two fields.",
          "Copying objects requires a clear decision about shallow copy versus deep copy."
        ],
        code: `class User {
    private final String name;
    private final String city;
    private final boolean newsletter;

    private User(Builder builder) {
        this.name = builder.name;
        this.city = builder.city;
        this.newsletter = builder.newsletter;
    }

    static class Builder {
        private final String name;
        private String city = "Unknown";
        private boolean newsletter;

        Builder(String name) {
            this.name = name;
        }

        Builder city(String city) {
            this.city = city;
            return this;
        }

        Builder newsletter(boolean enabled) {
            this.newsletter = enabled;
            return this;
        }

        User build() {
            return new User(this);
        }
    }
}`
      },
      {
        title: "4. Singleton, Factory Method, Abstract Factory, and Prototype",
        summary: "These patterns solve different creation problems; knowing the difference is more important than memorizing their names.",
        points: [
          "Use Singleton when one shared resource truly has one application-wide identity, such as a stateless registry or configuration holder.",
          "Use Factory Method when a creator chooses one product and subclasses or implementations may vary the product.",
          "Use Abstract Factory when several products must be compatible with each other, such as Button and Checkbox from the same UI theme.",
          "Use Prototype when creating an object from scratch is expensive or when a copy of a configured object is useful.",
          "An enum singleton is usually safer than a hand-written lazy singleton because it handles serialization and reflection concerns better."
        ],
        nuances: [
          "Singleton can make tests order-dependent and hide dependencies. Prefer passing a dependency into a class when possible.",
          "Factory Method and Abstract Factory both create objects, but Abstract Factory creates a related family rather than one product type.",
          "Prototype must protect mutable nested objects if independent copies are required."
        ],
        code: `enum AppConfig {
    INSTANCE;

    private String environment = "production";

    public String environment() {
        return environment;
    }
}

interface Report {
    String render();
}

class PdfReport implements Report {
    public String render() {
        return "PDF report";
    }
}

class ReportFactory {
    static Report create(String format) {
        if ("pdf".equalsIgnoreCase(format)) return new PdfReport();
        throw new IllegalArgumentException("Unsupported format");
    }
}`
      },
      {
        title: "5. Structural patterns: connecting objects safely",
        summary: "Structural patterns explain how to assemble classes and objects without exposing unnecessary details.",
        points: [
          "Adapter converts one interface into another interface that the client already understands.",
          "Bridge separates a high-level abstraction from an implementation so both can change independently.",
          "Composite treats individual objects and groups of objects in the same way, which is useful for trees.",
          "Decorator wraps an object and adds behavior without changing the original class.",
          "Facade gives clients one simple entry point to a complicated subsystem.",
          "Flyweight shares common immutable data to reduce memory use when many similar objects exist.",
          "Proxy is a stand-in that controls access, such as a lazy, remote, protected, cached, or logging wrapper."
        ],
        nuances: [
          "Decorator and Proxy look similar because both wrap another object; their intent is different. Decorator adds responsibilities, while Proxy controls access.",
          "Adapter changes an existing interface. Facade designs a simpler interface for a subsystem.",
          "Flyweight is safe only when shared intrinsic state is not accidentally modified by one client."
        ],
        code: `interface Printer {
    void print(String text);
}

class LegacyPrinter {
    void printLine(String value) {
        System.out.println(value);
    }
}

class PrinterAdapter implements Printer {
    private final LegacyPrinter legacyPrinter;

    PrinterAdapter(LegacyPrinter legacyPrinter) {
        this.legacyPrinter = legacyPrinter;
    }

    public void print(String text) {
        legacyPrinter.printLine(text);
    }
}

class LoggingPrinter implements Printer {
    private final Printer delegate;

    LoggingPrinter(Printer delegate) {
        this.delegate = delegate;
    }

    public void print(String text) {
        System.out.println("LOG: printing");
        delegate.print(text);
    }
}`
      },
      {
        title: "6. Adapter, Bridge, Composite, Decorator, Facade, Flyweight, and Proxy",
        summary: "The seven structural patterns can be remembered by the problem they solve: translate, separate, tree, wrap, simplify, share, and control.",
        points: [
          "Adapter: translate an old or third-party API into your application's interface.",
          "Bridge: keep an abstraction such as RemoteControl separate from an implementation such as Device.",
          "Composite: model folders/files, UI components, or organization trees with one common component interface.",
          "Decorator: add compression, encryption, caching, validation, or logging around an object.",
          "Facade: hide several steps such as inventory, payment, and shipping behind checkout.placeOrder().",
          "Flyweight: share repeated intrinsic data such as a character glyph or map tile and pass changing extrinsic data separately.",
          "Proxy: delay expensive loading, check permissions, cache results, or call a remote service through a local-looking object."
        ],
        nuances: [
          "A large facade should not become a god class; it should coordinate a subsystem, not own every business rule.",
          "A proxy can make a remote or slow operation look local, so document latency and failure behavior clearly.",
          "Composite is most useful when clients should not need separate code for a leaf and a group."
        ],
        code: `interface Image {
    void show();
}

class RealImage implements Image {
    private final String file;

    RealImage(String file) {
        this.file = file;
        System.out.println("Loading " + file);
    }

    public void show() {
        System.out.println("Showing " + file);
    }
}

class ImageProxy implements Image {
    private final String file;
    private RealImage realImage;

    ImageProxy(String file) {
        this.file = file;
    }

    public void show() {
        if (realImage == null) realImage = new RealImage(file);
        realImage.show();
    }
}`
      },
      {
        title: "7. Behavioral patterns: sharing responsibility and behavior",
        summary: "Behavioral patterns focus on communication, algorithms, state changes, and the flow of a request.",
        points: [
          "Chain of Responsibility passes a request through handlers until one handles it.",
          "Command turns an action into an object, enabling queues, logs, retries, macros, and undo.",
          "Interpreter represents a small grammar and evaluates expressions in that language.",
          "Iterator visits elements without exposing the collection's internal structure.",
          "Mediator centralizes communication between many objects so they do not all depend directly on one another.",
          "Memento captures an object's state so it can be restored later without exposing internal details.",
          "Observer notifies interested objects when a subject changes.",
          "State changes an object's behavior when its internal state changes.",
          "Strategy puts interchangeable algorithms behind a common interface.",
          "Template Method defines an algorithm skeleton and lets subclasses fill selected steps.",
          "Visitor adds operations to a stable object structure without putting every operation into the element classes."
        ],
        nuances: [
          "Observer needs a plan for unsubscribe, memory leaks, event ordering, and failure in one listener.",
          "Strategy is usually easier to test than a large if/else block because each algorithm is a separate class.",
          "Visitor is powerful for stable structures and many operations, but adding a new element type becomes more expensive."
        ],
        code: `interface DiscountStrategy {
    double apply(double price);
}

class NoDiscount implements DiscountStrategy {
    public double apply(double price) {
        return price;
    }
}

class TenPercentDiscount implements DiscountStrategy {
    public double apply(double price) {
        return price * 0.90;
    }
}

class PriceCalculator {
    private final DiscountStrategy strategy;

    PriceCalculator(DiscountStrategy strategy) {
        this.strategy = strategy;
    }

    double finalPrice(double price) {
        return strategy.apply(price);
    }
}`
      },
      {
        title: "8. Observer, Strategy, State, Command, Chain, and Template Method",
        summary: "These patterns are common in business applications because requirements often change behavior, workflows, and event reactions.",
        points: [
          "Observer is event broadcasting: one subject informs many subscribers.",
          "Strategy is algorithm selection: the caller chooses one behavior from several interchangeable behaviors.",
          "State is lifecycle behavior: the object delegates behavior to its current state and transitions over time.",
          "Command is action packaging: a button or queue can hold an object that knows how to execute a request.",
          "Chain is handler pipelines: authentication, validation, rate limiting, and business handling can be separate steps.",
          "Template Method is a fixed recipe: the parent controls the order while subclasses customize hooks."
        ],
        nuances: [
          "A strategy is selected from outside; a state usually changes from inside as the object progresses.",
          "A chain can finish at the first handler or allow every handler to run; define that contract explicitly.",
          "Template Method uses inheritance, so Strategy is often preferable when behavior should be changed at runtime."
        ],
        code: `abstract class DataImporter {
    public final void importData() {
        String raw = read();
        String parsed = parse(raw);
        save(parsed);
    }

    protected abstract String read();
    protected abstract String parse(String raw);

    private void save(String data) {
        System.out.println("Saved: " + data);
    }
}

class CsvImporter extends DataImporter {
    protected String read() { return "a,b"; }
    protected String parse(String raw) { return raw.replace(',', '|'); }
}`
      },
      {
        title: "9. Java application patterns used with GoF patterns",
        summary: "Enterprise Java often combines classic patterns with practical patterns for application boundaries.",
        points: [
          "Dependency Injection supplies collaborators from outside instead of making classes construct their own dependencies.",
          "Repository or DAO hides persistence details behind methods expressed in domain language.",
          "Service coordinates a use case and keeps controllers or user interfaces thin.",
          "DTO carries data across a boundary without exposing persistence entities or internal domain behavior.",
          "MVC separates model data, view presentation, and controller input coordination.",
          "Layered architecture commonly separates controller, service, repository, and database responsibilities.",
          "Spring uses many pattern ideas: dependency injection, proxy-based transactions, template classes, factories, and MVC."
        ],
        nuances: [
          "A DTO is not automatically a good domain model. Do not put complex business rules only in data containers.",
          "A repository should not become a second service layer full of unrelated business decisions.",
          "Framework annotations can hide patterns, so interview answers should explain the underlying object collaboration."
        ],
        code: `interface UserRepository {
    User findById(long id);
}

class UserService {
    private final UserRepository repository;

    UserService(UserRepository repository) {
        this.repository = repository;
    }

    UserDto getUser(long id) {
        User user = repository.findById(id);
        return new UserDto(user.id(), user.name());
    }
}

record UserDto(long id, String name) {}`
      },
      {
        title: "10. How to choose a pattern without overengineering",
        summary: "Start with the change you expect, then choose the smallest design that keeps that change local.",
        points: [
          "If object construction is complicated, consider Builder or a Factory.",
          "If clients depend on an incompatible API, use Adapter.",
          "If you need optional behavior around an object, consider Decorator; if you need access control or lazy loading, consider Proxy.",
          "If several algorithms change independently, use Strategy.",
          "If many objects need notifications, use Observer with explicit lifecycle management.",
          "If behavior changes with lifecycle state, use State instead of a growing conditional block.",
          "If a subsystem is difficult to use, add a Facade while keeping the underlying pieces available when needed.",
          "Before adding a pattern, write the simple version first and identify the concrete pain it does not handle."
        ],
        nuances: [
          "Patterns are not a replacement for naming, tests, modularity, or a clear domain model.",
          "A pattern is successful when it makes the next change easier, not when it uses the most classes.",
          "Prefer the standard library when it already provides a safe solution, such as Iterator, Observer-like event APIs, or immutable collection factories."
        ],
        code: `// Start simple
class ReceiptPrinter {
    String print(Order order) {
        return order.id() + ": " + order.total();
    }
}

// Add a strategy only when the algorithm really varies
interface ReceiptFormat {
    String format(Order order);
}`
      },
      {
        title: "11. Interview checklist and pattern comparisons",
        summary: "In an interview, explain the problem, the collaboration, the trade-off, and a small Java example.",
        points: [
          "Singleton versus static class: Singleton is an object with an instance and interface; a static class is a collection of static members and cannot be injected in the same way.",
          "Factory versus Builder: Factory chooses which object to create; Builder constructs one complex object step by step.",
          "Adapter versus Decorator: Adapter changes the interface; Decorator keeps the interface and adds behavior.",
          "Decorator versus Proxy: Decorator adds responsibilities; Proxy controls access or represents another object.",
          "Strategy versus State: Strategy selects an algorithm; State changes behavior because the object's lifecycle state changes.",
          "Observer versus Mediator: Observer broadcasts changes; Mediator coordinates communication through a central object.",
          "Template Method versus Strategy: Template Method uses inheritance and a fixed recipe; Strategy uses composition and replaceable algorithms.",
          "Always mention testability, lifecycle, thread safety, memory use, error handling, and whether a pattern is actually necessary."
        ],
        nuances: [
          "Do not claim that a pattern guarantees performance or thread safety. Those properties depend on the implementation and workload.",
          "Do not describe patterns only by definitions. Explain a small collaboration between interfaces and concrete classes.",
          "A strong answer includes one reason not to use the pattern."
        ],
        code: `// A short interview answer can show the key collaboration
interface SortStrategy {
    void sort(int[] values);
}

class ReportService {
    private final SortStrategy sortStrategy;

    ReportService(SortStrategy sortStrategy) {
        this.sortStrategy = sortStrategy;
    }

    void prepare(int[] values) {
        sortStrategy.sort(values);
    }
}`
      }
    ],
    takeaways: [
      "A design pattern is a reusable design idea, not code that must be copied exactly.",
      "Learn the 23 GoF patterns by problem: five creational, seven structural, and eleven behavioral.",
      "Use composition and interfaces when behavior needs to vary independently.",
      "Use a pattern when it makes a real change easier; do not add patterns only to make code look advanced.",
      "In Java, dependency injection, factories, builders, adapters, decorators, proxies, strategies, observers, repositories, DTOs, and MVC are especially common.",
      "For interviews, describe the problem, participants, collaboration, example, trade-off, and one alternative."
    ]
  };

  const learningSections = [
    {
      section: "what",
      items: [
        ["What is a design pattern?", "A design pattern is a named, reusable solution idea for a recurring software design problem.", "It describes how responsibilities and objects can collaborate. It is not a library, framework, or code template that must be copied exactly.", `interface Logger {
    void log(String message);
}`, "Teams can discuss a design quickly by saying 'use an adapter' or 'use a strategy'.", "Memorizing names without understanding the problem each pattern solves.", "A design pattern is a reusable design idea for a recurring problem, adapted to the current codebase."],
        ["Why do developers use design patterns?", "Patterns give structure to code and make common design decisions easier to explain, test, and change.", "They can reduce coupling, isolate variation, and provide a vocabulary for discussing object collaboration.", `class Checkout {
    private final PaymentMethod paymentMethod;

    Checkout(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}`, "A team can replace one payment method without rewriting Checkout.", "Assuming every pattern automatically improves code.", "Patterns help isolate change and communicate design, but they must solve a real problem."],
        ["Are design patterns libraries?", "No. A pattern is an idea about structure and collaboration; a library is reusable code that you call.", "You implement a pattern using Java classes, interfaces, records, lambdas, or framework features.", `interface Formatter {
    String format(String value);
}`, "The same Strategy idea can be implemented with classes or lambdas.", "Searching for a class named after every pattern.", "Patterns are design guidance, not ready-made libraries."],
        ["What are the three GoF pattern categories?", "Creational patterns control object creation, structural patterns organize objects, and behavioral patterns organize communication and algorithms.", "The classic Gang of Four catalog contains five creational, seven structural, and eleven behavioral patterns.", `// Creational: Builder
// Structural: Adapter
// Behavioral: Strategy`, "The categories help you remember which kind of design problem a pattern addresses.", "Mixing up Factory with Adapter because both may hide implementation details.", "Creational means create, structural means compose, and behavioral means collaborate."],
        ["What is the Single Responsibility Principle?", "A class should have one main reason to change.", "The principle does not mean a class can have only one method. It means its responsibilities should form one coherent purpose.", `class InvoicePrinter {
    String print(Invoice invoice) { return invoice.number(); }
}

class InvoiceRepository {
    void save(Invoice invoice) { }
}`, "Printing and persistence can change independently.", "Splitting every tiny line into a separate class.", "Keep responsibilities cohesive so unrelated changes do not affect the same class."],
        ["What is dependency injection?", "Dependency injection gives an object the collaborators it needs from outside instead of making the object construct them itself.", "Constructor injection makes dependencies visible, supports testing, and applies dependency inversion.", `class OrderService {
    private final OrderRepository repository;

    OrderService(OrderRepository repository) {
        this.repository = repository;
    }
}`, "A test can pass a fake repository without connecting to a real database.", "Calling new for every dependency inside the business class.", "Dependency injection supplies collaborators from outside and improves testability."],
        ["What is the Singleton pattern?", "Singleton controls creation so a class has one shared instance within a defined scope.", "The scope matters: one JVM, one application context, or one request are different guarantees. Singleton also introduces shared state and hidden coupling.", `enum Metrics {
    INSTANCE;

    void record(String name) { }
}`, "A process-wide immutable configuration or metrics registry may need one identity.", "Using Singleton for every service or mutable object.", "Singleton provides one controlled instance, but dependency injection is often easier to test."],
        ["What is the Factory Method pattern?", "Factory Method lets a creator decide which concrete product to return through a common product interface.", "The caller uses the product contract and does not need to know the concrete class selected by the factory.", `interface Parser { }

class ParserFactory {
    static Parser create(String type) {
        return new JsonParser();
    }
}`, "A report service can support PDF, CSV, and JSON parsers without exposing construction details.", "Putting a huge unrelated if/else factory in one class forever.", "Factory Method hides product creation behind a common contract."],
        ["What is the Abstract Factory pattern?", "Abstract Factory creates a family of related objects that should work together.", "For example, a Windows factory creates a Windows button and checkbox, while a Mac factory creates a compatible Mac pair.", `interface Button { }
interface Checkbox { }

interface UiFactory {
    Button button();
    Checkbox checkbox();
}`, "A UI toolkit can switch themes without mixing components from different themes.", "Using Abstract Factory when only one simple object needs to be created.", "Abstract Factory creates compatible families of products."],
        ["What is the Builder pattern?", "Builder creates a complex object step by step and makes optional settings readable.", "It is useful when constructors would have many parameters or when validation should happen before the final object is created.", `User user = new User.Builder("Ava")
    .city("Austin")
    .newsletter(true)
    .build();`, "Builders make configuration-heavy objects easier to read and harder to construct incorrectly.", "Creating a builder for a class with one obvious constructor argument.", "Builder is for readable, controlled construction of complex objects."],
        ["What is the Prototype pattern?", "Prototype creates a new object by copying an existing configured object.", "It can avoid repeating expensive setup, but the copy contract must say whether nested mutable objects are shared or copied.", `Report copy = original.copy();
copy.setTitle("New title");`, "Cloning a preconfigured document template can be faster than building every setting again.", "Assuming clone always performs a deep copy.", "Prototype copies a configured object and requires a clear shallow/deep copy policy."],
        ["What is the Adapter pattern?", "Adapter translates one interface into another interface expected by the client.", "It is useful when integrating legacy code or a third-party library without changing the client or vendor class.", `class OldPrinter {
    void printLine(String text) { }
}

class PrinterAdapter implements Printer {
    private final OldPrinter oldPrinter;

    public void print(String text) {
        oldPrinter.printLine(text);
    }
}`, "Your application can keep its Printer interface while adapting a vendor printer.", "Changing every caller to understand the legacy API.", "Adapter translates an existing interface into the interface your code wants."],
        ["What is the Decorator pattern?", "Decorator wraps an object and adds behavior while keeping the same interface.", "Multiple decorators can be stacked, so features such as logging, compression, and encryption can be combined.", `InputStream input = new BufferedInputStream(
    new FileInputStream("data.txt")
);`, "Java I/O streams are a well-known example of decorator-style wrapping.", "Changing the wrapped object's original class or breaking substitutability.", "Decorator adds responsibilities through wrappers that keep the same interface."],
        ["What is the Facade pattern?", "Facade provides one simple interface to a complicated subsystem.", "The facade coordinates several objects and hides workflow details from the caller.", `class CheckoutFacade {
    void placeOrder(Order order) {
        inventory.reserve(order);
        payment.charge(order);
        shipping.ship(order);
    }
}`, "A checkout API can hide inventory, payment, and shipping coordination.", "Putting all business rules and every subsystem class into one giant facade.", "Facade simplifies subsystem usage without necessarily removing the subsystem itself."]
      ]
    },
    {
      section: "why",
      items: [
        ["What is the Bridge pattern?", "Bridge separates an abstraction from its implementation so both can change independently.", "Instead of creating a subclass for every combination, the abstraction holds an implementation object.", `interface Device {
    void powerOn();
}

class RemoteControl {
    protected final Device device;

    RemoteControl(Device device) {
        this.device = device;
    }
}`, "A remote control can work with a TV, radio, or projector without a new subclass for every combination.", "Confusing Bridge with Adapter; Bridge is designed before the variation grows, while Adapter usually integrates an existing mismatch.", "Bridge separates two dimensions of change using composition."],
        ["What is the Composite pattern?", "Composite lets clients treat a single object and a group of objects through the same interface.", "It is useful for tree structures such as files and folders, UI components, or organization charts.", `interface FileSystemItem {
    int size();
}

class Folder implements FileSystemItem {
    private final List<FileSystemItem> children = new ArrayList<>();

    public int size() {
        return children.stream().mapToInt(FileSystemItem::size).sum();
    }
}`, "A folder and a file can both answer size() even though a folder contains children.", "Forcing every leaf to implement meaningless child-management methods.", "Composite represents leaves and groups through one common component contract."],
        ["What is the Proxy pattern?", "Proxy is a stand-in that controls access to another object.", "A proxy can provide lazy loading, caching, authorization, logging, remote calls, or transaction behavior.", `class ImageProxy implements Image {
    private RealImage image;

    public void show() {
        if (image == null) image = new RealImage();
        image.show();
    }
}`, "Spring transaction proxies and lazy database relationships use proxy-like ideas.", "Hiding important latency or failures because the proxy looks exactly like a local object.", "Proxy controls access to another object while preserving a usable contract."],
        ["What is the Flyweight pattern?", "Flyweight shares common immutable data between many similar objects.", "The shared intrinsic state is stored once, while changing extrinsic state is supplied by each caller.", `class Glyph {
    private final char symbol;

    Glyph(char symbol) {
        this.symbol = symbol;
    }

    void draw(int x, int y) { }
}`, "A text editor can share one glyph object for every occurrence of the same character.", "Sharing mutable state and allowing one user to change what every other user sees.", "Flyweight saves memory by sharing stable intrinsic state."],
        ["What is the Observer pattern?", "Observer lets a subject notify many subscribed objects when something changes.", "The subject knows the observer contract, while observers decide what to do with the event.", `interface OrderListener {
    void orderPlaced(Order order);
}

class Order {
    private final List<OrderListener> listeners = new ArrayList<>();

    void place() {
        listeners.forEach(listener -> listener.orderPlaced(this));
    }
}`, "An order event can notify email, analytics, and inventory listeners.", "Never removing listeners, which can cause memory leaks or unexpected callbacks.", "Observer broadcasts a change to interested subscribers."],
        ["What is the Strategy pattern?", "Strategy puts interchangeable algorithms behind a common interface.", "The client can select or receive a strategy without changing the code that uses the algorithm.", `interface ShippingCost {
    double calculate(Order order);
}

class ExpressShipping implements ShippingCost {
    public double calculate(Order order) {
        return 25.0;
    }
}`, "Shipping, tax, discount, sorting, and payment algorithms are common strategy examples.", "Keeping every algorithm in one huge conditional method.", "Strategy replaces conditional algorithm selection with interchangeable behavior objects."],
        ["What is the State pattern?", "State changes an object's behavior when its internal state changes.", "The context delegates work to a current state object, and the state can request a transition.", `interface OrderState {
    void cancel(Order order);
}

class PaidState implements OrderState {
    public void cancel(Order order) {
        order.refund();
    }
}`, "An order can behave differently when new, paid, shipped, or delivered.", "Using State when a simple enum and a small switch would be clearer.", "State moves lifecycle-dependent behavior into state objects."],
        ["What is the Command pattern?", "Command wraps a request as an object.", "The invoker can store, queue, retry, log, or undo a command without knowing the receiver's details.", `interface Command {
    void execute();
}

class SaveCommand implements Command {
    public void execute() {
        System.out.println("Saved");
    }
}`, "A GUI button, job queue, or undo manager can work with Command objects.", "Putting too much unrelated business logic into the command instead of calling a service.", "Command represents an action as an object so execution can be controlled."],
        ["What is Chain of Responsibility?", "Chain of Responsibility passes a request through a sequence of handlers.", "Each handler can process the request, reject it, or pass it to the next handler.", `abstract class Handler {
    private Handler next;

    Handler next(Handler next) {
        this.next = next;
        return next;
    }

    abstract boolean handle(Request request);
}`, "Authentication, validation, rate limiting, and authorization can form a request pipeline.", "Making the chain order accidental or allowing a request to disappear without a defined result.", "A chain lets handlers process or forward a request without one giant conditional."],
        ["What is Template Method?", "Template Method defines the fixed steps of an algorithm and lets subclasses customize selected steps.", "The parent controls the order, which prevents subclasses from accidentally changing the workflow.", `abstract class ReportJob {
    final void run() {
        load();
        transform();
        save();
    }

    abstract void load();
    abstract void transform();
    abstract void save();
}`, "CSV and JSON jobs can share the same load-transform-save workflow.", "Using inheritance when the algorithm should be swapped at runtime.", "Template Method fixes the algorithm skeleton and delegates selected steps."],
        ["What is the difference between Strategy and State?", "Strategy chooses an interchangeable algorithm, while State changes behavior because the object's lifecycle state changes.", "Strategy is often selected from outside. State usually transitions as the context performs work.", `PriceCalculator calculator = new PriceCalculator(new TenPercentDiscount());
double total = calculator.finalPrice(100);`, "Use Strategy for discount rules and State for order lifecycle behavior.", "Calling every conditional behavior change a Strategy.", "Strategy varies an algorithm; State models lifecycle-dependent behavior."],
        ["What is the difference between Adapter and Decorator?", "Adapter changes an interface; Decorator keeps the same interface and adds behavior.", "An adapter solves compatibility. A decorator solves optional responsibilities that can be stacked.", `Printer adapted = new PrinterAdapter(legacyPrinter);
Printer logged = new LoggingPrinter(adapted);`, "A legacy API may need an adapter and then a logging decorator.", "Assuming every wrapper is an Adapter.", "Adapter translates; Decorator enhances while preserving the interface."],
        ["Why can Observer be dangerous?", "Observer can create hidden control flow, memory leaks, event-order problems, and failures that are hard to see.", "Subscribers must be removed when their lifecycle ends, and the event contract should define synchronous/asynchronous behavior and error handling.", `subscription = eventBus.subscribe(OrderPlaced.class, this::handle);
subscription.close();`, "Web applications and message-driven systems need explicit subscription cleanup.", "Keeping strong references to short-lived observers forever.", "Observer is useful, but subscription lifecycle and failure behavior must be explicit."],
        ["Why is overusing Singleton a design problem?", "A Singleton behaves like global state and can hide dependencies between classes.", "It can make tests share mutable state, make order matter, and make replacement difficult.", `class ReportService {
    ReportService(Metrics metrics) { }
}`, "Passing Metrics into ReportService makes the dependency visible and replaceable.", "Calling every shared object a Singleton without considering scope or mutability.", "Use Singleton only for a genuinely single-scoped resource; prefer explicit dependencies when possible."]
      ]
    },
    {
      section: "how",
      items: [
        ["What is the Iterator pattern?", "Iterator provides a standard way to visit elements without exposing the collection's internal structure.", "Java's Iterable and Iterator interfaces are standard-library examples.", `Iterator<String> iterator = names.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}`, "Clients can traverse a list, set, tree, or custom collection through one protocol.", "Changing a collection while iterating without using the iterator's supported removal behavior.", "Iterator separates traversal from the internal representation of a collection."],
        ["What is the Mediator pattern?", "Mediator centralizes communication between related objects.", "Colleagues talk through the mediator instead of holding direct references to every other colleague.", `class ChatRoom {
    void send(User sender, String message) {
        // route the message to other users
    }
}

class User {
    private final ChatRoom room;

    User(ChatRoom room) {
        this.room = room;
    }
}`, "A chat room coordinates many users without every user managing every other user.", "Putting all business logic into one enormous mediator.", "Mediator reduces many-to-many coupling by centralizing coordination."],
        ["What is the Memento pattern?", "Memento stores a snapshot of an object's state so it can be restored later.", "The originator creates the snapshot, while a caretaker stores it without needing to know internal fields.", `record EditorMemento(String text, int cursor) {}

EditorMemento saved = editor.save();
editor.restore(saved);`, "Undo and checkpoint features often use memento-like snapshots.", "Saving references to mutable internal collections instead of independent state snapshots.", "Memento supports restore and undo without exposing the originator's internals."],
        ["What is the Visitor pattern?", "Visitor adds operations to a stable object structure without adding every operation to every element class.", "Elements accept a visitor, and the visitor has a method for each element type.", `interface Shape {
    void accept(ShapeVisitor visitor);
}

interface ShapeVisitor {
    void visit(Circle circle);
    void visit(Rectangle rectangle);
}`, "A compiler AST can support printing, validation, and code generation as separate visitors.", "Using Visitor when new element types are added constantly; every visitor must then change.", "Visitor is useful when the structure is stable and operations change often."],
        ["What is the Interpreter pattern?", "Interpreter represents a small language grammar and evaluates expressions in that language.", "It is useful for simple rule languages, filters, formulas, or configuration expressions; a full parser is better for a complex language.", `interface Expression {
    boolean interpret(Context context);
}

class HasRole implements Expression {
    private final String role;

    HasRole(String role) {
        this.role = role;
    }

    public boolean interpret(Context context) {
        return context.roles().contains(role);
    }
}`, "An access rule such as hasRole('ADMIN') can be represented and evaluated.", "Building a large production language with hand-written Interpreter classes and no grammar tools.", "Interpreter models and evaluates a small grammar; use a parser for complex languages."],
        ["What is the difference between Template Method and Strategy?", "Template Method uses inheritance to fix the algorithm skeleton, while Strategy uses composition to inject a replaceable algorithm.", "Strategy usually allows runtime replacement and better separation from a parent class.", `class ExportService {
    private final ExportStrategy strategy;

    ExportService(ExportStrategy strategy) {
        this.strategy = strategy;
    }
}`, "Use Template Method for a stable process with controlled extension; use Strategy for runtime algorithm choice.", "Choosing Template Method when subclasses need to change frequently or be combined.", "Template Method is inheritance plus hooks; Strategy is composition plus interchangeable algorithms."],
        ["How do Repository and DAO fit with design patterns?", "They hide persistence details behind an application-facing contract.", "The service depends on a repository interface, while a database-specific implementation handles SQL, ORM, or HTTP details.", `interface ProductRepository {
    Optional<Product> findById(long id);
}

class JdbcProductRepository implements ProductRepository {
    public Optional<Product> findById(long id) {
        return Optional.empty();
    }
}`, "Tests can use an in-memory repository while production uses JDBC or JPA.", "Putting validation, pricing, HTTP calls, and SQL all inside one repository.", "Repository/DAO isolates data access and supports dependency inversion."],
        ["How does MVC separate responsibilities?", "Model represents application data and rules, View presents data, and Controller coordinates input and use cases.", "The exact implementation varies, but the goal is to avoid mixing UI rendering, request handling, and domain logic in one class.", `class UserController {
    private final UserService service;

    UserPage show(long id) {
        return UserPage.from(service.find(id));
    }
}`, "Web frameworks commonly use controllers to call services and return a view or response DTO.", "Putting database queries and business rules directly in a controller.", "MVC separates input coordination, business/domain behavior, and presentation."],
        ["How should patterns be tested?", "Test the behavior and contracts, not the pattern name or internal class count.", "Use focused unit tests for strategies, adapters, decorators, and state transitions; use integration tests for real persistence, proxies, and framework wiring.", `class TenPercentDiscountTest {
    @Test
    void appliesDiscount() {
        assertEquals(90.0, new TenPercentDiscount().apply(100.0));
    }
}`, "Small pattern objects are often easy to test because their responsibility is narrow.", "Testing private implementation details so refactoring becomes impossible.", "Test observable behavior, contracts, edge cases, and integration boundaries."],
        ["How do you avoid overengineering with patterns?", "Begin with the simplest correct code and introduce a pattern when a real variation or design pressure appears.", "A pattern should make a likely change local, improve clarity, or reduce coupling enough to justify its extra structure.", `class PriceCalculator {
    double total(double price) {
        return price;
    }
}`, "Add Strategy when discount rules become independent, numerous, or selected at runtime.", "Adding Factory, Builder, and Abstract Factory before there is any creation problem.", "Use the smallest design that keeps real change easy; do not design for imaginary complexity."],
        ["How should you answer a design-pattern interview question?", "Explain the problem, the pattern's participants, how objects collaborate, a small Java example, and the trade-offs.", "Also compare it with a nearby pattern and say when you would not use it.", `// Problem: algorithms vary.
interface SortStrategy {
    void sort(List<Integer> values);
}`, "This structure shows that you understand design rather than only memorizing a definition.", "Giving only a one-line definition or naming a pattern unrelated to the problem.", "A strong answer covers problem, collaboration, code, trade-offs, alternatives, and misuse."],
        ["Can patterns be combined?", "Yes. Real applications often combine small patterns to solve one larger problem.", "For example, a service can receive a repository through dependency injection, choose a pricing Strategy, notify observers, and use an Adapter for a payment provider.", `class OrderService {
    OrderService(OrderRepository repository,
                 PricingStrategy pricing,
                 PaymentGateway payment) { }
}`, "Combining patterns can keep boundaries clean when each pattern has a clear responsibility.", "Combining patterns only to sound sophisticated or creating a chain of wrappers nobody understands.", "Combine patterns when each one solves a distinct problem and the collaboration remains understandable."]
      ]
    }
  ];

  learningSections.forEach(({ section, items }) => items.forEach((item, index) => {
    window.JAVAQuestions.addLearning({
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
    });
  }));

  const quizQuestions = [
    ["what", "What is a design pattern?", null, ["A Java keyword", "A reusable design idea", "A database table", "A compiler error"], 1, "A pattern is a reusable design idea for a recurring problem."],
    ["what", "Which category focuses on object creation?", null, ["Creational", "Structural", "Behavioral", "Deployment"], 0, "Creational patterns control how objects are created."],
    ["what", "Which category focuses on object collaboration and algorithms?", null, ["Creational", "Structural", "Behavioral", "Primitive"], 2, "Behavioral patterns organize communication, responsibilities, and algorithms."],
    ["what", "Which principle says high-level code should depend on abstractions?", null, ["DRY", "Dependency Inversion", "YAGNI", "Encapsulation only"], 1, "Dependency Inversion encourages high-level policy to depend on abstractions rather than concrete details."],
    ["what", "Which pattern creates a complex object step by step?", null, ["Builder", "Adapter", "Observer", "Iterator"], 0, "Builder makes complex construction readable and controlled."],
    ["what", "Which pattern creates compatible families of objects?", null, ["Factory Method", "Abstract Factory", "Decorator", "State"], 1, "Abstract Factory creates related products that should work together."],
    ["what", "Which Java type is commonly used for a safe enum singleton?", null, ["enum", "record only", "interface only", "annotation"], 0, "An enum can provide one instance and handles several serialization/reflection concerns safely."],
    ["what", "What is the main goal of Prototype?", null, ["Copy an existing object", "Broadcast events", "Parse SQL", "Control threads"], 0, "Prototype creates a new object by copying a configured object."],
    ["why", "Which pattern translates one interface into another?", null, ["Adapter", "Builder", "Observer", "Memento"], 0, "Adapter solves interface incompatibility."],
    ["why", "Which pattern adds behavior by wrapping an object with the same interface?", null, ["Decorator", "Facade", "Factory", "Interpreter"], 0, "Decorator keeps the interface and adds responsibilities through wrapping."],
    ["why", "Which pattern provides a simple interface to a complex subsystem?", null, ["Facade", "Flyweight", "State", "Visitor"], 0, "Facade hides subsystem coordination behind a simpler API."],
    ["why", "Which pattern shares common immutable data to save memory?", null, ["Flyweight", "Command", "Bridge", "Mediator"], 0, "Flyweight shares intrinsic state while varying extrinsic state per use."],
    ["why", "Which pattern lets a client treat a leaf and a group uniformly?", null, ["Composite", "Proxy", "Singleton", "Template Method"], 0, "Composite gives tree leaves and groups a common component interface."],
    ["why", "Which pattern represents interchangeable algorithms?", null, ["Strategy", "Memento", "Adapter", "Facade"], 0, "Strategy packages algorithms behind a common contract."],
    ["why", "Which pattern notifies many subscribers about a subject change?", null, ["Observer", "Builder", "Bridge", "Prototype"], 0, "Observer broadcasts events or state changes to subscribers."],
    ["why", "Which pattern changes behavior when an object's lifecycle state changes?", null, ["State", "Strategy", "Factory Method", "Flyweight"], 0, "State moves lifecycle-dependent behavior into state objects."],
    ["why", "What does Command turn into an object?", null, ["A request or action", "A database connection", "A primitive type", "A class loader"], 0, "Command wraps a request so it can be queued, logged, retried, or undone."],
    ["why", "Which pattern passes a request through multiple handlers?", null, ["Chain of Responsibility", "Visitor", "Singleton", "Builder"], 0, "A chain lets each handler process or forward a request."],
    ["how", "What is the main difference between Adapter and Decorator?", null, ["Adapter translates; Decorator adds behavior", "Adapter creates objects; Decorator stores data", "They are always identical", "Decorator only works with databases"], 0, "Adapter changes the interface, while Decorator preserves the interface and adds responsibilities."],
    ["how", "What is the main difference between Strategy and State?", null, ["Strategy varies an algorithm; State models lifecycle behavior", "Strategy is always global; State is always static", "State only creates objects", "There is no difference"], 0, "Strategy is usually selected as an algorithm; State changes as the context moves through a lifecycle."],
    ["how", "What does Iterator hide?", null, ["The collection's internal traversal details", "The JVM bytecode", "The database password", "The compiler version"], 0, "Iterator exposes traversal without exposing the collection representation."],
    ["how", "What is the purpose of a Memento?", null, ["Save and restore state", "Translate interfaces", "Create related families", "Share glyph data"], 0, "Memento stores a snapshot for undo or restore."],
    ["how", "When is Visitor a good fit?", null, ["The object structure is stable but operations change often", "Every element type changes every day", "Only one object exists", "You need one global variable"], 0, "Visitor works best when the element structure is stable and many operations must be added."],
    ["how", "What is the safest general approach before adding a pattern?", null, ["Identify a real design pressure", "Add every GoF pattern", "Increase the number of classes", "Use Singleton everywhere"], 0, "Patterns should respond to a real problem or expected variation, not be added for decoration."]
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