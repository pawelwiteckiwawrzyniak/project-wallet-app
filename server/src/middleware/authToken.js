import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import { User } from "../models/users.js";

dotenv.config();
const { SECRET_KEY: secretKey } = process.env;
export const genToken = (user) => {
  return JWT.sign(user, secretKey, { expiresIn: "12h" });
};

export const verifyToken = (token) => {
  try {
    return JWT.verify(token, secretKey);
  } catch (error) {
    console.error(error.message);
    if (error instanceof JWT.TokenExpiredError)
      throw new Error("Token expired");
    if (error instanceof JWT.JsonWebTokenError)
      throw new Error("Token is invalid");
    throw new Error("Token error");
  }
};

export const getToken = (headers) => {
  return headers.authorization?.replace("Bearer ", "");
};

export async function authMiddleware(req, res, next) {
  try {
    const token = getToken(req.headers);
    if (!token) {
      return res.status(401).json({ message: "Token doesn't exist" });
    }
    const { id } = verifyToken(token);
    const newUser = await User.findById(id);
    if (!newUser || newUser.token !== token)
      throw new Error("Token is invalid");
    req.user = newUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
}
