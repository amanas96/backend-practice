### Function Declaration vs. Function Expression

## 🟢 PHASE 1: CONCEPT CLARITY

### 1. What is it?

These are the two primary ways to create a function in JavaScript.

- **Function Declaration:** Starting a line with the word `function`.
- **Function Expression:** Storing a function inside a variable.

### 2. How does it work?

**Function Declaration:**

```javascript
function greet() {
  console.log("Hello!");
}
```

**Function Expression:**

```javascript
const speak = function () {
  console.log("Hi!");
};
```

### 3. Characteristics (The Major Difference)

The biggest difference is **Hoisting**.

- **Declarations** are fully hoisted. You can call the function _before_ you define it.
- **Expressions** follow variable hoisting rules. If you use `const` or `let`, they are in the **TDZ** and will crash if called too early.

### 4. Real World Usage

In **React**, we almost exclusively use **Function Expressions** (specifically Arrow Functions) for components and event handlers because they look cleaner and handle the `this` keyword more predictably.

---

## 🔴 PHASE 2: INTERVIEW DEEP DIVE

### 6. How Interviewers Ask This

- "Can you call a function before it is defined in JavaScript?"
- "What is an Anonymous Function, and where is it typically used?"

### 7. Output-Based Question

```javascript
console.log(funcA());
console.log(funcB());

function funcA() {
  return "I am a Declaration";
}

var funcB = function () {
  return "I am an Expression";
};
```

**What will be the output?**

> **Answer:** > 1. `I am a Declaration` 2. `TypeError: funcB is not a function`
>
> **Why?** `funcA` is hoisted entirely. `funcB` is declared with `var`, so it is hoisted as `undefined`. When you try to call `undefined()`, JS screams "That's not a function!"

### 8. Deep Insight: Memory Allocation

During the **Memory Creation Phase**:

- The engine sees `function funcA` and allocates the entire function body to that name in memory.
- The engine sees `var funcB` and only allocates space for the variable, setting it to `undefined`. It doesn't know it's a function until the **Execution Phase** hits that line.

### 9. Common Traps

Using **Arrow Functions** as expressions. Remember: Arrow functions are always expressions. They are never hoisted as functions.

### 10. Coding Practice

**Problem:** Refactor this code so that both functions can be called at the very top of the file without errors.

```javascript
// Move calls here
sum(5, 5);
multiply(5, 5);

function sum(a, b) {
  return a + b;
}
const multiply = (a, b) => a * b;
```

**Solution:**
Since `multiply` is a `const` expression, it **must** be defined before it is called. Only `sum` can stay where it is. To fix it, move the `multiply` definition to the top or change it to a declaration.

---
