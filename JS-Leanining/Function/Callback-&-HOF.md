## Start From The Problem

Imagine you have three tasks:

```js
function doTask1() {
  console.log("Washing clothes");
}

function doTask2() {
  console.log("Cooking food");
}

function doTask3() {
  console.log("Studying JS");
}
```

Now you want to **do each task and then say "Done!"** after each one.

Without higher order functions you would do this:

```js
doTask1();
console.log("Done!");

doTask2();
console.log("Done!");

doTask3();
console.log("Done!");
```

Repetitive. What if you had 100 tasks?

**This is the problem higher order functions and callbacks solve.**

## Callback Function

A callback is a **function passed as an argument to another function**.

You are saying:

> "Here is a function. Run it when you are ready."

```js
function doTaskThenFinish(task) {
  task(); // run whatever function was passed
  console.log("Done!");
}

doTaskThenFinish(doTask1); // Washing clothes → Done!
doTaskThenFinish(doTask2); // Cooking food → Done!
doTaskThenFinish(doTask3); // Studying JS → Done!
```

`doTask1`, `doTask2`, `doTask3` are **callbacks** — they are passed as arguments and called inside.

---

### Inline callback — write it directly

```js
doTaskThenFinish(function () {
  console.log("Exercising");
});
// Exercising
// Done!
```

You do not need a named function. Write it inline right where you pass it.

---

### Arrow function callback — cleaner

```js
doTaskThenFinish(() => {
  console.log("Reading book");
});
// Reading book
// Done!
```

## Higher Order Function

A higher order function is a function that either:

- **Takes a function as an argument** — receives a callback
- **Returns a function** — gives back a new function
- or **both**

```js
// takes a function as argument → higher order function
function doTaskThenFinish(task) {
  // task is a function
  task();
  console.log("Done!");
}

// returns a function → also higher order function
function makeMultiplier(multiplier) {
  return function (number) {
    // returns a function
    return number * multiplier;
  };
}
```

In simple words — **a function that works with other functions**.

## Built-in Higher Order Functions you use every day

JavaScript arrays come with powerful built-in higher order functions. All of them take a **callback**.

### `forEach` — do something for each item

```js
const todos = ["Buy milk", "Study JS", "Exercise"];

todos.forEach(function (todo) {
  console.log("Task: " + todo);
});

// Task: Buy milk
// Task: Study JS
// Task: Exercise
```

`forEach` is the higher order function.
The function inside is the callback.
`forEach` calls your callback once for each item.

### `map` — transform each item, get new array

```js
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(function (num) {
  return num * 2;
});

console.log(doubled); // [2, 4, 6, 8, 10]
```

Original array is untouched. `map` gives you a **brand new array** with transformed values.

```js
// real world — transform API data
const users = [
  { firstName: "Rahul", lastName: "Sharma" },
  { firstName: "Priya", lastName: "Singh" },
];

const fullNames = users.map((user) => `${user.firstName} ${user.lastName}`);

console.log(fullNames); // ["Rahul Sharma", "Priya Singh"]
```

### `filter` — keep only items that pass a test

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const evenNumbers = numbers.filter(function (num) {
  return num % 2 === 0; // keep only if true
});

console.log(evenNumbers); // [2, 4, 6, 8]
```

```js
// real world — filter completed todos
const todos = [
  { title: "Buy milk", completed: true },
  { title: "Study JS", completed: false },
  { title: "Exercise", completed: true },
  { title: "Read book", completed: false },
];

const completedTodos = todos.filter((todo) => todo.completed);
console.log(completedTodos);
// [{ title: "Buy milk"... }, { title: "Exercise"... }]

const pendingTodos = todos.filter((todo) => !todo.completed);
console.log(pendingTodos);
// [{ title: "Study JS"... }, { title: "Read book"... }]
```

### `reduce` — boil array down to single value

```js
const numbers = [1, 2, 3, 4, 5];

const total = numbers.reduce(function (accumulator, current) {
  return accumulator + current;
}, 0); // 0 is the starting value

console.log(total); // 15
```

Think of `accumulator` as a **running total** — it carries the result from each step.

```
start  → accumulator = 0
step 1 → 0  + 1 = 1
step 2 → 1  + 2 = 3
step 3 → 3  + 3 = 6
step 4 → 6  + 4 = 10
step 5 → 10 + 5 = 15
```

```js
// real world — calculate cart total
const cart = [
  { name: "Shoes", price: 1200 },
  { name: "Shirt", price: 800 },
  { name: "Jeans", price: 1500 },
];

const cartTotal = cart.reduce((total, item) => total + item.price, 0);
console.log(cartTotal); // 3500
```

### Chaining them together — real power

```js
const orders = [
  { product: "Shoes", price: 1200, delivered: true },
  { product: "Shirt", price: 800, delivered: false },
  { product: "Jeans", price: 1500, delivered: true },
  { product: "Cap", price: 300, delivered: false },
  { product: "Watch", price: 5000, delivered: true },
];

// get total value of delivered orders only
const deliveredTotal = orders
  .filter((order) => order.delivered) // keep delivered ones
  .map((order) => order.price) // get just the prices
  .reduce((total, price) => total + price, 0); // add them up

console.log(deliveredTotal); // 7700 (1200 + 1500 + 5000)
```

Each method returns a new array — the next method works on that result. Clean chain, no temporary variables.

## Higher Order Function that Returns a Function

```js
function makeGreeter(greeting) {
  return function (name) {
    // returns a new function
    console.log(`${greeting} ${name}!`);
  };
}

const sayHello = makeGreeter("Hello");
const sayNamaste = makeGreeter("Namaste");
const sayHey = makeGreeter("Hey");

sayHello("Rahul"); // Hello Rahul!
sayNamaste("Priya"); // Namaste Priya!
sayHey("Amit"); // Hey Amit!
```

`makeGreeter` is a higher order function because it **returns a function**. The returned function closes over `greeting` through closure.

## Real World — Custom `forEach` from scratch

Understanding how these work internally makes you a better developer.

```js
function myForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array); // call callback with item, index, full array
  }
}

myForEach(["a", "b", "c"], function (item, index) {
  console.log(index + ": " + item);
});
// 0: a
// 1: b
// 2: c
```

This is exactly how JavaScript's built-in `forEach` works internally.

## Real World — Custom `map` from scratch

```js
function myMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array)); // collect return values
  }
  return result;
}

const numbers = [1, 2, 3];
const squared = myMap(numbers, (num) => num * num);
console.log(squared); // [1, 4, 9]
```

## Callbacks in Async code — most common real use

Callbacks are not just for arrays. They are heavily used in **async operations**.

```js
// setTimeout — do something after a delay
setTimeout(function () {
  console.log("runs after 2 seconds");
}, 2000);

// fetch — do something when data arrives
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(function (response) {
    // callback when response arrives
    return response.json();
  })
  .then(function (data) {
    // callback when json is ready
    console.log(data);
  });

// event listener — do something when user clicks
button.addEventListener("click", function () {
  // callback on click
  console.log("button clicked");
});
```

In all three cases you are saying:

> "I do not know when this will happen. But when it does, run this function."

That is the core idea of a callback.

## Callback Hell — the problem with too many callbacks

```js
// login → get profile → get orders → get delivery status
login(user, function (loggedInUser) {
  getProfile(loggedInUser.id, function (profile) {
    getOrders(profile.id, function (orders) {
      getDeliveryStatus(orders[0].id, function (status) {
        console.log(status); // finally got what we need
      });
    });
  });
});
```

This is called **callback hell** or the **pyramid of doom**. Hard to read, hard to debug, hard to maintain.

This is exactly why **Promises** and **async/await** were invented — to flatten this pyramid. But that is a separate topic.

## How everything connects

```
Functions are values
        ↓
you can pass functions as arguments
        ↓
the function you pass = callback
        ↓
the function that receives it = higher order function
        ↓
higher order function calls your callback
when it is ready
        ↓
this pattern powers — array methods,
async code, event listeners, timers
```

## Quick Summary

- Callback — a function passed into another function to be called later
- Higher order function — a function that takes a function OR returns a function
- Built-in HOFs — `forEach`, `map`, `filter`, `reduce` all take callbacks
- Callbacks power async code — timers, fetch, event listeners
- Too many nested callbacks = callback hell → solved by promises later
- Both patterns rely on the fact that **functions are values** in JavaScript

**One line to remember:**

> "A callback is the function you hand over — a higher order function is the one that receives it, uses it, or builds a new one from it."

## Imagine JavaScript Without Callbacks or HOF

### Problem 1 — Repetition everywhere

You are building a todo app. You need to:

- print all todos
- print only completed todos
- print only pending todos

```js
const todos = [
  { title: "Buy milk", completed: true },
  { title: "Study JS", completed: false },
  { title: "Exercise", completed: true },
  { title: "Read book", completed: false },
];
```

**Without callbacks or HOF you write this:**

```js
// print all
for (let i = 0; i < todos.length; i++) {
  console.log(todos[i].title);
}

// print completed
for (let i = 0; i < todos.length; i++) {
  if (todos[i].completed === true) {
    console.log(todos[i].title);
  }
}

// print pending
for (let i = 0; i < todos.length; i++) {
  if (todos[i].completed === false) {
    console.log(todos[i].title);
  }
}
```

Three loops. Almost the same code. Only the condition changes.

What if you need 10 more variations? You write 10 more loops.

**This is the repetition problem.**

---

### Problem 2 — Code is rigid, cannot be reused

```js
function printAllTodos() {
  for (let i = 0; i < todos.length; i++) {
    console.log(todos[i].title); // hardcoded — only prints title
  }
}
```

This function only ever prints titles. What if tomorrow you want to print the completed status? You write a new function. What if you want to print both? Another new function.

Every time the requirement changes, you write new code instead of reusing old code.

**This is the rigidity problem.**

---

### Problem 3 — Async is impossible without callbacks

JavaScript runs one line at a time. Some things take time — fetching data, reading a file, waiting for a user click.

```js
// you want to do this
const data = fetch("https://api.example.com/todos"); // takes 2 seconds
console.log(data); // runs immediately — data is not ready yet
```

Without callbacks, you have no way to say:

> "Wait for this to finish, THEN run this code."

You cannot pause JavaScript. You cannot freeze the whole program and wait.

**This is the async problem.**

---

## Now — How Callbacks and HOF Solve Each Problem

---

### Solution to Problem 1 — No more repetition

Instead of writing the loop every time, write it **once** in a HOF and pass what changes as a callback.

```js
function processEachTodo(todos, action) {
  for (let i = 0; i < todos.length; i++) {
    action(todos[i]); // the changing part is the callback
  }
}

// now reuse for any action
processEachTodo(todos, (todo) => console.log(todo.title));
processEachTodo(todos, (todo) => console.log(todo.completed));
processEachTodo(todos, (todo) =>
  console.log(`${todo.title} - ${todo.completed}`),
);
```

The loop is written **once**. What you do with each todo changes every time. You pass that changing part as a callback.

This is exactly what built-in `forEach` does.

---

### Solution to Problem 2 — Code becomes flexible

```js
// HOF — the structure stays same, behaviour changes
function filterTodos(todos, condition) {
  const result = [];
  for (let i = 0; i < todos.length; i++) {
    if (condition(todos[i])) {
      // condition is a callback
      result.push(todos[i]);
    }
  }
  return result;
}

// reuse with any condition
const completed = filterTodos(todos, (todo) => todo.completed === true);
const pending = filterTodos(todos, (todo) => todo.completed === false);
const shortTitle = filterTodos(todos, (todo) => todo.title.length < 10);
```

Same function. Three completely different behaviours. You just swap the callback.

This is exactly what built-in `filter` does.

---

### Solution to Problem 3 — Async becomes possible

```js
// WITHOUT callback — broken
function getUser(id) {
  let user;
  fetch(`/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      user = data; // sets user LATER — too late
    });
  return user; // returns undefined — fetch not done yet
}

// WITH callback — works correctly
function getUser(id, callback) {
  fetch(`/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      callback(data); // call this when data is READY
    });
}

// you decide what to do when data arrives
getUser(1, function (user) {
  console.log(user.name); // runs only when data is ready
});
```

You are handing JavaScript a function and saying:

> "I know you cannot stop and wait. So here is a function. Call it when you are ready."

That is the entire purpose of callbacks in async code.

---

## Real Comparison — Before and After

### Before — building a notification system

```js
// every type of notification needs its own function
function sendEmailNotification(user) {
  console.log(`Sending email to ${user.email}`);
}

function sendSMSNotification(user) {
  console.log(`Sending SMS to ${user.phone}`);
}

function sendPushNotification(user) {
  console.log(`Sending push to ${user.deviceId}`);
}

// call each one manually
sendEmailNotification(user);
sendSMSNotification(user);
sendPushNotification(user);
```

3 functions. If you add WhatsApp notifications tomorrow — 4th function. Slack — 5th. Every new type means new function.

---

### After — with HOF and callbacks

```js
// one HOF handles all notification types
function notifyUser(user, notificationFn) {
  console.log(`Notifying ${user.name}...`);
  notificationFn(user); // callback decides HOW to notify
  console.log(`Notification sent.`);
}

// callbacks define the HOW
const sendEmail = (user) => console.log(`Email sent to ${user.email}`);
const sendSMS = (user) => console.log(`SMS sent to ${user.phone}`);
const sendPush = (user) => console.log(`Push sent to ${user.deviceId}`);

const user = {
  name: "Rahul",
  email: "r@r.com",
  phone: "9999",
  deviceId: "abc123",
};

notifyUser(user, sendEmail);
notifyUser(user, sendSMS);
notifyUser(user, sendPush);

// add WhatsApp tomorrow — zero changes to notifyUser
const sendWhatsApp = (user) => console.log(`WhatsApp sent to ${user.phone}`);
notifyUser(user, sendWhatsApp);
```

`notifyUser` never changes. You just pass a new callback for every new type. Open for extension, closed for modification. This is good code design.

---

## Real World — Where You See This Every Day

### Event listeners — user interactions

```js
// you do not know WHEN user will click
// so you give browser a callback to call when they do
button.addEventListener("click", function () {
  console.log("user clicked — now I run");
});
```

Without callbacks there is no way to respond to user actions.

---

### setTimeout — delayed execution

```js
// you cannot pause JS and wait 3 seconds
// so you give it a callback to call after 3 seconds
setTimeout(function () {
  console.log("3 seconds passed — now I run");
}, 3000);

console.log("this runs immediately"); // this runs first
```

---

### Array operations — data transformation

```js
const orders = [
  { id: 1, amount: 500, status: "delivered" },
  { id: 2, amount: 1200, status: "pending" },
  { id: 3, amount: 800, status: "delivered" },
  { id: 4, amount: 300, status: "cancelled" },
];

// get total of delivered orders
const deliveredTotal = orders
  .filter((order) => order.status === "delivered") // callback 1
  .map((order) => order.amount) // callback 2
  .reduce((sum, amount) => sum + amount, 0); // callback 3

console.log(deliveredTotal); // 1300
```

Three callbacks. Three HOFs. One clean chain. Without this you would need 3 separate loops and 2 temporary arrays.

---

### API call — real backend scenario

```js
function loadUserDashboard(userId, onSuccess, onError) {
  fetch(`/api/users/${userId}`)
    .then((res) => res.json())
    .then((user) => onSuccess(user)) // callback when it works
    .catch((err) => onError(err)); // callback when it fails
}

// caller decides what to do on success or failure
loadUserDashboard(
  1,
  (user) => console.log(`Welcome ${user.name}`), // success callback
  (error) => console.log(`Failed: ${error.message}`), // error callback
);
```

The function does not decide what happens on success or failure. **You decide** by passing callbacks. This makes it reusable in any part of your app.

---

## The Core Reason in One Picture

```
WITHOUT callbacks and HOF
─────────────────────────
code is rigid
     ↓
every variation needs a new function
     ↓
repetition everywhere
     ↓
async is impossible
     ↓
cannot respond to events, timers, API calls


WITH callbacks and HOF
─────────────────────────
separate WHAT to do from HOW to do it
     ↓
write the structure once
     ↓
pass the changing behaviour as a callback
     ↓
async becomes possible
     ↓
respond to events, timers, API calls cleanly
```

---

## Quick Summary

- Without callbacks, async code is impossible — you cannot respond to events, timers, or API results
- Without HOF, you repeat the same loop structure everywhere just to change one small behaviour
- Callbacks let you say "I do not know when, but when it happens — run this"
- HOF let you say "here is the structure — you decide the behaviour"
- Together they make code reusable, flexible, and async-capable
- Every modern JS pattern — promises, async/await, array methods, events — is built on top of these two ideas

**One line to remember:**

> "We need callbacks because JavaScript cannot wait — and we need higher order functions because we should not repeat ourselves every time behaviour changes."
