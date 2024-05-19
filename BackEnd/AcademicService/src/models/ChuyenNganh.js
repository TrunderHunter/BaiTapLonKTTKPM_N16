import mongoose from "mongoose";

const ChuyenNganhSchema = new mongoose.Schema({
  maChuyenNganh: {
    type: String,
    unique: true,
    index: true,
  },
  tenChuyenNganh: {
    type: String,
    required: true,
  },
  maKhoa: {
    type: String,
    ref: "Khoa",
    required: true,
  },
  soTinChiCanThiet: {
    type: Number,
  },
  description: {
    type: String,
  },
  dsLopHoc: [
    {
      type: String,
      ref: "LopHoc",
    },
  ],
  dsMonHoc: [
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

ChuyenNganhSchema.pre("save", function (next) {
  let maChuyenNganh = "CN";
  let arr = this.tenChuyenNganh.split(" ");
  arr.forEach((word) => {
    maChuyenNganh += word[0].toUpperCase();
  });
  this.maChuyenNganh = maChuyenNganh;

  next();
});

export default mongoose.model("ChuyenNganh", ChuyenNganhSchema);
