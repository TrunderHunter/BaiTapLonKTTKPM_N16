import lopHocPhanRepository from "../repositories/lopHocPhanRepository.js";

let createLopHocPhan = async (req, res) => {
  try {
    let result = await lopHocPhanRepository.createLopHocPhan(req.body);
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

let getLopHocPhanByMonHoc = async (req, res) => {
  try {
    let result = await lopHocPhanRepository.getLopHocPhanByMonHoc(
      req.params.maMonHoc
    );
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
  createLopHocPhan,
  getLopHocPhanByMonHoc,
};
