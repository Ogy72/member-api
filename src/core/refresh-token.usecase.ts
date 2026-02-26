import { MemberRepository } from "./member/repositories/member.repository";
import {generateAccessToken, verifyRefreshToken} from "../shared/utils/jwt";
import { AppError } from "../shared/errors/app.error";

export class RefreshTokenUsecase {
    constructor(private repository: MemberRepository) {};

    async execute(refreshToken: string) {
        const payload = verifyRefreshToken(refreshToken) as { id: string };

        const user = await this.repository.findById(payload.id);

        if (!user || user.refreshToken !== refreshToken) {
            throw new AppError("Invalid refresh token", 401)
        }

        const newAccessToken = generateAccessToken({ id: user.id });

        return { accessToken: newAccessToken };
    }
}