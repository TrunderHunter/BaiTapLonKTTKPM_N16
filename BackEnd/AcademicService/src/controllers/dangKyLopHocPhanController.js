import dangKyHocPhanRepository from "../repositories/dangKyHocPhanRepository.js";

let dangKyLopHocPhan = async (req, res) => {
  try {
    let { maSV, maLopHocPhan } = req.body;

    if (!maSV || !maLopHocPhan) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    let result = await dangKyHocPhanRepository.dangKyHocPhan(
      maSV,
      maLopHocPhan
    );

    res.status(201).json({
      message: "Create successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      message: error.message,
    });
  }
};

export default {
  dangKyLopHocPhan,
};
