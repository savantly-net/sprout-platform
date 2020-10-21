import React from 'react';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import SubmissionList from './list';
import SubmissionItem from './item';

export const SubmissionIndex = () => {
  const formId = useParams().formId;
  return (
    <div>
      <Routes>
        <Route path="/" element={<SubmissionList formId={formId} />} />
        <Route path="/:submissionId/*" element={<SubmissionItem />} />
      </Routes>
      <Outlet />
    </div>
  );
};
