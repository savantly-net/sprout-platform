import { LoadingPlaceholder } from '@savantly/sprout-ui';
import { API_URL } from 'plugin/config/formModuleConfiguration';
import { doSaveSubmission } from 'plugin/pages/form/state/actions';
import { AppFormSubmissionDto, FormModuleRootState } from 'plugin/types';
import React from 'react';
import { Errors, Form } from 'react-formio';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
//import { useParams } from 'react-router-dom';

export const ViewForm = () => {
  const form = useSelector((state: FormModuleRootState) => state.formModuleState.form);
  const formId = useParams().formId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (submission: AppFormSubmissionDto) => {
    if (!submission.data?.submit) {
      return;
    }
    submission.formId = formId;
    dispatch(
      doSaveSubmission({
        submission,
        formId,
        done: (error: string, saved: AppFormSubmissionDto | null) => {
          if (error) {
            console.error(error);
          } else {
            navigate(`./submission/${saved?._id}`);
          }
        },
      })
    );
  };

  if (form.isActive) {
    return <LoadingPlaceholder text="Loading..." />;
  }

  return (
    <div>
      <h3>New {form.form.title || 'Form Data'}</h3>
      <Errors errors={form.error} />
      <Form
        url={`${API_URL}/form/${formId}`}
        form={form.form}
        options={{ ...{ template: 'bootstrap3', iconset: 'fa', noAlerts: true } }}
        onSubmit={onSubmit}
      />
    </div>
  );
};
