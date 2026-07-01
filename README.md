# ⚙️ Student & Admin Portal — Backend (API)

This is the production-ready RESTful API serving as the administrative engine for the Student Portal application. Architected using the Model-View-Controller (MVC) software pattern, the server strictly handles user identity lifecycles, role-based access control (RBAC), secure token generation, and deep cross-schema validation patterns.

### ⚡ Key Features
* **Stateless JWT via HTTP-Only Cookies:** Implements cross-site scripting (XSS) mitigated authentication by serving JSON Web Tokens encapsulated securely inside server-side cookies.
* **Role-Based Authorization Middleware:** Intercepts endpoints with layered authorization guards (`protect`, `authorize("admin", "teacher")`) to prevent unauthorized cross-tenant data requests.
* **Encrypted Schema Architecture:** Utilizes Mongoose models integrated with pre-save hashing hooks via `bcryptjs` for secure password storage.
* **Clean Error Handling Pipeline:** Employs centralized express error management middleware ensuring database errors do not leak stack details to the client interface.

### 🛠️ Tech Stack
* **Runtime & Framework:** Node.js, Express.js
* **Database Engine:** MongoDB & Mongoose ORM
* **Security & Tokens:** JSON Web Tokens (JWT), BcryptJS, Cookie-Parser, CORS
