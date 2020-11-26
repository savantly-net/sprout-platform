import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ACCESS_TOKEN_STORAGE_KEY, SERVER_API_URL } from './constants';
import store from '../core/store';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
};

class SkipXHRError extends Error {
  isSkipXHR: boolean = false;
  request?: AxiosRequestConfig;
}

const cache: {[key: string]: AxiosResponse<any>} = {};

const getKey = (config: AxiosRequestConfig): string => {
  return config.method! + '-' + config.url!;
};

const requestCache = {
  isCached: (config: AxiosRequestConfig): boolean => {
    if (cache[getKey(config)]) {
      return true;
    } else {
      return false;
    }
  },
  shouldThrottle: (config: AxiosRequestConfig): boolean => {
    return true;
  },
  waitForResponse: (config: AxiosRequestConfig) => {
    //... what to do
  },
  setCachedResponse: (config: AxiosRequestConfig, response: AxiosResponse<any>) => {
    cache[getKey(config)] = response;
  },
  getCachedResponse: (config: AxiosRequestConfig) => {
    return cache[getKey(config)];
  }
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

  // This should be the *first* response interceptor to add
  axios.interceptors.response.use(
    function (response) {
      requestCache.setCachedResponse(response.config, response);
      return response;
    },
    function (error) {
      /* recover from error back to normality
       * but this time we use an cached response result
       **/
      if (error.isSkipXHR) {
        return requestCache.getCachedResponse(error.request);
      }
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(onResponseSuccess, onResponseError);

  axios.interceptors.request.use(onRequestSuccess);

  // This should be the *last* request interceptor to add
  axios.interceptors.request.use(function (config) {
    /* check the cache, if hit, then intentionally throw
     * this will cause the XHR call to be skipped
     * but the error is still handled by response interceptor
     * we can then recover from error to the cached response
     **/
    if (requestCache.isCached(config)) {
      const skipXHRError = new SkipXHRError('skip');
      skipXHRError.isSkipXHR = true;
      skipXHRError.request = config;
      throw skipXHRError;
    } else {
      /* if not cached yet
       * check if request should be throttled
       * then open up the cache to wait for a response
       **/
      if (requestCache.shouldThrottle(config)) {
        requestCache.waitForResponse(config);
      }
      return config;
    }
  });
};

export default setupAxiosInterceptors;
