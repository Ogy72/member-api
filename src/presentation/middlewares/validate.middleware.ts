// import { ZodError, AnyZodObject } from "zod/v3";
import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../shared/errors/app.error";

export const validate =
    <T>(schema: ZodType<T>) =>
        (req: Request, res: Response, next: NextFunction) => {
            const result = schema.safeParse(req.body);
            if (!result.success) {
                return next(
                    new AppError(result.error.issues[0].message, 400)
                );
            }
            
            req.body = result.data;
            next();
        };
