import { Router } from 'express';
import {asyncHandler} from "../../shared/utils/asyncHandler";
import {validate} from "../middlewares/validate.middleware";
import {createMemberSchema} from "../../core/member/dto/create-member.dto";
import {updateMemberSchema} from "../../core/member/dto/update-member.dto";
import {buildMemberController} from "../modules/member.module";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();
const controller = buildMemberController();

// Route Handler
router.get('/',
    authMiddleware,
    asyncHandler(controller.getAll.bind(controller))
);

router.post("/",
    validate(createMemberSchema),
    asyncHandler(controller.create.bind(controller))
);

router.patch("/:id",
    authMiddleware,
    validate(updateMemberSchema),
    asyncHandler(controller.update.bind(controller))
);

router.delete("/:id",
    authMiddleware,
    asyncHandler(controller.delete.bind(controller))
);


export default router;