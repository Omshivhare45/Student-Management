import express from "express";
import {
  markAttendance,
  getAttendance,
  deleteAttendance,
}from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/", getAttendance);          // GET    /api/attendance  (+ ?date=&studentId=)
router.post("/", markAttendance);         // POST   /api/attendance
router.delete("/:id", deleteAttendance); // DELETE /api/attendance/:id

export default router;