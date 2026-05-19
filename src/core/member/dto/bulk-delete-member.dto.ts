import { z } from "zod"

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const bulkDeleteMemberSchema = z.object({
    ids: z
        .array(z.string().regex(objectIdRegex, "Invalid member id format"))
        .min(1, "ids is required")
        .max(10, "Maximum 10 ids per request"),
});

export type BulkDeleteMemberDto = z.infer<typeof bulkDeleteMemberSchema>;
