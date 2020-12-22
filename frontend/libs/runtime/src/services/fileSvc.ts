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
 * Used to retrieve the {@link FileService} 
 *
 * @public
 */
export function getFileService(): FileService {
  return singletonInstance;
}