//import { LoginCallback } from '@okta/okta-react';
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { SafeDynamicImport } from '../core/components/DynamicImports/SafeDynamicImport';
import Page from '../core/components/Page/Page';
import Spinner from '../core/components/Spinner/Spinner';
import { useNavModel } from '../core/hooks/useNavModel';
import { DashboardRouteInfo, StoreState } from '../types';

const importDashboardPage =
SafeDynamicImport(import(/* webpackChunkName: "DashboardPage" */ '../features/dashboard/containers/DashboardPage'));


interface AppProps extends StateProps, DispatchProps {}
class AppRoutes extends Component<AppProps> {
  
  render() {
    //const container = ComponentContainer(importDashboardPage(), {routeInfo: DashboardRouteInfo.Home}) as any;
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/">
            {importDashboardPage({routeInfo: DashboardRouteInfo.Home})}
          </Route>
        </Switch>
      </Suspense>
    );
  }
}

const mapStateToProps = ({ authentication }: StoreState) => ({
  authentication,
});

const mapDispatchToProps = (dispatch: Function) => ({});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
