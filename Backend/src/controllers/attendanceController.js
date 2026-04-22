import Attendance from "../models/attendanceModel.js";
import Student from "../models/studentModel.js";

// @desc  Mark attendance
// @route POST /api/attendance
const markAttendance = async (req, res) => {
  try {
    const { student, date, status } = req.body;

    // Check if student exists
    const studentExists = await Student.findById(student);
    if (!studentExists) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Check if attendance already marked for this date
    const existing = await Attendance.findOne({ student, date });
    if (existing) {
      // Update existing record
      existing.status = status;
      await existing.save();
      return res.status(200).json({
        success: true,
        message: "Attendance updated",
        data: existing,
      });
    }

    const attendance = await Attendance.create({ student, date, status });
    const populated = await attendance.populate(
      "student",
      "name rollNumber class",
    );

    res
      .status(201)
      .json({ success: true, message: "Attendance marked", data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc  Get all attendance (filter by date or student)
// @route GET /api/attendance
const getAttendance = async (req, res) => {
  try {
    const { date, studentId } = req.query;

    let query = {};
    if (date) query.date = date;
    if (studentId) query.student = studentId;

    const attendance = await Attendance.find(query)
      .populate("student", "name rollNumber class")
      .sort({ date: -1 });

    res
      .status(200)
      .json({ success: true, count: attendance.length, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Delete attendance record
// @route DELETE /api/attendance/:id
const deleteAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);
    if (!record) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Attendance record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { markAttendance, getAttendance, deleteAttendance };
