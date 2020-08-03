import axios, { AxiosResponse } from 'axios';
import PropTypes from 'prop-types';
import { INavigationItem } from '../app/state/reducers/navigation';
import { IPlugin } from '../app/state/reducers/plugins';
  
export class ServerPluginExecutionResponse {
  propTypes = {
    succeeded: PropTypes.bool.isRequired,
    code: PropTypes.number.isRequired,
    message: PropTypes.string
  }
}

export interface IClientConfig {
  scripts: Array<string>,
  routes: Array<UIRoute>,
  navigationItems: Array<INavigationItem>
}

export interface UIRoute {
  path: string,
  jsComponentClass: string
}


export interface IGetPluginsResponse {
  clientConfig: IClientConfig,
  plugins: Array<IPlugin>
}

export function getPlugins(): Promise<AxiosResponse<IGetPluginsResponse>> {
  return axios.get('/api/plugins');
}
  
export function getPluginPanelMarkup(key: string) {
  return axios({
      method: 'get',
      url: '/api/plugins/' + key,
      responseType: 'text'
  });
}
  
export function installPlugin(key: string) {
  return axios({
      method: 'post',
      url: '/api/plugins/' + key + '/install',
      responseType: 'json'
  });
}
  
export function unInstallPlugin(key: string) {
  return axios({
      method: 'get',
      url: '/api/plugins/' + key + '/uninstall',
      responseType: 'json'
  });
}
  