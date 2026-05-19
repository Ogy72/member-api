import { Router } from 'express';
import {asyncHandler} from "../../shared/utils/asyncHandler";
import {validate} from "../middlewares/validate.middleware";
import {createMemberSchema} from "../../core/member/dto/create-member.dto";
import {updateMemberSchema} from "../../core/member/dto/update-member.dto";
import { bulkDeleteMemberSchema } from "../../core/member/dto/bulk-delete-member.dto";
import {buildMemberController} from "../modules/member.module";
import {authMiddleware} from "../middlewares/auth.middleware";
import { validateQuery } from "../middlewares/validate-query.middleware";
import { getMembersQuerySchema } from "../../core/member/dto/get-members-query.dto";

const router = Router();
const controller = buildMemberController();

// Route Handler
router.get('/',
    authMiddleware,
    validateQuery(getMembersQuerySchema),
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

router.delete("/bulk",
    authMiddleware,
    validate(bulkDeleteMemberSchema),
    asyncHandler(controller.bulkDelete.bind(controller))
)

router.delete("/:id",
    authMiddleware,
    asyncHandler(controller.delete.bind(controller))
);

router.get("/me",
    authMiddleware,
    asyncHandler(controller.me.bind(controller)),
)


export default router;