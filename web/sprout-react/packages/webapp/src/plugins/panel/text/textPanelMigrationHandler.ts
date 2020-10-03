import { PanelModel } from '@savantly/sprout-api';
import { TextMode, TextOptions } from './types';

export const textPanelMigrationHandler = (panel: PanelModel<TextOptions>): Partial<TextOptions> => {

  return panel.options;
};
