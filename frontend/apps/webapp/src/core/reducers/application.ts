import { createSlice } from '@reduxjs/toolkit';
import { ApplicationState } from '../../types/application';

export const applicationInitialState: ApplicationState = {
  logActions: false,
  themeName: 'light'
};

const applicationSlice = createSlice({
  name: 'application',
  initialState: applicationInitialState,
  reducers: {
    toggleLogActions: state => ({ ...state, logActions: !state.logActions }),
    switchTheme: state => ({...state})
  },
});

export const { toggleLogActions, switchTheme } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
