import jwt from "jsonwebtoken";
import "dotenv/config";

export const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "invalid credentials" });
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (error) => {
      if (error) {
        return res.status(403).json({ message: "invalid credentials" });
      } else {
        next();
      }
    });
  }
};
