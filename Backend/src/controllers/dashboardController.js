import Student from "../models/studentModel.js";
import Attendance from "../models/attendanceModel.js";
import Marks from "../models/marksModel.js";

// @desc  Get dashboard stats
// @route GET /api/dashboard
const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const todayPresent = await Attendance.countDocuments({ date: today, status: "Present" });
    const todayAbsent = await Attendance.countDocuments({ date: today, status: "Absent" });

    const totalMarksRecords = await Marks.countDocuments();

    // Class-wise student count
    const classWiseCount = await Student.aggregate([
      { $group: { _id: "$class", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        todayPresent,
        todayAbsent,
        totalMarksRecords,
        classWiseCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getDashboardStats };