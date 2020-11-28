import { ModalRoot, ModalsProvider, Spinner } from '@savantly/sprout-ui';
import { uniqueId } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import setupAxiosInterceptors from './config/axios-interceptor';
import ModalProxy from './core/components/ModalProxy/ModalProxy';
import { PluginProvider } from './core/components/PluginProvider/PluginProvider';
import { ThemeProvider } from './core/utils/ConfigProvider';
import { initDevFeatures } from './dev';
import AppRoutes from './routes/AppRoutes';
import { history } from './store/configureStore';
import { StoreState } from './types';
export const App = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    initDevFeatures();
  }
  const isSessionFetched = useSelector((state: StoreState) => state.authentication.sessionHasBeenFetched);
  const navigate = useNavigate();
  const location = useLocation();
  setupAxiosInterceptors(() => {
    navigate('/login');
  });

  const orRenderSuspense = () => {
    if (isSessionFetched) {
      return (
        <PluginProvider>
          <AppRoutes history={history} />
        </PluginProvider>
      );
    } else {
      return <Spinner />;
    }
  };

  return (
    <ThemeProvider>
      <ModalsProvider>
        {orRenderSuspense()}
        <ModalProxy key={uniqueId()} />
        <ModalRoot />
      </ModalsProvider>
    </ThemeProvider>
  );
};

export default App;
