import { Router } from "express";
import { users } from "../data/usersData.js";
import UsersService from "../service/users-service.js";

const router = Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await UsersService.getAllUsers();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// Get user by ID
router.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const user = await UsersService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

export default router;
