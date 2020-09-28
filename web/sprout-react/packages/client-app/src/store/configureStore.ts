import { configureStore as reduxConfigureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { ThunkMiddleware } from 'redux-thunk';
import { setStore } from './store';
import { StoreState } from '../types/store';
import { toggleLogActionsMiddleware } from '../core/middlewares/application';
import { addReducer, createRootReducer } from '../core/reducers/root';
import { buildInitialState } from '../core/reducers/navModel';

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
    reducer: createRootReducer(),
    middleware: [...reduxDefaultMiddleware, ...middleware] as [ThunkMiddleware<StoreState>],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {
      navIndex: buildInitialState(),
    },
  });

  setStore(store);
  return store;
}