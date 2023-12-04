import { User } from "../models/users.js";

export async function getUser(req, res, next) {
  try {
    const id = req.user.id;
    const currentUser = await User.findOne({ _id: id });
    if (!currentUser)
      return res.status(404).json({ description: "User does not exist" });
    return res.status(204).json({
      description: "User exists",
      id: currentUser._id,
      username: currentUser.name,
      email: currentUser.email,
      balance: currentUser.balance,
    });
  } catch (e) {
    return console.error(e.message);
  }
}
