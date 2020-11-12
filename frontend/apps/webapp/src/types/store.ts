import { PayloadAction } from '@reduxjs/toolkit';
import { NavIndex } from '@savantly/sprout-api';
import { ThunkAction, ThunkDispatch as GenericThunkDispatch } from 'redux-thunk';
import { NavTreeState } from '../core/reducers/navTree';
import { PanelEditorState } from '../features/dashboard/components/PanelEditor/state/reducers';
import { ApplicationState } from './application';
import { AppNotificationsState } from './appNotifications';
import { AuthenticationState } from './authentication';
import { DashboardState } from './dashboard';
import { LocationState } from './location';
import { PluginsState } from './plugins';

export interface StoreState {
  application: ApplicationState;
  appNotifications: AppNotificationsState;
  authentication: AuthenticationState;
  navIndex: NavIndex;
  navTree: NavTreeState;
  dashboard: DashboardState;
  panelEditor: PanelEditorState;
  plugins: PluginsState;
  location: LocationState;
}

/*
 * Utility type to get strongly types thunks
 */
export type ThunkResult<R> = ThunkAction<R, StoreState, undefined, PayloadAction<any>>;

export type ThunkDispatch = GenericThunkDispatch<StoreState, undefined, any>;
