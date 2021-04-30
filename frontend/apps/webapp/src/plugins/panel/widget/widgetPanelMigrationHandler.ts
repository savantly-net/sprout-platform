import { PanelModel } from '@savantly/sprout-api';
import { WidgetPanelOptions } from './types';

export const widgetPanelMigrationHandler = (panel: PanelModel<WidgetPanelOptions>): Partial<WidgetPanelOptions> => {
  return panel.options;
};
