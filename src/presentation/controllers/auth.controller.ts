import { Request, Response } from "express";
import { LoginUseCase } from "../../core/member/usecases/login.usecase";
import { LogoutUseCase } from "../../core/member/usecases/logout.usecase";
import { RefreshTokenUsecase } from "../../core/refresh-token.usecase";
import {AppError} from "../../shared/errors/app.error";
import {AuthRequest} from "../middlewares/auth.middleware";

export class AuthController {
    constructor(
        private loginUseCase: LoginUseCase,
        private logoutUseCase: LogoutUseCase,
        private refreshTokenUseCase: RefreshTokenUsecase,
    ) {}

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const result = await this.loginUseCase.execute(email, password);
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: false, // True if production in HTTPS
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            accessToken: result.accessToken,
            user: result.user,
        });
    }

    async logout(req: Request, res: Response) {
        // await this.logoutUseCase.execute(req.user!.id);

        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            await this.logoutUseCase.execute(refreshToken);
        }

        res.clearCookie('refreshToken',{
            httpOnly: true,
            sameSite: 'strict',
            secure: false, // True if production HTTPS
        });

        res.json({ message: "Logged out successfully." });
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