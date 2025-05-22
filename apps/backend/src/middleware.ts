import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtToken = req.headers.authorization;
  if (!jwtToken) {
    res.json({
      msg: "You don't have jwt token",
    });
    return;
  }
  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET!);
  if (!decoded) {
    res.json({
      msg: "You are not authorized",
    });
    return;
  }
  req.id = (decoded as JwtPayload).userId;
  next();
};
