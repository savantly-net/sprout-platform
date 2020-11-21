import { PluginMeta } from '@savantly/sprout-api';
import Axios from 'axios';

type PluginCache = {
  [key: string]: PluginMeta;
};

const pluginInfoCache: PluginCache = {};

export function getPluginSettings(pluginId: string): Promise<PluginMeta> {
  const v = pluginInfoCache[pluginId];
  if (v) {
    return Promise.resolve(v);
  }
  return Axios
    .get(`/api/plugins/${pluginId}/settings`)
    .then((response) => {
      pluginInfoCache[pluginId] = response.data;
      return response.data;
    })
    .catch((err: any) => {
      // err.isHandled = true;
      return Promise.reject('Unknown Plugin');
    });
}
