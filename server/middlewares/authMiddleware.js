import jwt from "jsonwebtoken";
import { userModel } from "./../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token or expired" });
  }
};
