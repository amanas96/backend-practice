**50 carefully structured coding challenges** covering:

- Functions
- Scope & Scope Chain
- `this`
- Closures
- Hoisting
- Execution Context & Call Stack

👉 These are **interview-level**, not basic drills.

---

# 🧠 Section 1: Functions & Hoisting (1–10)

---

### 1. Predict Output (Hoisting)

```js
console.log(a);
var a = 10;
```

---

### 2. Function Hoisting

```js
test();
function test() {
  console.log("Hello");
}
```

---

### 3. Function Expression Hoisting

```js
test();
var test = function () {
  console.log("Hi");
};
```

---

### 4. `let` vs `var` hoisting

```js
console.log(x);
let x = 5;
```

---

### 5. Temporal Dead Zone

Explain why this fails:

```js
console.log(a);
let a = 10;
```

---

### 6. Function inside block

```js
if (true) {
  function test() {
    console.log("Hello");
  }
}
test();
```

---

### 7. Named vs Anonymous function behavior

---

### 8. IIFE behavior

```js
(function () {
  console.log("IIFE");
})();
```

---

### 9. Function overriding

```js
function test() {
  return 1;
}
function test() {
  return 2;
}
console.log(test());
```

---

### 10. Default parameters

```js
function test(a = 5) {
  console.log(a);
}
test(undefined);
```

---

# 🧠 Section 2: Scope & Scope Chain (11–20)

---

### 11. Scope chain resolution

```js
let a = 10;
function outer() {
  let a = 20;
  function inner() {
    console.log(a);
  }
  inner();
}
outer();
```

---

### 12. Shadowing

---

### 13. Illegal shadowing

```js
let a = 10;
{
  var a = 20;
}
```

---

### 14. Block scope vs function scope

---

### 15. Nested scope chain

---

### 16. Accessing variable before declaration

---

### 17. Scope inside loops (`var` vs `let`)

---

### 18. Global pollution problem

---

### 19. Scope vs execution

---

### 20. Scope chain visualization (draw it)

---

# 🧠 Section 3: Closures (21–30)

---

### 21. Basic closure

```js
function outer() {
  let x = 10;
  return function () {
    console.log(x);
  };
}
```

---

### 22. Counter using closure

---

### 23. Multiple closures

---

### 24. Closure in loop (classic problem)

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

---

### 25. Fix above problem

---

### 26. Data privacy using closure

---

### 27. Memoization function

---

### 28. Once function (you solved earlier)

---

### 29. Closure with event handler

---

### 30. Garbage collection + closure

---

# 🧠 Section 4: `this` Keyword (31–40)

---

### 31. Basic `this`

```js
function test() {
  console.log(this);
}
test();
```

---

### 32. Object method

---

### 33. Arrow vs regular

---

### 34. Lost `this` in callback

---

### 35. Fix using arrow

---

### 36. Fix using bind

---

### 37. `call` usage

---

### 38. `apply` usage

---

### 39. `bind` behavior

---

### 40. Double bind edge case

---

# 🧠 Section 5: Execution Context & Call Stack (41–50)

---

### 41. Call stack order

```js
function a() {
  b();
}
function b() {
  c();
}
function c() {
  console.log("done");
}
a();
```

---

### 42. Execution context phases

Explain:

- Creation phase
- Execution phase

---

### 43. Variable environment

---

### 44. Hoisting in execution context

---

### 45. Stack overflow example

---

### 46. Recursive function

---

### 47. Debug call stack

---

### 48. Execution context with closure

---

### 49. Async + call stack (intro)

---

### 50. Dry run complex code

```js
var x = 1;

function outer() {
  var x = 2;
  function inner() {
    console.log(x);
  }
  return inner;
}

const fn = outer();
fn();
```

---

# 🚀 How to Use This List (Important)

Don’t try all 50 at once.

### ✅ Best Strategy:

- 5 questions/day
- Write + dry run
- Explain aloud (very important)
