import express from "express";
import { json } from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth";

const app = express();
app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
