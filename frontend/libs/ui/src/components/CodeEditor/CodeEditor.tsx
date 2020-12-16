import { css, cx } from 'emotion';
import React, { FC } from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';
//import 'ace-builds/src-min-noconflict/ext-language_tools';
//import 'ace-builds/src-min-noconflict/ext-searchbox';
//import 'ace-builds/src-min-noconflict/ext-spellcheck';
import 'ace-builds/src-min-noconflict/mode-handlebars';
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-datetime/css/react-datetime.css';
import 'react-mde/lib/styles/css/react-mde-all.css';
//import 'ace-builds/src-min-noconflict/snippets/javascript';
//import 'ace-builds/src-min-noconflict/theme-tomorrow_night_eighties';
//import 'ace-builds/src-noconflict/snippets/html';
const ace = require('ace-builds/src-noconflict/ace');

ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/');
ace.config.setModuleUrl(
  'ace/mode/javascript_worker',
  'https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js'
);

export type CodeEditorMode = 'html' | 'javascript' | 'handlebars';
export type CodeEditorTheme = 'light' | 'dark';

export interface CodeEditorProps extends IAceEditorProps {
  mode?: CodeEditorMode;
  theme?: CodeEditorTheme;
  name?: string;
}

export const CodeEditor: FC<CodeEditorProps> = ({
  mode,
  theme,
  name,
  width,
  height,
  value,
  ...rest
}: CodeEditorProps) => {
  const _name = name || Math.random().toString(36).substring(7);
  const _theme = theme === 'light' ? 'github' : 'monokai';
  const _mode = mode || 'handlebars';
  const _height = height || '300px';
  const _width = width || '100%';

  return (
    <div
      className={cx(
        'code-editor',
        css`
          min-height: ${height};
        `
      )}
    >
      <AceEditor
        mode={_mode}
        theme={_theme}
        name={_name}
        height={_height}
        width={_width}
        fontSize={14}
        showPrintMargin={true}
        focus={true}
        editorProps={{ $blockScrolling: true }}
        wrapEnabled={true}
        highlightActiveLine={true}
        autoScrollEditorIntoView={true}
        value={value}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          showGutter: true
        }}
        {...rest}
      />
    </div>
  );
};
