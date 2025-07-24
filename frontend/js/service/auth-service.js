import { API_BASE_URL } from "../config.js";
const AUTH_API_BASE_URL = API_BASE_URL + "/auth";

export default {
  // User login
  async login(credentials) {
    try {
      const response = await fetch(`${AUTH_API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return await response.json();
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },

  // Resgister new user
  async register(userData) {
    try {
      const response = await fetch(`${AUTH_API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      return await response.json();
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
  // Logout user
  async logout() {
    try {
      sessionStorage.removeItem("vitals_cloud_token");
      sessionStorage.removeItem("vitals_user");
      window.location.href = "auth.html";
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  },
};
