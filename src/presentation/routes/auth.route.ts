import { Router } from 'express';
import { buildAuthController } from "../modules/auth.module";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();
const controller = buildAuthController();

// Route Handler
router.post(
    "/login",
    asyncHandler(controller.login.bind(controller)),
);

router.post(
    "/logout",
    // authMiddleware,
    asyncHandler(controller.logout.bind(controller)),
)

router.post(
    "/refresh",
    asyncHandler(controller.refreshToken.bind(controller)),
)

export default router;