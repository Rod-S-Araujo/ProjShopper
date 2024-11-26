import { NextFunction, Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";

const secret = "NF172721EHUOP138";

const sign = (payload: { id: string; email: string }) => {
  const jwtConfig: SignOptions = {
    algorithm: "HS256",
    expiresIn: "2h",
  };
  return jwt.sign(payload, secret, jwtConfig);
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorizad" });
    const decoder = jwt.verify(token, secret);
    res.locals.user = decoder;
    next();
  } catch (error) {
    next(error);
  }
};

export { sign, verifyToken };
