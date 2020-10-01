//import { LoginCallback } from '@okta/okta-react';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SafeDynamicImport } from '../core/components/DynamicImports/SafeDynamicImport';
import Spinner from '../core/components/Spinner/Spinner';
import { DashboardRouteInfo } from '../types';

const importDashboardPage =
SafeDynamicImport(import(/* webpackChunkName: "DashboardPage" */ '../features/dashboard/containers/DashboardPage'));


const AppRoutes = () => {
  
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/">
            {importDashboardPage({routeInfo: DashboardRouteInfo.Home})}
          </Route>
          <Route exact path="/d/:uid">
            {importDashboardPage({routeInfo: DashboardRouteInfo.Normal})}
          </Route>
          <Route exact path="/d/:uid/:slug">
            {importDashboardPage({routeInfo: DashboardRouteInfo.Normal})}
          </Route>
          <Route exact path="/dashboard/new">
            {importDashboardPage({routeInfo: DashboardRouteInfo.New})}
          </Route>
        </Switch>
      </Suspense>
    );
  }

export default AppRoutes;
