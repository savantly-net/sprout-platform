import { Alert } from '@savantly/sprout-ui';
import { LoadingIcon } from '@sprout-platform/ui';
import { FormEdit } from 'plugin/components/FormEdit';
import { doUpdateForm } from 'plugin/pages/form/state/actions';
import { AppFormDto } from 'plugin/types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppForm } from '../state';

export const EditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formId = useParams().formId;
  const form = useAppForm(formId);

  const updateForm = (form: AppFormDto) => {
    const newForm = {
      ...form,
      tags: ['common'],
    };
    dispatch(
      doUpdateForm(newForm, (err, form) => {
        if (!err && form) {
          navigate(`../`);
        }
      })
    );
  };

  if (form && form) {
    console.log('rendering form editor', form);
    return (
      <div>
        {form.error && <Alert title="Error" />}
        <FormEdit form={form.form} saveForm={updateForm} saveText="Save" />
      </div>
    );
  } else {
    console.log('loading form');
    return <LoadingIcon className="m-auto" />;
  }
};
