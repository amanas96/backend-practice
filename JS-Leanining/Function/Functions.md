### Function Declaration vs. Function Expression

## CONCEPT CLARITY

A function is a reusable block of code designed to perform a particular task.

`Analogy`: Think of a Recipe. The recipe (function definition) stays in your book. You only get a cake (output) when you decide to actually "follow" the recipe (call the function) using specific ingredients (arguments).

**A function takes inputs, processes them, and returns an output.**

```js
function greet(name) {
  // 'name' is a parameter (placeholder)
  return `Hello, ${name}!`;
}

const message = greet("Rahul"); // "Aman" is the argument (real value)
console.log(message);
```

**Types of Functions (The Basics)**
These are the two primary ways to create a function in JavaScript.

| Type               | Syntax                  | Key Characteristic                                  |
| ------------------ | ----------------------- | --------------------------------------------------- |
| **Declaration**    | function a() {}         | Hoisted; can be called before definition.           |
| **Expression**     | const a = function() {} | Not hoisted; assigned to a variable.                |
| **Arrow Function** | const a = () => {}      | Short syntax; does not have its own `this`.         |
| **Anonymous**      | function() {}           | Has no name; used as arguments for other functions. |

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

## What are First-Class Functions ?

When functions in a programming language are treated like any other variable then that programming language is known to have first-class functions.**In javascript**, the functions are known as the first-class citizens, which means functions can do what any other variables can. First-class functions javascript get this ability by treating the functions as an **object**.

As functions are treated like a **variable**, we can pass them as a parameter to the other function and return the function from another function just like any other variable. Because functions are treated as variables we can store them in any other variable, objects, and in an array. This simply means first-class functions in javascript are simply like values or like any other objects in the code.

```js
example: const myVariable = function () { // Assigning a function to a variable
    console.log("Inside the function...");
 }
 myVariable(); // Invoking the function using the variable
```

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
