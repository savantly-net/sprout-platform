import { PanelPlugin } from '@grafana/data';
import { DashboardModel } from '../features/dashboard/state/DashboardModel';

export interface DashboardDTO {
  redirectUri?: string;
  dashboard: DashboardDataDTO;
  meta: DashboardMeta;
}

export interface DashboardMeta {
  canSave?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canShare?: boolean;
  canStar?: boolean;
  canAdmin?: boolean;
  url?: string;
  folderId?: number;
  fromExplore?: boolean;
  canMakeEditable?: boolean;
  submenuEnabled?: boolean;
  provisioned?: boolean;
  provisionedExternalId?: string;
  focusPanelId?: number;
  isStarred?: boolean;
  showSettings?: boolean;
  expires?: string;
  isSnapshot?: boolean;
  folderTitle?: string;
  folderUrl?: string;
  created?: string;
  createdBy?: string;
  updated?: string;
  updatedBy?: string;
}

export interface DashboardDataDTO {
  title: string;
}

export enum DashboardRouteInfo {
  Home = 'home-dashboard',
  New = 'new-dashboard',
  Normal = 'normal-dashboard',
  Scripted = 'scripted-dashboard',
}

export enum DashboardInitPhase {
  NotStarted = 'Not started',
  Fetching = 'Fetching',
  Services = 'Services',
  Failed = 'Failed',
  Completed = 'Completed',
}

export interface DashboardInitError {
  message: string;
  error: any;
}

export const KIOSK_MODE_TV = 'tv';
export type KioskUrlValue = 'tv' | '1' | true;
export type GetMutableDashboardModelFn = () => DashboardModel | null;

export interface PanelState {
  pluginId: string;
  plugin?: PanelPlugin;
}

export interface DashboardState {
  getModel: GetMutableDashboardModelFn;
  initPhase: DashboardInitPhase;
  isInitSlow: boolean;
  initError: DashboardInitError | null;
  panels: { [id: string]: PanelState };
}