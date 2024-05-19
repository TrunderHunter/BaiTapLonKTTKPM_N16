import mongoose from "mongoose";

const SinhVienSchema = new mongoose.Schema({
  maSV: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tenSinhVien: {
    type: String,
    required: true,
  },
  gioiTinh: {
    type: String,
    enum: ["Nam", "Nữ"],
  },
  ngaySinh: {
    type: Date,
  },
  diaChi: {
    type: String,
  },
  soDienThoai: {
    type: String,
  },
  email: {
    type: String,
  },
  bacDaoTao: {
    type: String,
    enum: ["Đại học", "Cao đẳng", "Trung cấp"],
  },
  loaiHinhDaoTao: {
    type: String,
    enum: ["Chính quy", "Tại chức", "Tại chỗ"],
  },
  khoaHoc: {
    type: String,
  },
  tinhTrangHocTap: {
    type: String,
    enum: ["Đang học", "Tốt nghiệp", "Thôi học"],
  },
  maLopHoc: {
    type: String,
    ref: "LopHoc",
    required: true,
  },
  dsDangKyHocPhan: [
    {
      type: String,
      ref: "DangKyHocPhan",
    },
  ],
  dsMonHocDaHoc: [
    {
      type: String,
      ref: "MonHoc",
      refPath: "maMonHoc",
    },
  ],
  dsMonHocDangHoc: [
    {
      type: String,
      ref: "MonHoc",
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

// Nếu không cung cấp maSV thì sinh tự động
SinhVienSchema.pre("save", function (next) {
  // SV + năm hiện tại + 1 số tăng dần không trùng
  !this.maSV &&
    (this.maSV = `SV${new Date().getFullYear()}${Math.floor(
      Math.random() * 1000
    )}`);
  next();
});

export default mongoose.model("SinhVien", SinhVienSchema);
