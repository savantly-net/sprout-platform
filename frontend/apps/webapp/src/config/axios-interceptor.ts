import { sproutApiSvc } from '../core/services/sproutApiSvc';

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

  sproutApiSvc.interceptors.response.use(onResponseSuccess, onResponseError);
  sproutApiSvc.interceptors.request.use(onRequestSuccess);
};

export default setupAxiosInterceptors;
