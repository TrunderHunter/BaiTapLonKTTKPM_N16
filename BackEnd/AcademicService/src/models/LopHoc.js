import mongoose from "mongoose";

const LopHocSchema = new mongoose.Schema({
  maLopHoc: {
    type: String,
    unique: true,
  },
  tenLopHoc: {
    type: String,
    required: true,
  },
  maChuyenNganh: {
    type: String,
    ref: "ChuyenNganh",
    required: true,
  },
  description: {
    type: String,
  },
  soLuongSV: {
    type: Number,
  },
  dsSinhVien: [
    {
      type: String,
      ref: "SinhVien",
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

LopHocSchema.pre("save", function (next) {
  // Tạo maLopHoc từ maChuyenNganh + năm hiện tại + Chữ cái đầu của từng từ trong tenLopHoc
  !this.maLopHoc &&
    (this.maLopHoc = `${
      this.maChuyenNganh
    }-${new Date().getFullYear()}-${this.tenLopHoc
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("")}`);

  next();
});

export default mongoose.model("LopHoc", LopHocSchema);
