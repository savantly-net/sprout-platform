import { LoginCallback } from '@okta/okta-react';
import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Spinner from './layout/Spinner';
import { IRootState } from './state/reducers';
import { addRoute, IRoute, RouteItemsState } from './state/reducers/routes';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Error404 = lazy(() => import('./user-pages/Error404'));
const Error500 = lazy(() => import('./user-pages/Error500'));
const Login = lazy(() => import('./user-pages/Login'));
//const Register1 = lazy(() => import('./user-pages/Register'));
const BlankPage = lazy(() => import('./user-pages/BlankPage'));

interface RouteListProps extends StateProps, DispatchProps {
  routes: RouteItemsState;
}

class AppRoutes extends Component<RouteListProps> {
  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate(updates: any) {
    console.log(updates);
    console.log(this.props);
  }
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/implicit/callback" component={LoginCallback} />
          <Route path="/blank" component={BlankPage} />
          <Route path="/errors/500" component={Error500} />
          <Route path="/errors/404" component={Error404} />
          {this.props.routes.map(route => (
            <Route path={route.path} component={route.component} key={route.path} />
          ))}
          <Redirect to="/errors/404" />
        </Switch>
      </Suspense>
    );
  }
}

const mapStateToProps = ({ routes, authentication }: IRootState) => ({
  routes,
  authentication,
});

const mapDispatchToProps = (dispatch: Function) => ({
  addRoute: (route: IRoute) => dispatch(addRoute(route)),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
