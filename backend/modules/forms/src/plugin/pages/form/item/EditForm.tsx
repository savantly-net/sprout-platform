import { Alert } from '@savantly/sprout-ui';
import { FormEdit } from 'plugin/components/FormEdit';
import { doUpdateForm } from 'plugin/pages/form/state/actions';
import { AppFormDto, FormModuleRootState } from 'plugin/types';
import React from 'react';
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
      {form.error && <Alert title="Error" />}
      <FormEdit form={form.form} saveForm={updateForm} />
    </div>
  );
};
