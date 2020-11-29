import axios from 'axios';
import { SERVER_API_URL } from './constants';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
};

const setupAxiosInterceptors = (onUnauthenticated: any) => {
  const onRequestSuccess = (config: any) => {
    // moved JWT out - only need to send it once now, and get a signed session cookie, instead of passing it with every request.
    // This makes it easier when not running the front-end behind a proxy server, where the token can be passed even for static file requests.
    return config;
  };
  const onResponseSuccess = (response: any) => response;
  const onResponseError = (err: any) => {
    const status = err.status || (err.response ? err.response.status : 0);
    console.error('request failed', err);
    if (status === 401) {
      console.log('unauthenticated request', err);
      onUnauthenticated();
    }
    return Promise.reject(err);
  };

  axios.interceptors.response.use(onResponseSuccess, onResponseError);
  axios.interceptors.request.use(onRequestSuccess);
};

export default setupAxiosInterceptors;
