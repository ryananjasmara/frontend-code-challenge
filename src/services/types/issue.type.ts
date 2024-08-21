export type GetIssueRequest = {
    enabled?: boolean;
    retry?: number;
    staleTime?: number;
    params: GetIssuesParams;
};

export type GetIssuesParams = {
    page: number;
    limit: number;
};