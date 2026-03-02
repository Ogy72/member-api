import { MemberRepository } from "../repositories/member.repository";
import { comparePassword } from "../../../shared/utils/hash";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../../shared/utils/jwt";
import { AppError } from "../../../shared/errors/app.error";

export class LoginUseCase {
    constructor(private repository: MemberRepository) {};

    async execute(email: string, password: string) {
        const user = await this.repository.findByEmail(email);

        if (!user) {
            throw new AppError("Invalid email user", 401);
        }

        const valid = await comparePassword(password, user.password);

        if (!valid) {
            throw new AppError("Invalid password user", 401);
        }

        const accessToken = generateAccessToken({ id: user.id });
        const refreshToken = generateRefreshToken({ id: user.id });

        await this.repository.updateRefreshToken(user.id, refreshToken);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        };
    }
}