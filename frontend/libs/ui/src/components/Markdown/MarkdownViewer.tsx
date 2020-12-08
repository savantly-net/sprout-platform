import React from 'react';
import ReactMarkdown from 'react-markdown';

export type MarkdownViewerProps = ReactMarkdown.ReactMarkdownProps;

export const MarkdownViewer = (props: MarkdownViewerProps) => {
  const { children, ...rest } = props;
  return <ReactMarkdown {...rest as any}>{children}</ReactMarkdown>;
};
