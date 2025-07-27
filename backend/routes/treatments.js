import { Router } from "express";
import { treatments } from "../data/treatmentsData.js";
import TreatmentsService from "../service/treatments-service.js";

const router = Router();

// Get all treatments
router.get("/", async (req, res) => {
  try {
    const allTreatments = await TreatmentsService.getAllTreatments();
    res.json(allTreatments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve treatments" });
  }
});

// Get treatment by ID
router.get("/:treatmentId", async (req, res) => {
  const treatmentId = parseInt(req.params.treatmentId);
  try {
    const treatment = await TreatmentsService.getTreatmentById(treatmentId);
    if (!treatment) {
      return res.status(404).json({ error: "Treatment not found" });
    }
    res.json(treatment);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve treatment" });
  }
});

// Get all treatments by doctor ID
router.get("/doctor/:doctorId", async (req, res) => {
  const doctorId = parseInt(req.params.doctorId);
  try {
    const filtered = await TreatmentsService.getAllTreatmentsByDoctorId(doctorId);
    res.json(filtered);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve treatments" });
  }
});

// Create new treatment
router.post("/", async (req, res) => {
  const { name, description, cost, iconClassName, doctorId } = req.body;
  if (!name || !description || !cost || !iconClassName || !doctorId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newTreatment = await TreatmentsService.createTreatment({
      name,
      description,
      cost,
      iconClassName,
      doctorId,
    });
    res.status(201).json(newTreatment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create treatment" });
  }
});

// Edit treatment
router.put("/:treatmentId", async (req, res) => {
  const treatmentId = parseInt(req.params.treatmentId);
  const { name, description, cost, iconClassName, doctorId } = req.body;

  try {
    const updatedTreatment = await TreatmentsService.updateTreatment(treatmentId, {
      name,
      description,
      cost,
      iconClassName,
      doctorId,
    });
    if (!updatedTreatment) {
      return res.status(404).json({ error: "Treatment not found" });
    }
    res.json(updatedTreatment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update treatment" });
  }
});

// Delete treatment
router.delete("/:treatmentId", async (req, res) => {
  const treatmentId = parseInt(req.params.treatmentId);
  try {
    const deleted = await TreatmentsService.deleteTreatment(treatmentId);
    if (!deleted) {
      return res.status(404).json({ error: "Treatment not found" });
    }
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete treatment" });
  }
});

export default router;
