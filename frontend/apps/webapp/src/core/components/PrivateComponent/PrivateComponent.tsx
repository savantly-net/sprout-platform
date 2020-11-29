import React, { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../types';

const authorize = (authorities: string[], hasAnyAuthorities?: string[]) => {
  if (!hasAnyAuthorities || hasAnyAuthorities.length === 0) {
    return true;
  } else {
    if ( !authorities && hasAnyAuthorities.length !== 0) {
      return false;
    } else {
        return hasAnyAuthorities.some((auth) => authorities.includes(auth));
    }
  }
};

export const PrivateComponent = ({ hasAnyAuthority, children }: { hasAnyAuthority?: string[]; children: ReactNode }) => {
  const sessionHasBeenFetched = useSelector((state: StoreState) => state.authentication.sessionHasBeenFetched);
  const user = useSelector((state: StoreState) => state.authentication.user);
  const authorized = useMemo(() => {
    return sessionHasBeenFetched && authorize(user.authorities, hasAnyAuthority);
  }, [sessionHasBeenFetched, user]);

  return <React.Fragment>{authorized && children}</React.Fragment>;
};
