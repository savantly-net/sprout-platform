import { BaseEntityService, EntityState, EntityStateProvider, TenantedEntity } from '@savantly/sprout-api';
import { SERVER_API_URL } from '../../config/constants';
import { sproutApiSvc } from '../../core/services/sproutApiSvc';

export interface UserRoles extends TenantedEntity {
  privileges?: string[];
}

export interface UserEntity extends TenantedEntity {
  username?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  password?: string;
  roles?: any
}

export type UserEntityState = EntityState<UserEntity>;

class UserEntityService extends BaseEntityService<UserEntity> {
  constructor() {
    super({
      baseUrl: `${SERVER_API_URL}/api/admin/users`
    });
  }

  addComment = (text: string, issueId: string) => {
    return sproutApiSvc.post<UserRoles>(`${SERVER_API_URL}/api/issues/${issueId}/comments`, {
      text
    });
  };
}
const userEntityService = new UserEntityService();
export { userEntityService };

export const userStateProvider = new EntityStateProvider<UserEntity>({
  entityService: userEntityService,
  initialState: {
    isFetched: false,
    isFetching: false,
    example: {}
  },
  stateKey: 'issues'
});
