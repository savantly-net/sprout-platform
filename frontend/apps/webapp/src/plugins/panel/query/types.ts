import { QueryParametersConfiguration } from "./editors/QueryParametersEditor";
import { CodeTemplateEditorConfiguration } from "./editors/TemplateEditor";

export interface QueryPanelOptions {
  url: string;
  queryParameters: QueryParametersConfiguration;
  template: CodeTemplateEditorConfiguration;
  useTemplate: boolean;
}
