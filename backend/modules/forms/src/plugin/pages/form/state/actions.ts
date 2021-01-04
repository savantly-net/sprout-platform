import { getApiService } from '@savantly/sprout-runtime';
import { API_URL } from 'plugin/config/formModuleConfiguration';
import { Dispatch } from 'react';
import { AppForm, AppFormDto, AppFormSubmissionDto } from '../../../types';
import { formInitCompleted, formInitFailed, formInitStarted } from './reducer';
import {
  formQueryCompleted,
  formQueryFailed,
  formQueryReset,
  formQueryStarted,
  submissionInitCompleted,
  submissionInitFailed,
  submissionInitStarted,
  submissionQueryCompleted,
  submissionQueryFailed,
  submissionQueryStarted,
} from './slices';

/********* FORMS */
export const doQueryForms = (name: string, page = 1, done: (error: string, form: AppForm[] | null) => void) => (
  dispatch: Dispatch<any>
) => {
  dispatch(formQueryStarted());
  getApiService()
    .get<AppForm[]>(`${API_URL}/form`)
    .then(
      (response) => {
        dispatch(formQueryCompleted(response));
        done('', response.data);
      },
      (error: any) => {
        dispatch(formQueryFailed({ error: error.detail || error.message }));
        done(error.detail || error.message, null);
      }
    );
};

export const doGetForm = (id: string, done: (error: string, form: AppForm | null) => void) => (
  dispatch: Dispatch<any>
) => {
  dispatch(formInitStarted());
  getApiService()
    .get<AppForm>(`${API_URL}/form/${id}`)
    .then((result) => {
      dispatch(formInitCompleted(result.data));
      done('', result.data);
    })
    .catch((error: any) => {
      dispatch(formInitFailed({ error: error.detail || error.message }));
      done(error.detail || error.message, null);
    });
};

export const doSaveForm = (form: AppFormDto, done: (error: string, form: AppFormDto | null) => void) => (
  dispatch: Dispatch<any>
) => {
  dispatch(formInitStarted());
  getApiService()
    .post<AppFormDto>(`${API_URL}/form`, form)
    .then((result) => {
      dispatch(formInitCompleted(result.data));
      done('', result.data);
    })
    .catch((error: any) => {
      dispatch(formInitFailed({ error: error.detail || error.message }));
      done(error.detail, null);
    });
};

export const doUpdateForm = (form: AppFormDto, done: (error: string, form: AppFormDto | null) => void) => (
  dispatch: Dispatch<any>
) => {
  dispatch(formInitStarted());
  getApiService()
    .put<AppFormDto>(`${API_URL}/form/${form._id}`, form)
    .then((result) => {
      dispatch(formInitCompleted(result.data));
      done('', result.data);
    })
    .catch((error: any) => {
      dispatch(formInitFailed({ error: error.detail || error.message }));
      done(error.detail, null);
    });
};

export const doDeleteForm = (formId: string, done: (error: string) => void) => (dispatch: Dispatch<any>) => {
  dispatch(formInitStarted());
  getApiService()
    .delete(`${API_URL}/form/${formId}`)
    .then(
      () => {
        dispatch(
          formInitCompleted({
            display: 'form',
            type: 'form',
          })
        );
        dispatch(formQueryReset());
        done('');
      },
      (error: any) => {
        dispatch(formInitFailed({ error: error.detail || error.message }));
        done(error.detail || error.message);
      }
    );
};

/********* Submissions */

export const doQuerySubmissions = (
  formId: string,
  page = 1,
  options = {},
  done: (error: string, form: AppFormSubmissionDto[] | null) => void
) => (dispatch: Dispatch<any>) => {
  dispatch(submissionQueryStarted());
  getApiService()
    .get<AppFormSubmissionDto[]>(`${API_URL}/form/${formId}/submission`)
    .then(
      (response) => {
        dispatch(submissionQueryCompleted(response));
        done('', response.data);
      },
      (error: any) => {
        dispatch(submissionQueryFailed({ error: error.detail || error.message }));
        done(error.detail || error.message, null);
      }
    );
};

export const doGetSubmission = (id: string, done: (error: string, form: AppFormSubmissionDto | null) => void) => (
  dispatch: Dispatch<any>
) => {
  dispatch(submissionInitStarted());
  getApiService()
    .get<AppFormSubmissionDto>(`${API_URL}/data/${id}`)
    .then((result) => {
      dispatch(submissionInitCompleted(result.data));
      done('', result.data);
    })
    .catch((error: any) => {
      dispatch(submissionInitFailed({ error: error.detail || error.message }));
      done(error.detail || error.message, null);
    });
};

export const doSaveSubmission = ({
  submission,
  formId,
  done,
}: {
  submission: AppFormSubmissionDto;
  formId: string;
  done: (error: string, submission: AppFormSubmissionDto | null) => void;
}) => (dispatch: Dispatch<any>) => {
  dispatch(formInitStarted);
  getApiService()
    .post<AppFormSubmissionDto>(`${API_URL}/form/${formId}/submission`, submission)
    .then((result) => {
      dispatch(submissionInitCompleted(result.data));
      done('', result.data);
    })
    .catch((error: any) => {
      dispatch(formInitFailed({ error: error.detail || error.message }));
      done(error.detail, null);
    });
};

export const doUpdateSubmission = ({
  submission,
  formPath,
  done,
}: {
  submission: AppFormSubmissionDto;
  formPath: string;
  done: (error: string, submission: AppFormSubmissionDto | null) => void;
}) => (dispatch: Dispatch<any>) => {
  dispatch(formInitStarted);
  getApiService()
    .put<AppFormSubmissionDto>(`${API_URL}/forms/${formPath}/submission/${submission._id}`, submission)
    .then((result) => {
      dispatch(submissionInitCompleted(result.data));
      done('', result.data);
    })
    .catch((error: any) => {
      dispatch(formInitFailed({ error: error.detail || error.message }));
      done(error.detail, null);
    });
};
