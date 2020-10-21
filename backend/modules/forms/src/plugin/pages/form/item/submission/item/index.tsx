import { doGetSubmission } from 'plugin/pages/form/state';
import React, { Dispatch, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link, Outlet, Route, Routes, useParams } from 'react-router-dom';
import { SubmissionEdit } from './edit';
import { SubmissionView } from './view';

const SubmissionItem = ({ getSubmission }: { getSubmission: (id: string) => void }) => {
  const submissionId = useParams().submissionId;

  useMemo(() => {
    getSubmission(submissionId);
  }, [getSubmission, submissionId]);

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to={`../`}>
            <i className="fa fa-chevron-left"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`./`}>
            <i className="fa fa-eye"></i> View
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`./edit`}>
            <i className="fa fa-edit"></i> Edit
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`./delete`}>
            <i className="fa fa-trash"></i> Delete
          </Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<SubmissionView />} />
        <Route path="/edit" element={<SubmissionEdit />} />
      </Routes>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getSubmission: (id: string) => dispatch(doGetSubmission(id, () => {})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionItem);
