import { ModalRoot, ModalsProvider, Spinner } from '@savantly/sprout-ui';
import { uniqueId } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
