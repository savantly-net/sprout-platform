import React, { ComponentType, ReactElement } from 'react';
import { connect } from 'react-redux';
import { BrowserRouterProps, Route, useNavigate } from 'react-router-dom';
import { StoreState } from '../../../types';
import ErrorBoundary from '../error/error-boundary';

interface IOwnProps {
  hasAnyAuthorities?: string[];
  children: ReactElement | ReactElement[];
  path: string;
  element: React.ReactElement;
}

export interface IPrivateRouteProps extends IOwnProps, StateProps {}

export const PrivateRouteComponent = ({
  isAuthenticated,
  sessionHasBeenFetched,
  isAuthorized,
  hasAnyAuthorities = [],
  ...rest
}: IPrivateRouteProps) => {
  const navigate = useNavigate();

  const unauthorized = () => {
    return (
      <div className="insufficient-authority">
        <div className="alert alert-danger">You are not authorized to access this page.</div>
      </div>
    );
  };

  const checkAuthorities = (props: any) =>
    isAuthorized ? (
      <ErrorBoundary>
        <Route {...props} />
      </ErrorBoundary>
    ) : (
      unauthorized()
    );

  const RenderRedirect = (props: any) => {
    if (!sessionHasBeenFetched) {
      return <div></div>;
    } else {
      if (isAuthenticated) {
        return checkAuthorities(props);
      } else {
        return unauthorized();
      }
    }
  };

  return RenderRedirect({ ...rest });
};

export const hasAnyAuthority = (authorities: string[], hasAnyAuthorities: string[]) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some((auth) => authorities.includes(auth));
  }
  return false;
};

const mapStateToProps = (
  { authentication: { isAuthenticated, user, sessionHasBeenFetched } }: StoreState,
  { hasAnyAuthorities = [] }: IOwnProps
) => ({
  isAuthenticated,
  isAuthorized: hasAnyAuthority(user.authorities, hasAnyAuthorities),
  sessionHasBeenFetched
});

type StateProps = ReturnType<typeof mapStateToProps>;

/**
 * A route wrapped in an authentication check so that routing happens only when you are authenticated.
 * Accepts same props as React router Route.
 * The route also checks for authorization if hasAnyAuthorities is specified.
 */
export const PrivateRoute = connect(mapStateToProps, null, null, { pure: false })(PrivateRouteComponent);

export default PrivateRoute;
