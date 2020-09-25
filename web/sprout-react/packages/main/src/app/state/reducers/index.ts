import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import appSettings, {AppSettingsState } from './app-settings';
import authentication, { AuthenticationState } from './authentication';

import accountSettings, { AccountSettingsState } from '../../modules/account/settings/settings.reducer';
import navigationItems, { NavigationItemsState } from './navigation';
import routes, { RouteItemsState } from './routes';
import sidebarItems, { SidebarItemsState } from './sidebar';
import scripts, { ScriptItemsState } from './scripts';
import plugins, { PluginItemsState } from './plugins';

export interface IRootState {
  readonly appSettings: AppSettingsState;
  readonly authentication: AuthenticationState;
  readonly accountSettings: AccountSettingsState;
  readonly loadingBar: any;
  readonly navigationItems: NavigationItemsState;
  readonly routes: RouteItemsState;
  readonly sidebarItems: SidebarItemsState;
  readonly scripts: ScriptItemsState;
  readonly plugins: PluginItemsState;
}

const rootReducer = combineReducers<IRootState>({
  appSettings,
  authentication,
  accountSettings,
  loadingBar,
  navigationItems,
  routes,
  sidebarItems,
  scripts,
  plugins
});

export default rootReducer;
