import { Request, Response, NextFunction } from "express";
import crypto from "node:crypto";

export function internalAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const secret = req.headers["x-internal-secret"];

  const expected = process.env.INTERNAL_SERVICE_SECRET;

  // Server configuration problem
  if (!expected) {
    console.error("INTERNAL_SERVICE_SECRET is not configured");

    res.status(500).json({
      success: false,
      message: "Internal service authentication is not configured",
      code: "INTERNAL_AUTH_NOT_CONFIGURED",
    });

    return;
  }

  // Header missing or not a string
  if (typeof secret !== "string" || secret.length === 0) {
    res.status(403).json({
      success: false,
      message: "Forbidden",
      code: "INTERNAL_AUTH_FAILED",
    });

    return;
  }

  // Constant-time comparison
  const secretBuffer = Buffer.from(secret);
  const expectedBuffer = Buffer.from(expected);

  const isValid =
    secretBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(secretBuffer, expectedBuffer);

  if (!isValid) {
    res.status(403).json({
      success: false,
      message: "Forbidden",
      code: "INTERNAL_AUTH_FAILED",
    });

    return;
  }

  next();
}
