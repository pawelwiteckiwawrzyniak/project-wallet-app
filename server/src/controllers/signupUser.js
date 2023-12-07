import { User } from "../models/users.js";

export async function signupUser(req, res, next) {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  if (user)
    return res
      .status(409)
      .json({ description: "User with such email already exists" });
  try {
    const newUser = await User.create({ email, password, name });
    return res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        balance: newUser.balance,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
