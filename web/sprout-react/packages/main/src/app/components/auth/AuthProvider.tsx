import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateAuthentication } from '../../state/reducers/authentication';

export const AuthProvider = () => {
  const dispatch = useDispatch();
  const { authState } = useOktaAuth();

  useEffect(() => {
    updateAuthentication(authState)(dispatch);
  }, [authState, dispatch]);

  return (<div></div>);
};

export default AuthProvider;
