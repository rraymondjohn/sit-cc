import { Router } from "express";
import { appointments } from "../data/appointmentsData.js";

const router = Router();

// Get all appointments by patient ID
router.get("/patient/:patientId", (req, res) => {
  const patientId = parseInt(req.params.patientId);
  const filtered = appointments.filter((a) => a.patientId === patientId);
  res.json(filtered);
});

// Create new appointment
router.post("/", (req, res) => {
  const { patientId, treatmentId, date, time, reason } = req.body;
  if (!patientId || !treatmentId || !date || !time || !reason) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Temporary create logic
  const newId = appointments.length ? appointments[appointments.length - 1].id + 1 : 1;
  const newAppointment = { id: newId, patientId, treatmentId, date, time, reason };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

export default router;
