import { genToken } from "../middleware/authToken.js";
import { User } from "../models/users.js";

export async function signupUser(req, res, next) {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  if (user)
    return res
      .status(409)
      .json({ description: "User with such email already exists" });
  try {
    const newUser = await User.create({ email, password, name, token });
    const userPayload = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      balance: newUser.balance,
    };
    const token = genToken(userPayload);
    await User.findOneAndUpdate({ email: newUser.email }, { token });
    return res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        balance: newUser.balance,
        token: newUser.token,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
