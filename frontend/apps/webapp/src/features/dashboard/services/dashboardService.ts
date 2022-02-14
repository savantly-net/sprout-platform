import { sproutApiSvc } from '../../../core/services/sproutApiSvc';
import { DashboardDTO } from '../../../types';

export const dashboardService = {
    getDashboardsByFolderId: (folder: string | null) => {
        return sproutApiSvc.get<DashboardDTO[]>(`/api/dashboards/folder/${folder || ''}`);
    },

    UpdateDashboards: (data: any) => {
        return sproutApiSvc.post<DashboardDTO>(`/api/dashboards/db`, data);
    },

    getDashboardByUid: (uid: string) => {
        return sproutApiSvc.get<any>(`/api/dashboards/uid/${uid}`);
    }
}