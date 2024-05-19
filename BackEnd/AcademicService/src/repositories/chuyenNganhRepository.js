import ChuyenNganh from "../models/ChuyenNganh.js";
import Khoa from "../models/Khoa.js";

let createChuyenNganhRep = async (data) => {
  try {
    let result = await ChuyenNganh.create(data);

    let maKhoa = data.maKhoa;

    if (maKhoa) {
      let khoa = await Khoa.findOne({ id: maKhoa });
      if (khoa) {
        khoa.chuyenNganhs.push(result.maChuyenNganh);
        await khoa.save();
      }
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

export default {
  createChuyenNganhRep,
};
