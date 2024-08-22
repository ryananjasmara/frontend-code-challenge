export type GetIssueRequest = {
    enabled?: boolean;
    retry?: number;
    staleTime?: number;
    params: GetIssuesParams;
};

export type GetIssuesParams = {
    page: number;
    limit: number;
    keyword?: string;
};

export type DeleteIssueParams = {  
    id: string;
};

export type DeleteIssueResponse = {
    message: string;
};

