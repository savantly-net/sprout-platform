// Services & Utils
import { getBackendSrv } from '@savantly/sprout-runtime';
import { createSuccessNotification } from '../../../core/copy/appNotification';
// Actions
import {
  cleanUpDashboard,
  panelModelAndPluginReady,
} from './reducers';
import { notifyApp } from '../../../core/actions';
import { loadPanelPlugin } from '../../plugins/state/actions';
// Types
import { ThunkResult } from '../../../types';
import { PanelModel } from './PanelModel';

export function initDashboardPanel(panel: PanelModel): ThunkResult<void> {
  return async (dispatch, getStore) => {
    let plugin = getStore().plugins.panels[panel.type];

    if (!plugin) {
      plugin = await dispatch(loadPanelPlugin(panel.type));
    }

    if (!panel.plugin) {
      panel.pluginLoaded(plugin);
    }

    dispatch(panelModelAndPluginReady({ panelId: panel.id, plugin }));
  };
}

export function changePanelPlugin(panel: PanelModel, pluginId: string): ThunkResult<void> {
  return async (dispatch, getStore) => {
    // ignore action is no change
    if (panel.type === pluginId) {
      return;
    }

    const store = getStore();
    let plugin = store.plugins.panels[pluginId];

    if (!plugin) {
      plugin = await dispatch(loadPanelPlugin(pluginId));
    }

    panel.changePlugin(plugin);

    dispatch(panelModelAndPluginReady({ panelId: panel.id, plugin }));
  };
}

export const cleanUpDashboardAndVariables = (): ThunkResult<void> => dispatch => {
  dispatch(cleanUpDashboard());
};
