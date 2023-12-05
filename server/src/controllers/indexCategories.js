import { Categories } from "../models/categories.js";

export async function indexCategories(req, res, next) {
  try {
    const category = await Categories.find();
    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
