import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    let DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

    let urlDb = `mongodb+srv://sa:${DATABASE_PASSWORD}@cluster0.sww8amn.mongodb.net/QuanLyLopHocPhan?retryWrites=true&w=majority&appName=Cluster0`;

    const conn = await mongoose.connect(urlDb);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
