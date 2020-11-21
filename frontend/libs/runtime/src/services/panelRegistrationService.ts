import { PanelRegistrationService } from '@savantly/sprout-api';

let singletonInstance: PanelRegistrationService;

/**
 * Used during startup by Sprout to set the service so it is available
 * via the {@link getPanelRegistrationService} to the rest of the application.
 *
 * @internal
 */
export function setPanelRegistrationService(instance: PanelRegistrationService) {
  singletonInstance = instance;
}

/**
 * Used to retrieve the {@link LocationSrv} that can be used to automatically navigate
 * the user to a new place in Grafana.
 *
 * @public
 */
export function getPanelRegistrationService(): PanelRegistrationService {
  return singletonInstance;
}