import { ErrorBoundaryAlert, ModalRoot, ModalsProvider } from '@savantly/sprout-ui';
import { uniqueId } from 'lodash';
import React, { createRef } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ModalProxy from './core/components/ModalProxy/ModalProxy';
import { PluginProvider } from './core/components/PluginProvider/PluginProvider';
import { SideMenu } from './core/components/sidemenu/SideMenu';
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
  const isAuthenticated = useSelector((state: StoreState) => state.authentication.isAuthenticated);
  const appElem = createRef<HTMLDivElement>();

  return (
    <React.Fragment>
      {isAuthenticated || (
        <React.Fragment>
          <LoginPage />
        </React.Fragment>
      )}
      {isAuthenticated && (
        <React.Fragment>
          <SideMenu></SideMenu>
          <div ref={appElem} className="main-view">
            <div className="scroll-canvas">
              <BrowserRouter>
                <ErrorBoundaryAlert style="page">
                  <ThemeProvider>
                    <ModalsProvider>
                      <PluginProvider>
                        <AppRoutes history={history} />
                      </PluginProvider>
                      <ModalProxy key={uniqueId()} />
                      <ModalRoot />
                    </ModalsProvider>
                  </ThemeProvider>
                </ErrorBoundaryAlert>
              </BrowserRouter>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default App;
