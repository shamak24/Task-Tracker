import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected`);
    return true;
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);
    return false;
  }
};

export default connectDB;