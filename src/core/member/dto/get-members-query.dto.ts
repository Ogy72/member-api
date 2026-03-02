import { z } from "zod"

export const memberSortFields = ["name", "email", "createdAt", "updatedAt"] as const;

export const getMembersQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    search: z.coerce.string().trim().min(1).optional(),
    sortBy: z.enum(memberSortFields).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type GetMembersQueryDto = z.infer<typeof getMembersQuerySchema>;