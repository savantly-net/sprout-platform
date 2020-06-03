import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRoute } from '../../state/actions';
import Spinner from '../layout/Spinner';

const Dashboard = lazy(() => import('../dashboard/Dashboard'));


class RouteListComponent extends Component {

  componentDidMount() {
    console.log(this.props)
  }

  componentDidUpdate(updates) {
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

const mapStateToProps = state => ({
  routes: state.routes
})

const mapDispatchToProps = dispatch => ({
  addRoute: route => dispatch(addRoute(route))
})

export default connect(mapStateToProps, mapDispatchToProps)(RouteListComponent)