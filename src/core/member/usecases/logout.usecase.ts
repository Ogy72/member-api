import { MemberRepository } from "../repositories/member.repository";
import {verifyAccessToken, verifyRefreshToken} from "../../../shared/utils/jwt";

export class LogoutUseCase {
    constructor(private repository: MemberRepository) {}

    async execute(refreshToken: string): Promise<void> {
        try {
            const payload = verifyRefreshToken(refreshToken) as { id: string };

            await this.repository.clearRefreshToken(payload.id);
        } catch (error) {
            console.log(error);
        }

    }
}