export interface QueryOptions {
    page: number;
    limit: number;
    search?: string;
    sortBy: "name" | "email" | "createdAt";
    sortOrder?: "asc" | "desc";
}