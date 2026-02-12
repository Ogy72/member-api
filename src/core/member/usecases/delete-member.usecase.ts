import { MemberRepository } from "../repositories/member.repository";
import { AppError } from "../../../shared/errors/app.error";

export class DeleteMemberUseCase {
    constructor(private repository: MemberRepository) {};

    async execute(id: string): Promise<void> {
        const existing = await this.repository.findById(id);

        if (!existing) {
            throw new AppError("Cannot find member with id " + id);
        }

        await this.repository.delete(id);
    }
}