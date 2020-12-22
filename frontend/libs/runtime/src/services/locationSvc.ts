/**
 * Passed as options to the {@link LocationSrv} to describe how the automatically navigation
 * should be performed.
 *
 * @public
 */
import { UrlQueryMap } from '@savantly/sprout-api';

export interface LocationUpdate {
  /**
   * Target path where you automatically wants to navigate the user.
   */
  path?: string;

  /**
   * Specify this value if you want to add values to the query string of the URL.
   */
  query?: UrlQueryMap;

  /**
   * If set to true, the query argument will be added to the existing URL.
   */
  partial?: boolean;

  /**
   * Used to track state - does not update url.
   * Use 'path' and 'query' to change locations
   * @internal
   */
  routeParams?: UrlQueryMap;

  /*
   * If set to true, this will replace URL state (ie. cause no new browser history).
   */
  replace?: boolean;
}

/**
 * If you need to automatically navigate the user to a new place in the application this should
 * be done via the LocationSrv and it will make sure to update the application state accordingly.
 *
 * @public
 */
export interface LocationSrv {
  update(options: LocationUpdate): void;
}

let singletonInstance: LocationSrv;

/**
 * Used during startup to set the LocationSrv so it is available
 * via the {@link getLocationSrv} to the rest of the application.
 *
 * @internal
 */
export function setLocationSrv(instance: LocationSrv) {
  singletonInstance = instance;
}

/**
 * Used to retrieve the {@link LocationSrv} 
 *
 * @public
 */
export function getLocationSrv(): LocationSrv {
  return singletonInstance;
}