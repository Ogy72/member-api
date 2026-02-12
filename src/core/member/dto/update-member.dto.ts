import { z } from "zod";

export const updateMemberSchema = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
});

export type UpdateMemberDto = z.infer<typeof updateMemberSchema>;