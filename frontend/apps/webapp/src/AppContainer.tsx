import { NavModelItem } from '@savantly/sprout-api';
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
import { addRootNavs } from './features/navigation/navTree';
import { initDevFeatures } from './dev';
import { LoginPage } from './features/login/LoginPage';
import { StoreState } from './types';

interface ServerMenuItem {
  name: string;
  displayText: string;
  icon: string;
  url: string;
  children: ServerMenuItem[];
}

function toNavModel(menuItem: ServerMenuItem): NavModelItem {
  return {
    id: menuItem.name,
    text: menuItem.displayText,
    icon: menuItem.icon || 'cube',
    url: menuItem.url,
    children: menuItem.children.map((m) => {
      return toNavModel(m);
    })
  };
}

export const AppContainer = ({ theme }: { theme: string }) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    initDevFeatures();
  }

  const isSessionFetched = useSelector((state: StoreState) => state.authentication.sessionHasBeenFetched);

  const dispatch = useDispatch();
  const once = true;
  useMemo(() => {
    axios.get(`${SERVER_API_URL}/api/public/menu`).then((value) => {
      const items = value.data as ServerMenuItem[];
      dispatch(
        addRootNavs(
          items.map((m) => {
            return toNavModel(m);
          })
        )
      );
    });
  }, [once]);

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
        <Route path='/*'
          element={
            <React.Fragment>
              <SideMenu></SideMenu>
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
