import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRoute, IRoute, RouteItemsState } from './state/reducers/routes';
import { IRootState } from './state/reducers/';
import Spinner from './layout/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const FontAwesome = lazy(() => import('./icons/FontAwesome'));
const ChartJs = lazy(() => import('./charts/ChartJs'));
const Error404 = lazy(() => import('./user-pages/Error404'));
const Error500 = lazy(() => import('./user-pages/Error500'));
const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));
const BlankPage = lazy(() => import('./user-pages/BlankPage'));

interface RouteListProps extends StateProps, DispatchProps {
  routes: RouteItemsState
}

class AppRoutes extends Component<RouteListProps>{
  componentDidMount() {
    console.log(this.props)
  }

  componentDidUpdate(updates: any) {
    console.log(updates);
    console.log(this.props);
  }
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/" component={ Dashboard } />
          {this.props.routes.map((route) => (
              <Route path={route.path} component={route.component} key={route.path} />
          ))}
          <Route path="/icons" component={ FontAwesome } />
          <Route path="/charts" component={ ChartJs } />
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register1 } />
          <Route path="/blank" component={ BlankPage } />

          <Route path="/errors/500" component={ Error500 } />
          <Route path="/errors/404" component={ Error404 } />
          <Redirect to="/errors/404" />
        </Switch>
      </Suspense>
    );
  }
}

const mapStateToProps = ({routes}: IRootState) => ({
  routes
});

const mapDispatchToProps = (dispatch:Function) => ({
  addRoute: (route:IRoute) => dispatch(addRoute(route))
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);