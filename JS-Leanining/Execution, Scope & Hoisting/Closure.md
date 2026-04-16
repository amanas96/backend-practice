## What is a Closure?

A closure is a function that **remembers the variables from where it was created** even after that place has finished running.

Let me build this up step by step.

---

## Step 1 — Normal function, no closure

```js
function makeGreeting() {
  let message = "Hello Rahul";
}

makeGreeting();
console.log(message); // ReferenceError — message is gone
```

When `makeGreeting` finishes, its execution context is **removed from the stack**. `message` is destroyed with it.

Normal behaviour. No closure yet.

---

## Step 2 — Return a function from a function

```js
function makeGreeting() {
  let message = "Hello Rahul";

  function greet() {
    console.log(message); // greet can see message
  }

  return greet; // return the inner function
}

const sayHello = makeGreeting(); // makeGreeting finishes here
sayHello(); // Hello Rahul — but HOW? message should be gone!
```

This is a closure.

`makeGreeting` finished running. Its execution context was removed. But `message` is **still alive** because `greet` has a reference to it.

---

## Why does this happen?

When a function is **created inside another function**, it does not just remember its own variables — it carries a **backpack** with all the variables from its parent scope.

That backpack is the closure.

```
makeGreeting runs
    ↓
creates [ message = "Hello Rahul" ]
    ↓
creates greet function
greet's backpack = { message: "Hello Rahul" }  ← closure
    ↓
makeGreeting finishes, context removed
    ↓
but greet still has its backpack
    ↓
sayHello() runs → looks in backpack → finds message → prints it
```

---

## Step 3 — Closure remembers the REFERENCE not the value

This is the most important thing to understand.

```js
function makeCounter() {
  let count = 0; // this variable is shared

  function increment() {
    count++;
    console.log(count);
  }

  return increment;
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
```

`count` is not copied into the backpack. The backpack holds a **live reference** to `count`. So every time `counter()` runs, it updates the same `count`.

This is why closures are powerful — they maintain **persistent state**.

---

## Step 4 — Multiple closures sharing same variable

```js
function makeCounter() {
  let count = 0;

  return {
    increment() {
      count++;
      console.log(count);
    },
    decrement() {
      count--;
      console.log(count);
    },
    getCount() {
      return count;
    },
  };
}

const counter = makeCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.increment(); // 3
counter.decrement(); // 2
console.log(counter.getCount()); // 2
```

All three functions — `increment`, `decrement`, `getCount` — share the **same `count`** variable through closure.

This is like a mini database living in memory.

---

## Step 5 — Each closure gets its OWN backpack

```js
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const counter1 = makeCounter(); // own backpack with count = 0
const counter2 = makeCounter(); // own backpack with count = 0

counter1(); // 1
counter1(); // 2
counter1(); // 3

counter2(); // 1 — completely separate, not affected by counter1
counter2(); // 2
```

Every time you call `makeCounter`, a **brand new execution context** is created, and the returned function gets its own fresh backpack.

`counter1` and `counter2` do not share anything.

---

## The Classic Bug — Closures in Loops

This confuses almost every beginner.

```js
// BROKEN
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // prints 3, 3, 3 — not 0, 1, 2
  }, 1000);
}
```

**Why?**

`var` is function scoped. There is only **one `i`** in memory, shared by all three functions. By the time setTimeout fires after 1 second, the loop has finished and `i` is already `3`. All three closures point to the same `i`.

```
Memory has ONE i
    ↓
loop runs → i becomes 0, 1, 2, 3
    ↓
1 second later all three functions run
    ↓
all three look at same i → i is 3
    ↓
prints 3, 3, 3
```

**Fix 1 — use `let`**

```js
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 0, 1, 2 — correct
  }, 1000);
}
```

`let` is block scoped. Each loop iteration creates a **brand new `i`**. Each function closes over its own separate `i`.

```
Iteration 0 → own i = 0 → function closes over it
Iteration 1 → own i = 1 → function closes over it
Iteration 2 → own i = 2 → function closes over it
    ↓
1 second later
    ↓
each function looks in its own backpack
    ↓
prints 0, 1, 2
```

**Fix 2 — use IIFE (old way before let existed)**

```js
for (var i = 0; i < 3; i++) {
  (function (j) {
    // create a new scope, pass i as j
    setTimeout(function () {
      console.log(j); // 0, 1, 2
    }, 1000);
  })(i); // immediately call with current i
}
```

Each IIFE call creates a new execution context. `j` is a fresh copy each time.

---

## Real World Uses

**1. Data Privacy — hiding variables**

### Encapsulation: hiding internal data + exposing controlled access

**Closures let you :**
🔒 Hide data (private)
🔑 Expose methods (public API)

```js
function createBankAccount(initialBalance) {
  let balance = initialBalance; // private — no one outside can touch this

  return {
    deposit(amount) {
      balance += amount;
      console.log(`Deposited ${amount}. Balance: ${balance}`);
    },
    withdraw(amount) {
      if (amount > balance) {
        console.log("Insufficient funds");
        return;
      }
      balance -= amount;
      console.log(`Withdrew ${amount}. Balance: ${balance}`);
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(1000);
account.deposit(500); // Deposited 500. Balance: 1500
account.withdraw(200); // Withdrew 200. Balance: 1300
console.log(account.balance); // undefined — balance is private
```

`balance` cannot be accessed or changed from outside. Only the returned functions can touch it. This is **encapsulation** using closures.

### 🔐 What is Encapsulated Here?

**Direct access** NOT allowed
acc.balance `undefined`

**Controlled access**
ONLY
`acc.deposit(500)`
`acc.withdraw(200)`
`acc.getBalance()`

**👉 You cannot break the rules from outside**

🧠 Why Closures Enable This

**Even after createAccount() finishes**:
balance is still alive
because returned functions close over it

```
deposit → remembers balance
withdraw → remembers balance
getBalance → remembers balance
```

⚙️ What Problem This Solves

Without encapsulation:

```
let balance = 1000;
balance = -999999; //no-control
```

With closures:
`acc.withdraw(2000); // controlled behavior`

👉 You enforce rules + validation

---

**2. Memoization — remembering results**

```js
function createMultiplier(multiplier) {
  // multiplier is remembered in closure
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const times10 = createMultiplier(10);

console.log(double(5)); // 10
console.log(triple(5)); // 15
console.log(times10(5)); // 50
```

Each function remembers its own `multiplier` from when it was created.

---

**3. Event Listeners in real apps**

```js
function setupButton(buttonId, message) {
  const button = document.getElementById(buttonId);

  button.addEventListener("click", function () {
    console.log(message); // remembers message through closure
  });
}

setupButton("btn1", "First button clicked");
setupButton("btn2", "Second button clicked");
```

Each event listener closes over its own `message`. When button 1 is clicked, it remembers "First button clicked". When button 2 is clicked, it remembers "Second button clicked".

---

**4. Debounce — real world performance pattern**

```js
function debounce(fn, delay) {
  let timer; // this is remembered through closure

  return function (...args) {
    clearTimeout(timer); // cancel previous timer
    timer = setTimeout(() => {
      // start new timer
      fn(...args);
    }, delay);
  };
}

const handleSearch = debounce(function (query) {
  console.log("Searching for:", query);
}, 500);

// user types fast — only last call fires after 500ms
handleSearch("r");
handleSearch("ra");
handleSearch("rah");
handleSearch("rahu");
handleSearch("rahul"); // only this one actually searches
```

`timer` lives in the closure. Every call to `handleSearch` accesses and updates the **same** `timer`. This is impossible without closures.

---

## How closure relates to what you learned before

```
Execution Context
      ↓
When a function is created inside another function
      ↓
inner function gets a backpack (closure)
      ↓
backpack holds reference to outer variables
      ↓
even after outer execution context is removed from call stack
      ↓
inner function can still access those variables
      ↓
this is the scope chain working through closures
```

## Quick Summary

- A closure is a function that remembers variables from where it was born
- It holds a **live reference** — not a copy — so changes are remembered
- It holds **refrence** **not value**.
- Every function call creates a fresh closure with its own backpack
- The classic loop bug happens because `var` creates only one shared variable — fix it with `let`
- Real uses — data privacy, counters, memoization, event handlers, debounce

**One line to remember:**

> "A closure is a function carrying a backpack of variables from its birthplace — even after that birthplace is gone, the backpack stays with the function forever."

---

# Task:

```md
- Dynamically create 15 buttons using JavaScript
- Each button should represent a unique color
- On-click, change the background color of the webpage to the selected color
- Ensure correct behavior using closures or block scoping
  Avoid global variable leakage
- Provide a brief explanation of how closures solve the problem
```
