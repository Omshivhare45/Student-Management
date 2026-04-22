import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/studentManagement")
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => {
      console.log("errorin connect database", err);
    });
};

export { connectDB };


