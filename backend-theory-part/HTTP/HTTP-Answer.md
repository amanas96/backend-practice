### 1. What does HTTP stand for, and what is its primary purpose?

**HTTP** stands for **HyperText Transfer Protocol**. Its primary purpose is to facilitate communication between a client (typically a browser or mobile app) and a web server.

it as the **Application Layer** protocol of the TCP/IP suite that defines how messages are formatted and transmitted. It provides a standardized way for systems to exchange "resources" (HTML, JSON, Images) over the internet, acting as the foundation for data exchange on the World Wide Web.

### 2. What is the difference between HTTP and HTTPS?

The "S" stands for **Secure**.

- **Encryption:** HTTP transmits data in **plain text**, making it vulnerable to man-in-the-middle (MITM) attacks. HTTPS uses **TLS (Transport Layer Security)** to encrypt the session.
- **Trust:** HTTPS requires an **SSL/TLS Certificate** issued by a Certificate Authority (CA) to verify the server's identity.
- **Port:** HTTP traditionally uses **Port 80**, while HTTPS uses **Port 443**.
- **Integrity:** HTTPS ensures that data hasn't been tampered with during transit.

### 3. Explain the difference between stateless and stateful protocols. Why is HTTP considered stateless?

- **Stateful:** The server remembers previous interactions. Example: **FTP** or a **TCP connection**, where the connection remains open and context is preserved.
- **Stateless:** Each request is treated as a "new" transaction, independent of any previous request. The server does not store any context about the client's session between requests.

**Why HTTP is stateless:** It was designed to be simple and scalable. By not forcing the server to keep track of millions of active user states in memory, servers can handle significantly more traffic. We "mimic" state today using **Cookies, Sessions, or JWTs (JSON Web Tokens)**, but the protocol itself remains agnostic of the user's history.

### 4. What are the main parts of an HTTP request?

A standard HTTP request consists of four main components:

1.  **Request Line:** Includes the **Method** (GET, POST, etc.), the **URL/Path**, and the **HTTP Version** (e.g., `HTTP/1.1`).
2.  **Headers:** Key-value pairs providing metadata (e.g., `Host`, `User-Agent`, `Content-Type`).
3.  **Empty Line:** A mandatory blank line separating headers from the body.
4.  **Body (Optional):** The actual data being sent (JSON, XML, or Form data). _Note: GET requests typically do not have a body._

### 5. What are the main parts of an HTTP response?

An HTTP response mirrors the request structure but with different data:

1.  **Status Line:** Includes the **HTTP Version**, the **Status Code** (e.g., `200`), and the **Reason Phrase** (e.g., `OK`).
2.  **Headers:** Metadata about the response (e.g., `Content-Type`, `Set-Cookie`, `Server`).
3.  **Empty Line:** Separates headers from the payload.
4.  **Body:** The resource requested (the HTML file, a JSON object, etc.).

### 6. What is the difference between GET and POST requests?

From a Mid-level perspective, the difference isn't just "sending vs. getting data," but rather **Idempotency** and **Security**:

| Feature              | GET                                                                               | POST                                                                       |
| :------------------- | :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| **Primary Goal**     | Retrieve data from the server.                                                    | Submit data to be processed.                                               |
| **Payload Location** | Data is in the **URL** (Query Strings).                                           | Data is in the **Request Body**.                                           |
| **Idempotency**      | **Idempotent.** Making the same request 10 times doesn't change the server state. | **Non-idempotent.** Sending 10 POST requests usually creates 10 resources. |
| **Caching**          | Can be cached by browsers/CDNs.                                                   | Generally not cached.                                                      |
| **Security**         | Sensitive data is visible in URL logs/history.                                    | More secure for sensitive data (still needs HTTPS).                        |
| **Limit**            | Restricted by URL length limits (approx. 2k chars).                               | Virtually no limit on body size.                                           |

---

### 7. Which HTTP method should be used for updating an entire resource?

**Answer: B. PUT**

**Mid-level Context:** While `POST` is often used for updates in non-RESTful APIs, the REST standard dictates `PUT` for "replacing" a resource. If you send a `PUT` request to `/users/1`, the server expects the full representation of that user. If you omit a field (like "email"), a strict `PUT` implementation might set that field to null or delete it.

### 8. What is the difference between PUT and PATCH?

- **PUT (Replacement):** It is **idempotent**. It replaces the entire resource. If the resource doesn't exist, `PUT` can sometimes be used to create it.
- **PATCH (Modification):** It is generally **non-idempotent**. It applies partial updates. You only send the specific fields you want to change (e.g., just the "password").

**Analogy:** If you want to change your profile picture, a `PATCH` just swaps the image. A `PUT` would require you to re-submit your name, birthday, and bio along with the new photo to ensure the whole "resource" remains intact.

### 9. Explain the meaning of these HTTP status codes:

As a developer, you should categorize these by their first digit:

- **200 (OK):** The request was successful (Standard for GET/PUT/PATCH).
- **201 (Created):** The request was successful and a new resource was created (Standard for POST).
- **400 (Bad Request):** The server cannot process the request due to client-side errors (e.g., malformed JSON syntax).
- **401 (Unauthorized):** The user lacks valid authentication credentials (they aren't logged in).
- **403 (Forbidden):** The user is authenticated but does not have permission for this specific resource (e.g., a regular user trying to access `/admin`).
- **404 (Not Found):** The requested resource does not exist on the server.
- **500 (Internal Server Error):** A generic error message when the server encounters an unexpected condition (usually a code crash).

### 10. What is the purpose of HTTP headers? Give three examples.

**Purpose:** Headers provide **metadata** about the request or response. They allow the client and server to pass additional information that isn't part of the main data payload but is necessary for handling it.

**Three Examples:**

1.  **Authorization:** Used to pass credentials (like a Bearer Token) to prove the user has access.
2.  **User-Agent:** Tells the server about the client’s browser and operating system (useful for analytics or serving different CSS).
3.  **Content-Length:** Specifies the size of the request/response body in bytes.

### 11. What does the Content-Type header specify?

The `Content-Type` header tells the recipient (server or client) the **media type** of the data being sent.

**Mid-level Context:** Without this, the receiver doesn't know how to parse the body. If you send JSON but don't set `Content-Type: application/json`, the server might treat it as a raw string and fail to populate `req.body`.

- Common types: `application/json`, `text/html`, `multipart/form-data` (for file uploads).

### 12. What is the difference between Content-Type and Accept?

This is the core of **Content Negotiation**:

- **Content-Type:** "This is what I am **sending** you." (Request: I'm sending JSON; Response: I'm sending HTML).
- **Accept:** "This is what I am **willing to receive**." (Request: "Hey server, please send me the data in `application/json` format if you can").

Moving into **Section B**, we look at how HTTP handles persistence (Cookies), performance (Caching), and navigation (Redirects). This is where a backend engineer ensures the application feels fast and secure.

### 13. What is a cookie in HTTP?

A **cookie** is a small piece of data that a server sends to the user's web browser via the `Set-Cookie` header. The browser stores it and automatically sends it back with every subsequent request to that same server using the `Cookie` header.

**Mid-level Context:** Cookies are the primary way we overcome HTTP’s statelessness. They are most commonly used for session management (keeping you logged in), personalization, and tracking.

### 14. Explain the difference between Session cookies and Persistent cookies.

- **Session Cookies:** These are temporary. They do not have an `Expires` or `Max-Age` attribute. They are stored in memory and are deleted when the browser instance is closed ("session" ends).
- **Persistent Cookies:** These have a specific expiration date or duration. They are stored on the user's disk and will survive a browser restart until they reach their expiration date or are manually deleted.

### 15. What is the purpose of the Authorization header?

The `Authorization` header is used to provide credentials so the server can verify the identity of the requester.

**Common Patterns:**

- **Basic:** `Authorization: Basic <base64-encoded-string>` (username/password).
- **Bearer:** `Authorization: Bearer <JWT-token>` (The modern standard for APIs and SPAs).

### 16. What does this header do? `Cache-Control: no-cache`

Contrary to what the name suggests, `no-cache` does **not** mean "don't store the response." It tells the browser (and intermediate caches like CDNs) that they must **re-validate** with the server before using the cached version.

The server will check if the content has changed (often via an ETag). If it hasn't, the server sends a `304 Not Modified`, saving bandwidth. If you want to strictly forbid any caching at all, you would use `Cache-Control: no-store`.

### 17. What is the difference between ETag and Last-Modified?

Both are used for **Conditional Requests**, but they work differently:

- **Last-Modified:** A validator based on time. The server sends a timestamp. In the next request, the client sends `If-Modified-Since`. If the file hasn't changed since that time, the server saves resources by not re-sending the file.
- **ETag (Entity Tag):** A validator based on a unique identifier (usually a hash of the file's contents). The client sends `If-None-Match`. This is more accurate than timestamps because it detects changes even if they happen within the same second or if a file was "touched" but its content didn't actually change.

### 18. Explain what happens during an HTTP redirect (301 vs 302).

A redirect occurs when the server sends a `3xx` status code and a `Location` header, telling the browser to look elsewhere.

- **301 (Moved Permanently):** This tells the browser and search engines that the resource has a new "forever" home. Browsers will cache this redirect, and SEO "link juice" is transferred to the new URL.
- **302 (Found / Temporary Redirect):** This tells the browser that the resource is _currently_ at a different location, but it might come back to the original URL later. Browsers should not cache this permanently.

Here are the answers for the remaining conceptual sections (**Section C** and **Section D**), written with the technical depth expected of a mid-level engineer.

## Section C — Practical Backend Scenarios

### 19. In Express.js, which middleware is used to parse JSON request bodies?

The built-in middleware is `express.json()`. In older versions of Express, the external library `body-parser` was required, but it is now bundled within the Express framework.

### 20. What will this route return? Is the status code correct?

**Return:** It returns a `201` status and the JSON object `{ "message": "Users fetched" }`.

- **Correctness:** No, the status code is **incorrect**. `201 Created` should be used after a successful `POST` request that creates a resource. Since this is a `GET` request simply fetching data, it should use `200 OK`.

### 21. Write an Express route that returns 404 Not Found with a JSON response.

```
app.get('/users/:id', (req, res) => {  res.status(404).json({ error: "User not found" });
});
```

### 22. What will `req.query` contain for: `GET /products?category=books&limit=10`?

It will contain a JavaScript object: `{ category: 'books', limit: '10' }`. Note that values in `req.query` are strings by default.

### 23. What will `req.params` contain for: `GET /users/:id` (Request: `GET /users/45`)?

It will contain: `{ id: '45' }`. `req.params` captures the dynamic segments defined in the route path.

**24. Explain the difference between `req.body`, `req.params`, and `req.query`.** \* **`req.params`:** Used for **identifying** a specific resource (e.g., `/users/:id`). It is part of the URL path.

- **`req.query`:** Used for **filtering, sorting, or pagination** (e.g., `?sort=desc`). It is optional and appended to the end of the URL.
- **`req.body`:** Used for **submitting data** (e.g., a JSON object in a POST request). It is sent in the HTTP request body and is not visible in the URL.

## Section D — HTTP Internals

**25. What is TCP, and how does it relate to HTTP?** **TCP (Transmission Control Protocol)** is the Transport Layer protocol that HTTP sits on top of. TCP ensures that data packets are delivered in the correct order and without errors. Think of TCP as the "delivery truck" and HTTP as the "package" inside the truck. HTTP relies on TCP to handle the connection and data reliability.

**26. Explain the purpose of the HTTP handshake (connection establishment).** Before an HTTP request can be sent, a **TCP Three-Way Handshake** must occur:

1. **SYN:** Client asks to connect.
2. **SYN-ACK:** Server acknowledges and agrees.
3. **ACK:** Client confirms.
   If using HTTPS, a **TLS Handshake** follows to exchange encryption keys and verify certificates.

**27. What is CORS and why is it needed?** **CORS (Cross-Origin Resource Sharing)** is a security feature (enforced by browsers) that prevents a website on one domain from making requests to a different domain unless the server explicitly allows it. It is needed to prevent **CSRF (Cross-Site Request Forgery)** and unauthorized data access between different origins.

**28. What happens when a browser sends a preflight request?** For "non-simple" requests (like those with custom headers or `PUT/DELETE` methods), the browser sends an **OPTIONS** request first. This "preflight" asks the server: "Am I allowed to send this actual request?" The server responds with allowed methods and origins; if successful, the browser then sends the actual request.

**29. Explain what happens when you enter a URL in the browser.** 1. **DNS Lookup:** Browser converts the domain (`example.com`) into an IP address. 2. **TCP Handshake:** Browser establishes a connection with the server IP. 3. **TLS Handshake:** (For HTTPS) Secure encryption is established. 4. **HTTP Request:** Browser sends the GET request. 5. **Server Processing:** Server logic handles the request and prepares a response. 6. **HTTP Response:** Server sends back the HTML/Data. 7. **Rendering:** Browser parses the HTML, fetches CSS/JS, and renders the page.

**30. What does this HTTP header do? `Connection: keep-alive`** It instructs the server to keep the underlying TCP connection open after the request/response cycle is finished. This allows multiple HTTP requests to be sent over the same connection, significantly reducing latency by avoiding repeated TCP handshakes for every image, script, or style sheet.
