import { AxiosInstance } from 'axios';

export interface ApiService extends AxiosInstance {}

let singletonInstance: ApiService;

/**
 * Used during startup by Sprout to set the service so it is available
 * via the {@link getApiService} to the rest of the application.
 *
 * @internal
 */
export function setApiService(instance: ApiService) {
  singletonInstance = instance;
}

/**
 * Used to retrieve the {@link ApiService}
 *
 * @public
 */
export function getApiService(): ApiService {
  return singletonInstance;
}
