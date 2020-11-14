import { NavModelItem } from '@savantly/sprout-api';
import { ErrorBoundaryAlert } from '@savantly/sprout-ui';
import axios from 'axios';
import React, { createRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';
import { SERVER_API_URL } from './config/constants';
import { SideMenu } from './core/components/sidemenu/SideMenu';
import { updateAppSettings } from './core/reducers/application';
import { getSession } from './core/reducers/authentication';
import { addRootNavs } from './core/reducers/navTree';
import { getBoolean } from './core/utils/booleans';
import { initDevFeatures } from './dev';
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

  const isAuthenticated = useSelector((state: StoreState) => state.authentication.isAuthenticated);
  const isSessionFetched = useSelector((state: StoreState) => state.authentication.sessionHasBeenFetched);
  const appSettings = useSelector((state: StoreState) => state.application.settings);
  const requiresAuth = getBoolean(appSettings.REQUIRE_AUTHENTICATION) && !isAuthenticated && (window.location.pathname !== '/login');

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
    if (isAuthenticated && !isSessionFetched) {
      dispatch(getSession());
    }
    axios
      .get(`${SERVER_API_URL}/api/ui-properties`)
      .then((value) => {
        dispatch(updateAppSettings(value.data));
      })
      .catch((failed) => {
        console.error(failed);
      });
  }, [isAuthenticated, isSessionFetched]);

  const appElem = createRef<HTMLDivElement>();

  return (
    <React.Fragment>
      {requiresAuth || (<SideMenu></SideMenu>)}
      <div ref={appElem} className="main-view">
        <div className="scroll-canvas">
          <BrowserRouter>
            <ErrorBoundaryAlert style="page">
              <App theme={theme} forceLogin={requiresAuth}/>
            </ErrorBoundaryAlert>
          </BrowserRouter>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
