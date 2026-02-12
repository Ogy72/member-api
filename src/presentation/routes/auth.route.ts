import { Router } from 'express';
import { buildAuthController } from "../modules/auth.module";
import { asyncHandler } from "../../shared/utils/asyncHandler";

const router = Router();
const controller = buildAuthController();

router.post(
    "/login",
    asyncHandler(controller.login.bind(controller)),
)

export default router;