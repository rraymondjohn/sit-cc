import { Router } from "express";

const router = Router();

// Treatments - temporary
const treatments = [
  {
    id: 1,
    name: "Physical Therapy",
    description: "A treatment method that uses physical methods to promote healing.",
    cost: 150,
    iconClassName: "bi-clipboard2-pulse",
    doctorId: 2,
  },
  {
    id: 2,
    name: "Occupational Therapy",
    description: "Helps patients develop, recover, or maintain daily living and work skills.",
    cost: 120,
    iconClassName: "bi-person-workspace",
    doctorId: 2,
  },
  {
    id: 3,
    name: "Speech Therapy",
    description: "Treatment to improve communication skills and speech disorders.",
    cost: 100,
    iconClassName: "bi-chat-dots",
    doctorId: 4,
  },
  {
    id: 4,
    name: "Cardiac Rehabilitation",
    description: "A medically supervised program to improve cardiovascular health.",
    cost: 200,
    iconClassName: "bi-heart-pulse",
    doctorId: 4,
  },
  {
    id: 5,
    name: "Orthopedic Consultation",
    description: "Assessment and treatment of musculoskeletal issues.",
    cost: 180,
    iconClassName: "bi-bone",
    doctorId: 5,
  },
  {
    id: 6,
    name: "Dermatology Treatment",
    description: "Diagnosis and treatment of skin conditions.",
    cost: 130,
    iconClassName: "bi-droplet",
    doctorId: 5,
  },
];

// Get all treatments
router.get("/", (req, res) => {
  res.json(treatments);
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
