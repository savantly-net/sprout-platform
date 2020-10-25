import { cx } from 'emotion';
import { doGetForm } from 'plugin/pages/form/state/actions';
import React, { Fragment, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Route, Routes, useLocation, useParams, useResolvedPath } from 'react-router-dom';
import { DeleteForm } from './DeleteForm';
import { EditForm } from './EditForm';
import { SubmissionIndex } from './submission';
import { ViewForm } from './ViewForm';
//import Delete from './Delete'
//import Edit from './Edit'
//import Submission from './Submission/index'
//import View from './View'

const NavItem = ({ to, children }: { to: string; children: any }) => {
  const location = useLocation();
  const resolved = useResolvedPath(to);
  const match = useMemo(() => {
    return resolved.pathname === location.pathname;
  }, [location, resolved]);

  console.log(location);
  console.log(resolved);

  return (
    <Fragment>
      <li className={cx({ 'nav-item': true, active: match })}>
        <Link className="nav-link" to={to}>
          {children}
        </Link>
      </li>
    </Fragment>
  );
};

export const FormItemIndex = () => {
  const formId = useParams().formId;
  const dispatch = useDispatch();

  const toEdit = './edit';
  const toEnterData = './';
  const toViewData = './submission';

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
        <li className={'nav-item'}>
          <Link className="nav-link" to={toEnterData}>
            <i className="fa fa-pencil"></i> Enter Data
          </Link>
        </li>
        <li className={'nav-item'}>
          <Link className="nav-link" to={toViewData}>
            <i className="fa fa-list-alt"></i> View Data
          </Link>
        </li>
        <NavItem to="./edit">
          <i className="fa fa-edit"></i> Edit Form
        </NavItem>
        <li className="nav-item">
          <Link className="nav-link" to={`./delete`}>
            <i className="fa fa-trash"></i> Delete Form
          </Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<ViewForm />} />
        <Route path="/edit" element={<EditForm />} />
        <Route path="/delete" element={<DeleteForm formId={formId} />} />
        <Route path="/submission/*" element={<SubmissionIndex />} />
      </Routes>
    </div>
  );
};
