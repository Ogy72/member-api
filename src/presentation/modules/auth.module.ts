import { MemberMongoRepository } from "../../infrastructure/persistence/member/member.mongo.repository";
import { LoginUseCase } from "../../core/member/usecases/login.usecase";
import { AuthController } from "../controllers/auth.controller";

export const buildAuthController = () => {
    const repository = new MemberMongoRepository();

    const loginUseCase = new LoginUseCase(repository);

    return new AuthController(loginUseCase);
}