import { standardEditorsRegistry, UrlQueryValue } from "@savantly/sprout-api";
import {
  config,


  setLocationSrv
} from "@savantly/sprout-runtime";
import { getStandardOptionEditors } from "@savantly/sprout-ui";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
//import { updateLocation } from "./core/actions";
import ErrorBoundary from "./core/components/error/error-boundary";
import { SideMenu } from "./core/components/sidemenu/SideMenu";
import locationSvc from "./core/services/locationSvc";
import { builtInPluginMeta } from "./features/plugins/built_in_plugins";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { configureStore, history } from "./store/configureStore";

const store = configureStore();
const locationService = locationSvc(history);

setLocationSrv(locationService);

const location = window.location;
console.log(location);
const urlParams = new URLSearchParams(location.search);
const queryParams: Record<string, UrlQueryValue> = {};
urlParams.forEach((value, key) => {
  queryParams[key] = value;
});

let theme = "light";
if (queryParams["dark"]) {
  theme = "dark";
}

// import stylesheet based on theme
if (theme == "dark") {
  require("./assets/stolen.dark.css");
} else {
  require("./assets/stolen.light.css");
}

document.body.classList.add("is-react");
config.panels = builtInPluginMeta;
standardEditorsRegistry.setInit(getStandardOptionEditors);

ReactDOM.render(
  <React.Fragment>
    <ErrorBoundary>
      <Provider store={store}>
        <SideMenu></SideMenu>
        <div className="main-view">
          <div className="scroll-canvas">
            <App theme={theme} />
          </div>
        </div>
      </Provider>
    </ErrorBoundary>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
