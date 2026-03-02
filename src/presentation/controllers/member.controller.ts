import { Request, Response } from 'express';
import { IdParams } from "../types/id-params.type";
import { CreateMemberDto } from "../../core/member/dto/create-member.dto";
import { UpdateMemberDto } from "../../core/member/dto/update-member.dto";
import type { GetMembersUseCase } from "../../core/member/usecases/get-member-usecase";
import type { CreateMemberUseCase } from "../../core/member/usecases/create-member.usecase";
import type { UpdateMemberUseCase } from "../../core/member/usecases/update-member.usecase";
import type { DeleteMemberUseCase } from "../../core/member/usecases/delete-member.usecase";
import type { GetMeUseCase } from "../../core/member/usecases/get-me.usecase";
import {QueryOptions} from "../../core/types/query-options.type";
import {AuthRequest} from "../middlewares/auth.middleware";

export class MemberController {
    constructor(
        private getMemberUseCase: GetMembersUseCase,
        private createMemberUseCase: CreateMemberUseCase,
        private updateMemberUseCase: UpdateMemberUseCase,
        private deleteMemberUseCase: DeleteMemberUseCase,
        private getMeUseCase: GetMeUseCase
    ) {};

    async getAll(
        req: Request<{}, {}, {}, QueryOptions>,
        res: Response,
    ) {
        // const result = await this.getMemberUseCase.execute({
        //     page: Number(req.query.page) || 1,
        //     limit: Number(req.query.limit),
        //     search: req.query.search,
        //     sortBy: req.query.sortBy,
        //     sortOrder: req.query.sortOrder as 'asc' | 'desc',
        // });

        const result = await this.getMemberUseCase.execute(req.query as QueryOptions);

        res.json(result);
    }

    async create(req: Request, res: Response) {
        const data: CreateMemberDto = req.body;
        const create = await this.createMemberUseCase.execute(
            data.name,
            data.email,
            data.password
        );

        res.status(201).json(create);
    };

    async update(req: Request<IdParams>, res: Response) {
        const data: UpdateMemberDto = req.body;
        const updated = await this.updateMemberUseCase.execute(
            req.params.id,
            data,
        );
        res.json(updated);
    }

    async delete(req: Request<IdParams>, res: Response) {
        await this.deleteMemberUseCase.execute(req.params.id);
        res.status(204).send();
    }

    async me(req: AuthRequest, res: Response) {
        const user = await this.getMeUseCase.execute(req.user!.id)
        res.json(user);
    }


}