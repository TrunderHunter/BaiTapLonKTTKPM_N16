import express from "express";
const authRouter = express.Router();
import { authController } from "../controllers/index.js";

authRouter.get("/loginStudent", authController.loginStudent);
authRouter.post("/registerStudent", authController.registerStudent);

export default authRouter;
