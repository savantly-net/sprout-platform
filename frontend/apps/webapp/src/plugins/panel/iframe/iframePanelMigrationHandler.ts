import { PanelModel } from '@savantly/sprout-api';
import { IFrameOptions } from './types';

export const iframePanelMigrationHandler = (panel: PanelModel<IFrameOptions>): Partial<IFrameOptions> => {

  return panel.options;
};
