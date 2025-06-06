import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("IN the authmiddleware");

  const jwtToken = req.headers.authorization;
  if (!jwtToken) {
    res.json({
      msg: "You don't have jwt token",
    });
    return;
  }
  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET!);
  // @ts-ignore
  console.log(decoded.userId);

  if (!decoded) {
    res.json({
      msg: "You are not authorized",
    });
    return;
  }
  req.id = (decoded as JwtPayload).userId;
  console.log(req.id);
  next();
};
