import { AppEvents, locationUtil } from '@savantly/sprout-api';
import { getLocationSrv } from '@savantly/sprout-runtime';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import appEvents from '../../../../core/app_events';
import { CoreEvents } from '../../../../types';
import { saveDashboard as saveDashboardApiCall } from '../../../manage-dashboards/state/actions';
import { DashboardModel } from '../../state';
import { SaveDashboardOptions } from './types';

const saveDashboard = async (saveModel: any, options: SaveDashboardOptions, dashboard: DashboardModel) => {
  let folderId = options.folderId;
  if (folderId === undefined) {
    folderId = dashboard.meta.folderId || saveModel.folderId;
  }
  return await saveDashboardApiCall({ ...options, folderId, dashboard: saveModel });
};

export const useDashboardSave = (dashboard: DashboardModel) => {
  const locationService = getLocationSrv();
  const location = useLocation();
  const [state, onDashboardSave] = useAsyncFn(
    async (clone: any, options: SaveDashboardOptions, dashboard: DashboardModel) =>
      await saveDashboard(clone, options, dashboard),
    []
  );

  useEffect(() => {
    if (state.value && state.value.data) {
      dashboard.version = state.value.data.version;

      // important that these happen before location redirect below
      appEvents.emit(CoreEvents.dashboardSaved, dashboard);
      appEvents.emit(AppEvents.alertSuccess, ['Dashboard saved']);

      const newUrl = locationUtil.stripBaseFromUrl(state.value.data.url);
      const currentPath = location.pathname;

      if (newUrl !== currentPath) {
        locationService.update({
          path: newUrl,
          replace: true,
          query: {},
        });
      }
    }
  }, [state]);

  return { state, onDashboardSave };
};
