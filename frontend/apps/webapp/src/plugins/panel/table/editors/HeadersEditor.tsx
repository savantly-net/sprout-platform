import { StandardEditorProps } from '@savantly/sprout-api';
import { CodeEditor } from '@sprout-platform/ui';
/* eslint-disable */
import React from 'react';
/* eslint-enable */
import { TablePanelOptions } from '../types';

export const HeadersEditor: React.FC<StandardEditorProps<string, any, TablePanelOptions>> = ({ value, onChange }) => {
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
