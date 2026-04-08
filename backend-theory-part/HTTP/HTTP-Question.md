Here is a **30-question HTTP assessment (Junior → Mid-level)** mixing **conceptual understanding + practical coding scenarios**. This style is commonly used in **backend interviews, Node.js roles, and full-stack roles**.

---

# HTTP Assessment (30 Questions)

**Difficulty:** Junior → Mid Level
**Topics:** HTTP fundamentals, headers, status codes, REST APIs, caching, security, Node.js HTTP handling.

---

# Section A — Fundamentals (Conceptual)

1. What does **HTTP stand for**, and what is its primary purpose?

2. What is the difference between **HTTP and HTTPS**?

3. Explain the difference between **stateless and stateful protocols**.
   Why is HTTP considered stateless?

4. What are the **main parts of an HTTP request**?

5. What are the **main parts of an HTTP response**?

6. What is the difference between **GET and POST requests**?

7. Which HTTP method should be used for **updating an entire resource**?

8. What is the difference between **PUT and PATCH**?

9. Explain the meaning of these HTTP status codes:

- 200
- 201
- 400
- 401
- 403
- 404
- 500

10. What is the purpose of **HTTP headers**?

## Give **three examples**

## Section B — Headers, Cookies & Caching

11. What does the **Content-Type** header specify?

12. What is the difference between:

```
Content-Type
Accept
```

13. What is a **cookie** in HTTP?

14. Explain the difference between:

```
Session cookies
Persistent cookies
```

---

15. What is the purpose of the **Authorization header**?

16. What does this header do?

```
Cache-Control: no-cache
```

17. What is the difference between:

```
ETag
Last-Modified
```

18. Explain what happens during an **HTTP redirect (301 vs 302)**.

### Section C — Practical Backend Scenarios

19. In Express.js, which middleware is used to **parse JSON request bodies**?

20. What will this route return?

```javascript
app.get("/users", (req, res) => {
  res.status(201).json({ message: "Users fetched" });
});
```

Is the status code correct? Why or why not?

21. Write an Express route that returns:

```
404 Not Found
```

with a JSON response:

```
{ error: "User not found" }
```

22. What will `req.query` contain for this request?

```
GET /products?category=books&limit=10
```

23. What will `req.params` contain for this route?

```
GET /users/:id
```

Request:

```
GET /users/45
```

24. Explain the difference between:

```
req.body
req.params
req.query
```

### Section D — HTTP Internals

25. What is **TCP**, and how does it relate to HTTP?

26. Explain the purpose of the **HTTP handshake** (connection establishment).

27. What is **CORS** and why is it needed?

28. What happens when a browser sends a **preflight request**?

29. Explain what happens when you enter a URL in the browser:

```
https://example.com
List the major steps.
```

30. What does this HTTP header do?

```
Connection: keep-alive
```

# Bonus Coding Challenge (Interview Style)

Implement a **Node.js HTTP server without Express** that:

- Handles `GET /hello`
- Returns`200 OK`

- Returns the text: `
Hello World`
