import { AppEvents, eventBus, standardEditorsRegistry, UrlQueryValue, UserContext } from '@savantly/sprout-api';
import { config, setLocationSrv, setUserContextService } from '@savantly/sprout-runtime';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { getStandardOptionEditors } from '@sprout-platform/ui';
import { setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import $ from 'jquery';
import React from 'react';
import 'react-datetime/css/react-datetime.css';
import ReactDOM from 'react-dom';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Provider } from 'react-redux';
import { BusProvider } from 'ts-bus/react';
import { AppContainer } from './AppContainer';
import appEvents from './core/app_events';
//import { updateLocation } from "./core/actions";
import ErrorBoundary from './core/components/error/error-boundary';
import locationSvc from './core/services/locationSvc';
import { setViewModeBodyClass } from './core/utils/viewMode';
import { builtInPluginMeta } from './features/plugins/built_in_plugins';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { configureStore, history } from './store/configureStore';
import { CoreEvents, KioskUrlValue } from './types';

Sentry.init({
  dsn: 'https://2d8dd62d4b734cfb80248f3728d08c53@o1204832.ingest.sentry.io/6333142',
  release: process.env.REACT_APP_SENTRY_RELEASE,
  integrations: [new BrowserTracing()],
  beforeBreadcrumb: (breadcrumb, hint) => {
    if (breadcrumb.category === 'xhr') {
      const data = {
        requestBody: hint?.xhr?.__sentry_xhr__?.body,
        response: hint?.xhr?.response,
        responseUrl: hint?.xhr?.responseURL
      }
      return { ...breadcrumb, data }
    }
    return breadcrumb
   },

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0
});

setChonkyDefaults({ iconComponent: ChonkyIconFA });

const store = configureStore();

/*** SET runtime services ***/
const locationService = locationSvc(history);
setLocationSrv(locationService);

setUserContextService({
  getUserContext: (): UserContext => {
    return store.getState().authentication;
  }
});
/*** END runtime services ***/

const location = window.location;
console.log(location);
const urlParams = new URLSearchParams(location.search);
const queryParams: Record<string, UrlQueryValue> = {};
urlParams.forEach((value, key) => {
  queryParams[key] = value;
});

let theme = 'off';
if (queryParams['light']) {
  theme = 'light';
}
config.bootData.user = {
  lightTheme: theme === 'off' ? 'off' : 'light'
};

document.body.classList.add('is-react');
config.panels = builtInPluginMeta;
standardEditorsRegistry.setInit(getStandardOptionEditors);

const body = $('body');

// TODO: important?
// see https://github.com/zenorocha/clipboard.js/issues/155
//$.fn.modal.Constructor.prototype.enforceFocus = () => {};

$('#preloader').remove();

appEvents.on(CoreEvents.toggleSidemenuMobile, () => {
  body.toggleClass('sidemenu-open--xs');
});

appEvents.on(CoreEvents.toggleSidemenuHidden, () => {
  body.toggleClass('sidemenu-hidden');
});

appEvents.on(CoreEvents.playlistStarted, () => {
  body.toggleClass('view-mode--playlist', true);
});

appEvents.on(CoreEvents.playlistStopped, () => {
  body.toggleClass('view-mode--playlist', false);
});

// handle kiosk mode
appEvents.on(CoreEvents.toggleKioskMode, (options: { exit?: boolean }) => {
  const kioskQueryString = store.getState().location.query.kiosk;
  let kiosk: KioskUrlValue = kioskQueryString as KioskUrlValue;

  if (options && options.exit) {
    kiosk = false;
  }

  switch (kiosk) {
    case true:
    case 'tv': {
      appEvents.emit(AppEvents.alertSuccess, ['Press ESC to exit Kiosk mode']);
      break;
    }
    default: {
      kiosk = 'tv';
    }
  }

  setViewModeBodyClass(body, kiosk!);
});

// handle in active view state class
let lastActivity = new Date().getTime();
let activeUser = true;
const inActiveTimeLimit = 60 * 5000;

function checkForInActiveUser() {
  if (!activeUser) {
    return;
  }
  // only go to activity low mode on dashboard page
  if (!body.hasClass('page-dashboard')) {
    return;
  }

  if (new Date().getTime() - lastActivity > inActiveTimeLimit) {
    activeUser = false;
    body.addClass('view-mode--inactive');
  }
}

function userActivityDetected() {
  lastActivity = new Date().getTime();
  if (!activeUser) {
    activeUser = true;
    body.removeClass('view-mode--inactive');
  }
}

// mouse and keyboard is user activity
body.mousemove(userActivityDetected);
body.keydown(userActivityDetected);
// set useCapture = true to catch event here
document.addEventListener('wheel', userActivityDetected, { capture: true, passive: true });
// treat tab change as activity
document.addEventListener('visibilitychange', userActivityDetected);

// check every 2 seconds
setInterval(checkForInActiveUser, 2000);

appEvents.on(CoreEvents.toggleViewMode, () => {
  lastActivity = 0;
  checkForInActiveUser();
});

// handle document clicks that should hide things
body.on('click', (evt: JQuery.ClickEvent) => {
  const target = $(evt.target);
  if (target.parents().length === 0) {
    return;
  }

  // ensure dropdown menu doesn't impact on z-index
  body.find('.dropdown-menu-open').removeClass('dropdown-menu-open');

  // for stuff that animates, slides out etc, clicking it needs to
  // hide it right away
  const clickAutoHide = target.closest('[data-click-hide]');
  if (clickAutoHide.length) {
    const clickAutoHideParent = clickAutoHide.parent();
    clickAutoHide.detach();
    setTimeout(() => {
      clickAutoHideParent.append(clickAutoHide);
    }, 100);
  }

  // hide popovers
  const popover = body.find('.popover');
  if (popover.length > 0) {
    popover.hide();
  }
});

ReactDOM.render(
  <React.Fragment>
    <ErrorBoundary>
      <BusProvider value={eventBus}>
        <Provider store={store}>
          <AppContainer theme={theme} />
        </Provider>
      </BusProvider>
    </ErrorBoundary>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
