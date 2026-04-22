//marksController.js

import Marks from "../models/marksModel.js";
import Student from "../models/studentModel.js";

// @desc  Add marks
// @route POST /api/marks
const addMarks = async (req, res) => {
  try {
    const { student } = req.body;

    const studentExists = await Student.findById(student);
    if (!studentExists) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const marks = await Marks.create(req.body);
    const populated = await marks.populate("student", "name rollNumber class");

    res.status(201).json({ success: true, message: "Marks added successfully", data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc  Get all marks (filter by student)
// @route GET /api/marks
const getMarks = async (req, res) => {
  try {
    const { studentId } = req.query;

    let query = {};
    if (studentId) query.student = studentId;

    const marks = await Marks.find(query)
      .populate("student", "name rollNumber class")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: marks.length, data: marks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Update marks
// @route PUT /api/marks/:id
const updateMarks = async (req, res) => {
  try {
    const marks = await Marks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("student", "name rollNumber class");

    if (!marks) {
      return res.status(404).json({ success: false, message: "Marks record not found" });
    }
    res.status(200).json({ success: true, message: "Marks updated", data: marks });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc  Delete marks
// @route DELETE /api/marks/:id
const deleteMarks = async (req, res) => {
  try {
    const marks = await Marks.findByIdAndDelete(req.params.id);
    if (!marks) {
      return res.status(404).json({ success: false, message: "Marks record not found" });
    }
    res.status(200).json({ success: true, message: "Marks deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addMarks, getMarks, updateMarks, deleteMarks };