import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT;
const DB = process.env.DB;

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("MongoDB connection successful!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

connectDB();
