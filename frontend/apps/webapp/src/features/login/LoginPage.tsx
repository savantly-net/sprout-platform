import { Container } from '@savantly/sprout-ui';
import { Form, FormField, OAuth2Login } from '@sprout-platform/ui';
import axios from 'axios';
import { css, cx } from 'emotion';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Modal, ModalBody, Row } from 'reactstrap';
import { login, logout } from '../../core/reducers/authentication';
import { OAuthClientConfig, StoreState } from '../../types';

export const LoginPage = ({ redirectUrl, showBasic }: { redirectUrl?: string; showBasic?: boolean }) => {
  const redirectTo = redirectUrl || '/';
  const once = true;
  const dispatch = useDispatch();
  const authentication = useSelector((store: StoreState) => store.authentication);
  const [oauthClients, setOauthClients] = useState(new Array<OAuthClientConfig>());
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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

  const showOAuth = oauthClients.length > 0;
  const submitLogin = async (creds: { username: string; password: string }) => {
    setError('');
    try {
      await axios.post('/api/login', creds);
      window.location.href = redirectTo;
    } catch (error) {
      console.error(error);
      setError('Authentication Failed');
    }
  };

  return (
    <Container grow={1}>
      <Col
        className={cx(
          'align-middle',
          'justify-content-around',
          css`
            height: 100vh;
            margin: auto;
          `
        )}
      >
        <Row
          className={cx(
            'justify-content-center',
            css`
              margin: auto;
            `
          )}
        >
          <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
            Login
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalBody>
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
                <Row form tag="div" widths={['xs', 'sm', 'md', 'lg', 'xl']}>
                  <FormField label="Username" name="username" />
                  <FormField label="Password" name="password" type={'password'} />
                </Row>
              </Form>
              {error && <Alert color="danger">{error}</Alert>}
            </ModalBody>
          </Modal>
        </Row>
        <Row
          className={cx(
            'justify-content-center',
            css`
              margin: auto;
            `
          )}
        >
          {authentication.errorMessage && <Alert>{authentication.errorMessage}</Alert>}
          {showOAuth &&
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
                  if (redirectTo === '/login') {
                    navigate('/');
                  } else {
                    navigate(redirectTo);
                  }
                }}
              />
            ))}
        </Row>
      </Col>
    </Container>
  );
};
