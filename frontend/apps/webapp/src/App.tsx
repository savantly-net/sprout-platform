import { ConfirmModal, ModalRoot, ModalsProvider, Spinner } from '@savantly/sprout-ui';
import { confirm } from '@sprout-platform/ui';
import { uniqueId } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button, Col } from 'reactstrap';
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
    if (isSessionFetched) {
      return (
        <PluginProvider>
          {isShowLogin && <LoginPage redirectUrl={location.pathname} />}
          {!isShowLogin && <AppRoutes history={history} />}
        </PluginProvider>
      );
    } else if (sessionFetchFailed && !showLogin) {
      confirm({
        message: 'Problem connecting to the API server.',
        title: 'Error',
        buttonsComponent: ({ onClose }) => {
          return (
            <div>
              <Button color="warning" onClick={() => onClose(true)}>Refresh</Button>
            </div>
          );
        }
      }).then((v) => {
        if (v) {
          window.location.href = window.location.href;
        }
      });
      return <Spinner />;
    } else {
      return <Spinner />;
    }
  };

  return (
    <ThemeProvider>
      <ModalsProvider>
        {orRenderSprinner()}
        <ModalProxy key={uniqueId()} />
        <ModalRoot />
      </ModalsProvider>
    </ThemeProvider>
  );
};

export default App;
