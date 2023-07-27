// auth middleware to check auth header token

import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (token !== "mysecrettoken") {
    return next(
      createHttpError(403, "You are not authorized to access this resource")
    );
  }

  next();
};

export default authMiddleware;
