import { MemberRepository } from "../../../core/member/repositories/member.repository";
import { Member } from "../../../core/member/domain/member.entity";
import { MemberModel } from "./member.schema";
import {QueryOptions} from "../../../presentation/types/query-options.type";
import {PaginationResult} from "../../../presentation/types/pagination.type";

export class MemberMongoRepository implements MemberRepository {
    async create(data: { name: string; email: string; password: string }): Promise<Member> {
        const doc = await MemberModel.create(data);

        return {
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            password: doc.password,
            createdAt: doc.createdAt.toISOString()
        };
    };

    // async findAll(): Promise<Member[]> {
    //     const docs = await MemberModel.find()
    //
    //     return docs.map(doc => ({
    //         id: doc._id.toString(),
    //         name: doc.name,
    //         email: doc.email,
    //         createdAt: doc.createdAt.toISOString()
    //     }));
    // };

    async findAll(options: QueryOptions): Promise<PaginationResult<Member>> {
        const {
            page = 1,
            limit = 10,
            search,
            sortBy = "createdAt",
            sortOrder = "desc"
        } = options;

        const skip = (page - 1) * limit;
        const filter: any = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ]
        };

        const sort: any = {
            [sortBy]: sortOrder === "asc" ? 1 : -1,
        };

        const [docs, total] = await Promise.all([
            MemberModel.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit),
            MemberModel.countDocuments(filter)
        ]);

        return {
            data: docs.map(doc => ({
                id: doc._id.toString(),
                name: doc.name,
                email: doc.email,
                password: doc.password,
                createdAt: doc.createdAt.toISOString()
            })),
            total,
            page,
            limit,
            totalPages: Math.ceil(total/limit)
        };
    };

    async findById(id: string): Promise<Member | null> {
        const doc = await MemberModel.findById(id);
        if (!doc) return null;

        return {
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            password: doc.password,
            createdAt: doc.createdAt.toISOString()
        };
    };

    async findByEmail(email: string): Promise<Member | null> {
        const doc = await MemberModel.findOne({ email });
        if (!doc) return null;

        return {
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            password: doc.password,
            createdAt: doc.createdAt.toISOString()
        }
    }

    async update(id: string, data: Partial<Member>): Promise<Member | null> {
        const doc = await MemberModel.findByIdAndUpdate(id, data, { new: true });
        if (!doc) return null;

        return {
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            password: doc.password,
            createdAt: doc.createdAt.toISOString()
        };
    };

    async delete(id: string): Promise<void> {
        await MemberModel.findByIdAndDelete(id);
    }
}