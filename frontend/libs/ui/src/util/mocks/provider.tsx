import { combineReducers, createStore } from '@reduxjs/toolkit';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { demoEntityState_fetched } from './entity';

const initialState = demoEntityState_fetched;

const demoReducer = (state = initialState, action: any) => {
  return initialState;
};

const reducer = combineReducers({
  demoEntityState: demoReducer
});
const store = createStore(reducer);

export const ProviderWrapper = ({ children }: { children: ReactElement }) => (
  <Provider store={store}>{children}</Provider>
);
