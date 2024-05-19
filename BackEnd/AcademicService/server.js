import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import {
  authRouter,
  sampleDataRouter,
  dangKyHocPhanRouter,
} from "./src/routers/index.js";
import connectDB from "./src/configs/database.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 4040;

app.use("/auth", authRouter);
app.use("/sampleData", sampleDataRouter);
app.use("/api/dangKyHocPhan", dangKyHocPhanRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
