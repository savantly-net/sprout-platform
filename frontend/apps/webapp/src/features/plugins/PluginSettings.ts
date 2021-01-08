import { PluginMeta, publishErrorNotification, publishSuccessNotification } from '@savantly/sprout-api';
import { sproutApiSvc } from '../../core/services/sproutApiSvc';

type PluginCache = {
  [key: string]: PluginMeta;
};

const pluginInfoCache: PluginCache = {};

export function getPluginSettings(pluginId: string): Promise<PluginMeta> {
  const v = pluginInfoCache[pluginId];
  if (v) {
    return Promise.resolve(v);
  }
  return sproutApiSvc
    .get(`/api/plugins/${pluginId}/settings`)
    .then((response) => {
      pluginInfoCache[pluginId] = response.data;
      return response.data;
    })
    .catch((err: any) => {
      publishErrorNotification('Error', 'Error Getting Plugin Settings');
      return Promise.reject('Unknown Plugin');
    });
}

export function updatePluginSettings<T>(pluginId: string, jsonData: T): Promise<T> {
  return sproutApiSvc
    .post<T>(`/api/plugins/${pluginId}/settings`, {jsonData})
    .then((response) => {
      publishSuccessNotification('Saved', 'Plugin Settings Updated');
      pluginInfoCache[pluginId].jsonData = response.data;
      return response.data;
    })
    .catch((err: any) => {
      publishErrorNotification('Error', 'Error Saving Plugin Settings');
      return Promise.reject('Unknown Plugin');
    });
}
