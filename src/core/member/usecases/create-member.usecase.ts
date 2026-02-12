import { MemberRepository } from "../repositories/member.repository";
import { Member } from "../domain/member.entity";
import { hashPassword } from "../../../shared/utils/hash";
import { AppError } from "../../../shared/errors/app.error";

export class CreateMemberUseCase {
    constructor(private repository: MemberRepository) {}

    async execute(name: string, email: string, password: string): Promise<Member> {
        const existing = await this.repository.findByEmail(email);

        if (existing) {
            throw new AppError("Email already exists");
        }

        const hashed = await hashPassword(password);

        return this.repository.create({
            name,
            email,
            password: hashed
        });
    }
}