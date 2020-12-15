import { StandardEditorProps } from '@savantly/sprout-api';
import { CodeEditor, LoadingIcon } from '@sprout-platform/ui';
import React, { useEffect, useState } from 'react';
import { QueryPanelOptions } from '../types';

export interface CodeTemplateEditorConfiguration {
  templateSource: string;
}

export const CodeTemplateEditor: React.FC<
  StandardEditorProps<CodeTemplateEditorConfiguration, any, QueryPanelOptions>
> = ({ value, onChange, context, item }) => {
  const [state, setState] = useState(value.templateSource);
  if (!state) {
    console.log(`no value passed to editor`);
  }

  useEffect(() => {
      //setState(value.templateSource);
  }, [value]);

  if (!state) {
    return <LoadingIcon size="1x" />;
  }

  const updateConfig = (source: string) => {
    //onChange({ templateSource: source });
  };

  return (
    <div className="gf-form-group">
      <div className="edit-tab-content">
        <CodeEditor
          initialValue={state}
          onEditorChange={(source) => {
            //setState(source);
          }}
          onBlur={(e, editor) => {
            //updateConfig(editor?.getValue() || '');
          }}
        />
      </div>
    </div>
  );
};
