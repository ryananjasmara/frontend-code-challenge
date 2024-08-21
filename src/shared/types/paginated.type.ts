export type PaginatedResponse<Item> = {
    data: Item[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
};

export type PaginatedRequestParams = {
    skip?: number;
    limit?: number;
    search?: string;
};
