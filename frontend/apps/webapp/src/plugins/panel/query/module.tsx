import { PanelPlugin } from '@savantly/sprout-api';
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
      description: 'Use a handlebars template to transform the data',
      category: ['Advanced', 'Transformation']
    });
    builder.addCustomEditor({
      editor: CodeTemplateEditor,
      id: 'template',
      path: 'template',
      name: 'Handlebars Template',
      category: ['Advanced', 'Templating'],
      defaultValue: {
        templateSource: ''
      },
      showIf: (config) => config.useTemplate
    });
  })
  .setMigrationHandler(queryPanelMigrationHandler);
