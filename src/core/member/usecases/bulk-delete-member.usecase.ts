import { MemberRepository } from "../repositories/member.repository"

type BulkDeleteResult = {
    requestedCount: number;
    deletedCount: number;
    notFoundIds: string[];
};

export class BulkDeleteMemberUseCase {
    constructor(private repository: MemberRepository) {}

    async execute(ids: string[]): Promise<BulkDeleteResult> {
        const uniqueIds = [...new Set(ids)];
        const existingIds = await this.repository.findExistingIds(uniqueIds);
        const existingSet = new Set(existingIds);

        const notFoundIds = uniqueIds.filter((id) => !existingSet.has(id));
        const deletedCount = await this.repository.bulkDelete(existingIds);

        return {
            requestedCount: ids.length,
            deletedCount,
            notFoundIds
        };
    }
}