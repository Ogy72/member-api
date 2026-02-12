import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from "../../shared/utils/jwt";
import { AppError } from "../../shared/errors/app.error";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = verifyAccessToken(token);

        // Save verify result on request
        ;(req as any).user = payload;

        next()
    } catch {
        throw new AppError("Invalid or expired token", 401);
    }
}