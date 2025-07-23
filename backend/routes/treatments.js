import { Router } from "express";
import { treatments } from "../data/treatmentsData.js";

const router = Router();

// Get all treatments
router.get("/", (req, res) => {
  res.json(treatments);
});

// Get treatment by ID
router.get("/:treatmentId", (req, res) => {
  const treatmentId = parseInt(req.params.treatmentId);
  const treatment = treatments.find((t) => t.id === treatmentId);
  if (!treatment) {
    return res.status(404).json({ error: "Treatment not found" });
  }
  res.json(treatment);
});

// Get all treatments by doctor ID
router.get("/doctor/:doctorId", (req, res) => {
  const doctorId = parseInt(req.params.doctorId);
  const filtered = treatments.filter((t) => t.doctorId === doctorId);
  res.json(filtered);
});

// Create new treatment
router.post("/", (req, res) => {
  const { name, description, cost, iconClassName, doctorId } = req.body;
  if (!name || !description || !cost || !iconClassName || !doctorId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // TEmporary create logic
  const newId = treatments.length ? treatments[treatments.length - 1].id + 1 : 1;
  const newTreatment = { id: newId, name, description, cost, iconClassName, doctorId };
  treatments.push(newTreatment);
  res.status(201).json(newTreatment);
});

// Edit treatment
router.put("/:treatmentId", (req, res) => {
  const index = treatments.findIndex((t) => t.id === parseInt(req.params.treatmentId));
  if (index === -1) {
    return res.status(404).json({ error: "Treatment not found" });
  }

  // Temporary edit logic
  const { name, description, cost, iconClassName, doctorId } = req.body;
  treatments[index] = {
    name: name ?? treatments[index].name,
    description: description ?? treatments[index].description,
    cost: cost ?? treatments[index].cost,
    iconClassName: iconClassName ?? treatments[index].iconClassName,
    doctorId: doctorId ?? treatments[index].doctorId,
  };
  res.json(treatments[index]);
});

// Delete treatment
router.delete("/:treatmentId", (req, res) => {
  //Temporary delete logic
  const index = treatments.findIndex((t) => t.id === parseInt(req.params.treatmentId));
  if (index === -1) {
    return res.status(404).json({ error: "Treatment not found" });
  }
  const deleted = treatments.splice(index, 1);
  res.json(deleted[0]);
});

export default router;
