import { BaseEntityService, EntityState, EntityStateProvider, TenantedEntity } from '@savantly/sprout-api';
import { SERVER_API_URL } from '../../config/constants';
import { sproutApiSvc } from '../../core/services/sproutApiSvc';

export interface IssueComment extends TenantedEntity {
  text: string;
}

export interface IssueEntity extends TenantedEntity {
  title?: string;
  description?: string;
  tags?: string[];
  comments?: IssueComment[];
}

export type IssueEntityState = EntityState<IssueEntity>;

class IssueEntityService extends BaseEntityService<IssueEntity> {
  constructor() {
    super({
      baseUrl: `${SERVER_API_URL}/api/issues`
    });
  }

  addComment = (text: string, issueId: string) => {
    return sproutApiSvc.post<IssueComment>(`${SERVER_API_URL}/api/issues/${issueId}/comments`, {
      text
    });
  };
}
const issueEntityService = new IssueEntityService();
export { issueEntityService };

export const issueStateProvider = new EntityStateProvider<IssueEntity>({
  entityService: issueEntityService,
  initialState: {
    isFetched: false,
    isFetching: false,
    example: {}
  },
  stateKey: 'issues'
});
