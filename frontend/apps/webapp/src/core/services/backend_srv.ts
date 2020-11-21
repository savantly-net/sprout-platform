import axios from 'axios';
import { SERVER_API_URL } from '../../config/constants';
import { FolderDTO } from '../../types';

const fixApiUrl = (url: string) => {
  if (url.startsWith('/')) {
    return `${SERVER_API_URL}${url}`;
  } else {
    return url;
  }
};

export class BackendSrv {
  getDashboardBySlug(slug: string) {
    return axios.get(fixApiUrl(`/api/dashboards/db/${slug}`));
  }

  getDashboardByUid(uid: string) {
    return axios.get(fixApiUrl(`/api/dashboards/uid/${uid}`));
  }

  getFolderByUid(uid: string) {
    return axios.get<FolderDTO>(fixApiUrl(`/api/folders/${uid}`));
  }
}

// Used for testing and things that really need BackendSrv
export const backendSrv = new BackendSrv();
export const getBackendSrv = (): BackendSrv => backendSrv;
