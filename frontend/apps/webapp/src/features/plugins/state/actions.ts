import { NavModelItem, PanelPlugin, PluginIncludeType, PluginMeta } from '@savantly/sprout-api';
import { getBackendSrv } from '@savantly/sprout-runtime';
import { addRootNavs } from '../../../core/reducers/navTree';
import { ThunkResult } from '../../../types';
import { importPanelPlugin } from '../plugin_loader';
import { panelPluginLoaded, pluginsLoaded } from './reducers';

export function loadPlugins(): ThunkResult<void> {
  return async (dispatch) => {
    const result = await getBackendSrv().get('/api/plugins', { embedded: 0 });

    const pluginMetas = result as PluginMeta[];
    const navItems: NavModelItem[] = [];
    pluginMetas.forEach((p) => {
      if (p.includes) {
        const rootNav: NavModelItem = {
          id: p.id,
          text: p.name,
          url: `/a/${p.id}`,
          icon: p.info.logos.small,
          children: []
        };
        navItems.push(rootNav);
        /* Inlcudes should be handled by PluginPage?
        p.includes?.forEach((pi, index) => {
          if(pi.type === PluginIncludeType.page && pi.addToNav) {
            rootNav.children?.push({
              id: `${p.id}-${index}`,
              text: pi.name,
              icon: pi.icon,
              url: pi.path
            })
          }
        });
        */
      }
    });
    dispatch(addRootNavs(navItems));
    dispatch(pluginsLoaded({ pluginMetas }));
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
