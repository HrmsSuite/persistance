import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface Payload {
  id: string;
  role?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: Payload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.ACCESSTOKEN;

    if (!secret) {
      return res.status(500).json({ message: "Access token secret missing" });
    }

    const payload = jwt.verify(token, secret) as Payload;
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }
    next();
  };
};