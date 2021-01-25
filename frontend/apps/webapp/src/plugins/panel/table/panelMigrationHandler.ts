import { PanelModel } from '@savantly/sprout-api';
import { TablePanelOptions } from './types';

export const tablePanelMigrationHandler = (panel: PanelModel<TablePanelOptions>): Partial<TablePanelOptions> => {

  return panel.options;
};
