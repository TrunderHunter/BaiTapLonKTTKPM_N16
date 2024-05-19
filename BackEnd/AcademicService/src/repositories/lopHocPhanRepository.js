import LopHocPhan from "../models/lopHocPhan.js";
import MonHoc from "../models/monHoc.js";

let createLopHocPhan = async (data) => {
  try {
    let result = await LopHocPhan.create(data);

    // Update dsLopHocPhan of MonHoc
    await MonHoc.findOneAndUpdate(
      { maMonHoc: data.maMonHoc },
      { $push: { dsLopHocPhan: result.maLopHocPhan } },
      { new: true }
    ).exec();
    return result;
  } catch (error) {
    return error;
  }
};

// Lấy danh sách lớp học phần theo môn học
let getLopHocPhanByMonHoc = async (maMonHoc) => {
  try {
    let dsLopHocPhan = await LopHocPhan.find({ maMonHoc: maMonHoc });
    return dsLopHocPhan;
  } catch (error) {
    return error;
  }
};

export default {
  createLopHocPhan,
  getLopHocPhanByMonHoc,
};
