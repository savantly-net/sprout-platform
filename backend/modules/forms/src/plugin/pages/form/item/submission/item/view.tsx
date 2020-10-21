import { LoadingPlaceholder } from '@savantly/sprout-ui';
import _ from 'lodash';
import { API_URL } from 'plugin/config/formModuleConfiguration';
import { FormModuleRootState } from 'plugin/types';
import React from 'react';
import { Form } from 'react-formio';
import { useSelector } from 'react-redux';
//import { useParams } from 'react-router-dom';

export const SubmissionView = () => {
  const form = useSelector((state: FormModuleRootState) => state.formModuleState.form);
  const submission = useSelector((state: FormModuleRootState) => state.formModuleState.submission);

  if (form.isActive || submission.isActive) {
    return <LoadingPlaceholder text="Loading..." />;
  }

  return (
    <div>
      <h3>{form.form.title || 'Form Data'}</h3>
      <Form
        url={`${API_URL}/forms/${form.form.path}`}
        form={form.form}
        submission={_.clone(submission.submission)}
        options={{ ...{ template: 'bootstrap3', iconset: 'fa', readOnly: true } }}
      />
    </div>
  );
};
