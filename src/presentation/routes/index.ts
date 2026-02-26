import { Router } from 'express';
import authRoute from "./auth.route";
import memberRoute from "./member.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/members", memberRoute);

export default router;