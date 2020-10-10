import { AppEvents } from '@savantly/sprout-api';
import { appEvents } from '../../../core/app_events';
import { getBackendSrv } from '../../../core/services/backend_srv';
import { DashboardDataDTO, DashboardDTO, FolderInfo, ThunkResult } from '../../../types';
import {
  clearDashboard,
  setGcomDashboard, setInputs,
  setJsonDashboard
} from './reducers';

export function fetchGcomDashboard(id: string): ThunkResult<void> {
  return async dispatch => {
    try {
      const dashboard = await getBackendSrv().get(`/api/gnet/dashboards/${id}`);
      dispatch(setGcomDashboard(dashboard));
      dispatch(processInputs(dashboard.json));
    } catch (error) {
      appEvents.emit(AppEvents.alertError, [error.data.message || error]);
    }
  };
}

export function importDashboardJson(dashboard: any): ThunkResult<void> {
  return async dispatch => {
    dispatch(setJsonDashboard(dashboard));
    dispatch(processInputs(dashboard));
  };
}

function processInputs(dashboardJson: any): ThunkResult<void> {
  return dispatch => {
    if (dashboardJson && dashboardJson.__inputs) {
      const inputs: any[] = [];
      dashboardJson.__inputs.forEach((input: any) => {
        const inputModel: any = {
          name: input.name,
          label: input.label,
          info: input.description,
          value: input.value,
          type: input.type,
          pluginId: input.pluginId,
          options: [],
        };

        if (!inputModel.info) {
          inputModel.info = 'Specify a string constant';
        }

        inputs.push(inputModel);
      });
      dispatch(setInputs(inputs));
    }
  };
}

export function clearLoadedDashboard(): ThunkResult<void> {
  return dispatch => {
    dispatch(clearDashboard());
  };
}

export function moveDashboards(dashboardUids: string[], toFolder: FolderInfo) {
  const tasks = [];

  for (const uid of dashboardUids) {
    tasks.push(createTask(moveDashboard, true, uid, toFolder));
  }

  return executeInOrder(tasks).then((result: any) => {
    return {
      totalCount: result.length,
      successCount: result.filter((res: any) => res.succeeded).length,
      alreadyInFolderCount: result.filter((res: any) => res.alreadyInFolder).length,
    };
  });
}

async function moveDashboard(uid: string, toFolder: FolderInfo) {
  const fullDash: DashboardDTO = await getBackendSrv().getDashboardByUid(uid);

  if ((!fullDash.meta.folderId && toFolder.id === 0) || fullDash.meta.folderId === toFolder.id) {
    return { alreadyInFolder: true };
  }

  const options = {
    dashboard: fullDash.dashboard,
    folderId: toFolder.id,
    overwrite: false,
  };

  try {
    await saveDashboard(options);
    return { succeeded: true };
  } catch (err) {
    if (err.data?.status !== 'plugin-dashboard') {
      return { succeeded: false };
    }

    err.isHandled = true;
    options.overwrite = true;

    try {
      await saveDashboard(options);
      return { succeeded: true };
    } catch (e) {
      return { succeeded: false };
    }
  }
}

function createTask(fn: (...args: any[]) => Promise<any>, ignoreRejections: boolean, ...args: any[]) {
  return async (result: any) => {
    try {
      const res = await fn(...args);
      return Array.prototype.concat(result, [res]);
    } catch (err) {
      if (ignoreRejections) {
        return result;
      }

      throw err;
    }
  };
}

export function deleteFoldersAndDashboards(folderUids: string[], dashboardUids: string[]) {
  const tasks = [];

  for (const folderUid of folderUids) {
    tasks.push(createTask(deleteFolder, true, folderUid, true));
  }

  for (const dashboardUid of dashboardUids) {
    tasks.push(createTask(deleteDashboard, true, dashboardUid, true));
  }

  return executeInOrder(tasks);
}

export interface SaveDashboardOptions {
  dashboard: DashboardDataDTO;
  message?: string;
  folderId?: number;
  overwrite?: boolean;
}

export function saveDashboard(options: SaveDashboardOptions) {
  return getBackendSrv().post('/api/dashboards/db/', {
    dashboard: options.dashboard,
    message: options.message ?? '',
    overwrite: options.overwrite ?? false,
    folderId: options.folderId,
  });
}

function deleteFolder(uid: string, showSuccessAlert: boolean) {
  return getBackendSrv().request({
    method: 'DELETE',
    url: `/api/folders/${uid}`,
    showSuccessAlert: showSuccessAlert === true,
  });
}

export function createFolder(payload: any) {
  return getBackendSrv().post('/api/folders', payload);
}

export function deleteDashboard(uid: string, showSuccessAlert: boolean) {
  return getBackendSrv().request({
    method: 'DELETE',
    url: `/api/dashboards/uid/${uid}`,
    showSuccessAlert: showSuccessAlert === true,
  });
}

function executeInOrder(tasks: any[]) {
  return tasks.reduce((acc, task) => {
    return Promise.resolve(acc).then(task);
  }, []);
}
