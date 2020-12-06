import { PanelPlugin } from '@savantly/sprout-api';
import { QueryParametersEditor } from './editors/QueryParametersEditor';
import { QueryPanel } from './QueryPanel';
import { queryPanelMigrationHandler } from './queryPanelMigrationHandler';
import { QueryPanelOptions } from './types';

export const plugin = new PanelPlugin<QueryPanelOptions>(QueryPanel)
  .setPanelOptions((builder) => {
    builder.addTextInput({
      path: 'url',
      name: 'url',
      description: 'URL of the content',
      defaultValue: ''
    });
    builder.addCustomEditor({
      editor: QueryParametersEditor,
      id: 'queryParameters',
      path: 'queryParameters',
      name: 'Parameters',
      defaultValue: {
        controls: []
      }
    });
  })
  .setMigrationHandler(queryPanelMigrationHandler);
