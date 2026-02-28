import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";

export const generateAccessToken = (payload: object): string => {
    return jwt.sign(payload, env.JWT_SECRET as Secret, {
        expiresIn: env.JWT_EXPIRES
    } as SignOptions);
}

export const generateRefreshToken = (payload: object): string => {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET as Secret, {
        expiresIn: env.JWT_REFRESH_EXPIRES
    } as SignOptions);
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, env.JWT_SECRET as Secret);
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, env.JWT_REFRESH_SECRET as Secret);
}