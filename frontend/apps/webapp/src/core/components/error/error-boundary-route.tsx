import React, {Component} from 'react';
import { RouteProps } from 'react-router';
import { Route } from 'react-router-dom';
import ErrorBoundary from './error-boundary';

export const ErrorBoundaryRoute = ({ component: ComponentClass, ...rest }: RouteProps) => {
  const EncloseInErrorBoundary = (props:any) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );

  if (!Component) throw new Error(`A component needs to be specified for path ${(rest as any).path}`);

  return <Route element={<EncloseInErrorBoundary />} />;
};

export default ErrorBoundaryRoute;
