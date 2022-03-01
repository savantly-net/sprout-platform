import { ErrorBoundaryAlert } from '@sprout-platform/ui';
import React, { createRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './App.css';
import { SERVER_API_URL } from './config/constants';
import { AppNotificationProvider } from './core/components/AppNotificationProvider/AppNotificationProvider';
import { BrandingProvider } from './core/components/Branding/BrandingProvider';
import { SideMenu } from './core/components/sidemenu/SideMenu';
import { updateAppSettings } from './core/reducers/application';
import { getSession } from './core/reducers/authentication';
import { sproutApiSvc } from './core/services/sproutApiSvc';
import { initDevFeatures } from './dev';
import { LoginPage } from './features/login/LoginPage';
import { loadNavTreeState } from './features/navigation/navTree';
import { StoreState } from './types';

export const AppContainer = ({ theme }: { theme: string }) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    initDevFeatures();
  }

  const isShowLogin = useSelector((state: StoreState) => state.authentication.showLogin);
  const isSessionFetched = useSelector((state: StoreState) => state.authentication.sessionHasBeenFetched);
  const navTreeState = useSelector((state: StoreState) => state.navTree);

  const dispatch = useDispatch();
  useMemo(() => {
    if (!navTreeState.fetched && !navTreeState.fetching && !navTreeState.error) {
      dispatch(loadNavTreeState());
    }
  }, [navTreeState,dispatch]);

  useMemo(() => {
    if (!isSessionFetched) {
      dispatch(getSession());
    } else {
      sproutApiSvc
        .get(`${SERVER_API_URL}/api/ui-properties`)
        .then((value) => {
          dispatch(updateAppSettings(value.data));
        })
        .catch((failed) => {
          console.error(failed);
        });
    }
  }, [isSessionFetched,dispatch]);

  const appElem = createRef<HTMLDivElement>();

  return (
    <AppNotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login">
            <LoginPage redirectUrl="/" />
          </Route>
          <Route
            path="/*"
            element={
              <BrandingProvider>
                {!isShowLogin && isSessionFetched && <SideMenu></SideMenu>}
                <div ref={appElem} className="main-view">
                  <div className="scroll-canvas">
                    <ErrorBoundaryAlert style="page">
                      <App />
                    </ErrorBoundaryAlert>
                  </div>
                </div>
              </BrandingProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppNotificationProvider>
  );
};

export default AppContainer;
