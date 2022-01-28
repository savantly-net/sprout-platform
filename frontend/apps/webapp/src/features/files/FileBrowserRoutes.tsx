import { NavModel, NavModelItem } from '@savantly/sprout-api';
import { PageHeader } from '@sprout-platform/ui';
/* eslint-disable */
import React, { FC } from 'react';
/* eslint-enable */
import { Outlet, Route, Routes } from 'react-router-dom';
import FilesIndexPage from './FilesIndexPage';

const FileBrowserRoutes: FC<any> = () => {
  const navModelItem: NavModelItem = {
    text: 'File Browser',
    subTitle: 'Manage files and documents in the repository',
    url: './',
    icon: 'folder'
  };

  const navModel: NavModel = {
    main: navModelItem,
    node: navModelItem
  };

  return (
    <div>
      <PageHeader model={navModel} />
      <Routes>
        <Route path="/" element={<FilesIndexPage />} />
        <Route path="/item/" element={<FilesIndexPage />} />
        <Route path="/item/:filePath*" element={<FilesIndexPage />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default FileBrowserRoutes;
