import { Router } from "express";
import { users } from "../data/usersData.js";
import UserService from "../service/users-service.js";

const router = Router();

// Register endpoint
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (await UserService.checkEmailExists(email)) {
    return res.status(409).json({ message: "Email already registered." });
  }
  const newUser = await UserService.registerUser({ firstName, lastName, email, password, role });
  res.status(201).json({ message: "Registration successful.", user: newUser });
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserService.validateUserCredentials(email, password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  res.json({ message: "Login successful.", user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } });
});

export default router;
