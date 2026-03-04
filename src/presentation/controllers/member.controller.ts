import { Request, Response } from 'express';
import { IdParams } from "../types/id-params.type";
import { CreateMemberDto } from "../../core/member/dto/create-member.dto";
import { UpdateMemberDto } from "../../core/member/dto/update-member.dto";
import { BulkDeleteMemberDto } from "../../core/member/dto/bulk-delete-member.dto";
import type { GetMembersUseCase } from "../../core/member/usecases/get-member-usecase";
import type { CreateMemberUseCase } from "../../core/member/usecases/create-member.usecase";
import type { UpdateMemberUseCase } from "../../core/member/usecases/update-member.usecase";
import type { DeleteMemberUseCase } from "../../core/member/usecases/delete-member.usecase";
import type { BulkDeleteMemberUseCase } from "../../core/member/usecases/bulk-delete-member.usecase";
import type { GetMeUseCase } from "../../core/member/usecases/get-me.usecase";
import {QueryOptions} from "../../core/types/query-options.type";
import {AuthRequest} from "../middlewares/auth.middleware";
import {toMemberResponse} from "../../core/member/dto/member-response.dto";

export class MemberController {
    constructor(
        private getMemberUseCase: GetMembersUseCase,
        private createMemberUseCase: CreateMemberUseCase,
        private updateMemberUseCase: UpdateMemberUseCase,
        private deleteMemberUseCase: DeleteMemberUseCase,
        private bulkDeleteMemberUseCase: BulkDeleteMemberUseCase,
        private getMeUseCase: GetMeUseCase
    ) {};

    async getAll(
        req: Request<{}, {}, {}, QueryOptions>,
        res: Response,
    ) {

        const query = res.locals.validateQuery as QueryOptions;
        const result = await this.getMemberUseCase.execute(query);

        // res.json(result);

        res.json({
            ...result,
            data: result.data.map(toMemberResponse),
        });
    }

    async create(req: Request, res: Response) {
        const data: CreateMemberDto = req.body;
        const created = await this.createMemberUseCase.execute(
            data.name,
            data.email,
            data.password
        );

        // res.status(201).json(create);
        res.status(201).json(toMemberResponse(created));
    };

    async update(req: Request<IdParams>, res: Response) {
        const data: UpdateMemberDto = req.body;
        const updated = await this.updateMemberUseCase.execute(
            req.params.id,
            data,
        );

        res.json(toMemberResponse(updated));
    }

    async delete(req: Request<IdParams>, res: Response) {
        await this.deleteMemberUseCase.execute(req.params.id);
        res.status(204).send();
    }

    async bulkDelete(req: Request, res: Response) {
        const data = req.body as BulkDeleteMemberDto;
        const result = await this.bulkDeleteMemberUseCase.execute(data.ids);
        res.json(result);
    }

    async me(req: AuthRequest, res: Response) {
        const user = await this.getMeUseCase.execute(req.user!.id)
        res.json(user);
    }


}