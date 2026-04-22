import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: {
      type: String, // Format: YYYY-MM-DD
      required: [true, "Date is required"],
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: [true, "Status is required"],
    },
  },
  { timestamps: true }
);

// Ek student ek din mein ek hi record ho
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);