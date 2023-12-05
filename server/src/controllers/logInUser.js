import { User } from "../models/users.js";
import { genToken } from "../auth/tokenAuth.js";

export async function logInUser(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.validatePassword(password)))
    return res.status(401).json({ message: "Email or password is wrong" });
  const userPayload = {
    id: user._id,
    email: user.email,
  };
  const token = genToken(userPayload);
  await User.findOneAndUpdate({ email: user.email }, { token });
  return res.status(200).json({ user: userPayload, token });
}
