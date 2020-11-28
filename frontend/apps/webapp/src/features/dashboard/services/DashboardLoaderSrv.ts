import { AxiosResponse } from 'axios';
import { backendSrv } from '../../../core/services/backend_srv';
import { DashboardDTO } from '../../../types';

export class DashboardLoaderSrv {
  _dashboardLoadFailed(title: string, snapshot?: boolean) {
    snapshot = snapshot || false;
    return {
      meta: {
        canStar: false,
        isSnapshot: snapshot,
        canDelete: false,
        canSave: false,
        canEdit: false,
        dashboardNotFound: true
      },
      dashboard: { title }
    };
  }

  loadDashboard(uid: any) {
    const promise = new Promise<DashboardDTO>((resolve, reject) => {
      backendSrv
      .getDashboardByUid(uid)
      .then((result: AxiosResponse<DashboardDTO>) => {
        if (result.status != 200) {
          throw new Error('Dashboard not found');
        }
        resolve(result.data);
      })
      .catch(() => {
        reject(this._dashboardLoadFailed('Not found', true));
      });
    }); 
    return promise;
  }
}

export const dashboardLoaderService = new DashboardLoaderSrv();
