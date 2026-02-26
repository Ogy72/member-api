import { Request, Response } from "express";
import { LoginUseCase } from "../../core/member/usecases/login.usecase";
import { RefreshTokenUsecase } from "../../core/refresh-token.usecase";
import {AppError} from "../../shared/errors/app.error";

export class AuthController {
    constructor(
        private loginUseCase: LoginUseCase,
        private refreshTokenUseCase: RefreshTokenUsecase,
    ) {}

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const result = await this.loginUseCase.execute(email, password);
        // res.status(200).json(result);
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: false, // True if production in https
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            accessToken: result.accessToken,
            user: result.user,
        });

    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new AppError("No refresh token", 401)
        }

        const result = await this.refreshTokenUseCase.execute(refreshToken);

        res.json(result);
    }
}