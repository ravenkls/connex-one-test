// auth middleware to check auth header token

import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export const checkAuth = (req: Request) => {
  return req.header("Authorization") === "mysecrettoken";
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!checkAuth(req)) {
    return next(
      createHttpError(403, "You are not authorized to access this resource")
    );
  }

  next();
};

export default authMiddleware;
