//import { LoginCallback } from '@okta/okta-react';
import React, { Suspense } from 'react';
import { connect, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from '../core/components/error/error-boundary';
import PageNotFound from '../core/components/error/page-not-found';
import Spinner from '../core/components/Spinner/Spinner';
import DashboardProvider from '../features/dashboard/containers/DashboardProvider';
import FileBrowserRoutes from '../features/files/FileBrowserRoutes';
import { ManageDashboardsPage } from '../features/manage-dashboards/ManageDashboardsPage';
import { PermissionsPage } from '../features/permissions/PermissionsPage';
import AppRootPage from '../features/plugins/AppRootPage';
import PluginListPage from '../features/plugins/PluginListPage';
import PluginPage from '../features/plugins/PluginPage';
import { DashboardRouteInfo, StoreState } from '../types';
import IssueManager from '../features/feedback/IssueManager';
import { MenuAdminPage } from '../features/menu/MenuAdminPage';

type OwnProps = {
  history: any;
};
type StateProps = {};
type DispatchProps = {};
type AllProps = OwnProps & StateProps & DispatchProps;

const AppRoutes = ({ history }: AllProps) => {
  const plugins = useSelector((state: StoreState) => state.plugins.plugins);
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<DashboardProvider routeInfo={DashboardRouteInfo.Home} />} />
        <Route path="/d/:uid" element={<DashboardProvider routeInfo={DashboardRouteInfo.Normal} />} />
        <Route path="/d/:uid/:slug" element={<DashboardProvider routeInfo={DashboardRouteInfo.Normal} />} />
        <Route path="/dashboards/new" element={<DashboardProvider routeInfo={DashboardRouteInfo.New} />} />
        <Route path="/dashboards" element={<ManageDashboardsPage />} />
        <Route
          path="/a/:pluginId/*"
          element={
            <ErrorBoundary>
              <AppRootPage />
            </ErrorBoundary>
          }
        />
        <Route path="/menu" element={<MenuAdminPage />} />
        <Route path="/permissions" element={<PermissionsPage />} />
        <Route path="/plugins" element={<PluginListPage plugins={plugins} />} />
        <Route path="/plugins/:pluginId" element={<PluginPage />} />
        <Route path="/files/*" element={<FileBrowserRoutes />} />
        <Route path="/issues/*" element={<IssueManager />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes as React.FC<OwnProps>);
