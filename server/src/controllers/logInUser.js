import { User } from "../models/users.js";
import { genToken } from "../middleware/authToken.js";

export async function logInUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.validatePassword(password)))
      return res.status(401).json({ message: "Email or password is wrong" });
    const userPayload = {
      id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
    };
    const token = genToken(userPayload);
    await User.findOneAndUpdate({ email: user.email }, { token });
    return res.status(200).json({ user: userPayload, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
