import { PayloadAction } from '@reduxjs/toolkit';
import { NavIndex } from '@savantly/sprout-api';
import { ThunkAction, ThunkDispatch as GenericThunkDispatch } from 'redux-thunk';
import { DashboardState } from './dashboard';
import { PanelEditorState } from '../features/dashboard/components/PanelEditor/state/reducers';
import { AuthenticationState } from '../state/reducers/authentication';
import { ApplicationState } from './application';
import { AppNotificationsState } from './appNotifications';
import { LocationState } from './location';
import { PluginsState } from './plugins';
import { RouterState } from 'connected-react-router';

export interface StoreState {
  application: ApplicationState;
  appNotifications: AppNotificationsState;
  authentication: AuthenticationState;
  navIndex: NavIndex;
  location: LocationState;
  dashboard: DashboardState;
  panelEditor: PanelEditorState;
  plugins: PluginsState;
  router: RouterState;
}

/*
 * Utility type to get strongly types thunks
 */
export type ThunkResult<R> = ThunkAction<R, StoreState, undefined, PayloadAction<any>>;

export type ThunkDispatch = GenericThunkDispatch<StoreState, undefined, any>;