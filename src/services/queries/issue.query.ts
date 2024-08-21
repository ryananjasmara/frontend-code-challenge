import { useQuery, UseQueryResult } from 'react-query';
import { IssueService } from '@/services/apis';
import { IIssue } from '@/models/Issues';
import { GetIssueRequest } from '@/services/types';
import { ISSUE_QUERY_KEY } from '../constant';
import { PaginatedResponse } from '@/shared/types';

export const useGetIssues = (
  opts: GetIssueRequest
): UseQueryResult<PaginatedResponse<IIssue>> => {
  return useQuery(
    [ISSUE_QUERY_KEY.getIssues, opts.params],
    ({ signal }) =>
      IssueService.getIssues(opts.params, signal)
        .then((res) => res?.data)
        .catch((error: any) => {
          if (error?.code !== "ERR_CANCELED") {
            throw error;
          }
        }),
    {
      enabled: opts?.enabled || false,
      retry: opts?.retry || false,
      staleTime: opts?.staleTime || 0,
    }
  );
};