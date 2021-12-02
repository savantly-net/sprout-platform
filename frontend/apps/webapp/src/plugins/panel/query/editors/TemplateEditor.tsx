import { StandardEditorProps } from '@savantly/sprout-api';
import { CodeEditor } from '@sprout-platform/ui';
import React from 'react';
import { QueryPanelOptions } from '../types';

export interface CodeTemplateEditorConfiguration {
  templateSource: string;
}

export const CodeTemplateEditor: React.FC<
  StandardEditorProps<CodeTemplateEditorConfiguration, any, QueryPanelOptions>
> = ({ value, onChange }) => {

  const updateConfig = (source: string) => {
    console.log('calling onChange handler', source);
    onChange({ templateSource: source });
  };

  return (
    <div className="gf-form-group">
      <div className="edit-tab-content">
        <CodeEditor
          name="query-panel-template-editor"
          value={value.templateSource}
          onChange={(source) => {
            console.log('editor changed', source);
            //setState(source);
          }}
          onBlur={(e, editor) => {
            const currentValue = editor?.getValue();
            console.log('onBlur', editor, currentValue);
            updateConfig(currentValue|| '');
          }}
        />
      </div>
    </div>
  );
};
