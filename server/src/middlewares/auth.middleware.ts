import { Request, Response, NextFunction } from "express";
import { verify } from "../utils/auth";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }

  try {
    const decoded = verify(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
    return;
  }
};
