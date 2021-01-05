import { cx } from 'emotion';
import React, { Fragment } from 'react';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import { DeleteForm } from './DeleteForm';
import { EditForm } from './EditForm';
import { SubmissionIndex } from './submission';
import { ViewForm } from './ViewForm';
//import Delete from './Delete'
//import Edit from './Edit'
//import Submission from './Submission/index'
//import View from './View'

const NavItem = ({ to, children }: { to: string; children: any }) => {
  return (
    <Fragment>
      <li className={cx('nav-item')}>
        <NavLink className="nav-link" to={to}>
          {children}
        </NavLink>
      </li>
    </Fragment>
  );
};

export const FormItemIndex = () => {
  const formId = useParams().formId;

  const toEnterData = './';
  const toViewData = './submission';

  return (
    <div>
      <ul className="nav nav-tabs">
        <NavItem to="../">
          <i className="fa fa-chevron-left"></i>
        </NavItem>
        <NavItem to={toEnterData}>
          <i className="fa fa-pencil"></i> Enter Data
        </NavItem>
        <NavItem to={toViewData}>
          <i className="fa fa-list-alt"></i> View Data
        </NavItem>
        <NavItem to="./edit">
          <i className="fa fa-edit"></i> Edit Form
        </NavItem>
        <NavItem to={`./delete`}>
          <i className="fa fa-trash"></i> Delete Form
        </NavItem>
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
