import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.session.userID) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }

  next();
};
