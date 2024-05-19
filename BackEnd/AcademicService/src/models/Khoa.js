import mongoose from "mongoose";

const KhoaSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  tenKhoa: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  chuyenNganhs: [
    {
      type: String,
      ref: "ChuyenNganh",
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

KhoaSchema.pre("save", function (next) {
  // this.id = "KHOA" + từng chữ cái đầu của từng từ trong tenKhoa
  let id = "KHOA";
  let arr = this.tenKhoa.split(" ");
  arr.forEach((word) => {
    id += word[0].toUpperCase();
  });
  this.id = id;

  next();
});

export default mongoose.model("Khoa", KhoaSchema);
