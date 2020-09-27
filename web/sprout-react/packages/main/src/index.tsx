import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppComponent from './app/App';
import ErrorBoundary from './app/components/error/error-boundary';
import PluginLoader from './app/components/PluginLoader';
import setupAxiosInterceptors from './app/config/axios-interceptor';
import DevTools from './app/config/devtools';
import { loadIcons } from './app/config/icon-loader';
import initStore from './app/config/store';
import * as serviceWorker from './serviceWorker';


//window.React = React;
//window.ReactDOM = ReactDOM;

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore();

//const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => console.log('unauthenticated http response'));

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