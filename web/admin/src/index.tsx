import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { bindActionCreators } from 'redux';

import DevTools from './app/config/devtools';
import initStore from './app/config/store';
import setupAxiosInterceptors from './app/config/axios-interceptor';
import { clearAuthentication } from './app/state/reducers/authentication';
import ErrorBoundary from './app/components/error/error-boundary';
import AppComponent from './app/App';
import { loadIcons } from './app/config/icon-loader';
import PluginLoader from './app/components/PluginLoader';

window.React = React;
window.ReactDOM = ReactDOM;

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore();

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

loadIcons();

const rootEl = document.getElementById('root');

const render = (Component: any) =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <div>
          {/* If this slows down the app in dev disable it and enable when required  */}
          {devTools}
          <PluginLoader>
            <Component />
          </PluginLoader>
        </div>
      </Provider>
    </ErrorBoundary>,
    rootEl
  );

render(AppComponent);

serviceWorker.unregister();