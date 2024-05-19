import lopHocRepository from "../repositories/lopHocRepository.js";

let createNewLopHoc = async (req, res) => {
  try {
    let data = req.body;
    let newLopHoc = await lopHocRepository.createLopHocRep(data);
    res.status(200).json({
      message: "Create new lop hoc successfully",
      newLopHoc,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export default {
  createNewLopHoc,
};
