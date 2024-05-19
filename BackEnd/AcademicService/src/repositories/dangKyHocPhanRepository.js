import DangKyHocPhan from "../models/DangKyHocPhan.js";
import SinhVien from "../models/SinhVien.js";
import monHocRepository from "./monHocRepository.js";
import LopHocPhan from "../models/lopHocPhan.js";

// Kiểm tra sinh viên đã học môn học này chưa

// Kiểm tra sinh viên đã học môn học tiên quyết chưa
async function daHocMonHoc(maSV, maMonHoc) {
  try {
    // Tìm sinh viên dựa trên maSV
    const sinhVien = await SinhVien.findOne({ maSV: maSV });

    // Kiểm tra xem sinh viên đã học môn học này chưa
    const daHoc = sinhVien.dsMonHocDaHoc.includes(maMonHoc);

    return daHoc;
  } catch (error) {
    throw error;
  }
}
// Đăng ký học phần
let dangKyHocPhan = async (maSV, maLopHocPhan) => {
  try {
    let sinhVien = await SinhVien.findOne({ maSV: maSV });
    let lopHocPhan = await LopHocPhan.findOne({ maLopHocPhan: maLopHocPhan });

    if (!sinhVien || !lopHocPhan) {
      throw new Error("Sinh viên hoặc lớp học phần không tồn tại");
    }

    let daHoc = await daHocMonHoc(maSV, lopHocPhan.maMonHoc);
    if (daHoc) {
      throw new Error("Sinh viên đã học môn học này");
    }

    let maMonHoc = lopHocPhan.maMonHoc;

    let monHocTienQuyet = await checkSinhVienDaHocMonHocTienQuyet(
      maSV,
      maMonHoc
    );
    if (!monHocTienQuyet) {
      throw new Error("Sinh viên chưa học môn học tiên quyết");
    }

    let existingDangKyHocPhan = await DangKyHocPhan.findOne({
      maSV: maSV,
      maLopHocPhan: maLopHocPhan,
    });

    if (existingDangKyHocPhan) {
      throw new Error("Sinh viên đã đăng ký học phần này");
    }

    let dangKyHocPhan = await DangKyHocPhan.create({
      maSV: maSV,
      maLopHocPhan: maLopHocPhan,
    });

    await SinhVien.findOneAndUpdate(
      { maSV: maSV },
      { $push: { dsMonHocDangHoc: maMonHoc } }
    );

    return dangKyHocPhan;
  } catch (error) {
    throw error;
  }
};

export default {
  dangKyHocPhan,
};
