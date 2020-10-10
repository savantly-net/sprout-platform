import React, { Children, Component, FunctionComponent, ReactChildren, ReactComponentElement, ReactElement } from "react";
import { Route, RouteProps } from "react-router";
import { ReactReduxContext } from 'react-redux'
import { JsxAttributes } from "typescript";

export const DispatchingRoute = ({exact, path, component, computedMatch}: {
    exact?: boolean;
    path: string;
    component: ReactElement,
    computedMatch: {
        url: string;
        path: string;
        params: any;
    };
}): ReactElement => (
  <Route {...exact} {...path} render={props => {
    
    const Component = component as any;

    return <ReactReduxContext.Consumer>
      {({ store }) => {
        store.dispatch({ type: "ROUTE_CHANGED", url: computedMatch.url, path: computedMatch.path, params: computedMatch.params })
        return <Component {...props} />;
      }}
    </ReactReduxContext.Consumer>;
  }
  } />
);