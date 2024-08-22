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
  sortBy?: string;
  order?: string;
};

export type GetIssueDetailRequest = {
  enabled?: boolean;
  params: GetIssueDetailParams;
};

export type GetIssueDetailParams = {
  id: string;
};

export type DeleteIssueParams = {
  id: string;
};

export type DeleteIssueResponse = {
  message: string;
};

export type CreateIssuePayload = {
  title: string;
  issueNumber: number;
  issueDate: string;
  imageUri: string;
};

export type CreateIssueResponse = {
  message: string;
};

export type UpdateIssuePayload = {
  id: string;
  title: string;
  issueNumber: number;
  issueDate: string;
  imageUri: string;
};

export type UpdateIssueResponse = {
  message: string;
};
