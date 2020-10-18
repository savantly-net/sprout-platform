import { getFormService } from 'plugin/services/formService';
import { formQueryCompleted, formQueryFailed, formQueryStarted } from 'plugin/state/reducers';
import { IFormModuleRootState } from 'plugin/state/types';
import { Dispatch } from 'react';


export const indexForms = (name: string, page = 1, done = (...args: any) => {}) => (
  dispatch: Dispatch<any>,
  getState: () => IFormModuleRootState
) => {
  const formService = getFormService();

  dispatch(formQueryStarted());

  return formService
    .getForms()
    .then((result: any) => {
      dispatch(formQueryCompleted(result));
      done(null, result);
    })
    .catch((error: any) => {
      dispatch(formQueryFailed({error}));
      done(error);
    });
};
