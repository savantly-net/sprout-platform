import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AppForm,
  AppFormQueryResponse,
  AppFormQueryState,
  AppFormSubmission,
  AppFormSubmissionDto,
  AppFormSubmissionQueryResponse,
  AppFormSubmissionQueryState,
} from '../../../types';

const formQuerySlice = createSlice({
  name: 'formQuery',
  initialState: {
    error: '',
    forms: new Array<AppForm>(), // eslint-disable-line no-array-constructor
    isActive: false,
    limit: 20,
    pagination: {
      numPages: 0,
      page: 1,
    },
    query: {
      type: 'form',
      tags: ['common'],
    },
    select: '',
    sort: '',
  },
  reducers: {
    formQueryStarted: (state: AppFormQueryState, action: PayloadAction): AppFormQueryState => ({
      ...state,
      isActive: true,
    }),
    formQueryCompleted: (state: AppFormQueryState, action: PayloadAction<AppFormQueryResponse>): AppFormQueryState => ({
      ...state,
      isActive: false,
      error: '',
      forms: action.payload.content,
      limit: action.payload.size,
      pagination: {
        numPages: action.payload.totalPages,
        page: action.payload.pageable.pageNumber,
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
      action: PayloadAction<AppFormSubmissionQueryResponse>
    ): AppFormSubmissionQueryState => ({
      ...state,
      error: '',
      submissions: action.payload.content,
      limit: action.payload.size,
      pagination: {
        numPages: action.payload.totalPages,
        page: action.payload.pageable.pageNumber,
        total: action.payload.totalElements,
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

export const { formQueryStarted, formQueryCompleted, formQueryFailed } = formQuerySlice.actions;
export const formQueryReducer = formQuerySlice.reducer;

export const { submissionInitStarted, submissionInitCompleted, submissionInitFailed } = submissionSlice.actions;
export const submissionReducer = submissionSlice.reducer;

export const { submissionQueryStarted, submissionQueryCompleted, submissionQueryFailed } = submissionQuerySlice.actions;
export const submissionQueryReducer = submissionQuerySlice.reducer;
