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
 * Used to retrieve the {@link PanelRegistrationService} 
 *
 * @public
 */
export function getPanelRegistrationService(): PanelRegistrationService {
  return singletonInstance;
}