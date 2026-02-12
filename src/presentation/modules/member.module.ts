import {MemberMongoRepository} from "../../infrastructure/persistence/member/member.mongo.repository";

import {GetMembersUseCase} from "../../core/member/usecases/get-member-usecase";
import {CreateMemberUseCase} from "../../core/member/usecases/create-member.usecase";
import {UpdateMemberUseCase} from "../../core/member/usecases/update-member.usecase";
import {DeleteMemberUseCase} from "../../core/member/usecases/delete-member.usecase";

import { MemberController } from "../controllers/member.controller";

export const buildMemberController = () => {
    const repository = new MemberMongoRepository();

    const getMemberUseCase = new GetMembersUseCase(repository);
    const createMemberUseCase = new CreateMemberUseCase(repository);
    const updateMemberUseCase = new UpdateMemberUseCase(repository);
    const deleteMemberUseCase = new DeleteMemberUseCase(repository);

    return new MemberController(
        getMemberUseCase,
        createMemberUseCase,
        updateMemberUseCase,
        deleteMemberUseCase,
    );
}