import { PanelPlugin } from '@savantly/sprout-api';
import { HeadersEditor } from './editors/HeadersEditor';
import { QueryParametersEditor } from './editors/QueryParametersEditor';
import { CodeTemplateEditor } from './editors/TemplateEditor';
import { QueryPanel } from './QueryPanel';
import { queryPanelMigrationHandler } from './queryPanelMigrationHandler';
import { QueryPanelOptions } from './types';

export const plugin = new PanelPlugin<QueryPanelOptions>(QueryPanel)
  .setPanelOptions((builder) => {
    builder.addTextInput({
      path: 'url',
      name: 'Url',
      description: 'URL of the content',
      defaultValue: ''
    });
    builder.addSelect({
      path: 'displayType',
      name: 'Display Type',
      description: 'How to display the queried content',
      defaultValue: 'FRAME',
      settings: {
        options: [
          {
            label: 'Framed Window',
            description: 'Display the content in an IFrame',
            value: 'FRAME'
          },
          {
            label: 'Rendering',
            description: 'Render the data',
            value: 'RENDER'
          }
        ]
      }
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
    builder.addBooleanSwitch({
      name: 'Use Template',
      path: 'useTemplate',
      description: 'Use a handlebars template to transform a json response into html',
      category: ['Advanced', 'Transformation'],
      showIf: (config) => config.displayType === 'RENDER'
    });
    builder.addCustomEditor({
      editor: CodeTemplateEditor,
      id: 'template',
      path: 'template',
      name: 'Handlebars Template',
      description: 'Guide - https://handlebarsjs.com/guide/',
      category: ['Advanced', 'Templating'],
      defaultValue: {
        templateSource: ''
      },
      showIf: (config) => config.useTemplate && config.displayType === 'RENDER'
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
      description: 'URL of the content',
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
  .setMigrationHandler(queryPanelMigrationHandler);
