import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ErrorBoundary from './core/components/error/error-boundary';
import { configureStore } from './store/configureStore';
import { LocationUpdate, setLocationSrv } from '@savantly/sprout-runtime';
import { updateLocation } from './core/actions';
import { SideMenu } from './core/components/sidemenu/SideMenu';

const store = configureStore();
setLocationSrv({
  update: (opt: LocationUpdate) => {
    store.dispatch(updateLocation(opt));
  },
});

ReactDOM.render(
  <React.Fragment>
    <ErrorBoundary>
      <Provider store={store}>
        <SideMenu></SideMenu>
        <div className="main-view">
          <div className="scroll-canvas">
            <App />
          </div>
        </div>
      </Provider>
    </ErrorBoundary>
    
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
