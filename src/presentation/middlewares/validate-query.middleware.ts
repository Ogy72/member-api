import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../../shared/errors/app.error";

export const validateQuery = <T>(schema: ZodType<T>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.query);

        if (!result.success) {
            return next(new AppError(result.error.issues[0].message, 400));
        }

        // req.query = result.data as any;
        res.locals.validateQuery = result.data;
        next();
};