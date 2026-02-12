import { MemberRepository } from "../repositories/member.repository";
import { comparePassword } from "../../../shared/utils/hash";
import { generateAccessToken } from "../../../shared/utils/jwt";
import { AppError } from "../../../shared/errors/app.error";

export class LoginUseCase {
    constructor(private repository: MemberRepository) {};

    async execute(email: string, password: string) {
        const user = await this.repository.findByEmail(email);

        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }

        const valid = await comparePassword(password, user.password);

        if (!valid) {
            throw new AppError("Invalid credentials", 401);
        }

        const token = generateAccessToken({ id: user.id });

        return { accessToken: token };
    }
}