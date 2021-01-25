import { QueryParametersConfiguration } from './editors/QueryParametersEditor';
import { CodeTemplateEditorConfiguration } from './editors/TemplateEditor';

export interface TablePanelOptions {
  url: string;
  queryParameters: QueryParametersConfiguration;
  jsonDataPath: string;
  headerTemplate: CodeTemplateEditorConfiguration;
  useProxy: boolean;
  headers: string;
}
