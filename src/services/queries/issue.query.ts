import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { IssueService } from '@/services/apis';
import { IIssue } from '@/models/Issues';
import { DeleteIssueParams, DeleteIssueResponse, GetIssueRequest } from '@/services/types';
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

export const useDeleteIssue = (): UseMutationResult<DeleteIssueResponse, unknown, DeleteIssueParams, unknown> => {
  const queryClient = useQueryClient();

  const mutation = useMutation<DeleteIssueResponse, unknown, DeleteIssueParams, unknown>(
    [ISSUE_QUERY_KEY.deleteIssue],
    {
      mutationFn: async (params: DeleteIssueParams) => {
        const response = await IssueService.deleteIssue(params);
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries(ISSUE_QUERY_KEY.getIssues);
      },
      onError: (error: any) => {
        throw error;
      },
      retry: 0,
    },
  );

  return mutation;
}
