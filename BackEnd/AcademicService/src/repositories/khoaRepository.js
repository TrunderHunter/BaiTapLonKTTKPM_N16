import Khoa from "../models/Khoa.js";

let createNewKhoa = async (khoa) => {
  try {
    let newKhoa = await Khoa.create(khoa);
    return newKhoa;
  } catch (error) {
    throw error;
  }
};

export default { createNewKhoa };
