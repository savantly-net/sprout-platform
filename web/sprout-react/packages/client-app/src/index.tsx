import { standardEditorsRegistry, UrlQueryValue } from '@savantly/sprout-api';
import { config, getLocationSrv, LocationUpdate, setLocationSrv } from '@savantly/sprout-runtime';
import { getStandardOptionEditors } from '@savantly/sprout-ui';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { updateLocation } from './core/actions';
import ErrorBoundary from './core/components/error/error-boundary';
import { SideMenu } from './core/components/sidemenu/SideMenu';
import { builtInPluginMeta } from './features/plugins/built_in_plugins';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './store/configureStore';

const store = configureStore();
setLocationSrv({
  update: (opt: LocationUpdate) => {
    store.dispatch(updateLocation(opt));
  },
});


const location = window.location;
console.log(location);
const urlParams = new URLSearchParams(location.search);
const queryParams: Record<string, UrlQueryValue> = {};
urlParams.forEach((value, key) => {
  queryParams[key] = value;
});

getLocationSrv().update({
  path: location.pathname,
  query: queryParams
});


let theme = 'light';
if(queryParams['dark']){
  theme = 'dark';
}

// import stylesheet based on theme 
if (theme == 'dark') {
  require('./sass/grafana.dark.scss');
} else {
  require('./sass/grafana.light.scss');
}

document.body.classList.add('is-react');
config.panels = builtInPluginMeta;
standardEditorsRegistry.setInit(getStandardOptionEditors);

ReactDOM.render(
  <React.Fragment>
    <ErrorBoundary>
      <Provider store={store}>
        <SideMenu></SideMenu>
        <div className="main-view">
          <div className="scroll-canvas">
            <App theme={theme}/>
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
