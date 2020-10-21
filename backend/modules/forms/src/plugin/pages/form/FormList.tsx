import React, { useMemo } from 'react';
import { FormGrid } from 'react-formio';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { doQueryForms } from './state/actions';
import { AppFormDto, FormModuleRootState } from '../../types';

export const FormList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forms = useSelector((state: FormModuleRootState) => state.formModuleState.forms);

  const getForms = (page: number, query?: string) => {
    dispatch(doQueryForms('forms', page, () => {}));
  };
  const ref = 1;

  /* eslint-disable */
  useMemo(() => {
    getForms(1);
  }, [ref]);
  /* eslint-enable */

  const onAction = (form: AppFormDto, action: string) => {
    switch (action) {
      case 'view':
        navigate(`../form/${form._id}`);
        break;
      case 'submission':
        navigate(`../form/${form._id}/submission`);
        break;
      case 'edit':
        navigate(`../form/${form._id}/edit`);
        break;
      case 'delete':
        navigate(`../form/${form._id}/delete`);
        break;
      default:
    }
  };

  if (forms.isActive) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h1>Forms</h1>
        <FormGrid forms={forms} onAction={onAction} getForms={getForms} />
        <Link className="btn btn-primary" to="../create">
          <i className="fa fa-plus"></i> Create Form
        </Link>
      </div>
    );
  }
};
