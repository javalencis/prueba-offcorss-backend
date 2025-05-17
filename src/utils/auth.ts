// utils/auth.ts
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret_key";

export const generateToken = (user: any) => {
  return jwt.sign({ id: user._id, email: user.email }, SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
