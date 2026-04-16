## PHASE 1: CONCEPT CLARITY

### 1. What is it?

**Lexical Scope** (also known as Static Scope) means that the scope of a variable is determined by its physical location within the source code.

- **Analogy:** Imagine a set of Russian Nesting Dolls. The smallest doll (the inner function) can see everything outside it, but the big outer doll cannot see what’s inside the smaller ones.
- **The Rule:** An inner function always has access to the variables of its outer (parent) function.

### 2. How does it work?

JavaScript uses the "physical" placement of your functions to decide which variables they can "see."

```javascript
let globalVar = "I am Global";

function outer() {
  let outerVar = "I am Outer";

  function inner() {
    console.log(globalVar); // Success!
    console.log(outerVar); // Success!
  }

  inner();
}

outer();
```

- **Step 1:** When `inner()` runs, it looks for `outerVar` inside its own curly braces `{}`.
- **Step 2:** It doesn't find it, so it looks "outside" to its parent, `outer()`. It finds it there!
- **Step 3:** This search continues until it hits the Global Scope.

### 3. Characteristics

- **Determined at Compile Time:** JS knows the scope before the code even runs.
- **One-Way Street:** Outer functions cannot "reach in" to see variables inside inner functions.
- **Static:** It doesn't matter _where_ you call the function; it only matters where you _defined_ it.

### 4. Real World Usage

In the **MERN stack**, you use this constantly in **React hooks**. When you define an event handler inside a component, that handler "remembers" the props and state of the component because of lexical scope.

### 5. Quick Summary

- Lexical = Physical position in the code.
- Inner functions can see "up/out," but not "down/in."
- This creates a **Scope Chain**.

---

## 🔴 PHASE 2: INTERVIEW DEEP DIVE

### 6. How Interviewers Ask This

- "What is the difference between Lexical Scope and Dynamic Scope?" (Note: JS does **not** use dynamic scope).
- "How does the Scope Chain work?"

### 7. Output-Based Question

```javascript
var fruit = "Apple";

function first() {
  console.log(fruit);
}
function second() {
  var fruit = "Banana";
  first();
}
second();
```

**What will be the output?**

> **Answer:** `Apple`
>
> **Why?** Many people think it will print "Banana" because `first()` is called inside `second()`. But `first()` was **defined** in the Global Scope. Lexically, its parent is the Global Scope, not `second()`. It ignores the `fruit` variable inside `second()`.

### 8. Deep Insight: Lexical Environment

When an Execution Context is created, it also creates a **Lexical Environment**. This environment consists of:

1. **Environment Record:** The actual storage of variables.
2. **Reference to Outer Environment:** A pointer to the parent's Lexical Environment.

This "pointer" is what builds the **Scope Chain**. Because this pointer is set when the function is defined (not called), the scope remains "static" or "lexical."

### 9. Common Traps

- **Shadowing:** If you declare a variable with the same name in an inner scope, it "shadows" (hides) the outer variable.
- **Confusing Call Stack with Scope:** The Call Stack is about _execution order_ (who called whom), but Lexical Scope is about _access_ (who can see what).

### 10. Coding Practice

**Problem:** Create a nested structure where a variable is "shadowed," and explain which value will be logged.

**Approach:** 1. Define a variable in the outer scope. 2. Define a variable with the **same name** in the inner scope. 3. Log it.

**Solution:**

```javascript
const user = "Aman";

function greet() {
  const user = "Student"; // Shadowing happens here
  console.log(user);
}

greet(); // Logs: "Student"
console.log(user); // Logs: "Aman"
```
