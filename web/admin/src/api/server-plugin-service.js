import axios from 'axios';
import PropTypes from 'prop-types'

export class ServerPlugin {
    propTypes = {
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      version: PropTypes.string.isRequired,
      installed: PropTypes.bool.isRequired,
    }
  }
  
export class ServerPluginExecutionResponse {
  propTypes = {
    succeeded: PropTypes.bool.isRequired,
    code: PropTypes.number.isRequired,
    message: PropTypes.string
  }
}
  

export function getPlugins() {
  return axios.get('/api/plugins');
}
  
export function getPluginPanelMarkup(key) {
  return axios({
      method: 'get',
      url: '/api/plugins/' + key,
      responseType: 'text'
  });
}
  
export function installPlugin(key) {
  return axios({
      method: 'post',
      url: '/api/plugins/' + key + '/install',
      responseType: 'json'
  });
}
  
export function unInstallPlugin(key) {
  return axios({
      method: 'get',
      url: '/api/plugins/' + key + '/uninstall',
      responseType: 'json'
  });
}
  