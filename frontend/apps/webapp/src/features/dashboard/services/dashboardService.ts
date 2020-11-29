import Axios from 'axios';
import { DashboardDTO } from '../../../types';

export const dashboardService = {
    getDashboardsByFolderId: (folder: string | null) => {
        return Axios.get<DashboardDTO[]>(`/api/dashboards/folder/${folder || ''}`);
    }
}