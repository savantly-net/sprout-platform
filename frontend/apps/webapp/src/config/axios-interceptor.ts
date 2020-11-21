import axios from 'axios';

import { ACCESS_TOKEN_STORAGE_KEY, SERVER_API_URL } from './constants';
import store from '../core/store';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
};

const setupAxiosInterceptors = (onUnauthenticated: any) => {
  const onRequestSuccess = (config: any) => {
    const token = store.get(ACCESS_TOKEN_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('sending unauthenticated request', config);
    }
    return config;
  };
  const onResponseSuccess = (response:any) => response;
  const onResponseError = (err:any) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 401) {
      console.log('unauthenticated request', err);
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
