import { QueryParametersConfiguration } from './editors/QueryParametersEditor';
import { CodeTemplateEditorConfiguration } from './editors/TemplateEditor';

export type QueryPanelDisplayType = 'FRAME' | 'RENDER';

export interface QueryPanelOptions {
  url: string;
  queryParameters: QueryParametersConfiguration;
  displayType: QueryPanelDisplayType;
  template: CodeTemplateEditorConfiguration;
  useTemplate: boolean;
  useProxy: boolean;
  headers: string;
}
