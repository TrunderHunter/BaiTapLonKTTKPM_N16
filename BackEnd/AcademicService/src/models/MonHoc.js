import mongoose from "mongoose";

const MonHocSchema = new mongoose.Schema({
  maMonHoc: {
    type: String,
    unique: true,
  },
  tenMonHoc: {
    type: String,
    required: true,
  },
  batBuoc: {
    type: Boolean,
    default: false,
  },
  soTinChi: {
    type: Number,
  },
  dsMonHocTienQuyet: [
    {
      type: String,
      ref: "MonHoc",
    },
  ],
  maChuyenNganh: {
    type: String,
    ref: "ChuyenNganh",
  },
  dsLopHocPhan: [
    {
      type: String,
      ref: "LopHocPhan",
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

// Nếu không truyển maMonHoc, sẽ tự sinh ra maMonHoc (những chữ cái đầu của tenMonHoc viết tắt và thêm số ngẫu nhiên  )
MonHocSchema.pre("save", async function (next) {
  !this.maMonHoc &&
    (this.maMonHoc =
      this.tenMonHoc.slice(0, 3).toUpperCase() +
      Math.floor(Math.random() * 1000));
  next();
});

export default mongoose.model("MonHoc", MonHocSchema);
