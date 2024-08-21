import { IIssue } from '@/models/Issues';
import { HttpServices } from '@/utils';
import { GetIssuesParams } from '../types';

export class IssueService extends HttpServices {
  static getIssues(params: GetIssuesParams, signal?: AbortSignal) {
    const queryString = new URLSearchParams(params as any).toString();
    const path = `/api/v1/issues?${queryString}`;
    return this.get<IIssue>(path, { signal });
  }
}
