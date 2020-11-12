import React, { FC, ReactElement, useMemo, useState } from 'react';
import axios from 'axios';
import { OAuth2Login } from '@sprout-platform/ui';
import { OAuthClientConfig, StoreState } from '../../types';
import { Alert, Card, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { login } from '../../core/reducers/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@savantly/sprout-ui';
import { css, cx } from 'emotion';

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
        </Row>
      </Col>
    </Container>
  );
};
