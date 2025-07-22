import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import treatmentRoutes from "./routes/treatments.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/treatments", treatmentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
