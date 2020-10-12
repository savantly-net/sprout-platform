import { PluginMeta, PanelPlugin, AppPlugin, KeyValue, AppRootProps } from '@savantly/sprout-api';
import { ComponentClass, ReactNode } from 'react';

export interface PluginDashboard {
  dashboardId: number;
  description: string;
  folderId: number;
  imported: boolean;
  importedRevision: number;
  importedUri: string;
  importedUrl: string;
  path: string;
  pluginId: string;
  removed: boolean;
  revision: number;
  slug: string;
  title: string;
}

export interface PanelPluginsIndex {
  [id: string]: PanelPlugin;
}

export interface PluginRoute {
  path: string;
  exact: boolean;
  component?: ComponentClass<AppRootProps>;
}

export interface PluginsState {
  plugins: PluginMeta[];
  searchQuery: string;
  hasFetched: boolean;
  dashboards: PluginDashboard[];
  isLoadingPluginDashboards: boolean;
  panels: PanelPluginsIndex;
}

export interface VariableQueryProps {
  query: any;
  onChange: (query: any, definition: string) => void;
  datasource: any;
  templateSrv: any;
}
