import { combineReducers } from 'redux';
import appSettings, {AppSettingsState } from './app-settings';
import authentication, { AuthenticationState } from './authentication';
import navigationItems, { NavigationItemsState } from './navigation';
import routes, { RouteItemsState } from './routes';
import sidebarItems, { SidebarItemsState } from './sidebar';
import scripts, { ScriptItemsState } from './scripts';
import plugins, { PluginItemsState } from './plugins';

export interface IRootState {
  readonly appSettings: AppSettingsState;
  readonly authentication: AuthenticationState;
  readonly navigationItems: NavigationItemsState;
  readonly routes: RouteItemsState;
  readonly sidebarItems: SidebarItemsState;
  readonly scripts: ScriptItemsState;
  readonly plugins: PluginItemsState;
}

const rootReducer = combineReducers<IRootState>({
  appSettings,
  authentication,
  navigationItems,
  routes,
  sidebarItems,
  scripts,
  plugins
});

export default rootReducer;
