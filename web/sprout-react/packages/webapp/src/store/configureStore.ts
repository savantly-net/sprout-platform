import { configureStore as reduxConfigureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import { ThunkMiddleware } from 'redux-thunk';
import { toggleLogActionsMiddleware } from '../core/middlewares/application';
import { buildInitialState } from '../core/reducers/navModel';
import { addReducer, createRootReducer } from '../core/reducers/root';
import { StoreState } from '../types/store';
import { setStore } from './store';


export const history = createBrowserHistory();

export function addRootReducer(reducers: any) {
  // this is ok now because we add reducers before configureStore is called
  // in the future if we want to add reducers during runtime
  // we'll have to solve this in a more dynamic way
  addReducer(reducers);
}

export function configureStore() {
  const logger = createLogger({
    predicate: getState => {
      return getState().application.logActions;
    },
  });

  const middleware = process.env.NODE_ENV !== 'production' ? [toggleLogActionsMiddleware, logger] : [];

  const reduxDefaultMiddleware = getDefaultMiddleware<StoreState>({
    thunk: true,
    serializableCheck: false,
    immutableCheck: false,
  } as any);

  const store = reduxConfigureStore<StoreState>({
    reducer: createRootReducer(history),
    middleware: [routerMiddleware(history), ...reduxDefaultMiddleware, ...middleware] as [ThunkMiddleware<StoreState>],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {
      navIndex: buildInitialState(),
    },
  });

  setStore(store);
  return store;
}