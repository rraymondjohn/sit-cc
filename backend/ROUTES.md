# SIT CC Backend API Routes

This document lists the available authentication routes for use in the frontend.

## Base URL

```
http://localhost:3001/api/auth
```

## Endpoints

### 1. Register User

- **URL:** `/register`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "role": "string"
  }
  ```
- **Response:**
  - `201 Created` on success
  - `409 Conflict` if email already registered
  - `400 Bad Request` if fields are missing

### 2. Login User

- **URL:** `/login`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `200 OK` with user info on success
  - `401 Unauthorized` if credentials are invalid

## Example Usage (Frontend)

```js
// Register
fetch("http://localhost:3001/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ firstName, lastName, email, password, role }),
});

// Login
fetch("http://localhost:3001/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
```

---

For setup and installation, see `README.md`.
