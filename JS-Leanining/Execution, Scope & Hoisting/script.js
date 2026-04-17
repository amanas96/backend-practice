function createHandler(action) {
  return function (event) {
    document.getElementById("output").textContent =
      "You clicked" + action + "button!";
    console.log("Event type: ", event);
  };
}

document
  .getElementById("saveBtn")
  .addEventListener("click", createHandler("Save"));
document
  .getElementById("deleteBtn")
  .addEventListener("click", createHandler("Delete"));
document
  .getElementById("editBtn")
  .addEventListener("click", createHandler("edit"));

function apiRequest(baseURL) {
  console.log("Making API request to: ", baseURL);
  return function (endpoint) {
    console.log("Full URL: ", baseURL + endpoint);
    return function (method) {
      console.log("HTTP Method: ", method);
      return function (body) {
        console.log("Request Body: ", body);
        const url = baseURL + endpoint;
        return fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      };
    };
  };
}

apiRequest("https://api.example.com/")("/users")("POST")({
  name: "John Doe",
  age: 30,
});

const curriedApiRequest = (baseURL) => (endpoint) => (method) => (body) => {
  console.log("Making API request to: ", endpoint);
  console.log("Full URL: ", baseURL + endpoint);
  console.log("HTTP Method: ", method);
  console.log("Request Body: ", body);
  const url = baseURL + endpoint;

  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
