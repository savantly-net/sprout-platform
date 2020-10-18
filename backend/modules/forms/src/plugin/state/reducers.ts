import { IForm, IFormModuleState, IFormQueryState, ISubmission, ISubmissionQueryState } from './types';
import { combineReducers } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const formSlice = createSlice<IForm, any>({
    name: 'form',
    initialState: {
        id: '',
        isActive: false,
        lastUpdated: 0,
        form: {},
        url: '',
        error: '',
      },
    reducers: {
        formInitCompleted: (state: IForm, action: PayloadAction<IForm>): IForm => ({
            ...state,
            ...action.payload
        })
    }
});

const formQuerySlice = createSlice({
    name: 'formQuery',
    initialState: {
        error: '',
        response: {
          content: new Array<IForm>(),
          pageable: {
            sort: {
              sorted: false,
              unsorted: true,
              empty: true,
            },
            offset: 0,
            pageNumber: 0,
            pageSize: 20,
            unpaged: false,
            paged: true,
          },
          totalPages: 0,
          totalElements: 0,
          last: true,
          size: 20,
          numberOfElements: 0,
          number: 0,
          first: true,
          sort: {
            sorted: false,
            unsorted: true,
            empty: true,
          },
          empty: true,
        },
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
          formQueryStarted: (state: IFormQueryState, action: PayloadAction): IFormQueryState => ({
              ...state,
              isActive: true
          }),
          formQueryCompleted: (state: IFormQueryState, action: PayloadAction<IFormQueryState>): IFormQueryState => ({
              ...state,
              ...action.payload,
              isActive: false,
          }),
          formQueryFailed: (state: IFormQueryState, action: PayloadAction<{error: string}>): IFormQueryState => ({
            ...state,
            ...action.payload,
            isActive: false
          })
      }
})

const submissionSlice = createSlice<ISubmission, any>({
    name: 'submission',
    initialState: {
        formId: '',
        id: '',
        isActive: false,
        lastUpdated: 0,
        submission: {},
        url: '',
        error: '',
      },
      reducers: {
          submissionInitCompleted: (state: ISubmission, action: PayloadAction<ISubmission>): ISubmission => ({
              ...state,
              ...action.payload
          })
      }
});

const submissionQuerySlice = createSlice<ISubmissionQueryState, any>({
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
        response: {
            content: [],
            pageable: {
              sort: {
                sorted: false,
                unsorted: true,
                empty: true,
              },
              offset: 0,
              pageNumber: 0,
              pageSize: 20,
              unpaged: false,
              paged: true,
            },
            totalPages: 0,
            totalElements: 0,
            last: true,
            size: 20,
            numberOfElements: 0,
            number: 0,
            first: true,
            sort: {
              sorted: false,
              unsorted: true,
              empty: true,
            },
            empty: true,
          },
      },
      reducers: {
          submissionQueryComplete: (state: ISubmissionQueryState, action: PayloadAction<ISubmissionQueryState>): ISubmissionQueryState => ({
              ...state,
              ...action.payload
          })
      }
});

const combinedReducers = combineReducers({
    form: formSlice.reducer,
    forms: formQuerySlice.reducer,
    submission: submissionSlice.reducer,
    submissions: submissionQuerySlice.reducer,
    event: combineReducers({
      form: formSlice.reducer,
      submission: submissionSlice.reducer,
      submissions: submissionQuerySlice.reducer,
    })
  });

export function formModuleStateReducer(state: IFormModuleState | undefined, action: any): IFormModuleState {
    return combinedReducers(state, action);
}

export const { formInitCompleted } = formSlice.actions;
export const { formQueryStarted, formQueryCompleted, formQueryFailed } = formQuerySlice.actions;
export const { submissionInitCompleted } = submissionSlice.actions;
export const { submissionQueryCompleted } = submissionQuerySlice.actions;