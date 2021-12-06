import { PanelModel } from '@savantly/sprout-api';
import { TextOptions } from './types';

export const textPanelMigrationHandler = (panel: PanelModel<TextOptions>): Partial<TextOptions> => {

  return panel.options;
};
