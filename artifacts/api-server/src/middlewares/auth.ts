import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "@workspace/auth";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const { userId } = await verifyToken(header.slice(7));
    req.userId = userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    try {
      const { userId } = await verifyToken(header.slice(7));
      req.userId = userId;
    } catch {
      // continue without user
    }
  }
  next();
}
