import { ThunkAction, ThunkDispatch as GenericThunkDispatch } from 'redux-thunk';
import { PayloadAction } from '@reduxjs/toolkit';
import { NavIndex } from '@grafana/data';

import { LocationState } from './location';
import { AppNotificationsState } from './appNotifications';
import { PluginsState } from './plugins';
import { DashboardState } from '.';
import { PanelEditorState } from '../features/dashboard/components/PanelEditor/state/reducers';

export interface StoreState {
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