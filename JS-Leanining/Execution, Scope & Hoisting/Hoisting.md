## Hoisting in JavaScript

Before running your code line-by-line, the JavaScript engine moves all variable and function declarations to the top of their scope.

Hoisting happens to everything (`var`, `let`, `const`, functions, classes), but **behavior differs**.

## Hoisting with `var`

JavaScript hoists `var` and immediately initializes it with a default value of `undefined`.

### Example

```js
console.log(drink); // undefined
var drink = "Juice";
```

````md
### Step-by-step

1. JS sees `var drink` → hoists it to the top and assigns `undefined`.
2. `console.log(drink)` runs → prints `undefined`.
3. `"Juice"` is assigned to `drink`.

---

## Hoisting with `let` and `const`

JavaScript hoists `let` and `const`, but they are **not initialized**.

### Example

```js
console.log(drink); // ReferenceError
let drink = "Juice";
```
````

This happens because of the **Temporal Dead Zone (TDZ)**.

---

## Functional Hoisting

### Function Declaration (Works)

```js
sayHello();

function sayHello() {
  console.log("Hello");
}
```

### Internal Behavior

```js
function sayHello() {
  console.log("Hello");
}

sayHello();
```

Function declarations are **fully hoisted** (name + body).

---

## Function Expression (Error with `let` / `const`)

```js
sayHello(); // ReferenceError

const sayHello = function () {
  console.log("Hello");
};
```

### Why?

```js
// Internally:
const sayHello; // hoisted but uninitialized

sayHello(); // ❌ crash
```

---

## Function Expression with `var`

```js
sayHello();

var sayHello = function () {
  console.log("Hello");
};
```

### Output

```text
TypeError: sayHello is not a function
```

### Why?

- `var` is hoisted as `undefined`
- `undefined()` is not callable

---

## Summary

Hoisting in JavaScript means that during execution, the engine processes all variable and function declarations before running the code. However, not all declarations behave the same way when they are hoisted.

- **Function declarations** are fully hoisted. Both the function name and body are available before execution.
- **`var` variables** are hoisted and initialized with `undefined`.
- **`let`, `const`, and classes** are hoisted but not initialized immediately. They remain in the **Temporal Dead Zone (TDZ)** until their declaration is reached.
- Accessing variables in TDZ results in a **ReferenceError**.

### Final Takeaway

- Function → fully usable before definition
- `var` → exists as `undefined`
- `let` / `const` / class → exist but inaccessible (TDZ)

## Practice Questions

### What will be the output?

```js
1. console.log(a);
var a = 5;

2. sayHello();
   function sayHello() {
  console.log("Hello");
  }


3. sayHello();
   var sayHello = function () {
   console.log("Hello");
  };


4. var a = 10;
   function a() {}
   console.log(a);


5. console.log(foo);
   function foo() {
  return "function";
  }
  var foo = "variable";
```

## Hint :

```
Hoisting decides initial value
Execution decides final value
```

## Priority Order :

```
Function declaration > var > let/const/class
```
