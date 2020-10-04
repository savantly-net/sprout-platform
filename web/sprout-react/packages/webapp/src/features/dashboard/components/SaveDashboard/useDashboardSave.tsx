import { useEffect } from 'react';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import { AppEvents, locationUtil } from '@savantly/sprout-api';
import { useDispatch, useSelector } from 'react-redux';
import { SaveDashboardOptions } from './types';
import { CoreEvents, StoreState } from '../../../../types';
import appEvents from '../../../../core/app_events';
import { DashboardModel } from '../../state';
import { saveDashboard as saveDashboardApiCall } from '../../../manage-dashboards/state/actions';
import { getLocationSrv } from '@savantly/sprout-runtime';
import { useLocation } from 'react-router-dom';

const locationService = getLocationSrv();

const saveDashboard = async (saveModel: any, options: SaveDashboardOptions, dashboard: DashboardModel) => {
  let folderId = options.folderId;
  if (folderId === undefined) {
    folderId = dashboard.meta.folderId || saveModel.folderId;
  }
  return await saveDashboardApiCall({ ...options, folderId, dashboard: saveModel });
};

export const useDashboardSave = (dashboard: DashboardModel) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [state, onDashboardSave] = useAsyncFn(
    async (clone: any, options: SaveDashboardOptions, dashboard: DashboardModel) =>
      await saveDashboard(clone, options, dashboard),
    []
  );

  useEffect(() => {
    if (state.value) {
      dashboard.version = state.value.version;

      // important that these happen before location redirect below
      appEvents.emit(CoreEvents.dashboardSaved, dashboard);
      appEvents.emit(AppEvents.alertSuccess, ['Dashboard saved']);

      const newUrl = locationUtil.stripBaseFromUrl(state.value.url);
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
