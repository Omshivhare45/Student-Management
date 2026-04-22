import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
const router = express.Router();

router.get("/", getDashboardStats); // GET /api/dashboard

export default router;