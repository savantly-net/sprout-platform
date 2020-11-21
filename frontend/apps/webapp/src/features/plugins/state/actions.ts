import { NavModelItem, PanelPlugin, PluginIncludeType, PluginMeta } from '@savantly/sprout-api';
import Axios from 'axios';
import { addRootNavs } from '../../../core/reducers/navTree';
import { ThunkResult } from '../../../types';
import { builtInPluginMeta } from '../built_in_plugins';
import { loadPlugin } from '../PluginPage';
import { importPanelPlugin } from '../plugin_loader';
import { panelPluginLoaded, pluginsLoaded } from './reducers';

export function loadPlugins(): ThunkResult<void> {
  return async (dispatch) => {
    const result = await Axios.get('/api/plugins', { params: { embedded: 0 } });

    const pluginMetas = result.data as PluginMeta[];
    // add built-in plugins
    pluginMetas.push(builtInPluginMeta.iframe, builtInPluginMeta.text);


    const navItems: NavModelItem[] = [];
    pluginMetas.forEach((p) => {
      // Process 'includes' listed in meta
      if (p.includes) {
        const rootNav: NavModelItem = {
          id: p.id,
          text: p.name,
          url: `/a/${p.id}`,
          img: `/api/plugins/${p.id}/${p.info.logos.large}`,
          children: []
        };

        // add default navigation for an app plugin
        navItems.push(rootNav);

        // add any included pages
        if (p.includes) {
          p.includes.forEach((pi, index) => {
            if (pi.type === PluginIncludeType.page && pi.addToNav) {
              if (rootNav.children) {
                rootNav.children.push({
                  id: `${p.id}-${index}`,
                  text: pi.name,
                  icon: pi.icon,
                  url: pi.path
                });
              }
            }
          });
        }
      }
      // if preload is set, load the plugin immediately
      if (p.preload) {
        loadPlugin(p.id).then(plugin => {
          if (plugin.loadError) {
            console.error('failed loading plugin:', p);
          } else {
            console.log('loaded plugin:', p)
          }
        }).catch(err => {
          console.error(err);
        });
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
