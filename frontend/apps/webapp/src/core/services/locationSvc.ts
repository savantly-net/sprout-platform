import { Action, createAction } from '@reduxjs/toolkit';
import { urlUtil } from '@savantly/sprout-api';
import { LocationUpdate } from '@savantly/sprout-runtime';
import * as H from 'history';
import $ from 'jquery';
import _ from 'lodash';
// @ts-ignore
import Drop from 'tether-drop';
import { store } from '../../store/store';
import { CoreEvents } from '../../types';
import appEvents from '../app_events';
import { setViewModeBodyClass } from "../utils/viewMode";

export type LocationUpdateService = {
  update: (payload: LocationUpdate) => void;
}

export const initialLocationState = {
  url: urlUtil.renderUrl(window.location.pathname, urlUtil.getUrlSearchParams()),
  path: window.location.pathname,
  query: urlUtil.getUrlSearchParams(),
  routeParams: {},
  replace: false,
  lastUpdated: 0,
};

/** this should only be called from inside this module
/* use the LocationUpdateService to mutate the state store
/* see `import { getLocationSrv } from "@savantly/sprout-runtime"`
*/
const updateLocation = createAction<LocationUpdate>('location/updateLocation');

export const locationReducer = (state: typeof initialLocationState = initialLocationState, action: Action<unknown>) => {
  if (updateLocation.match(action)) {
    const payload: LocationUpdate = action.payload;
    const { path, routeParams, replace } = payload;
    let query = payload.query || state.query;

    if (payload.partial) {
      query = _.defaults(query, state.query);
      query = _.omitBy(query, _.isNull);
    }

    return {
      url: urlUtil.renderUrl(path || state.path, query),
      path: path || state.path,
      query: { ...query },
      routeParams: routeParams || state.routeParams,
      replace: replace === true,
      lastUpdated: new Date().getTime(),
    };
  }

  return state;
};



const updateStyles = () => {

  const body = $('body');
  const queryParams = store.getState().location.query;

  // clear body class sidemenu states
  body.removeClass('sidemenu-open--xs');

  $('#tooltip, .tooltip').remove();

  // check for kiosk url param
  setViewModeBodyClass(body, queryParams.kiosk);

  // close all drops
  for (const drop of Drop.drops) {
    drop.destroy();
  }

  appEvents.emit(CoreEvents.hideDashSearch);
}


const _locationSvcInit  = (history: H.History): LocationUpdateService => ({
  update: (payload: LocationUpdate) =>  {
    const { path, routeParams, replace } = payload;
      let query = payload.query || urlUtil.getUrlSearchParams();
  
      if (payload.partial) {
        query = _.defaults(query, urlUtil.getUrlSearchParams());
        query = _.omitBy(query, _.isNull);
      }
  
      const location = {
        url: urlUtil.renderUrl(path || history.location.pathname, query),
        path: path || history.location.pathname,
        query: { ...query },
        replace: replace === true,
        lastUpdated: new Date().getTime(),
      };

      if(location.replace){
          history.replace({
              pathname: location.path,
              search: urlUtil.toUrlParams(location.query)
          })
      } else {
          history.push({
            pathname: location.path,
            search: urlUtil.toUrlParams(location.query)
          })
      }
      store.dispatch(updateLocation(location));
      updateStyles()
  }
})

export default _locationSvcInit;