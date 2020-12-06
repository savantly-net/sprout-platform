import { PanelModel } from '@savantly/sprout-api';
import { QueryPanelOptions } from './types';

export const queryPanelMigrationHandler = (panel: PanelModel<QueryPanelOptions>): Partial<QueryPanelOptions> => {

  return panel.options;
};
