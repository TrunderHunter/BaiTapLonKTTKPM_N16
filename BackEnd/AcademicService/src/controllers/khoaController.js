import khoaRepository from "../repositories/khoaRepository.js";

let createNewKhoa = async (req, res) => {
  try {
    let { tenKhoa, description } = req.body;
    let newKhoa = await khoaRepository.createNewKhoa({ tenKhoa, description });
    res.status(200).json({
      message: "Create new khoa successfully",
      newKhoa,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export default { createNewKhoa };
