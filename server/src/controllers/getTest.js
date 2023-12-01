import { Test } from "../models/test.js";

export const getTest = async (req, res, next) => {
  try {
    const test = await Test.find();
    return res.json(test);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
