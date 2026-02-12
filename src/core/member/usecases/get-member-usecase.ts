import { MemberRepository } from "../repositories/member.repository";
import { Member } from "../domain/member.entity";
import { QueryOptions } from "../../../presentation/types/query-options.type";

export class GetMembersUseCase {
    constructor(private repository: MemberRepository) {};

    async execute(options: QueryOptions) {
        return this.repository.findAll(options);
    }
}