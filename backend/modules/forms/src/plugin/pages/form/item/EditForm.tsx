import { Alert } from '@savantly/sprout-ui';
import { doUpdateForm } from 'plugin/pages/form/state/actions';
import { AppFormDto, FormModuleRootState } from 'plugin/types';
import React from 'react';
import { FormEdit } from 'react-formio';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const EditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useSelector((state: FormModuleRootState) => state.formModuleState.form);

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

  return (
    <div>
      <h2>Edit Form</h2>
      <hr />
      {form.error && <Alert title="Error" />}
      <FormEdit form={form.form} saveForm={updateForm} saveText="Update Form" />
    </div>
  );
};
