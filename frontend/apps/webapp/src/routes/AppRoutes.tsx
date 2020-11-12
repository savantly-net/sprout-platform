//import { LoginCallback } from '@okta/okta-react';
import React, { Suspense } from 'react';
import { connect, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import ErrorBoundary from '../core/components/error/error-boundary';
import PageNotFound from '../core/components/error/page-not-found';
import Spinner from '../core/components/Spinner/Spinner';
import DashboardProvider from '../features/dashboard/containers/DashboardProvider';
import { LoginPage } from '../features/login/LoginPage';
import AppRootPage from '../features/plugins/AppRootPage';
import PluginListPage from '../features/plugins/PluginListPage';
import PluginPage from '../features/plugins/PluginPage';
import { DashboardRouteInfo, StoreState } from '../types';

type OwnProps = {
  history: any;
};
type StateProps = {
};
type DispatchProps = {};
type AllProps = OwnProps & StateProps & DispatchProps;

const AppRoutes = ({ history }: AllProps) => {

  const plugins = useSelector((state: StoreState) => state.plugins.plugins);
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route
          path="/"
          element={<DashboardProvider routeInfo={DashboardRouteInfo.Home} />}
        >
          <Route
            path="d/:uid/*"
            element={<DashboardProvider routeInfo={DashboardRouteInfo.Normal} />}
          />
          <Route
            path="d/:uid/:slug"
            element={<DashboardProvider routeInfo={DashboardRouteInfo.Normal} />}
          />
          <Route
            path="dashboard/new"
            element={<DashboardProvider routeInfo={DashboardRouteInfo.New} />}
          />
        </Route>

        <Route path="/a/:pluginId/*" element={
          <ErrorBoundary>
            <AppRootPage />
          </ErrorBoundary>}
        />
        <Route path="/plugins" element={<PluginListPage plugins={plugins} />} />
        <Route path="/plugins/:pluginId" element={<PluginPage pluginId='CHANGEME' path='CHANGEME' />} />
        <Route element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

const mapStateToProps = (state: StoreState) => ({
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes as React.FC<OwnProps>);
