import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  AppForm,
  AppFormQueryState,
  AppFormSubmission,
  AppFormSubmissionDto,
  AppFormSubmissionQueryState,
} from '../../../types';

const formQueryInitialState = {
  error: '',
  forms: new Array<AppForm>(), // eslint-disable-line no-array-constructor
  isActive: false,
  limit: 20,
  pagination: {
    numPages: 0,
    page: 1,
    total: 0,
  },
  query: {
    type: 'form',
    tags: ['common'],
  },
  select: '',
  sort: '',
};

const formQuerySlice = createSlice({
  name: 'formQuery',
  initialState: formQueryInitialState,
  reducers: {
    formQueryReset: (state: AppFormQueryState, action: PayloadAction): AppFormQueryState => ({
      ...formQueryInitialState,
    }),
    formQueryStarted: (state: AppFormQueryState, action: PayloadAction): AppFormQueryState => ({
      ...state,
      isActive: true,
    }),
    formQueryCompleted: (
      state: AppFormQueryState,
      action: PayloadAction<AxiosResponse<AppForm[]>>
    ): AppFormQueryState => ({
      ...state,
      isActive: false,
      error: '',
      forms: action.payload.data,
      pagination: {
        numPages: Number(action.payload.headers['x-numPages'] || '0'),
        page: Number(action.payload.headers['x-page'] || '0'),
        total: Number(action.payload.headers['x-total'] || '0'),
      },
    }),
    formQueryFailed: (state: AppFormQueryState, action: PayloadAction<{ error: string }>): AppFormQueryState => ({
      ...state,
      ...action.payload,
      isActive: false,
    }),
  },
});

const submissionSlice = createSlice({
  name: 'submission',
  initialState: {},
  reducers: {
    submissionInitStarted: (state: AppFormSubmission, action: PayloadAction): AppFormSubmission => ({
      ...state,
      isActive: true,
    }),
    submissionInitFailed: (state: AppFormSubmission, action: PayloadAction<{ error: string }>): AppFormSubmission => ({
      ...state,
      isActive: false,
      error: action.payload.error,
    }),
    submissionInitCompleted: (
      state: AppFormSubmission,
      action: PayloadAction<AppFormSubmissionDto>
    ): AppFormSubmission => ({
      ...state,
      submission: { ...action.payload },
      _id: action.payload._id,
      formId: action.payload.formId,
      isActive: false,
    }),
  },
});

const submissionQuerySlice = createSlice({
  name: 'submissionQuery',
  initialState: {
    error: '',
    formId: '',
    isActive: false,
    limit: 20,
    pagination: {
      numPages: 0,
      page: 1,
      total: 0,
    },
    query: {},
    select: '',
    sort: '',
    submissions: new Array<AppFormSubmission>(), // eslint-disable-line no-array-constructor
  },
  reducers: {
    submissionQueryStarted: (
      state: AppFormSubmissionQueryState,
      action: PayloadAction
    ): AppFormSubmissionQueryState => ({
      ...state,
      isActive: true,
      error: '',
    }),
    submissionQueryCompleted: (
      state: AppFormSubmissionQueryState,
      action: PayloadAction<AxiosResponse<AppFormSubmissionDto[]>>
    ): AppFormSubmissionQueryState => ({
      ...state,
      error: '',
      submissions: action.payload.data,
      pagination: {
        numPages: Number(action.payload.headers['x-numPages'] || '0'),
        page: Number(action.payload.headers['x-page'] || '0'),
        total: Number(action.payload.headers['x-total'] || '0'),
      },
      isActive: false,
    }),
    submissionQueryFailed: (
      state: AppFormSubmissionQueryState,
      action: PayloadAction<{ error: string }>
    ): AppFormSubmissionQueryState => ({
      ...state,
      isActive: false,
      error: action.payload.error,
    }),
  },
});

export const { formQueryReset, formQueryStarted, formQueryCompleted, formQueryFailed } = formQuerySlice.actions;
export const formQueryReducer = formQuerySlice.reducer;

export const { submissionInitStarted, submissionInitCompleted, submissionInitFailed } = submissionSlice.actions;
export const submissionReducer = submissionSlice.reducer;

export const { submissionQueryStarted, submissionQueryCompleted, submissionQueryFailed } = submissionQuerySlice.actions;
export const submissionQueryReducer = submissionQuerySlice.reducer;
