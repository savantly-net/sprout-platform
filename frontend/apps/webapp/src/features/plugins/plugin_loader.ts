import * as sproutApi from '@savantly/sprout-api';
import { AppPlugin, PanelPlugin, PluginMeta } from '@savantly/sprout-api';
import * as sproutRuntime from '@savantly/sprout-runtime';
import { config } from '@savantly/sprout-runtime';
import * as sproutUi from '@savantly/sprout-ui';
import * as emotion from 'emotion';
import _ from 'lodash';
import moment from 'moment'; // eslint-disable-line no-restricted-imports
import react from 'react';
import reactDom from 'react-dom';
import * as reactRedux from 'react-redux';
import * as reactRouterDom from 'react-router-dom';
import * as redux from 'redux';
import * as reduxDynamicModules from 'redux-dynamic-modules';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';
import builtInPluginIndex from './built_in_plugins';
import { getPanelPluginLoadError, getPanelPluginNotFound } from './PanelPluginError';
import * as formik from 'formik';

import * as reactstrap from 'reactstrap';

// add cache busting
const bust = `?_cache=${Date.now()}`;
function locate(load: { address: string }) {
  return load.address + bust;
}
sproutRuntime.SystemJS.registry.set(
  'plugin-loader',
  sproutRuntime.SystemJS.newModule({
    locate: locate
  })
);

sproutRuntime.SystemJS.config({
  baseURL: '.',
  defaultExtension: 'js',
  packages: {
    plugins: {
      defaultExtension: 'js'
    }
  },
  map: {
    text: 'vendor/plugin-text/text.js',
    css: 'vendor/plugin-css/css.js'
  },
  meta: {
    '/*': {
      esModule: true,
      authorization: true,
      loader: 'plugin-loader'
    }
  }
});

function exposeToPlugin(name: string, component: any) {
  sproutRuntime.SystemJS.registerDynamic(name, [], true, (require: any, exports: any, module: { exports: any }) => {
    module.exports = component;
  });
}

exposeToPlugin('@savantly/sprout-api', sproutApi);
exposeToPlugin('@savantly/sprout-runtime', sproutRuntime);
exposeToPlugin('@savantly/sprout-ui', sproutUi);
exposeToPlugin('formik', formik);
exposeToPlugin('lodash', _);
exposeToPlugin('moment', moment);
exposeToPlugin('rxjs', rxjs);
exposeToPlugin('rxjs/operators', rxjsOperators);

exposeToPlugin('react', react);
exposeToPlugin('React', react);
exposeToPlugin('react-dom', reactDom);
exposeToPlugin('react-router-dom', reactRouterDom);
exposeToPlugin('react-redux', reactRedux);
exposeToPlugin('reactstrap', reactstrap);
exposeToPlugin('redux', redux);
exposeToPlugin('redux-dynamic-modules', reduxDynamicModules);
exposeToPlugin('emotion', emotion);

export async function importPluginModule(path: string): Promise<any> {
  const builtIn = builtInPluginIndex[path];
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
  console.log(`importing app plugin:`);
  console.log(meta);
  return importPluginModule(meta.module).then((pluginExports) => {
    const plugin = pluginExports.plugin ? (pluginExports.plugin as AppPlugin) : new AppPlugin();
    plugin.init(meta);
    plugin.meta = meta;
    return plugin;
  });
}

interface PanelCache {
  [key: string]: Promise<PanelPlugin>;
}
const panelCache: PanelCache = {};

export function importPanelPlugin(id: string): Promise<PanelPlugin> {
  const loaded = panelCache[id];

  if (loaded) {
    return loaded;
  }

  const meta = config.panels[id];

  if (!meta) {
    return Promise.resolve(getPanelPluginNotFound(id));
  }

  panelCache[id] = importPluginModule(meta.module)
    .then((pluginExports) => {
      if (pluginExports.plugin) {
        return pluginExports.plugin as PanelPlugin;
      }
      throw new Error('missing export: plugin');
    })
    .then((plugin) => {
      plugin.meta = meta;
      return plugin;
    })
    .catch((err) => {
      // TODO, maybe a different error plugin
      console.warn('Error loading panel plugin: ' + id, err);
      return getPanelPluginLoadError(meta, err);
    });

  return panelCache[id];
}
