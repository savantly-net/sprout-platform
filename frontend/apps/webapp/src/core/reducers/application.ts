import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationState, ApplicationUIProperty } from '../../types/application';

export const applicationInitialState: ApplicationState = {
  logActions: false,
  themeName: 'light',
  settings: {}
};

const applicationSlice = createSlice({
  name: 'application',
  initialState: applicationInitialState,
  reducers: {
    toggleLogActions: state => ({ ...state, logActions: !state.logActions }),
    switchTheme: state => ({...state}),
    updateAppSettings: (state, action: PayloadAction<ApplicationUIProperty[]>) => {
      const settings: {[key:string]:string} = {};
       action.payload.map(item => {
        settings[item.name] = item.value;
      })
      return {...state, settings};
    }
  },
});

export const { toggleLogActions, switchTheme, updateAppSettings } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
