import mongoose from "mongoose";

const marksSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    marks: {
      type: Number,
      required: [true, "Marks are required"],
      min: 0,
      max: 100,
    },
    totalMarks: {
      type: Number,
      default: 100,
    },
    examType: {
      type: String,
      enum: ["Unit Test", "Mid Term", "Final"],
      default: "Unit Test",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Marks", marksSchema);