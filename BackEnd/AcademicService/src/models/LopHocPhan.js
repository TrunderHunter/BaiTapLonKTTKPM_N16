import mongoose from "mongoose";

const LopHocPhanSchema = new mongoose.Schema({
  maLopHocPhan: {
    type: String,
    unique: true,
  },
  ngayBatDau: {
    type: Date,
    required: true,
  },
  ngayKetThuc: {
    type: Date,
    required: true,
  },
  soTiet: {
    type: Number,
  },
  soLuongSVToiDa: {
    type: Number,
    required: true,
  },
  tingTrang: {
    type: String,
    enum: ["Mở", "Đóng", "Đã hủy"],
    default: "Mở",
  },
  dotDangKy: {
    type: String,
    enum: ["2021-2022", "2022-2023", "2023-2024"],
    required: true,
  },
  maMonHoc: {
    type: String,
    ref: "MonHoc",
    required: true,
  },
  maPhongHoc: {
    type: String,
    required: true,
  },
  dsDangKyHocPhan: [
    {
      type: String,
      ref: "DangKyHocPhan",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

LopHocPhanSchema.pre("save", function (next) {
  // LHP + chữ cái đầu của môn học + Năm hiện tại + số random
  !this.maLopHocPhan &&
    (this.maLopHocPhan = `LHP${this.maMonHoc.slice(
      0,
      1
    )}${new Date().getFullYear()}${Math.floor(Math.random() * 1000)}`);

  next();
});

export default mongoose.model("LopHocPhan", LopHocPhanSchema);
