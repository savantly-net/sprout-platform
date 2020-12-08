import React, { FC, HTMLAttributes, ReactNode, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactMde, { ReactMdeProps } from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';

export type MarkdownEditorTab = 'write' | 'preview';
export type GenerateMarkdownPreview = (markdown: string) => Promise<ReactNode>;

export interface MarkdownOptions
  extends Omit<
    ReactMdeProps,
    | 'onChange'
    | 'selectedTab'
    | 'onTabChange'
    | 'generateMarkdownPreview'
    | 'minEditorHeight'
    | 'maxEditorHeight'
    | 'minPreviewHeight'
  > {
  value: string;
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  previewProps?: ReactMarkdown.ReactMarkdownProps;
  onChange?: (value: string) => void;
  selectedTab?: MarkdownEditorTab;
  onTabChange?: (tab: MarkdownEditorTab) => void;
  generateMarkdownPreview?: GenerateMarkdownPreview;
  minEditorHeight?: number;
  maxEditorHeight?: number;
  minPreviewHeight?: number;
}

export const MarkdownEditor: FC<MarkdownOptions> = ({
  value,
  wrapperProps,
  previewProps,
  selectedTab = 'write',
  onTabChange,
  onChange,
  generateMarkdownPreview,
  childProps = {
    writeButton: {
      tabIndex: -1
    }
  },
  ...rest
}: MarkdownOptions) => {
  const [_selectedTab, _setSelectedTab] = useState(selectedTab);
  const _onTabChange = onTabChange || ((tab: 'write' | 'preview') => {});
  const updateSelectedTab = (tab: 'write' | 'preview') => {
    _onTabChange(tab);
    _setSelectedTab(tab);
  };

  const [_value, _setValue] = useState(value);
  const _onChange = onChange || ((markdown) => console.log(markdown));
  const updateValue = (markdown: string) => {
    _setValue(markdown);
    _onChange(markdown);
  };

  const _generateMarkdownPreview =
    generateMarkdownPreview || ((markdown) => Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>));

  return (
    <div {...wrapperProps}>
      <ReactMde
        value={_value}
        onChange={updateValue}
        selectedTab={_selectedTab}
        onTabChange={updateSelectedTab}
        childProps={childProps}
        generateMarkdownPreview={_generateMarkdownPreview}
        {...rest}
      />
    </div>
  );
};
MarkdownEditor.defaultProps = {
  minEditorHeight: 150,
  maxEditorHeight: 300,
  minPreviewHeight: 150
};
