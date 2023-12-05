import { User } from "../models/users.js";

export async function logoutUser(req, res, next) {
  try {
    const id = req.user.id;
    await User.findByIdAndUpdate(id, { token: "" });
    return res.status(204).json({ description: "User signed out" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
