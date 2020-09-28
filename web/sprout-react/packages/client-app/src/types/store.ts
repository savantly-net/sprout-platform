import { PayloadAction } from '@reduxjs/toolkit';
import { NavIndex } from '@savantly/sprout-api';
import { ThunkAction, ThunkDispatch as GenericThunkDispatch } from 'redux-thunk';
import { DashboardState } from '.';
import { PanelEditorState } from '../features/dashboard/components/PanelEditor/state/reducers';
import { ApplicationState } from './application';
import { AppNotificationsState } from './appNotifications';
import { LocationState } from './location';
import { PluginsState } from './plugins';


export interface StoreState {
  application: ApplicationState;
  navIndex: NavIndex;
  location: LocationState;
  dashboard: DashboardState;
  panelEditor: PanelEditorState;
  appNotifications: AppNotificationsState;
  plugins: PluginsState;
}

/*
 * Utility type to get strongly types thunks
 */
export type ThunkResult<R> = ThunkAction<R, StoreState, undefined, PayloadAction<any>>;

export type ThunkDispatch = GenericThunkDispatch<StoreState, undefined, any>;