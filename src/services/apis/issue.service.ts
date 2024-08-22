import { HttpServices } from '@/shared/utils';
import {
  CreateIssuePayload,
  DeleteIssueParams,
  GetIssueDetailParams,
  GetIssuesParams,
  UpdateIssuePayload
} from '../types';

export class IssueService extends HttpServices {
  static getIssues(params: GetIssuesParams, signal?: AbortSignal) {
    const filteredParams = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(params).filter(([_, value]) => value !== '')
    );
    const queryString = new URLSearchParams(filteredParams as any).toString();
    const path = `/api/v1/issues?${queryString}`;
    return this.get(path, { signal });
  }

  static getIssueDetail(params: GetIssueDetailParams, signal?: AbortSignal) {
    const queryString = new URLSearchParams(params as any).toString();
    const path = `/api/v1/issues?${queryString}`;
    return this.get(path, { signal });
  }

  static deleteIssue(params: DeleteIssueParams, signal?: AbortSignal) {
    const queryString = new URLSearchParams(params as any).toString();
    const path = `/api/v1/issues?${queryString}`;
    return this.delete(path, { signal });
  }

  static createIssue(data: CreateIssuePayload, signal?: AbortSignal) {
    return this.post('/api/v1/issues', { ...data, signal });
  }

  static updateIssue(data: UpdateIssuePayload, signal?: AbortSignal) {
    const { id, ...requestBody } = data;
    const queryString = new URLSearchParams({ id } as any).toString();
    return this.put(`/api/v1/issues?${queryString}`, {
      ...requestBody,
      signal
    });
  }
}
