import monHocRepository from "../repositories/monHocRepository.js";

let createMonHoc = async (req, res) => {
  try {
    let result = await monHocRepository.createMonHoc(req.body);
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

export default { createMonHoc };
