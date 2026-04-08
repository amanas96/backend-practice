const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { request } = require("http");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);
//app.use(express.json());

// app.get("/api/data", (req, res) => {
//   const data = {
//     message: "Hello from the backend!",
//   };
//   res.json(data);
// });

// app.post("/api/preflight-data", (req, res) => {
//   const receivedData = req.body;
//   console.log("Received data:", receivedData);
//   res.json({
//     message: "Data received successfully",
//     receivedData,
//   });
// });

let user = {
  id: 1,
  name: "Baba",
  age: 30,
};

const users = [
  { token: "abc123", name: "Aman", role: "admin" },
  { token: "def456", name: "Ravi", role: "user" },
];

const data = {
  id: 1,
  name: "Aman",
  age: 35,
  role: "Developer",
  city: "New Delhi",
};

let requestCounter = 0;

const ErrorScenarios = {
  NO_AUTH: "No authentication token provided",
  FORBIDDEN: "You do not have permission to access this resource",
  NOT_FOUND: "The requested resource was not found",
  RATE_LIMIT: "Too many requests, please try again later",
  INVALID_DATA: "Invalid data provided",
  SUCCESS: "Request successful",
};

app.get("/api/user", (req, res) => {
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

app.post("/api/user", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.age) {
    return res.status(400).json({ message: "Name and age are required" });
  }
  user = { id: 2, ...newUser };
  res.status(201).json(user);
});

app.put("/api/user", (req, res) => {
  const updatedUser = req.body;
  if (!updatedUser.name || !updatedUser.age) {
    return res.status(400).json({ message: "Name and age are required" });
  }
  user = updatedUser;
  res.status(200).json(user);
});

app.patch("/api/user", (req, res) => {
  const updates = req.body;
  user = { ...user, ...updates };
  res.status(200).json(user);
});

app.delete("/api/user", (req, res) => {
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user = null;
  res.status(204).send();
});

app.get("/api/data", (req, res) => {
  const acceptHeader = req.get("Accept");
  console.log("Client wants:", acceptHeader);

  const lastModified = new Date("2026-04-08T10:00:00Z");
  const clientLastModified = req.get("If-Modified-Since");
  new Date(clientLastModified);
  if (clientLastModified >= lastModified) {
    return res.status(304).end();
  }
  res.set("Last-Modified", lastModified.toUTCString());

  const etag = crypto
    .createHash("sha1")
    .update(JSON.stringify(data))
    .digest("hex");

  const clientETag = req.get("If-None-Match");
  if (clientETag === etag) {
    return res.status(304).end();
  }
  res.set("Etag", etag);

  if (acceptHeader && acceptHeader.includes("application/json")) {
    return res.status(200).json(data);
  }

  if (acceptHeader && acceptHeader.includes("text/html")) {
    const htmlData = `
      <html>
        <body>
         <h2>User Data</h2>
          <p><strong>ID:</strong> ${data.id}</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Age:</strong> ${data.age}</p>
          <p><strong>Email:</strong> ${data.city}</p>
        </body>
      </html> `;

    return res.status(200).send(htmlData);
  }

  return res.status(406).json({
    error: "Not Acceptable",
    message: "Supported formats are application/json and text/html",
    yourRequested: acceptHeader,
  });
});

app.post("/api/chaos", (req, res) => {
  requestCounter++;
  const authHeader = req.headers.authorization;

  let scenario;
  if (!authHeader) {
    scenario = ErrorScenarios.NO_AUTH;
  } else {
    const user = users.find((u) => u.token === authHeader);
    if (!user) {
      scenario = ErrorScenarios.FORBIDDEN;
    } else if (requestCounter > 30) {
      scenario = ErrorScenarios.RATE_LIMIT;
    } else if (user.role !== "admin") {
      scenario = ErrorScenarios.FORBIDDEN;
    } else if (!req.body.data) {
      scenario = ErrorScenarios.INVALID_DATA;
    } else if (req.url !== "/api/chaos") {
      scenario = ErrorScenarios.NOT_FOUND;
    } else {
      scenario = ErrorScenarios.SUCCESS;
    }
  }
  switch (scenario) {
    case ErrorScenarios.NO_AUTH:
      res.status(401).json({ error: "Unauthorized", message: scenario });
      break;

    case ErrorScenarios.FORBIDDEN:
      res.status(403).json({ error: "Forbidden", message: scenario });
      break;

    case ErrorScenarios.NOT_FOUND:
      res.status(404).json({ error: "Not Found", message: scenario });
      break;

    case ErrorScenarios.RATE_LIMIT:
      res.status(429).json({ error: "Too Many Requests", message: scenario });
      break;
    case ErrorScenarios.INVALID_DATA:
      res.status(400).json({ error: "Bad Request", message: scenario });
      break;
    case ErrorScenarios.SUCCESS:
      res.status(200).json({ message: scenario, data: req.body.data });
      break;
    default:
      res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred",
      });
  }
});

app.post("/api/manual-body", (req, res) => {
  let rawData = "";
  req.setEncoding("utf-8");

  req.on("data", (chunk) => {
    rawData += chunk;

    if (rawData.length > 1e6) {
      res.status(413).json({
        error: "Payload Too Large",
        message: "Request body exceeds 1MB limit",
      });
      req.destroy();
    }
  });

  req.on("end", () => {
    try {
      if (rawData) {
        const parsedData = JSON.parse(rawData);
        console.log("Parsed data:", parsedData);
        res
          .status(200)
          .json({ message: "Data received successfully", data: parsedData });
      } else {
        res.status(400).json({
          error: "Bad Request",
          message: "No data provided in request body",
        });
      }
    } catch (err) {
      res
        .status(400)
        .json({ error: "Bad Request", message: "Invalid JSON format" });
    }
  });
  req.on("error", (err) => {
    console.error("Error receiving data:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while receiving data",
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
