// import { ModalRoot, ModalsProvider, Spinner } from '@savantly/sprout-ui';
// import { ModalRoot, ModalsProvider } from '@savantly/sprout-ui';
import { confirm, Spinner ,ModalRoot, ModalsProvider} from '@sprout-platform/ui';
import { ChakraProvider } from '@chakra-ui/react';
import { uniqueId } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from 'reactstrap';
import './App.css';
import setupAxiosInterceptors from './config/axios-interceptor';
import ModalProxy from './core/components/ModalProxy/ModalProxy';
import { PluginProvider } from './core/components/PluginProvider/PluginProvider';
import { logout, showLogin } from './core/reducers/authentication';
import { ThemeProvider } from './core/utils/ConfigProvider';
import { initDevFeatures } from './dev';
import { LoginPage } from './features/login/LoginPage';
import AppRoutes from './routes/AppRoutes';
import { history } from './store/configureStore';
import { StoreState } from './types';
import { Global, css } from '@emotion/core';
import 'focus-visible/dist/focus-visible';

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

export const App = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    initDevFeatures();
  }
  const isShowLogin = useSelector((state: StoreState) => state.authentication.showLogin);
  const isSessionFetched = useSelector((state: StoreState) => state.authentication.sessionHasBeenFetched);
  const sessionFetchFailed = useSelector((state: StoreState) => state.authentication.sessionFetchFailed);
  const dispatch = useDispatch();
  const location = useLocation();
  setupAxiosInterceptors(() => {
    logout();
    dispatch(showLogin());
  });

  const orRenderSprinner = () => {
    if (isShowLogin) {
      return <LoginPage redirectUrl={location.pathname} />;
    } else if (isSessionFetched) {
      return (
        <PluginProvider>
          <AppRoutes history={history} />
        </PluginProvider>
      );
    } else if (sessionFetchFailed && !isShowLogin) {
      confirm({
        message: 'Problem connecting to the API server.',
        title: 'Error',
        buttonsComponent: ({ onClose }) => {
          return (
            <div>
              <Button color="warning" onClick={() => onClose(true)}>
                Refresh
              </Button>
            </div>
          );
        }
      }).then((v) => {
        if (v) {
          window.location.reload();
        }
      });
      return <Spinner />;
    } else {
      return <Spinner />;
    }
  };

  return (
    <ChakraProvider>
      <Global styles={GlobalStyles} />
      <ThemeProvider>
        <ModalsProvider>
          {orRenderSprinner()}
          <ModalProxy key={uniqueId()} />
          <ModalRoot />
        </ModalsProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
};

export default App;
