import { createSlice } from '@reduxjs/toolkit';
import { ApplicationState } from '../../types/application';

export const initialState: ApplicationState = {
  logActions: false,
  themeName: 'light'
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    toggleLogActions: state => ({ ...state, logActions: !state.logActions }),
    switchTheme: state => ({...state})
  },
});

export const { toggleLogActions, switchTheme } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
