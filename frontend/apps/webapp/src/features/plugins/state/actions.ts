import { NavModelItem, PanelPlugin, PluginInclude, PluginIncludeType, PluginMeta } from '@savantly/sprout-api';
import { sproutApiSvc } from '../../../core/services/sproutApiSvc';
import { ThunkResult } from '../../../types';
import { addRootNavs } from '../../navigation/navTree';
import { builtInPluginMeta } from '../built_in_plugins';
import { loadPlugin } from '../PluginPage';
import { importPanelPlugin } from '../plugin_loader';
import { panelPluginLoaded, pluginsLoaded } from './reducers';

export function loadPlugins(): ThunkResult<void> {
  return async (dispatch) => {
    const result = await sproutApiSvc.get('/api/plugins', { params: { embedded: 0 } });

    const pluginMetas = result.data as PluginMeta[];
    // add built-in plugins
    pluginMetas.push(builtInPluginMeta.iframe, builtInPluginMeta.text);

    const addNavChildren = (id: string, pi: PluginInclude, list: NavModelItem[]) => {
      const navItem: NavModelItem = {
        id: id,
        text: pi.name,
        icon: pi.icon,
        url: pi.path,
        authority: pi.authority,
        renderMode: pi.renderMode
      };
      if (pi.children && pi.children.length > 0) {
        navItem.children = [];
        pi.children.forEach((c, index) => {
          if (c.type === PluginIncludeType.page && c.addToNav) {
            addNavChildren(`${id}-${index}`, c, navItem.children!);
          }
        });
      }
      list.push(navItem);
    };

    const navItems: NavModelItem[] = [];
    pluginMetas.forEach((p) => {
      // Process 'includes' listed in meta
      if (p.includes) {
        p.includes.forEach((pi, index) => {
          if (pi.type === PluginIncludeType.page && pi.addToNav) {
            addNavChildren(`${p.id}-${index}`, pi, navItems);
          }
        });
      }
      // if preload is set, load the plugin immediately
      if (p.preload) {
        loadPlugin(p.id)
          .then((plugin) => {
            if (plugin.loadError) {
              console.error('failed loading plugin:', p);
            } else {
              console.log('loaded plugin:', p);
            }
          })
          .catch((err) => {
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
