import { AppFormSubmissionDto, FormModuleRootState } from 'plugin/types';
import React, { Dispatch, FC, useMemo } from 'react';
import { Errors, SubmissionGrid } from 'react-formio';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { doQuerySubmissions } from '../../state';

interface OwnProps {
  formId: string;
}

const mapStateToProps = (state: FormModuleRootState, ownProps: OwnProps) => {
  const form = state.formModuleState.form;
  const submissions = state.formModuleState.submissions;

  return {
    form: form.form,
    submissions: submissions,
    isLoading: form.isActive || submissions.isActive,
    errors: [state.formModuleState.form.error, state.formModuleState.submissions.error],
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: OwnProps) => {
  return {
    getSubmissions: (page: number, query?: any) => dispatch(doQuerySubmissions(ownProps.formId, page, query, () => {})),
  };
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

interface AllProps extends DispatchProps, StateProps, OwnProps {}

const SubmissionList: FC<AllProps> = ({ form, submissions, isLoading, getSubmissions, errors }) => {
  const navigate = useNavigate();

  useMemo(() => {
    getSubmissions(1);
  }, [getSubmissions]);

  const onAction = (submission: AppFormSubmissionDto, action: string) => {
    switch (action) {
      case 'view':
      case 'row':
        navigate(`./${submission._id}`);
        break;
      case 'edit':
        navigate(`./${submission._id}/edit`);
        break;
      case 'delete':
        navigate(`./${submission._id}/delete`);
        break;
      default:
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="form-index">
      <Errors errors={errors} />
      <SubmissionGrid submissions={submissions} form={form} onAction={onAction} getSubmissions={getSubmissions} />
      <Link className="btn btn-primary" to={`../`}>
        <i className="glyphicon glyphicon-plus fa fa-plus" aria-hidden="true"></i>
        New {form.title}
      </Link>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionList);
