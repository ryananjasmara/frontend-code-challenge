import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult
} from 'react-query';
import { IssueService } from '@/services/apis';
import { IIssue } from '@/models/Issues';
import {
  CreateIssuePayload,
  CreateIssueResponse,
  DeleteIssueParams,
  DeleteIssueResponse,
  GetIssueDetailRequest,
  GetIssueRequest,
  UpdateIssuePayload,
  UpdateIssueResponse
} from '@/services/types';
import { ISSUE_QUERY_KEY } from '../constant';
import { PaginatedResponse, NonPaginatedResponse } from '@/shared/types';
import { useToastContext } from '@/contexts/Toast.context';

export const useGetIssues = (
  opts: GetIssueRequest
): UseQueryResult<PaginatedResponse<IIssue>> => {
  const { showToast } = useToastContext();

  return useQuery(
    [ISSUE_QUERY_KEY.getIssues, opts.params],
    ({ signal }) =>
      IssueService.getIssues(opts.params, signal)
        .then((res) => res?.data)
        .catch((error: any) => {
          if (error?.message !== 'canceled') {
            showToast({
              message: 'Something went wrong',
              duration: 3000,
              type: 'error'
            });
            throw error;
          }
        }),
    {
      enabled: opts?.enabled || false,
      retry: opts?.retry || false,
      staleTime: opts?.staleTime || 0
    }
  );
};

export const useGetIssueDetail = (
  opts: GetIssueDetailRequest
): UseQueryResult<NonPaginatedResponse<IIssue>> => {
  const { showToast } = useToastContext();

  return useQuery(
    [ISSUE_QUERY_KEY.getIssueDetail, opts.params],
    ({ signal }) =>
      IssueService.getIssueDetail(opts.params, signal)
        .then((res) => res?.data)
        .catch((error: any) => {
          if (error?.message !== 'canceled') {
            showToast({
              message: 'Something went wrong',
              duration: 3000,
              type: 'error'
            });
            throw error;
          }
        }),
    {
      enabled: opts?.enabled || false
    }
  );
};

export const useDeleteIssue = (): UseMutationResult<
  DeleteIssueResponse,
  unknown,
  DeleteIssueParams,
  unknown
> => {
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  const mutation = useMutation<
    DeleteIssueResponse,
    unknown,
    DeleteIssueParams,
    unknown
  >([ISSUE_QUERY_KEY.deleteIssue], {
    mutationFn: async (params: DeleteIssueParams) => {
      const response = await IssueService.deleteIssue(params);
      return response.data;
    },
    onSuccess: () => {
      showToast({
        message: 'Issue deleted successfully',
        duration: 3000,
        type: 'success'
      });
      queryClient.invalidateQueries(ISSUE_QUERY_KEY.getIssues);
    },
    onError: (error: any) => {
      showToast({
        message: 'Something went wrong',
        duration: 3000,
        type: 'error'
      });
      throw error;
    },
    retry: 0
  });

  return mutation;
};

export const useCreateIssue = (): UseMutationResult<
  CreateIssueResponse,
  unknown,
  CreateIssuePayload,
  unknown
> => {
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  const mutation = useMutation<
    CreateIssueResponse,
    unknown,
    CreateIssuePayload,
    unknown
  >([ISSUE_QUERY_KEY.createIssue], {
    mutationFn: async (data: CreateIssuePayload) => {
      const response = await IssueService.createIssue(data);
      return response.data;
    },
    onSuccess: () => {
      showToast({
        message: 'Issue created successfully',
        duration: 3000,
        type: 'success'
      });
      queryClient.invalidateQueries(ISSUE_QUERY_KEY.getIssues);
    },
    onError: (error: any) => {
      showToast({
        message: 'Something went wrong',
        duration: 3000,
        type: 'error'
      });
      throw error;
    },
    retry: 0
  });

  return mutation;
};

export const useUpdateIssue = (): UseMutationResult<
  UpdateIssueResponse,
  unknown,
  UpdateIssuePayload,
  unknown
> => {
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  const mutation = useMutation<
    UpdateIssueResponse,
    unknown,
    UpdateIssuePayload,
    unknown
  >([ISSUE_QUERY_KEY.createIssue], {
    mutationFn: async (data: UpdateIssuePayload) => {
      const response = await IssueService.updateIssue(data);
      return response.data;
    },
    onSuccess: () => {
      showToast({
        message: 'Issue updated successfully',
        duration: 3000,
        type: 'success'
      });
      queryClient.invalidateQueries(ISSUE_QUERY_KEY.getIssues);
    },
    onError: (error: any) => {
      showToast({
        message: 'Something went wrong',
        duration: 3000,
        type: 'error'
      });
      throw error;
    },
    retry: 0
  });

  return mutation;
};
