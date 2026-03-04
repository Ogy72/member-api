export interface PaginationMeta{
    total: number;
    page: number;
    limit: number;
    search: string | undefined;
    sortBy: string;
    sortOrder: string;
    totalPages: number;
}

export interface PaginationResult<T> {
    data: T[];
    meta: PaginationMeta;
}