import { Member } from "../domain/member.entity";
import {QueryOptions} from "../../types/query-options.type";
import {PaginationResult} from "../../types/pagination.type";

export interface MemberRepository {
    create(data: { name: string; email: string; password: string }): Promise<Member>;
    findAll(options: QueryOptions): Promise<PaginationResult<Member>>;
    findById(id: string): Promise<Member | null>;
    findByEmail(email: string): Promise<Member | null>;
    findExistingIds(ids: string[]): Promise<string[]>;
    update(id: string, data: Partial<Member>): Promise<Member | null>;
    delete(id: string): Promise<void>;
    bulkDelete(ids: string[]): Promise<number>;
    updateRefreshToken(id: string, token: string): Promise<void>;
    clearRefreshToken(id: string): Promise<void>;
}