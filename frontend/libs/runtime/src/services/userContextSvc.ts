import { UserContext } from '@savantly/sprout-api';
export interface UserContextService {
    getUserContext: () => UserContext;
}

let singletonInstance: UserContextService;

/**
 * Used during startup by Sprout to set the service so it is available
 * via the {@link getUserContextService} to the rest of the application.
 *
 * @internal
 */
export function setUserContextService(instance: UserContextService) {
  singletonInstance = instance;
}

/**
 * Used to retrieve the {@link UserContextService}
 *
 * @public
 */
export function getUserContextService(): UserContextService {
  return singletonInstance;
}
