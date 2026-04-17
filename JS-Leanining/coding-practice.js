var a = 10;

function outer() {
  var a = 20;

  function inner() {
    var a = 30;
    console.log(a);
  }
  inner();
}
outer();

const userProfile = (function () {
  let age = 25;

  return {
    getAge: function () {
      return age;
    },
    celebrateBday: function () {
      age++;
      return `Happy Birthday! You are now ${age} years old.`;
    },
  };
})();

console.log(userProfile.getAge());
console.log(userProfile.celebrateBday());

const user = {
  name: "Baba",
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

setTimeout(user.greet.bind(user), 1000);

// fix: greet.bind(user) because setTiemout changes this context to the global. either use arrow or bind method to fix this issue.

const user1 = { name: "baba" };
const user2 = { name: "Rahul" };

function show() {
  console.log(`Hello, my name is ${this.name}`);
}

show.call(user1);
show.call(user2);

const numbers = [10, 50, 30, 80, 40, 60];

const maxNumber = Math.max.apply(null, numbers); //.apply(obj,array) method is used to call a function with a given this value and arguments provided as an array (or an array-like object). In this case, we are using Math.max to find the maximum number in the array. Since Math.max does not have a specific this context, we can pass null as the first argument. The second argument is the array of numbers that we want to find the maximum from.
console.log(maxNumber);

function multiply(a, b) {
  return a * b;
}

const double1 = multiply.bind(null, 2); // bind method is used to create a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called. In this case, we are creating a new function called double that multiplies any number by 2. The first argument is null because we don't need to set a specific this context for the multiply function. The second argument is 2, which will be used as the first argument when the double function is called.

console.log(double(5)); // Output: 10

function log(message) {
  console.log(this.prefix + message);
}

const info = { prefix: "[INFO] " };
const error = { prefix: "[ERROR] " };

const logInfo = log.bind(info); // bind method is used to create a new function that, when called, has its this keyword set to the provided value. In this case, we are creating a new function called logInfo that will use the prefix from the info object when logging messages. The first argument is the info object, which contains the prefix we want to use.

const errorInfo = error.bind(error);

const button = {
  lable: "Click Me",
  handleClick() {
    console.log(this.label);
  },
};

document.addEventListener("click", button.handleClick.bind(button));

const person1 = {
  name: "Baba",
  greet() {
    console.log("Hi " + this.name);
  },
};
const person2 = {
  name: "Rahul",
};

person1.greet.call(person2); // call method is used to call a function with a given this value and arguments provided individually. In this case, we are calling the greet method of person1 but setting the this context to person2. This means that when greet is executed, it will use the name property from person2 instead of person1, resulting in "Hi Rahul" being logged to the console.

function test() {
  console.log(this.name);
}

const obj = { name: "Baba" };

test.call(obj);

const fn = test.bind(obj);
fn(); // Output: "Baba"

greet.apply(user, ["hello", "!"]); // apply method is used to call a function with a given this value and arguments provided as an array (or an array-like object). In this case, we are calling the greet function with the user object as the this context and passing "hello" and "!" as arguments in an array. The greet function will use the name property from the user object and log "Hello, my name is Baba" to the console.

function show() {
  console.log(this.name);
}

const obj1 = { name: "A" };
const obj2 = { name: "B" };

const bound = show.bind(obj1).bind(obj2);
bound(); // Output: "A" because the first bind sets the this context to obj1, and the second bind does not change it. The this context is determined by the first bind and cannot be overridden by subsequent binds.

const newuser = {
  name: "Baba",
  hoobies: ["coding", "gaming", "traveling"],
  showHobbies() {
    this.hoobies.forEach(
      function (hooby) {
        console.log(this.name + " likes " + hooby);
      }.bind(this),
    );
  },
};

newuser.showHobbies();

const newUser = {
  name: "Baba",
  hoobies: ["coding", "gaming", "traveling"],
  showHobbies() {
    this.hoobies.forEach((hooby) => {
      console.log(this.name + " likes " + hooby);
    });
  },
};
newUser.showHobbies(); // In this case, we are using an arrow function inside the forEach loop. Arrow functions do not have their own this context; instead, they inherit the this value from the enclosing scope. In this case, the enclosing scope is the showHobbies method, which has its this context set to newUser. Therefore, when we call newUser.showHobbies(), it will correctly log "Baba likes coding", "Baba likes gaming", and "Baba likes traveling" to the console.

function process(callback) {
  const name = "Baba";
  return callback(name);
}

process(function (name) {
  console.log("Hello " + name);
});

function calculate(a, b, operation) {
  return operation(a, b);
}

const prac = calculate(2, 3, (x, y) => {
  return x + y;
});

function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "Baba" };
    callback(data);
  }, 1000);
}

fetchData((data) => console.log("Data received: ", data));

function customFilter(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

customFilter([1, 6, 2, 4, 8, 16], (num) => num > 5);

function createMultiplier(factor) {
  return function (num) {
    return num * factor;
  };
}

const double = createMultiplier(2);

function withLogging(fn) {
  return function (...args) {
    console.log("Arguments: ", args);
    const result = fn(...args);
    return result;
  };
}

const loggedAdd = withLogging((a, b) => a + b);

loggedAdd(5, 10);

function retry(fn, attempts) {
  let lastError;

  for (let i = 1; i <= attempts; i++) {
    try {
      return fn();
    } catch (error) {
      lastError = error;
      console.log(`Attempt ${i} failed: ${error.message}`);
    }
  }
  throw new Error(
    `All ${attempts} attempts failed. Last error: ${lastError.message}`,
  );
}

function once(fn) {}
