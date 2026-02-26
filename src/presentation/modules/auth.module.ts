import { MemberMongoRepository } from "../../infrastructure/persistence/member/member.mongo.repository";
import { LoginUseCase } from "../../core/member/usecases/login.usecase";
import { RefreshTokenUsecase } from "../../core/refresh-token.usecase";
import { AuthController } from "../controllers/auth.controller";

export const buildAuthController = () => {
    const repository = new MemberMongoRepository();

    const loginUseCase = new LoginUseCase(repository);
    const refreshTokenUseCase = new RefreshTokenUsecase(repository);

    return new AuthController(
        loginUseCase,
        refreshTokenUseCase
    );
}