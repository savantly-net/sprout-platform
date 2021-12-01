// Libraries
import { PanelProps } from '@savantly/sprout-api';
import { CustomScrollbar, stylesFactory } from '@savantly/sprout-ui';
import { MarkdownViewer } from '@sprout-platform/ui';
import { css, cx } from 'emotion';
import React, { FC } from 'react';
// Types
import { TextOptions } from './types';

interface Props extends PanelProps<TextOptions> {}

export const TextPanel: FC<Props> = (props: Props) => {
  const styles = getStyles(); 
  return (
    
    <CustomScrollbar autoHeightMin="100%">
      {/* { props.options.content !== 'undefined' ? (
        <div className={cx('markdown-html', styles.content)}
          dangerouslySetInnerHTML={{ __html: props.options.content.replace(/\n/g, '<br />') }} />
      ):""} */}
      <MarkdownViewer allowDangerousHtml={props.options.mode === 'html'}
        className={cx('markdown-html', styles.content)} >
        {props.options.content}
      </MarkdownViewer>
    </CustomScrollbar>
  );
};

const getStyles = stylesFactory(() => {
  return {
    content: css`
      height: 100%;
      ol {padding-left: 20px;}
      ul {padding-left: 20px;}
    `};
});
