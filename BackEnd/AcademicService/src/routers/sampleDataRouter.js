import express from "express";
import {
  khoaController,
  chuyenNganhController,
  lopHocController,
  sinhVienController,
  monHocController,
  lopHocPhanController,
} from "../controllers/index.js";
const sampleDataRouter = express.Router();

sampleDataRouter.post("/createKhoa", khoaController.createNewKhoa);

sampleDataRouter.post("/createLopHoc", lopHocController.createNewLopHoc);

sampleDataRouter.post("/createSinhVien", sinhVienController.createNewSinhVien);

sampleDataRouter.post("/createMonHoc", monHocController.createMonHoc);

sampleDataRouter.post(
  "/createLopHocPhan",
  lopHocPhanController.createLopHocPhan
);

sampleDataRouter.post(
  "/createChuyenNganh",
  chuyenNganhController.createChuyenNganh
);

export default sampleDataRouter;
