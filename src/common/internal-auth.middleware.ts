import { Request, Response, NextFunction } from "express";

export function internalAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const secret = req.headers["x-internal-secret"] as string | undefined;
  const expected = process.env.INTERNAL_SERVICE_SECRET;

  if (!secret || secret !== expected) {
    res.status(403).json({
      success: false,
      error: "Forbidden",
    });
    return;
  }

  next();
}
