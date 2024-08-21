import { IIssue } from '@/models/Issues';
import { HttpServices } from '@/utils';

export class IssueService extends HttpServices {
  static getIssues(signal?: AbortSignal) {
    return this.get<IIssue>('/api/v1/issues', { signal });
  }
}
