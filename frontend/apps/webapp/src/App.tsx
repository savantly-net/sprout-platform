import { ModalRoot, ModalsProvider } from '@savantly/sprout-ui';
import { uniqueId } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import setupAxiosInterceptors from './config/axios-interceptor';
import ModalProxy from './core/components/ModalProxy/ModalProxy';
import { PluginProvider } from './core/components/PluginProvider/PluginProvider';
import { ThemeProvider } from './core/utils/ConfigProvider';
import { initDevFeatures } from './dev';
import AppRoutes from './routes/AppRoutes';
import { history } from './store/configureStore';

export const App = ({ theme, forceLogin }: { theme: string; forceLogin: boolean }) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    initDevFeatures();
  }
  const navigate = useNavigate();
  setupAxiosInterceptors(() => {
    navigate('/login');
  });

  const orRenderLogin = () => {
    if (forceLogin) {
      console.log('rendering LoginPage due to settings');
      window.location.href = '/login';
      return <React.Fragment></React.Fragment>;
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
