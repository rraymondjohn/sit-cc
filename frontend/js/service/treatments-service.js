const API_BASE_URL = "http://localhost:3001/api";

export default {
  // Get all treatments
  async getAllTreatments() {
    try {
      const response = await fetch(`${API_BASE_URL}/treatments`);
      if (!response.ok) {
        throw new Error("Failed to fetch treatments");
      }
      return await response.json();
    } catch (error) {
      console.error("Error getting treatments:", error);
      throw error;
    }
  },

  // Get treatments by doctor ID
  async getTreatmentsByDoctor(doctorId) {
    try {
      const response = await fetch(`${API_BASE_URL}/treatments/doctor/${doctorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch treatments");
      }
      return await response.json();
    } catch (error) {
      console.error("Error getting treatments:", error);
      throw error;
    }
  },

  // Create new treatment
  async createTreatment(treatmentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/treatments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(treatmentData),
      });
      if (!response.ok) {
        throw new Error("Failed to create treatment");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating treatment:", error);
      throw error;
    }
  },

  // Update treatment by treatment ID
  async updateTreatment(treatmentId, treatmentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/treatments/${treatmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(treatmentData),
      });
      if (!response.ok) {
        throw new Error("Failed to update treatment");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating treatment:", error);
      throw error;
    }
  },

  // Delete treatment by treatment ID
  async deleteTreatment(treatmentId) {
    try {
      const response = await fetch(`${API_BASE_URL}/treatments/${treatmentId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete treatment");
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting treatment:", error);
      throw error;
    }
  },
};
