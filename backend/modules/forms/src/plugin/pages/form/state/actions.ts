import { getBackendSrv } from '@savantly/sprout-runtime';
import { API_URL } from 'plugin/config/formModuleConfiguration';
import { Dispatch } from 'react';
import { AppForm, AppFormDto, AppFormSubmissionDto } from '../../../types';
import { formInitCompleted, formInitFailed, formInitStarted } from './reducer';
import {
  formQueryCompleted,
  formQueryFailed,
  formQueryStarted,
  submissionInitCompleted,
  submissionQueryStarted,
  submissionQueryCompleted,
  submissionQueryFailed,
  submissionInitStarted,
  submissionInitFailed,
} from './slices';

/********* FORMS */
export const doQueryForms = (name: string, page = 1, done: (error: string, form: AppForm | null) => void) => (
  dispatch: Dispatch<any>
) => {
  dispatch(formQueryStarted());
  return getBackendSrv()
    .get(`${API_URL}/form`)
    .then((result: any) => {
      dispatch(formQueryCompleted(result));
      done('', result);
    })
    .catch((error: any) => {
      dispatch(formQueryFailed({ error: error.detail || error.message }));
      done(error, null);
    });
};

export const doGetForm = (id: string, done: (error: string, form: AppForm | null) => void) => (
  dispatch: Dispatch<any>
) => {
  dispatch(formInitStarted());
  return getBackendSrv()
    .get(`${API_URL}/form/${id}`)
    .then((result: any) => {
      dispatch(formInitCompleted(result));
      done('', result);
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
  return getBackendSrv()
    .post(`${API_URL}/form`, form)
    .then((result: AppFormDto) => {
      dispatch(formInitCompleted(result));
      done('', result);
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
  return getBackendSrv()
    .put(`${API_URL}/form/${form._id}`, form)
    .then((result: AppFormDto) => {
      dispatch(formInitCompleted(result));
      done('', result);
    })
    .catch((error: any) => {
      dispatch(formInitFailed({ error: error.detail || error.message }));
      done(error.detail, null);
    });
};

/********* Submissions */

export const doQuerySubmissions = (
  formId: string,
  page = 1,
  options = {},
  done: (error: string, form: AppForm | null) => void
) => (dispatch: Dispatch<any>) => {
  dispatch(submissionQueryStarted());
  return getBackendSrv()
    .get(`${API_URL}/form/${formId}/submission`)
    .then((result: any) => {
      dispatch(submissionQueryCompleted(result));
      done('', result);
    })
    .catch((error: any) => {
      dispatch(submissionQueryFailed({ error: error.detail || error.message }));
      done(error.detail || error.message, null);
    });
};

export const doGetSubmission = (id: string, done: (error: string, form: AppFormSubmissionDto | null) => void) => (
  dispatch: Dispatch<any>
) => {
  dispatch(submissionInitStarted());
  return getBackendSrv()
    .get(`${API_URL}/data/${id}`)
    .then((result: any) => {
      dispatch(submissionInitCompleted(result));
      done('', result);
    })
    .catch((error: any) => {
      dispatch(submissionInitFailed({ error: error.detail || error.message }));
      done(error.detail || error.message, null);
    });
};

export const doSaveSubmission = ({
  submission,
  formPath,
  done,
}: {
  submission: AppFormSubmissionDto;
  formPath: string;
  done: (error: string, submission: AppFormSubmissionDto | null) => void;
}) => (dispatch: Dispatch<any>) => {
  dispatch(formInitStarted);
  return getBackendSrv()
    .post(`${API_URL}/forms/${formPath}`, submission)
    .then((result: AppFormSubmissionDto) => {
      dispatch(submissionInitCompleted(result));
      done('', result);
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
  return getBackendSrv()
    .put(`${API_URL}/forms/${formPath}/submission/${submission._id}`, submission)
    .then((result: AppFormSubmissionDto) => {
      dispatch(submissionInitCompleted(result));
      done('', result);
    })
    .catch((error: any) => {
      dispatch(formInitFailed({ error: error.detail || error.message }));
      done(error.detail, null);
    });
};
