import { AnyAction, combineReducers } from 'redux';
import sharedReducers from '.';
import dashboardReducers from '../../features/dashboard/state/reducers';
import { issueStateProvider } from '../../features/feedback/entity';
import { filesReducer } from '../../features/files/state';
import importDashboardReducers from '../../features/manage-dashboards/state/reducers';
import { navTreeReducer } from '../../features/navigation/navTree';
import pluginReducers from '../../features/plugins/state/reducers';
import { CleanUp, cleanUpAction } from '../actions/cleanUp';
import { locationReducer } from '../services/locationSvc';

export const rootReducers = {
  ...sharedReducers,
  ...dashboardReducers,
  ...pluginReducers,
  ...importDashboardReducers,
  navTree: navTreeReducer,
  location: locationReducer,
  files: filesReducer,
  issues: issueStateProvider.slice.reducer
};

const addedReducers = {};

export const addReducer = (newReducers: any) => {
  Object.assign(addedReducers, newReducers);
};

export const createRootReducer = () => {
  const appReducer = combineReducers({
    ...rootReducers,
    ...addedReducers
  });

  return (state: any, action: AnyAction): any => {
    if (action.type !== cleanUpAction.type) {
      return appReducer(state, action);
    }

    const { stateSelector } = action.payload as CleanUp<any>;
    const stateSlice = stateSelector(state);
    recursiveCleanState(state, stateSlice);

    return appReducer(state, action);
  };
};

export const recursiveCleanState = (state: any, stateSlice: any): boolean => {
  for (const stateKey in state) {
    if (!state.hasOwnProperty(stateKey)) {
      continue;
    }

    const slice = state[stateKey];
    if (slice === stateSlice) {
      state[stateKey] = undefined;
      return true;
    }

    if (typeof slice === 'object') {
      const cleaned = recursiveCleanState(slice, stateSlice);
      if (cleaned) {
        return true;
      }
    }
  }

  return false;
};
