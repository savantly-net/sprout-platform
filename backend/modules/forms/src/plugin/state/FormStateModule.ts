import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { formQueryReducer, formReducer, submissionQueryReducer, submissionReducer } from 'plugin/pages/form/state';
import { IModule } from 'redux-dynamic-modules';
import { FormModuleRootState, FormModuleState } from '../types';

const combinedReducers = combineReducers({
  form: formReducer,
  forms: formQueryReducer,
  submission: submissionReducer,
  submissions: submissionQueryReducer,
  event: combineReducers({
    form: formReducer,
    submission: submissionReducer,
    submissions: submissionQueryReducer,
  }),
});

function formModuleStateReducer(state: FormModuleState | undefined, action: AnyAction): FormModuleState {
  return combinedReducers(state, action);
}

const FormStateModule: IModule<FormModuleRootState> = {
  id: 'form-module',
  reducerMap: {
    formModuleState: formModuleStateReducer,
  },
};

export const getFormStateModule = () => FormStateModule;
