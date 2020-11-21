import { Container } from '@savantly/sprout-ui';
import { OAuth2Login } from '@sprout-platform/ui';
import axios from 'axios';
import { css, cx } from 'emotion';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Col, Row } from 'reactstrap';
import { getSession, login, logout } from '../../core/reducers/authentication';
import { OAuthClientConfig, StoreState } from '../../types';

export const LoginPage = ({
  redirectUrl
}: {redirectUrl: string}) => {
  const once = true;
  const dispatch = useDispatch();
  const authentication = useSelector((store: StoreState) => store.authentication);
  const [oauthClients, setOauthClients] = useState(new Array<OAuthClientConfig>());
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useMemo(
    () =>
      axios
        .get('/api/authentication/oauth')
        .then((value) => {
          setOauthClients(value.data.clients);
        })
        .catch((failed: Error) => {
          console.error(failed);
          setError(failed.message);
          dispatch(logout());
        }),
    [once]
  );

  console.log(oauthClients);

  return (
    <Container grow={1}>
      <Col
        className={cx(
          'align-items-center',
          'align-middle',
          css`
            height: 100vh;
          `
        )}
      >
        <Row
          className={css`
            margin: auto;
          `}
        >
          {authentication.errorMessage && <Alert>{authentication.errorMessage}</Alert>}
          {oauthClients.length == 0 && (
            <Alert color="warning">
              <React.Fragment>
                <p>
                  There are no OAuth Clients configured.{' '}
                  {error && <p>Check public accessibility of `/api/authentication/oauth`</p>}
                </p>
              </React.Fragment>
            </Alert>
          )}
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
                      errorMessage: error.message
                    })
                  )
                }
                onSuccess={(data) => {
                  dispatch(
                    login({
                      accessToken: data.access_token
                    })
                  );
                  dispatch(getSession());
                  if(redirectUrl == '/login') {
                    navigate('/');
                  } else {
                    navigate(redirectUrl);
                  }
                }}
              />
            ))}
        </Row>
      </Col>
    </Container>
  );
};
