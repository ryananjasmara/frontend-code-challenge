import { formatQueryString, HttpServices } from '@/shared/utils';
import {
  CreateIssuePayload,
  DeleteIssueParams,
  GetIssueDetailParams,
  GetIssuesParams,
  UpdateIssuePayload
} from '../types';

export class IssueService extends HttpServices {
  static getIssues(params: GetIssuesParams, signal?: AbortSignal) {
    const queryString = formatQueryString(params);
    const path = `/api/v1/issues?${queryString}`;
    return this.get(path, { signal });
  }

  static getIssueDetail(params: GetIssueDetailParams, signal?: AbortSignal) {
    const queryString = formatQueryString(params);
    const path = `/api/v1/issues?${queryString}`;
    return this.get(path, { signal });
  }

  static deleteIssue(params: DeleteIssueParams, signal?: AbortSignal) {
    const queryString = formatQueryString(params);
    const path = `/api/v1/issues?${queryString}`;
    return this.delete(path, { signal });
  }

  static createIssue(data: CreateIssuePayload, signal?: AbortSignal) {
    return this.post('/api/v1/issues', { ...data, signal });
  }

  static updateIssue(data: UpdateIssuePayload, signal?: AbortSignal) {
    const { id, ...requestBody } = data;
    const queryString = formatQueryString({ id });
    return this.put(`/api/v1/issues?${queryString}`, {
      ...requestBody,
      signal
    });
  }
}
