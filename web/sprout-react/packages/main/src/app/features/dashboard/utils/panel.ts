// Store
import store from '../../../core/store';

// Models
import { DashboardModel } from '../state/DashboardModel';
import { PanelModel } from '../state/PanelModel';
import { AppEvents } from '@savantly/sprout-api';

// Utils
import { isString as _isString } from 'lodash';
import appEvents from '../../../core/app_events';
import config from '../../../core/config';

// Constants
import { LS_PANEL_COPY_KEY, PANEL_BORDER } from '../../../core/constants';
import { CoreEvents } from '../../../types';

export const removePanel = (dashboard: DashboardModel, panel: PanelModel, ask: boolean) => {
  // confirm deletion
  if (ask !== false) {
    const text2 = panel.alert ? 'Panel includes an alert rule, removing panel will also remove alert rule' : undefined;
    const confirmText = panel.alert ? 'YES' : undefined;

    appEvents.emit(CoreEvents.showConfirmModal, {
      title: 'Remove Panel',
      text: 'Are you sure you want to remove this panel?',
      text2: text2,
      icon: 'trash-alt',
      confirmText: confirmText,
      yesText: 'Remove',
      onConfirm: () => removePanel(dashboard, panel, false),
    });
    return;
  }
  dashboard.removePanel(panel);
};

export const duplicatePanel = (dashboard: DashboardModel, panel: PanelModel) => {
  dashboard.duplicatePanel(panel);
};

export const copyPanel = (panel: PanelModel) => {
  store.set(LS_PANEL_COPY_KEY, JSON.stringify(panel.getSaveModel()));
  appEvents.emit(AppEvents.alertSuccess, ['Panel copied. Open Add Panel to paste']);
};

export const refreshPanel = (panel: PanelModel) => {
  panel.refresh();
};

export function calculateInnerPanelHeight(panel: PanelModel, containerHeight: number): number {
  const chromePadding = panel.plugin && panel.plugin.noPadding ? 0 : config.theme.panelPadding * 2;
  const headerHeight = panel.hasTitle() ? config.theme.panelHeaderHeight : 0;
  return containerHeight - headerHeight - chromePadding - PANEL_BORDER;
}
