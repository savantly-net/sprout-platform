import { PanelPlugin } from '@savantly/sprout-api';
import { WidgetDataSelector } from './editors/WidgetDataSelector';
import { WidgetPanel } from './WidgetPanel';
import { WidgetPanelOptions } from './types';
import { widgetPanelMigrationHandler } from './widgetPanelMigrationHandler';

export const plugin = new PanelPlugin<WidgetPanelOptions>(WidgetPanel)
  .setPanelOptions((builder) => {
    builder.addSelect({
      path: 'dataSourceId',
      name: 'Data Source',
      description: 'DataSource to select data from',
      defaultValue: 'DEFAULT_WIDGET_DATA_SOURCE',
      settings: {
        options: [
          {
            label: 'Default',
            description: 'TODO: get data sources from API',
            value: 'DEFAULT_WIDGET_DATA_SOURCE'
          }
        ]
      }
    });
    builder.addCustomEditor({
      editor: WidgetDataSelector,
      id: 'dataId',
      path: 'dataId',
      name: 'Data',
      defaultValue: undefined
    });
  })
  .setMigrationHandler(widgetPanelMigrationHandler);
