import { MemberRepository } from "../repositories/member.repository";
import { AppError } from "../../../shared/errors/app.error";

export class GetMeUseCase {
    constructor(private repository: MemberRepository) {}

    async execute(userId: string) {
        const user = await this.repository.findById(userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        return {
            id: userId,
            name: user.name,
            email: user.email,
        }
    }
}