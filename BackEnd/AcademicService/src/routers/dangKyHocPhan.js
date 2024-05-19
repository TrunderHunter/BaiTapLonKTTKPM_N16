import express from "express";
import {
  khoaController,
  chuyenNganhController,
  lopHocController,
  sinhVienController,
  monHocController,
  lopHocPhanController,
  dangKyLopHocPhanController,
} from "../controllers/index.js";
const dangKyHocPhanRouter = express.Router();

// Lay danh sach mon hoc chua hoc cua sinh vien
dangKyHocPhanRouter.get(
  "/getMonHocChuaHoc",
  sinhVienController.getMonHocChuaHoc
);

// Lay danh sach mon hoc dang hoc cua sinh vien
dangKyHocPhanRouter.get(
  "/getMonHocDangHoc",
  sinhVienController.getMonHocDangHoc
);

// Lay danh sach mon hoc da hoc cua sinh vien
dangKyHocPhanRouter.get("/getMonHocDaHoc", sinhVienController.getMonHocDaHoc);

// Lay danh sach lop hoc theo mon hoc
dangKyHocPhanRouter.get(
  "/getLopHocPhanByMonHoc/:maMonHoc",
  lopHocPhanController.getLopHocPhanByMonHoc
);

// dangKyLopHocPhan
dangKyHocPhanRouter.post(
  "/dangKyLopHocPhan",
  dangKyLopHocPhanController.dangKyLopHocPhan
);

export default dangKyHocPhanRouter;
