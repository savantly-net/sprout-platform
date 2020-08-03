import React, { Component,Suspense, lazy, ComponentClass } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRoute, IRoute, RouteItemsState } from '../state/reducers/routes';
import Spinner from '../layout/Spinner';
import { IRootState } from '../state/reducers/';

const Dashboard = lazy(() => import('../dashboard/Dashboard'));

interface RouteListProps extends StateProps, DispatchProps {
  routes: RouteItemsState
}

class RouteListComponent extends Component<RouteListProps> {

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
          <Redirect to="/" />
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

export default connect(mapStateToProps, mapDispatchToProps)(RouteListComponent);