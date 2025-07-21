import { Router } from "express";

const router = Router();

// Users - temporary
const users = [
  {
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    password: "password123",
    role: "admin",
  },
  {
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    password: "securepass",
    role: "doctor",
  },
  {
    firstName: "Carol",
    lastName: "Williams",
    email: "carol@example.com",
    password: "mypassword",
    role: "patient",
  },
];

// Register endpoint
router.post("/register", (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: "Email already registered." });
  }
  users.push({ firstName, lastName, email, password, role });
  res.status(201).json({ message: "Registration successful." });
});

// Login endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  res.json({ message: "Login successful.", user: { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } });
});

export default router;
