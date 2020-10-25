import { ConfirmModal } from '@savantly/sprout-ui';
import { FormModuleRootState } from 'plugin/types';
import React from 'react';
import { Errors } from 'react-formio';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doDeleteForm } from '../state';

interface OwnProps {
  formId: string;
}
interface ConnectedProps {
  errors: any;
  message: string;
}
interface AllProps extends ConnectedProps, OwnProps {}

const mapStateToProps = (state: FormModuleRootState) => {
  return {
    message: `Are you sure you wish to delete the form "${state.formModuleState.form.form.title}"?`,
    errors: state.formModuleState.form.error,
  };
};

export const DeleteForm = connect(mapStateToProps)((props: AllProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onConfirm = () => {
    dispatch(
      doDeleteForm(props.formId, err => {
        if (!err) {
          navigate('../../');
        }
      })
    );
  };

  const onDismiss = () => {
    navigate(-1);
  };

  return (
    <div>
      <Errors errors={props.errors} />
      <ConfirmModal
        title="Delete Form"
        body={props.message}
        confirmText="Delete"
        isOpen={true}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
    </div>
  );
});
