import { PayloadAction } from '@reduxjs/toolkit';
import { NavIndex } from '@savantly/sprout-api';
import { ThunkAction, ThunkDispatch as GenericThunkDispatch } from 'redux-thunk';
import { BrandingState } from '../core/components/Branding/state/reducers';
import { AppNotificationsState } from '../core/reducers/appNotification';
import { PanelEditorState } from '../features/dashboard/components/PanelEditor/state/reducers';
import { IssueEntityState } from '../features/feedback/entity';
import { FileState } from '../features/files/state';
import { NavTreeState } from '../features/navigation/navTree';
import { ApplicationState } from './application';
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
  files: FileState;
  issues: IssueEntityState;
  branding: BrandingState;
}

/*
 * Utility type to get strongly types thunks
 */
export type ThunkResult<R> = ThunkAction<R, StoreState, undefined, PayloadAction<any>>;

export type ThunkDispatch = GenericThunkDispatch<StoreState, undefined, any>;
