import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import store from './state/store';
import PluginLoader from './app/components/PluginLoader';

window.React = React;
window.ReactDOM = ReactDOM;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/admin/">
      <PluginLoader>
        <App />
      </PluginLoader>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));

serviceWorker.unregister();