import { DeepPartial, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// createStore allows us to load/unload modules dynamically.
import { createStore, IModuleStore } from 'redux-dynamic-modules';
// Thunk extension allows us to use Thunk middleware in the module store.
import { getThunkExtension } from 'redux-dynamic-modules-thunk';
import { createLogger } from 'redux-logger';
import { applicationInitialState } from '../core/reducers/application';
import { initialAuthenticationState } from '../core/reducers/authentication';
import { buildInitialState } from '../core/reducers/navModel';
import { addReducer, rootReducers } from '../core/reducers/root';
import { initialPanelEditorState } from '../features/dashboard/components/PanelEditor/state/reducers';
import { initialDashboardState } from '../features/dashboard/state';
import { initialPluginState } from '../features/plugins/state/reducers';
import { defaultNavTree } from '../mocks/navTree';
import { StoreState } from '../types/store';
import { setStore } from './store';

export const history = createBrowserHistory();

// TODO: eliminate this and move to dynamic loading
export function addRootReducer(reducers: any) {
  // this is ok now because we add reducers before configureStore is called
  // in the future if we want to add reducers during runtime
  // we'll have to solve this in a more dynamic way
  addReducer(reducers);
}

export function configureStore() {
  const logger = createLogger({
    predicate: (getState) => {
      return getState().application.logActions;
    }
  });

  const middleware = process.env.NODE_ENV !== 'production' ? [logger] : [];

  const reduxDefaultMiddleware = getDefaultMiddleware<StoreState>({
    thunk: true,
    serializableCheck: false,
    immutableCheck: false
  } as any);

  const store: IModuleStore<DeepPartial<StoreState>> = createStore(
    {
      extensions: [getThunkExtension()],
      advancedComposeEnhancers: composeWithDevTools({ trace: true }),
      initialState: {
        application: applicationInitialState,
        appNotifications: {
          appNotifications: []
        },
        authentication: initialAuthenticationState,
        dashboard: initialDashboardState,
        navIndex: buildInitialState(),
        navTree: { items: defaultNavTree },
        panelEditor: initialPanelEditorState(),
        plugins: initialPluginState
      }
    },
    {
      id: 'rootModule',
      middlewares: [...reduxDefaultMiddleware, ...middleware],
      reducerMap: {
        appNotifications: rootReducers.appNotifications,
        application: rootReducers.application,
        authentication: rootReducers.authentication,
        dashboard: rootReducers.dashboard,
        navIndex: rootReducers.navIndex,
        navTree: rootReducers.navTree,
        location: rootReducers.location,
        panelEditor: rootReducers.panelEditor,
        plugins: rootReducers.plugins
      }
    }
  );

  setStore((store as unknown) as IModuleStore<StoreState>);
  return (store as unknown) as IModuleStore<StoreState>;
}
