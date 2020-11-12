import React, { FC, ReactElement, useMemo, useState } from 'react';
import axios from 'axios';
import { OAuth2Login } from '@sprout-platform/ui';
import { OAuthClientConfig, StoreState } from '../../types';
import { Alert, Card, Col } from 'reactstrap';
import { login } from '../../core/reducers/authentication';
import { useDispatch, useSelector } from 'react-redux';

export const LoginPage = () => {
  const once = true;
  const dispatch = useDispatch();
  const authentication = useSelector((store: StoreState) => store.authentication);
  const [oauthClients, setOauthClients] = useState(new Array<OAuthClientConfig>());

  useMemo(
    () =>
      axios.get('/api/authentication/oauth').then((value) => {
        setOauthClients(value.data.clients);
      }),
    [once]
  );

  console.log(oauthClients);

  return (
    <div>
        <Col widths={['']}>
        
        </Col>
        <Card>

        </Card>
      {authentication.errorMessage && <Alert>{authentication.errorMessage}</Alert>}
      {oauthClients &&
        oauthClients.map((c) => (
          <OAuth2Login
            key={c.name}
            authorizationUrl={c.authorizationUrl}
            clientId={c.clientId}
            redirectUri={window.location.href}
            responseType="token"
            buttonText={c.displayName}
            scope={c.scope}
            className="btn btn-primary"
            onFailure={(error) =>
              dispatch(
                login({
                  errorMessage: error
                })
              )
            }
            onSuccess={(data) => {
              dispatch(
                login({
                  accessToken: data.access_token
                })
              );
            }}
          />
        ))}
    </div>
  );
};
