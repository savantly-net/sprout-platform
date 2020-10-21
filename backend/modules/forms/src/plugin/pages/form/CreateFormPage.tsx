import { Alert } from '@savantly/sprout-ui';
import { doSaveForm } from 'plugin/pages/form/state/actions';
import React, { FC, useState } from 'react';
import { FormEdit } from 'react-formio';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppFormDto, FormModuleRootState } from '../../types';

interface OwnProps {}

const CreateFormPage: FC<any> = ({}: OwnProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const saveForm = (form: AppFormDto) => {
    const newForm = {
      ...form,
      tags: ['common'],
    };
    dispatch(
      doSaveForm(newForm, (err, form) => {
        if (!err && form) {
          navigate(`../form/${form._id}`);
        } else {
          setError(err);
        }
      })
    );
  };

  return (
    <div>
      {error && <Alert title="Error saving form" severity="error" />}
      <FormEdit form={{ display: 'form' }} saveForm={saveForm} saveText="Save Form" options={{ noAlerts: true }} />
    </div>
  );
};

const mapStateToProps = (state: FormModuleRootState) => {
  console.log(state);
  return {
    form: state.formModuleState.form,
  };
};

export default connect(mapStateToProps)(CreateFormPage);
