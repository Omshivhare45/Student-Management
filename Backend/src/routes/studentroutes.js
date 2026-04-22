import express from "express";
import {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
const router = express.Router();

router.get("/", getAllStudents);       // GET  /api/students         (+ ?search=query)
router.get("/:id", getStudentById);   // GET  /api/students/:id
router.post("/", addStudent);          // POST /api/students
router.put("/:id", updateStudent);     // PUT  /api/students/:id
router.delete("/:id", deleteStudent);  // DELETE /api/students/:id

export default router;