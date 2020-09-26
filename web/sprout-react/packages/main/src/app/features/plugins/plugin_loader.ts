import _ from 'lodash';
import moment from 'moment'; // eslint-disable-line no-restricted-imports

import react from 'react';
import reactDom from 'react-dom';
import * as reactRedux from 'react-redux';
import * as redux from 'redux';

import { AppPlugin, PanelPlugin, PanelPluginMeta, PluginMeta, PluginType } from '@savantly/sprout-api';
import * as emotion from 'emotion';
import * as sproutApi from '@savantly/sprout-api';
import * as grafanaUIraw from '@grafana/ui';
import * as sproutRuntime from '@savantly/sprout-runtime';

// rxjs
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';

// TODO: use built-in plugins
const builtInPlugins: any = {};

// add cache busting
const bust = `?_cache=${Date.now()}`;
function locate(load: { address: string }) {
  return load.address + bust;
}
sproutRuntime.SystemJS.registry.set('plugin-loader', sproutRuntime.SystemJS.newModule({ locate: locate }));

sproutRuntime.SystemJS.config({
  baseURL: '.',
  defaultExtension: 'js',
  packages: {
    plugins: {
      defaultExtension: 'js',
    },
  },
  map: {
    text: 'vendor/plugin-text/text.js',
    css: 'vendor/plugin-css/css.js',
  },
  meta: {
    '/*': {
      esModule: true,
      authorization: true,
      loader: 'plugin-loader',
    },
  },
});

function exposeToPlugin(name: string, component: any) {
  sproutRuntime.SystemJS.registerDynamic(name, [], true, (require: any, exports: any, module: { exports: any }) => {
    module.exports = component;
  });
}

exposeToPlugin('@savantly/sprout-api', sproutApi);
exposeToPlugin('@savantly/sprout-runtime', sproutRuntime);
exposeToPlugin('lodash', _);
exposeToPlugin('moment', moment);
exposeToPlugin('rxjs', rxjs);
exposeToPlugin('rxjs/operators', rxjsOperators);

exposeToPlugin('react', react);
exposeToPlugin('react-dom', reactDom);
exposeToPlugin('react-redux', reactRedux);
exposeToPlugin('redux', redux);
exposeToPlugin('emotion', emotion);


export async function importPluginModule(path: string): Promise<any> {
  const builtIn = builtInPlugins[path];
  if (builtIn) {
    // for handling dynamic imports
    if (typeof builtIn === 'function') {
      return await builtIn();
    } else {
      return Promise.resolve(builtIn);
    }
  }
  return sproutRuntime.SystemJS.import(path);
}

export function importAppPlugin(meta: PluginMeta): Promise<AppPlugin> {
  return importPluginModule(meta.module).then(pluginExports => {
    const plugin = pluginExports.plugin ? (pluginExports.plugin as AppPlugin) : new AppPlugin();
    plugin.init(meta);
    plugin.meta = meta;
    return plugin;
  });
}

import { getPagePluginNotFound, getPagePluginLoadError } from './PagePluginError';

interface PageCache {
  [key: string]: Promise<PanelPlugin>;
}
const panelCache: PageCache = {};

export function importPanelPlugin(id: string): Promise<PanelPlugin> {
  const loaded = panelCache[id];

  if (loaded) {
    return loaded;
  }

  // TODO ********* 
  const meta: PanelPluginMeta = {
      baseUrl: '',
      id: '',
      info: {
          author: {name: 'me'},
          description: 'test',
          links: [],
          logos: {
              large: '',
              small: ''
          },
          screenshots: [],
          updated: '',
          version: '0.0.1'
      },
      module: '',
      name: '',
      type: PluginType.panel
  }; 

  if (!meta) {
    return Promise.resolve(getPagePluginNotFound(id));
  }

  panelCache[id] = importPluginModule(meta.module)
    .then(pluginExports => {
      if (pluginExports.plugin) {
        return pluginExports.plugin as PanelPlugin;
      }
      throw new Error('missing export: plugin');
    })
    .then(plugin => {
      plugin.meta = meta;
      return plugin;
    })
    .catch(err => {
      // TODO, maybe a different error plugin
      console.warn('Error loading panel plugin: ' + id, err);
      return getPagePluginLoadError(meta, err);
    });

  return panelCache[id];
}