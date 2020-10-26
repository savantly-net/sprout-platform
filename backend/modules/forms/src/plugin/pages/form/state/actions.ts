import { FetchResponse, getBackendSrv } from '@savantly/sprout-runtime';
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
export const doQueryForms = (name: string, page = 1, done: (error: string, form: AppForm | null) => void) => (
  dispatch: Dispatch<any>
) => {
  dispatch(formQueryStarted());
  getBackendSrv()
    .fetch({
      url: `${API_URL}/form`,
    })
    .subscribe(
      (response: FetchResponse) => {
        dispatch(formQueryCompleted(response as FetchResponse<AppForm[]>));
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
  getBackendSrv()
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
  getBackendSrv()
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
  getBackendSrv()
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

export const doDeleteForm = (formId: string, done: (error: string) => void) => (dispatch: Dispatch<any>) => {
  dispatch(formInitStarted());
  getBackendSrv()
    .fetch({
      url: `${API_URL}/form/${formId}`,
      method: 'DELETE',
    })
    .subscribe(
      (response: FetchResponse) => {
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
  done: (error: string, form: AppForm | null) => void
) => (dispatch: Dispatch<any>) => {
  dispatch(submissionQueryStarted());
  getBackendSrv()
    .fetch({
      url: `${API_URL}/form/${formId}/submission`,
    })
    .subscribe(
      (response: FetchResponse) => {
        dispatch(submissionQueryCompleted(response as FetchResponse<AppFormSubmissionDto[]>));
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
  getBackendSrv()
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
  formId,
  done,
}: {
  submission: AppFormSubmissionDto;
  formId: string;
  done: (error: string, submission: AppFormSubmissionDto | null) => void;
}) => (dispatch: Dispatch<any>) => {
  dispatch(formInitStarted);
  getBackendSrv()
    .post(`${API_URL}/form/${formId}/submission`, submission)
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
  getBackendSrv()
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
