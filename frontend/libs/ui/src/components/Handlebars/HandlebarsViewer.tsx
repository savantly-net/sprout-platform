import Handlebars from 'handlebars';
import React, { useMemo, useState } from 'react';
import { LoadingIcon } from '../LoadingIcon/LoadingIcon';
import { MarkdownViewer } from '../Markdown/MarkdownViewer';

export interface HandlebarsViewerProps {
  templateSource: string;
  data: any;
}

export const HandlebarsViewer = ({ templateSource, data }: HandlebarsViewerProps) => {
  const [renderedTemplate, setRenderedTemplate] = useState('');

  useMemo(() => {
    const template = Handlebars.compile(templateSource);
    const result = template(data);
    setRenderedTemplate(result);
  }, [templateSource, data]);

  if (renderedTemplate) {
    return <MarkdownViewer allowDangerousHtml>{renderedTemplate}</MarkdownViewer>;
  } else {
    return <LoadingIcon />;
  }
};
