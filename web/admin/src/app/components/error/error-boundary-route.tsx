import React, {Component} from 'react';
import { Route, RouteProps } from 'react-router-dom';
import ErrorBoundary from '../../components/error/error-boundary';

export const ErrorBoundaryRoute = ({ component: ComponentClass, ...rest }: RouteProps) => {
  const encloseInErrorBoundary = (props:any) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );

  if (!Component) throw new Error(`A component needs to be specified for path ${(rest as any).path}`);

  return <Route {...rest} render={encloseInErrorBoundary} />;
};

export default ErrorBoundaryRoute;
