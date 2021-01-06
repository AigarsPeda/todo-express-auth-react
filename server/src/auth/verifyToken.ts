import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../types";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get auth header value
  const bearerHeader = req.headers["authorization"];

  if (
    typeof bearerHeader !== "undefined" &&
    bearerHeader.startsWith("Bearer ")
  ) {
    // split at the space
    const bearerToken = bearerHeader.split(" ");
    // get token from array
    const token = bearerToken[1];
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY!) as User;
      // @ts-ignore
      req.user = user;

      return next();
    } catch (error) {
      return res.status(401).json({ error: "not authorized" });
    }
  } else {
    return res.status(401).json({ error: "not authorized" });
  }
};
