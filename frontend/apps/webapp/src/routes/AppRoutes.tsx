//import { LoginCallback } from '@okta/okta-react';
import React, { Fragment, Suspense, useEffect, useMemo, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { SafeDynamicImport } from '../core/components/DynamicImports/SafeDynamicImport';
import PageNotFound from '../core/components/error/page-not-found';
import Spinner from '../core/components/Spinner/Spinner';
import { DashboardPage } from '../features/dashboard/containers/DashboardPage';
import DashboardProvider from '../features/dashboard/containers/DashboardProvider';
import DashboardRoutes from '../features/dashboard/DashboardRoutes';
import PluginRoutes from '../features/plugins/PluginRoutes';
import { DashboardRouteInfo, StoreState } from '../types';

type OwnProps = {
  history: any;
};
type StateProps = {};
type DispatchProps = {};
type AllProps = OwnProps & StateProps & DispatchProps;

const AppRoutes = ({ history }: AllProps) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Fragment>
          <DashboardRoutes />
          <PluginRoutes />
        </Fragment>
        <Route component={PageNotFound} />
      </Switch>
    </Suspense>
  );
};

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes as React.FC<OwnProps>);
