import React, { ReactNode, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../types';

const authorize = (authorities: string[], hasAnyAuthorities?: string[]): boolean => {
  // if the authorized authority list is undefined or empty, then authorize the user
  if (!hasAnyAuthorities || hasAnyAuthorities.length === 0) {
    return true;
  }
  // else if the user doesn't have any authorities, don't authorize them
  else if (!authorities || authorities.length === 0) {
    return false;
  }
  // else finally, check if the user has any of the required authorities
  else {
    return hasAnyAuthorities.some((auth) =>
      authorities.some((authority) => authority.toLowerCase() === auth.toLowerCase())
    );
  }
};

export const PrivateComponent = ({
  hasAnyAuthority,
  children
}: {
  hasAnyAuthority?: string[];
  children: ReactNode;
}) => {
  const sessionHasBeenFetched = useSelector((state: StoreState) => state.authentication.sessionHasBeenFetched);
  const user = useSelector((state: StoreState) => state.authentication.user);
  const authorized = useMemo(() => {
    console.log(`authorizing for private component: `, user, hasAnyAuthority);
    return sessionHasBeenFetched && authorize(user.authorities, hasAnyAuthority);
  }, [sessionHasBeenFetched, user]);

  if (!authorized) {
    return <Navigate to="/login" />;
  }

  return <React.Fragment>{authorized && children}</React.Fragment>;
};
