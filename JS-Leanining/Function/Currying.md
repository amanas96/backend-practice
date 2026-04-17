# Currying --

Currying is a powerful functional programming technique that relies heavily on Closures—the concept we just mastered. It’s a favorite topic for senior-level MERN interviews.

### CONCEPT CLARITY

Currying is a transformation of a function that takes multiple arguments into a series of functions that each take a single argument.

Analogy: Imagine a Juice Maker. Instead of throwing all the fruits (Apple, Orange, Ginger) in at once, you have a machine with three slots. You put the Apple in, it waits for the Orange, then it waits for the Ginger, and only then does it give you the juice.

Simple Definition: Changing f(a, b, c) to f(a)(b)(c).

### How does it work?

In a curried function, the outer function takes one argument and returns an inner function that takes the next argument.

```js
Normal Function
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5

Curried Function
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}
console.log(curriedAdd(2)(3)); // 5
```

### Characteristics

- Unary Functions: Each function in the chain typically takes only one argument.
- Intermediate Steps: You can store the intermediate functions to reuse them later.
- Dependency: The final result is only calculated once the last argument is received.
- Currying helps in Function Composition. It allows you to create specialized "helper" functions from more generic ones. This makes your code more modular and easier to test. In large React projects, currying is often used in "Higher Order Components" or middleware (like Redux Thunk).

### Real World Usage

`Currying — building reusable filters`

```js
const filter = curry(function (predicate, array) {
  return array.filter(predicate);
});

const getCompleted = filter((todo) => todo.completed);
const getIncomplete = filter((todo) => !todo.completed);
const getHighPriority = filter((todo) => todo.priority === "high");

const todos = [
  { title: "Buy milk", completed: true, priority: "low" },
  { title: "Study JS", completed: false, priority: "high" },
  { title: "Exercise", completed: false, priority: "high" },
  { title: "Read book", completed: true, priority: "low" },
];

console.log(getCompleted(todos)); // Buy milk, Read book
console.log(getIncomplete(todos)); // Study JS, Exercise
console.log(getHighPriority(todos)); // Study JS, Exercise
```

### Coding Practice

Problem: Create a curried function updateDOM(id)(attribute)(value) that updates an HTML element.

```
Approach:
 Function 1: Take the Element ID.
 Function 2: Take the Attribute (like 'style' or 'innerHTML').
 Function 3: Take the Value and apply it.
```

---

# 🧩 Problem: Build a Curried API Request Utility

### 🎯 Objective

Design a **curried function** that helps construct and execute HTTP requests in a reusable and scalable way.

---

# 📌 Problem Statement

Create a function:

```js
apiRequest(baseURL)(endpoint)(method)(body);
```

This function should:

1. Construct the full API URL using `baseURL` and `endpoint`
2. Send an HTTP request using the Fetch API
3. Support different HTTP methods (`GET`, `POST`, `PUT`, `DELETE`)
4. Send request body only when applicable
5. Return the parsed JSON response

---

# ✅ Expected Usage

```js
apiRequest("https://api.example.com")("/users")("POST")({
  name: "John",
  age: 25,
});
```

---

# ⚙️ Requirements

- Use **currying (nested functions)**
- Use the **Fetch API**
- Handle **JSON request/response**
- Implement **basic error handling**
- Avoid sending a body in `GET` requests

---

# 🧠 Constraints / Expectations

- The function should be **reusable via partial application**

Example:

```js
const myAPI = apiRequest("https://api.example.com");

const usersAPI = myAPI("/users");

usersAPI("GET")();
usersAPI("POST")({ name: "Alice" });
```

---

# ⭐ Bonus (For Strong Candidates)

Extend your function to support:

**Custom headers**

```js
apiRequest(baseURL)(endpoint)(method)(body)(headers);
```

**Config-based alternative**

```js
apiRequest(baseURL)(endpoint)({
  method: "POST",
  body: {...},
  headers: {...}
});
```

---

# 💡 Hints (Progressive)

### Hint 1

Think of currying as:

```js
a(b)(c)(d)(e);
```

Each layer returns the next function.

---

### Hint 2

Construct URL like:

```js
const url = baseURL + endpoint;
```

---

### Hint 3

Fetch syntax:

```js
fetch(url, {
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
```

---

### Hint 4

Handle response:

```js
if (!res.ok) throw new Error();
return res.json();
```
