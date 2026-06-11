import Student from "../models/studentModel.js";
import Attendance from "../models/attendanceModel.js";
import Marks from "../models/marksModel.js";

export const StudentPortal = async (req, res) => {
    const { rollNumber } = req.params;

    const student = await Student.findOne({ rollNumber });
    if( !student )return res.status(404).json({ success: false, message: "Student not found" });

    const [attendance, marks] = await Promise.all([
        Attendance.find({ student: student._id}).sort({ date: -1}),
        Marks.find({ student: student._id }).sort({ date: -1}),
    ]);

    const total = attendance.length;
    const present = attendance.filter(a => a.status === "Present").length;
    const Percentage = total > 0 ? (present / total) * 100 : 0;

    res.json({ success: true,
        data: {
            student,
            attendance,
            marks,
            Percentage,
        }
    })
}