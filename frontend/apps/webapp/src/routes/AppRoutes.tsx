//import { LoginCallback } from '@okta/okta-react';
import React, { Fragment, Suspense, useEffect, useMemo, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import { SafeDynamicImport } from '../core/components/DynamicImports/SafeDynamicImport';
import PageNotFound from '../core/components/error/page-not-found';
import Spinner from '../core/components/Spinner/Spinner';
import { DashboardPage } from '../features/dashboard/containers/DashboardPage';
import DashboardProvider from '../features/dashboard/containers/DashboardProvider';
import DashboardRoutes from '../features/dashboard/DashboardRoutes';
import AppRootPage from '../features/plugins/AppRootPage';
import PluginListPage from '../features/plugins/PluginListPage';
import PluginPage from '../features/plugins/PluginPage';
import PluginRoutes from '../features/plugins/PluginRoutes';
import { DashboardRouteInfo, StoreState } from '../types';

type OwnProps = {
  history: any;
};
type StateProps = {};
type DispatchProps = {};
type AllProps = OwnProps & StateProps & DispatchProps;

const AppRoutes = ({ history }: AllProps) => {

  const plugins = useSelector((state: StoreState) => state.plugins.plugins);
  const params = useParams();
  const location = useLocation();
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
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

        <Route path="/a/:pluginId" element={<AppRootPage />} />
        <Route path="/plugins" element={<PluginListPage plugins={plugins} />} />
        <Route path="/plugins/:pluginId" element={<PluginPage pluginId={params.pluginId} path={location.pathname} />} />
        <Route element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes as React.FC<OwnProps>);
