import { getBackendSrv } from '@savantly/sprout-runtime';
import { PanelPlugin } from '@savantly/sprout-api';
import { ThunkResult } from '../../../types';
import { pluginDashboardsLoad, pluginDashboardsLoaded, pluginsLoaded, panelPluginLoaded } from './reducers';
import { importPanelPlugin } from '../plugin_loader';

export function loadPlugins(): ThunkResult<void> {
  return async dispatch => {
    const result = await getBackendSrv().get('api/plugins', { embedded: 0 });
    dispatch(pluginsLoaded(result));
  };
}

export function loadPanelPlugin(pluginId: string): ThunkResult<Promise<PanelPlugin>> {
  return async (dispatch, getStore) => {
    let plugin = getStore().plugins.panels[pluginId];

    if (!plugin) {
      plugin = await importPanelPlugin(pluginId);

      // second check to protect against raise condition
      if (!getStore().plugins.panels[pluginId]) {
        dispatch(panelPluginLoaded(plugin));
      }
    }

    return plugin as PanelPlugin;
  };
}
