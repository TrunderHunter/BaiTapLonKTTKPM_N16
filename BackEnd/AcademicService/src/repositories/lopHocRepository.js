import LopHoc from "../models/LopHoc.js";
import ChuyenNganh from "../models/ChuyenNganh.js";

let createLopHocRep = async (data) => {
  try {
    let result = await LopHoc.create(data);

    // Update dsLopHoc in ChuyenNganh
    let maChuyenNganh = data.maChuyenNganh;

    if (maChuyenNganh) {
      let chuyenNganh = await ChuyenNganh.findOne({
        maChuyenNganh: maChuyenNganh,
      });

      console.log(chuyenNganh);

      if (chuyenNganh) {
        chuyenNganh.dsLopHoc.push(result.maLopHoc);
        await chuyenNganh.save();
      }
    }
    return result;
  } catch (error) {
    return error;
  }
};

export default {
  createLopHocRep,
};
