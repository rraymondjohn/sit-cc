require("dotenv").config();
const API_BASE_URL = process.env.API_BASE_URL + "/users";

export default {
  // Get all users
  async getAllUsers() {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return await response.json();
    } catch (error) {
      console.error("Error getting users:", error);
      throw error;
    }
  },

  // Get user by ID
  async getUserById(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      return await response.json();
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  },
};
