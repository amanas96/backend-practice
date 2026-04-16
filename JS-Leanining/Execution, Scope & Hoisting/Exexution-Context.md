# 🔹 Execution Context (EC)

## What is Execution Context?

Execution Context is the **environment where JavaScript code is executed**.

> Think of it as a "workspace" created when code runs.

---

## Types of Execution Context

1. **Global Execution Context (GEC)**
2. **Function Execution Context (FEC)**

---

## Two Phases of Execution Context

### 1. Memory Creation Phase

- Variables → `undefined`
- Functions → full definition
- `let/const` → uninitialized (TDZ)

---

### 2. Execution Phase

- Code runs line-by-line
- Values assigned
- Functions executed

---

# 🔹 Call Stack

- JS uses a **Call Stack (LIFO)**
- Keeps track of execution contexts

```text
Top → currently running function
Bottom → Global Execution Context
```

---

## Example

```js
function bar() {
  console.log("Inside bar");
}
function foo() {
  bar();
}
foo();
```

### Call Stack Flow

```text
Global EC
→ foo()
→ bar()
→ pop bar
→ pop foo
```

---

# 🔹 Scope Chain

When JS cannot find a variable:

1. Check current scope
2. Go to outer scope
3. Continue until Global scope
4. If not found → ReferenceError

---

## Example

```js
var a = 10;

function bar() {
  var b = 20;
  console.log(a + b);
}

bar(); // 30
```

- `b` → found locally
- `a` → found via scope chain

---

# 🔹 Real-World (MERN / Node.js)

When an API request hits:

1. Global EC already exists
2. Controller function → new EC
3. DB helper → another EC
4. Async tasks → moved to background (Web APIs / Node APIs)
5. Call stack stays free
6. Response returns → contexts popped

```js
// routes/todo.js
app.get("/todos", getTodos); // request comes in here

// controllers/todoController.js
const getTodos = async (req, res) => {
  const data = await dbHelper.findAll(); // calls database helper
  res.json(data);
};

// helpers/dbHelper.js
const findAll = async () => {
  const result = await Todo.find({}); // calls MongoDB
  return result;
};
```

```
Request comes in
      ↓
getTodos() workspace created     → pushed on stack
      ↓
dbHelper.findAll() workspace created  → pushed on stack
      ↓
MongoDB query handed to background   → stack freed
      ↓
MongoDB responds
      ↓
findAll() workspace restored     → runs, then removed
      ↓
getTodos() workspace restored    → runs, sends response, removed
      ↓
Stack is clean again
```

---

# 🔹 Important Concept (Async)

```text
Async operations do NOT stay in the call stack.
They go to Web APIs / Node APIs and return via the Event Loop.
```

---

# 🔹 Common Interview Traps

### 1. var vs let

```js
console.log(a); // undefined
var a = 10;

console.log(b); // ReferenceError
let b = 10;
```

---

### 2. Function vs var

```js
foo();

var foo = function () {}; // ❌ TypeError
```

---

### 3. Function Priority

```js
foo();

function foo() {
  console.log("Hello");
}

var foo = 10;
```

✔ Output: Hello

---

# 🔹 Final Summary

- Hoisting moves declarations to the top
- Function declarations are fully hoisted
- `var` → undefined
- `let/const` → TDZ
- Execution Context runs in two phases
- Call Stack manages execution
- Scope Chain resolves variables
- Async operations handled outside call stack

---

# 🧠 One-Line Interview Summary

> JavaScript executes code using execution contexts created in two phases—memory creation (hoisting) and execution—managed by the call stack, where function declarations are fully hoisted, `var` is initialized as undefined, and `let/const` remain in the Temporal Dead Zone until initialized.

```

```
