import { LoadingPlaceholder } from '@savantly/sprout-ui';
import _ from 'lodash';
import { API_URL } from 'plugin/config/formModuleConfiguration';
import { doUpdateSubmission } from 'plugin/pages/form/state';
import { AppFormDto, AppFormSubmissionDto, FormModuleRootState } from 'plugin/types';
import React, { Dispatch } from 'react';
import { Errors, Form } from 'react-formio';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const mapStateToProps = (state: FormModuleRootState) => {
  return {
    form: state.formModuleState.form.form,
    isFormActive: state.formModuleState.form.isActive,
    isSubActive: state.formModuleState.submission.isActive || false,
    submission: state.formModuleState.submission.submission,
    options: {
      noAlerts: true,
    },
    errors: [state.formModuleState.form.error, state.formModuleState.submission.error || ''],
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {};
};

export const SubmissionEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    isFormActive,
    isSubActive,
    form,
    submission,
    errors,
    options,
  }: {
    isFormActive: boolean;
    isSubActive: boolean;
    form: AppFormDto;
    submission?: AppFormSubmissionDto;
    errors: string[];
    options: any;
  }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (submission: AppFormSubmissionDto) => {
      if (!submission.data?.submit) {
        return;
      }
      if (!form || !form.path || !form._id) {
        console.error("we're missing form state data. this shouldnt happen", form);
        return;
      }
      submission.formId = form._id;
      dispatch(
        doUpdateSubmission({
          submission,
          formPath: form.path!,
          done: (err, submission) => {
            if (!err) {
              navigate(`../`);
            }
          },
        })
      );
    };

    if (isFormActive || isSubActive) {
      return <LoadingPlaceholder text="Loading Submission..." />;
    }

    return (
      <div>
        <h3>Edit {form.title} Submission</h3>
        <Errors errors={errors} />
        <Form
          form={form}
          submission={_.cloneDeep(submission)}
          url={`${API_URL}/forms/${form.path}`}
          onSubmit={onSubmit}
          options={{ ...{ template: 'bootstrap3', iconset: 'fa', ...options } }}
        />
      </div>
    );
  }
);
