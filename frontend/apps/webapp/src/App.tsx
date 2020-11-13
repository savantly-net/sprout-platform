import { ModalRoot, ModalsProvider } from '@savantly/sprout-ui';
import axios from 'axios';
import { uniqueId } from 'lodash';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './App.css';
import setupAxiosInterceptors from './config/axios-interceptor';
import { SERVER_API_URL } from './config/constants';
import ModalProxy from './core/components/ModalProxy/ModalProxy';
import { PluginProvider } from './core/components/PluginProvider/PluginProvider';
import { updateAppSettings } from './core/reducers/application';
import { getBoolean } from './core/utils/booleans';
import { ThemeProvider } from './core/utils/ConfigProvider';
import { initDevFeatures } from './dev';
import { LoginPage } from './features/login/LoginPage';
import AppRoutes from './routes/AppRoutes';
import { history } from './store/configureStore';
import { StoreState } from './types';

export const App = ({ theme }: { theme: string }) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    initDevFeatures();
  }
  const navigate = useNavigate();
  setupAxiosInterceptors(() => {
    navigate('/login');
  });
  const isAuthenticated = useSelector((state: StoreState) => state.authentication.isAuthenticated);
  const appSettings = useSelector((state: StoreState) => state.application.settings);
  const dispatch = useDispatch();

  useMemo(() => {
    axios
      .get(`${SERVER_API_URL}/api/ui-properties`)
      .then((value) => {
        dispatch(updateAppSettings(value.data));
      })
      .catch((failed) => {
        console.error(failed);
      });
  }, [isAuthenticated]);

  const requiresAuth = getBoolean(appSettings.REQUIRE_AUTHENTICATION);
  const orRenderLogin = () => {
    if ((!isAuthenticated) && requiresAuth) {
      console.log('rendering LoginPage due to settings');
      console.log(isAuthenticated, appSettings.REQUIRE_AUTHENTICATION);
      return <LoginPage />;
    } else {
      return (
        <ThemeProvider>
          <ModalsProvider>
            <PluginProvider>
              <AppRoutes history={history} />
            </PluginProvider>
            <ModalProxy key={uniqueId()} />
            <ModalRoot />
          </ModalsProvider>
        </ThemeProvider>
      );
    }
  };

  return orRenderLogin();
};

export default App;
