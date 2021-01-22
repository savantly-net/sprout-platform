import { StandardEditorProps } from '@savantly/sprout-api';
import { CodeEditor } from '@sprout-platform/ui';
import React from 'react';
import { QueryPanelOptions } from '../types';

export const HeadersEditor: React.FC<StandardEditorProps<string, any, QueryPanelOptions>> = ({ value, onChange }) => {
  const updateConfig = (source: string) => {
    onChange(source);
  };

  return (
    <div className="gf-form-group">
      <div className="edit-tab-content">
        <CodeEditor
          name="query-panel-headers-editor"
          value={value}
          maxLines={10}
          minLines={5}
          onBlur={(e, editor) => {
            const currentValue = editor?.getValue();
            updateConfig(currentValue || '');
          }}
        />
      </div>
    </div>
  );
};
