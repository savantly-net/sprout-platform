import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/authentication';

export const AuthProvider = () => {
  const dispatch = useDispatch();
  const { authState } = useOktaAuth();

  useEffect(() => {
    dispatch(login({
      accessToken: authState.accessToken
    }));
  }, [authState, dispatch]);

  return (<div></div>);
};

export default AuthProvider;
