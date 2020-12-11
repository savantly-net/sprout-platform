import { NavModelItem } from '@savantly/sprout-api';
import React, { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { PageHeader } from '../PageHeader/PageHeader';

export interface PageModel {
  main: NavModelItem;
}

export interface RoutedEntityPageProps {
  model: PageModel;
  children: ReactElement;
}

export const RoutedEntityPage: FC<any> = ({ model, children }: RoutedEntityPageProps) => {
  return (
    <div className="page-scrollbar-content">
      <PageHeader
        model={{
          main: model.main,
          node: model.main
        }}
      />
      <div className="page-container page-body">
        {children}
        <Outlet />
      </div>
      <footer className="footer"></footer>
    </div>
  );
};
