import { PayloadAction, Reducer } from '@reduxjs/toolkit';
import { AppForm, AppFormDto } from '../../../types';

const initialState: AppForm = {
  isActive: false,
  lastUpdated: 0,
  form: {
    display: 'form',
    type: 'form',
  },
  url: '',
  error: '',
};

const formInitStartedReducer = (state: AppForm, action: PayloadAction): AppForm => {
  if (state.isActive) {
    console.warn('there is already a form initialization in progress');
    return state;
  } else {
    return {
      ...state,
      isActive: true,
      error: '',
    };
  }
};
const FORM_INIT_STARTED = 'formInitStarted';
export const formInitStarted = (): PayloadAction => {
  return {
    type: FORM_INIT_STARTED,
    payload: undefined,
  };
};

const formInitCompletedReducer = (state: AppForm, action: PayloadAction<AppFormDto>): AppForm => ({
  ...state,
  _id: action.payload._id,
  form: { ...action.payload },
  error: '',
  isActive: false,
});
const FORM_INIT_COMPLETED = 'formInitCompleted';
export const formInitCompleted = (payload: AppFormDto): PayloadAction<AppFormDto> => {
  return {
    type: FORM_INIT_COMPLETED,
    payload,
  };
};

const formInitFailedReducer = (state: AppForm, action: PayloadAction<{ error: string }>): AppForm => ({
  ...state,
  error: action.payload.error,
  isActive: false,
});
const FORM_INIT_FAILED = 'formInitFailed';
export const formInitFailed = (payload: { error: string }): PayloadAction<{ error: string }> => {
  return {
    type: FORM_INIT_FAILED,
    payload,
  };
};

export const formReducer: Reducer<AppForm, PayloadAction<any>> = (
  state: AppForm = initialState,
  action: PayloadAction<any>
) => {
  switch (action.type) {
    case FORM_INIT_STARTED:
      return formInitStartedReducer(state, action);
    case FORM_INIT_COMPLETED:
      return formInitCompletedReducer(state, action);
    case FORM_INIT_FAILED:
      return formInitFailedReducer(state, action);
    default:
      return state;
  }
};
