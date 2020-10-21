import { doGetForm } from 'plugin/pages/form/state/actions';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { DeleteForm } from './DeleteForm';
import { EditForm } from './EditForm';
import { SubmissionIndex } from './submission';
import { ViewForm } from './ViewForm';
//import Delete from './Delete'
//import Edit from './Edit'
//import Submission from './Submission/index'
//import View from './View'

export const FormItemIndex = () => {
  const formId = useParams().formId;
  const dispatch = useDispatch();

  /* eslint-disable */
  useMemo(() => {
    if (formId) {
      dispatch(doGetForm(formId, () => {}));
    }
  }, [formId]);
  /* eslint-enable */

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="../">
            <i className="fa fa-chevron-left"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`./`}>
            <i className="fa fa-pencil"></i> Enter Data
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`./submission`}>
            <i className="fa fa-list-alt"></i> View Data
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`./edit`}>
            <i className="fa fa-edit"></i> Edit Form
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`./delete`}>
            <i className="fa fa-trash"></i> Delete Form
          </Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<ViewForm />} />
        <Route path="/edit" element={<EditForm />} />
        <Route path="/delete" element={<DeleteForm />} />
        <Route path="/submission/*" element={<SubmissionIndex />} />
      </Routes>
    </div>
  );
};
