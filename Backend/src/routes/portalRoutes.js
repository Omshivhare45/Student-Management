import express from "express";
import { StudentPortal } from "../controllers/portalController.js";

const router = express.Router();

router.get("/:rollNumber", StudentPortal);

export default router;