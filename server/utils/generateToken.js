import { jwt } from "jsonwebtoken";

export const generateToken = (id) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
