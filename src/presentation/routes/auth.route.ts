import { Router } from 'express';
import { buildAuthController } from "../modules/auth.module";
import { asyncHandler } from "../../shared/utils/asyncHandler";

const router = Router();
const controller = buildAuthController();

// Route Handler
router.post(
    "/login",
    asyncHandler(controller.login.bind(controller)),
);

router.post(
    "/refresh",
    asyncHandler(controller.refreshToken.bind(controller)),
)

export default router;