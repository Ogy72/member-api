import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from "../../shared/utils/jwt";
import { AppError } from "../../shared/errors/app.error";

export interface AuthRequest extends Request {
    user?: {
        id: string;
    }
}

export const authMiddleware = (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
)=> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = verifyAccessToken(token) as { id: string };

        // Save verify result on request
        req.user = { id: payload.id };

        next()
    } catch {
        throw new AppError("Invalid or expired token", 401);
    }
}