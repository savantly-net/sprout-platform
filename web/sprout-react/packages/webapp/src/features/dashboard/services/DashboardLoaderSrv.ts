import _ from 'lodash';
import { backendSrv } from '../../../core/services/backend_srv';

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
        dashboardNotFound: true,
      },
      dashboard: { title },
    };
  }

  loadDashboard(uid: any) {
    let promise = backendSrv.getDashboardByUid(uid)
    .then((result: any) => {
      if (result.meta.isFolder) {
        throw new Error('Dashboard not found');
      }
      return result;
    })
    .catch(() => {
      return this._dashboardLoadFailed('Not found', true);
    });

    promise.then((result: any) => {
      if (result.meta.dashboardNotFound !== true) {
      }

      return result;
    });

    return promise;
  }
}

export const dashboardLoaderService = new DashboardLoaderSrv();