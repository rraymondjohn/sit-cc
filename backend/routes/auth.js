import { Router } from "express";
import { users } from "../data/usersData.js";

const router = Router();

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
  res.json({ message: "Login successful.", user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } });
});

export default router;
