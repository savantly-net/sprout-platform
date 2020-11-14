import { PanelPlugin } from '@savantly/sprout-api';
import { IFramePanel } from './IFramePanel';
import { iframePanelMigrationHandler } from './iframePanelMigrationHandler';
import { IFrameOptions } from './types';

export const plugin = new PanelPlugin<IFrameOptions>(IFramePanel)
  .setPanelOptions((builder) => {
    builder.addTextInput({
      path: 'url',
      name: 'url',
      description: 'URL of the content',
      defaultValue: ''
    });
  })
  .setMigrationHandler(iframePanelMigrationHandler);
