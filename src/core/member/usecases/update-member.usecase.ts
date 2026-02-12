import { MemberRepository } from "../repositories/member.repository";
import { AppError } from "../../../shared/errors/app.error";
import { Member } from "../domain/member.entity";

export class UpdateMemberUseCase {
    constructor(private readonly repository: MemberRepository) {}

    async execute(id: string, data: Partial<Member>): Promise<Member> {
        const update = await this.repository.update(id, data);

        if (!update) {
            throw new AppError(`Update member with id ${id} not found`, 404);
        }

        return update;
    }
}