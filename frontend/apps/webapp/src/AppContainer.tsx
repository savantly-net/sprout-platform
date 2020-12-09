import { ErrorBoundaryAlert } from '@savantly/sprout-ui';
import axios from 'axios';
import React, { createRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './App.css';
import { SERVER_API_URL } from './config/constants';
import { SideMenu } from './core/components/sidemenu/SideMenu';
import { updateAppSettings } from './core/reducers/application';
import { getSession } from './core/reducers/authentication';
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
    if (!navTreeState.fetched && !navTreeState.fetching) {
      dispatch(loadNavTreeState());
    }
  }, [navTreeState]);

  useMemo(() => {
    if (!isSessionFetched) {
      dispatch(getSession());
    } else {
      axios
        .get(`${SERVER_API_URL}/api/ui-properties`)
        .then((value) => {
          dispatch(updateAppSettings(value.data));
        })
        .catch((failed) => {
          console.error(failed);
        });
    }
  }, [isSessionFetched]);

  const appElem = createRef<HTMLDivElement>();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login">
          <LoginPage redirectUrl="/" />
        </Route>
        <Route
          path="/*"
          element={
            <React.Fragment>
              {!isShowLogin && <SideMenu></SideMenu>}
              <div ref={appElem} className="main-view">
                <div className="scroll-canvas">
                  <ErrorBoundaryAlert style="page">
                    <App />
                  </ErrorBoundaryAlert>
                </div>
              </div>
            </React.Fragment>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppContainer;
