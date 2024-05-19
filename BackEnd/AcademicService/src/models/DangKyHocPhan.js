import mongoose from "mongoose";

const DangKyHocPhanSchema = new mongoose.Schema({
  maSV: {
    type: String,
    ref: "SinhVien",
    required: true,
  },
  maLopHocPhan: {
    type: String,
    ref: "LopHocPhan",
    required: true,
  },
  diemTK: [
    {
      type: Number,
    },
  ],
  diemGK: {
    type: Number,
    default: null,
  },
  diemCK: {
    type: Number,
    default: null,
  },
  diemTong: {
    type: Number,
  },
  xepLoai: {
    type: String,
    enum: ["A", "B", "C", "D", "F"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

DangKyHocPhanSchema.pre("save", function (next) {
  if (this.diemTK.length === 3 && this.diemGK != null && this.diemCK != null) {
    const diemTKAverage =
      this.diemTK.reduce((a, b) => a + b, 0) / this.diemTK.length;
    this.diemTong =
      (diemTKAverage * 2 + this.diemGK * 3 + this.diemCK * 5) / 10;
  } else {
    this.diemTong = null;
  }
  next();
});

// update automatic xepLoai
DangKyHocPhanSchema.pre("save", function (next) {
  if (this.diemTong != null) {
    if (this.diemTong >= 8.5) {
      this.xepLoai = "A";
    } else if (this.diemTong >= 7) {
      this.xepLoai = "B";
    } else if (this.diemTong >= 5.5) {
      this.xepLoai = "C";
    } else if (this.diemTong >= 4) {
      this.xepLoai = "D";
    } else {
      this.xepLoai = "F";
    }
  } else {
    this.xepLoai = null;
  }
  next();
});

export default mongoose.model("DangKyHocPhan", DangKyHocPhanSchema);
