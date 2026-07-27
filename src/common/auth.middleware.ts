import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Permission } from "../constants";
import { AccessScopeResult } from "../types";

export interface Payload {
  id: string;

  companyId: string;

  role?: "admin" | "employee";

  employeeId?: string;

  // RBAC
  roleIds?: string[];

  permissions?: Permission[];
}

declare global {
  namespace Express {
    interface Request {
      user?: Payload;
      companyId?: string;

      accessScope?: AccessScopeResult;
    }
  }
}


export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  try {

    const authHeader =
      req.headers.authorization;


    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Authorization token missing",
      });
    }


    const token =
      authHeader.split(" ")[1];


    const secret =
      process.env.ACCESSTOKEN;


    if (!secret) {
      return res.status(500).json({
        message: "Access token secret missing",
      });
    }


    const payload =
      jwt.verify(
        token,
        secret,
      ) as Payload;



    req.user = payload;

    req.companyId =
      payload.companyId;


    next();


  } catch (err) {

    return res.status(401).json({
      message: "Invalid or expired token",
    });

  }

};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: insufficient permissions" });
    }
    next();
  };
};
