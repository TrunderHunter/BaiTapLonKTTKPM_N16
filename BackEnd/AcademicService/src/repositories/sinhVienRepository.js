import SinhVien from "../models/SinhVien.js";
import LopHoc from "../models/LopHoc.js";
import MonHoc from "../models/monHoc.js";

let createSinhVien = async (sinhVien) => {
  try {
    let newSinhVien = await SinhVien.create(sinhVien);

    // Update maSV to dsSinhVien in LopHoc(maLopHoc)
    await LopHoc.findOneAndUpdate(
      { maLopHoc: newSinhVien.maLopHoc },
      { $push: { dsSinhVien: newSinhVien.maSV } }
    );

    return newSinhVien;
  } catch (error) {
    throw error;
  }
};

//Lấy danh sách môn học sinh viên chưa học
let getMonHocChuaHoc = async (maSV) => {
  try {
    let sinhVien = await SinhVien.findOne({ maSV: maSV }).populate(
      "dsMonHocDaHoc"
    );

    let dsMonHocDaHoc = sinhVien.dsMonHocDaHoc.map((monHoc) => monHoc.maMH);
    let dsMonHocDangHoc = sinhVien.dsMonHocDangHoc.map((monHoc) => monHoc.maMH);

    let dsMonHocChuaHoc = await MonHoc.find({
      maMH: { $nin: [...dsMonHocDaHoc, ...dsMonHocDangHoc] },
    });

    return dsMonHocChuaHoc;
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách môn học sinh viên đang học
let getMonHocDangHoc = async (maSV) => {
  try {
    let sinhVien = await SinhVien.findOne({ maSV: maSV }).populate(
      "dsMonHocDangHoc"
    );

    return sinhVien.dsMonHocDangHoc;
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách môn học từ môn học sinh viên đã học
let getMonHocDaHoc = async (maSV) => {
  try {
    let sinhVien = await SinhVien.aggregate([
      { $match: { maSV: maSV } },
      {
        $lookup: {
          from: "monhocs",
          localField: "dsMonHocDaHoc",
          foreignField: "maMonHoc",
          as: "dsMonHocDaHoc",
        },
      },
      { $unwind: "$dsMonHocDaHoc" },
      {
        $project: {
          _id: 0,
          dsMonHocDaHoc: 1,
        },
      },
    ]);

    return sinhVien;
  } catch (error) {
    throw error;
  }
};

export default {
  createSinhVien,
  getMonHocChuaHoc,
  getMonHocDangHoc,
  getMonHocDaHoc,
};
