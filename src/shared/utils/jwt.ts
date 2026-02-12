// import jwt from 'jsonwebtoken';
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";

export const generateAccessToken = (payload: object): string => {
    // return jwt.sign(payload, env.JWT_SECRET, {
    //     expiresIn: env.JWT_EXPIRES
    // });

    const secret: Secret = env.JWT_SECRET;

    const options: SignOptions = {
        expiresIn: env.JWT_EXPIRES as SignOptions['expiresIn'],
    };

    return jwt.sign(payload, secret, options);
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, env.JWT_SECRET as Secret);
}