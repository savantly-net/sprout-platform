import { PanelPlugin } from '@savantly/sprout-api';
import { HeadersEditor } from './editors/HeadersEditor';
import { QueryParametersEditor } from './editors/QueryParametersEditor';
import { CodeTemplateEditor } from './editors/TemplateEditor';
import { TablePanel } from './TablePanel';
import { tablePanelMigrationHandler } from './panelMigrationHandler';
import { TablePanelOptions } from './types';

export const plugin = new PanelPlugin<TablePanelOptions>(TablePanel)
  .setPanelOptions((builder) => {
    builder.addTextInput({
      path: 'url',
      name: 'Url',
      description: 'URL of the Json Data',
      defaultValue: ''
    });
    builder.addCustomEditor({
      editor: QueryParametersEditor,
      id: 'queryParameters',
      path: 'queryParameters',
      name: 'Parameters',
      category: ['Advanced', 'Interactive Parameters'],
      defaultValue: {
        controls: []
      }
    });
    builder.addCustomEditor({
      editor: CodeTemplateEditor,
      id: 'headerTemplate',
      path: 'headerTemplate',
      name: 'Header Template',
      description: 'Guide - https://handlebarsjs.com/guide/',
      category: ['Advanced', 'Templating'],
      defaultValue: {
        templateSource: ''
      }
    });
    builder.addTextInput({
      path: 'jsonDataPath',
      name: 'JSON Data Path',
      description: 'JSON Path expression to extract table rows',
      category: ['Advanced', 'Configuration'],
      defaultValue: '$.rows.*'
    });
    builder.addBooleanSwitch({
      name: 'Use Proxy',
      path: 'useProxy',
      description: 'Make the request from the server instead of the browser',
      category: ['Advanced', 'Configuration']
    });
    builder.addCustomEditor({
      id: 'headers',
      editor: HeadersEditor,
      path: 'headers',
      name: 'Headers',
      description: 'Custom headers to send with request',
      defaultValue: JSON.stringify(
        {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json'
        },
        null,
        2
      ),
      category: ['Advanced', 'Configuration']
    });
  })
  .setMigrationHandler(tablePanelMigrationHandler);
