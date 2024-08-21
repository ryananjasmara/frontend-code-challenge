import { useQuery, UseQueryResult } from 'react-query';
import { IssueService } from '@/services/apis';
import { IIssue } from '@/models/Issues';
import { GetIssueRequest } from '@/services/types';
import { ISSUE_QUERY_KEY } from '../constant';

export const useGetIssues = (
  opts: GetIssueRequest
): UseQueryResult<IIssue> => {
  return useQuery(
    [ISSUE_QUERY_KEY.getIssues],
    ({ signal }) =>
      IssueService.getIssues(signal)
        .then((res) => res?.data)
        .catch((error: any) => {
          if (error?.code !== "ERR_CANCELED") {
            throw error;
          }
        }),
    {
      enabled: opts?.enabled || false,
      retry: opts?.retry || false,
    }
  );
};