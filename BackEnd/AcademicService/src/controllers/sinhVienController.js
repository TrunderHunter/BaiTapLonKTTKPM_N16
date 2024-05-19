import sinhViemRepository from "../repositories/sinhVienRepository.js";

let createNewSinhVien = async (req, res) => {
  try {
    let result = await sinhViemRepository.createSinhVien(req.body);
    res.status(201).json({
      message: "Create successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create failed",
      error: error,
    });
  }
};

let getMonHocChuaHoc = async (req, res) => {
  try {
    let result = await sinhViemRepository.getMonHocChuaHoc(req.query.maSV);
    res.status(200).json({
      message: "Get successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get failed",
      error: error,
    });
  }
};

let getMonHocDangHoc = async (req, res) => {
  try {
    let result = await sinhViemRepository.getMonHocDangHoc(req.query.maSV);
    res.status(200).json({
      message: "Get successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get failed",
      error: error,
    });
  }
};

let getMonHocDaHoc = async (req, res) => {
  try {
    let result = await sinhViemRepository.getMonHocDaHoc(req.query.maSV);
    res.status(200).json({
      message: "Get successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get failed",
      error: error,
    });
  }
};

export default {
  createNewSinhVien,
  getMonHocChuaHoc,
  getMonHocDangHoc,
  getMonHocDaHoc,
};
