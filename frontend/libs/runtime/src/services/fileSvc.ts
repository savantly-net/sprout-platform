import {FileService} from '@savantly/sprout-api';
let singletonInstance: FileService;

/**
 * Used during startup by Sprout to set the service so it is available
 * via the {@link getFileService} to the rest of the application.
 *
 * @internal
 */
export function setFileService(instance: FileService) {
  singletonInstance = instance;
}

/**
 * Used to retrieve the {@link LocationSrv} that can be used to automatically navigate
 * the user to a new place in Grafana.
 *
 * @public
 */
export function getFileService(): FileService {
  return singletonInstance;
}