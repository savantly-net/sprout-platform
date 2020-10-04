//import { LoginCallback } from '@okta/okta-react';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { SafeDynamicImport } from '../core/components/DynamicImports/SafeDynamicImport';
import Spinner from '../core/components/Spinner/Spinner';
import { DashboardPage } from '../features/dashboard/containers/DashboardPage';
import DashboardProvider from '../features/dashboard/containers/DashboardProvider';
import { DashboardRouteInfo, StoreState } from '../types';

const importDashboardPage =
SafeDynamicImport(import(/* webpackChunkName: "DashboardPage" */ '../features/dashboard/containers/DashboardPage'));

type OwnProps = {
  history: any
}
type StateProps = {
}
type DispatchProps = {
}
type AllProps = OwnProps & StateProps & DispatchProps;

const AppRoutes = ({history}: AllProps) => {
  
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" render={
            (props) => {
              return <DashboardProvider {...props} />
            }  
          }>
          
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

const mapStateToProps = (state: StoreState) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes as React.FC<OwnProps>);
