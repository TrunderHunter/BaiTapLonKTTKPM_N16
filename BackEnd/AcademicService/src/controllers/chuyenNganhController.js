import chuyenNganhRepository from "../repositories/chuyenNganhRepository.js";

let createChuyenNganh = async (req, res) => {
  try {
    let data = req.body;
    let newChuyenNganh = await chuyenNganhRepository.createChuyenNganhRep({
      tenChuyenNganh: data.tenChuyenNganh,
      maKhoa: data.maKhoa,
      soTinChiCanThiet: data.soTinChiCanThiet,
      description: data.description,
    });
    res.status(200).json({
      message: "Create new chuyenNganh successfully",
      newChuyenNganh,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export default { createChuyenNganh };
