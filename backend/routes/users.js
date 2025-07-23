import { Router } from "express";
import { users } from "../data/usersData.js";

const router = Router();

// Get all users
router.get("/", (req, res) => {
  res.json(users);
});

// Get user by ID
router.get("/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  res.json(user);
});

export default router;
