import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { FormList } from './FormList';
import { FormItemIndex } from './item';

export const FormIndex = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/:formId/*" element={<FormItemIndex />} />
      </Routes>
      <Outlet />
    </div>
  );
};
