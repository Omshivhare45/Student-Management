import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./src/config/db.js";

// Routes
import studentRoutes from "./src/routes/studentRoutes.js";
import attendanceRoutes from "./src/routes/attendanceRoutes.js";
import marksRoutes from "./src/routes/marksRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";


dotenv.config();
connectDB();

const app = express();

import portalRoutes from "./src/routes/portalRoutes.js";

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/portal", portalRoutes);
// Root check
app.get("/", (req, res) => {
  res.json({ message: "Student Management API is running!" });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});