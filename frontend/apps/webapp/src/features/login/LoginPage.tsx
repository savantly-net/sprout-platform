import { Container } from '@savantly/sprout-ui';
import { Form, FormField, OAuth2Login } from '@sprout-platform/ui';
import { css, cx } from 'emotion';
import React, { Fragment, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Row } from 'reactstrap';
import { login, logout } from '../../core/reducers/authentication';
import { sproutApiSvc } from '../../core/services/sproutApiSvc';
import { OAuthClientConfig, StoreState } from '../../types';

export const LoginPage = ({ redirectUrl }: { redirectUrl?: string }) => {
  const redirectTo = redirectUrl || '/';
  const once = true;
  const dispatch = useDispatch();
  const authentication = useSelector((store: StoreState) => store.authentication);
  const [oauthClients, setOauthClients] = useState(new Array<OAuthClientConfig>());
  const [error, setError] = useState('');

  useMemo(
    () =>
      sproutApiSvc
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

  const showOAuth = oauthClients.length > 0;
  const submitLogin = async (creds: { username: string; password: string }) => {
    setError('');
    try {
      await sproutApiSvc.post('/api/login', creds);
      window.location.href = redirectTo;
    } catch (error) {
      console.error(error);
      setError('Authentication Failed');
    }
  };

  return (
    <Container grow={1}>
      <div
        className={cx(
          'login-page',
          'd-flex',
          'align-items-center',
          'justify-content-around',
          css`
            height: 100vh;
            margin: auto;
          `
        )}
      >
        <div className="card">
          <div className="card-header">Login</div>
          <div className="card-body">
            <Row
              className={cx(
                'justify-content-center',
                css`
                  margin: auto;
                `
              )}
            >
              <Form
                cancelText="Cancel"
                initialValues={{
                  username: '',
                  password: ''
                }}
                onSubmit={(values, actions) => {
                  submitLogin(values).then(() => {
                    actions.setSubmitting(false);
                  });
                }}
                showButtonsOnTop={false}
                showCancelButton={false}
                showSubmitButton
                submitText="Login"
              >
                <Fragment>
                  <FormField label="Username" name="username" />
                  <FormField label="Password" name="password" type={'password'} />
                </Fragment>
              </Form>
              {error && <Alert color="danger">{error}</Alert>}
            </Row>
            <div
              className={cx(
                'column',
                'p2',
                css`
                  margin: auto;
                  text-align: center;
                `
              )}
            >
              {authentication.errorMessage && <Alert>{authentication.errorMessage}</Alert>}
              {showOAuth && (
                <Fragment>
                  <div>
                    <span
                      className={css`
                        margin: auto;
                      `}
                    >
                      -- OR --
                    </span>
                  </div>
                  {oauthClients.map((c) => (
                    <OAuth2Login
                      key={c.name}
                      autoLogin={c.autoLogin}
                      authorizationUrl={c.authorizationUrl}
                      clientId={c.clientId}
                      redirectUri={window.location.origin}
                      responseType="token"
                      buttonText={c.displayName}
                      scope={c.scope}
                      className="btn btn-primary"
                      onFailure={(error) => {
                        console.log(`failed authentication`, JSON.stringify(error));
                        dispatch(
                          login({
                            errorMessage: error.message
                          })
                        );
                      }}
                      onSuccess={(data) => {
                        console.log(`successful authentication. logging into web app.`, JSON.stringify(data));
                        dispatch(
                          login({
                            accessToken: data.access_token
                          })
                        );
                      }}
                    />
                  ))}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
