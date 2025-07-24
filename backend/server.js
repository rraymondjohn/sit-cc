import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import treatmentRoutes from "./routes/treatments.js";
import appointmentsRoutes from "./routes/appointments.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/appointments", appointmentsRoutes);

// S3 configuration
app.use(
  cors({
    origin: "http://vitals-cloud-platform-raymondrivera-2403781.s3-website-us-east-1.amazonaws.com",
    credentials: true,
  })
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
