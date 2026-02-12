import { Member } from "../domain/member.entity";
import {QueryOptions} from "../../../presentation/types/query-options.type";
import {PaginationResult} from "../../../presentation/types/pagination.type";

export interface MemberRepository {
    create(data: { name: string; email: string; password: string }): Promise<Member>;
    findAll(options: QueryOptions): Promise<PaginationResult<Member>>;
    findById(id: string): Promise<Member | null>;
    findByEmail(email: string): Promise<Member | null>;
    update(id: string, data: Partial<Member>): Promise<Member | null>;
    delete(id: string): Promise<void>;
}