import { MemberRepository } from "../repositories/member.repository";
import { QueryOptions } from "../../types/query-options.type";

export class GetMembersUseCase {
    constructor(private repository: MemberRepository) {};

    async execute(options: QueryOptions) {
        return this.repository.findAll(options);
    }
}