import { APPOINTMENTS_ENDPOINT } from "../config.js";
const APPT_API_BASE_URL = APPOINTMENTS_ENDPOINT;

export default {
  // Get all appointments by patient ID
  async getAllAppointmentsByPatientId(patientId) {
    try {
      const response = await fetch(`${APPT_API_BASE_URL}?patientId=${patientId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      return await response.json();
    } catch (error) {
      console.error("Error getting appointments:", error);
      throw error;
    }
  },

  // Create new appointment
  async createAppointment(appointmentData) {
    try {
      const response = await fetch(APPT_API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });
      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw error;
    }
  },
};
