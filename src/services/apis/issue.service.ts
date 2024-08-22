import { IIssue } from '@/models/Issues';
import { HttpServices } from '@/utils';
import { DeleteIssueParams, GetIssuesParams } from '../types';

export class IssueService extends HttpServices {
  static getIssues(params: GetIssuesParams, signal?: AbortSignal) {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '')
    );
    const queryString = new URLSearchParams(filteredParams as any).toString();
    const path = `/api/v1/issues?${queryString}`;
    return this.get<IIssue>(path, { signal });
  }

  static deleteIssue(params: DeleteIssueParams, signal?: AbortSignal) {
    const queryString = new URLSearchParams(params as any).toString();
    const path = `/api/v1/issues?${queryString}`;
    return this.delete(path, { signal });
  }
}
