export interface PaginationResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    search: string | undefined;
    sortBy: string;
    sortOrder: string;
    totalPages: number;
}