import express from "express";
import {
  addMarks,
  getMarks,
  updateMarks,
  deleteMarks,
} from "../controllers/marksController.js";
const router = express.Router();

router.get("/", getMarks);           // GET    /api/marks  (+ ?studentId=)
router.post("/", addMarks);           // POST   /api/marks
router.put("/:id", updateMarks);      // PUT    /api/marks/:id
router.delete("/:id", deleteMarks);   // DELETE /api/marks/:id

export default router;