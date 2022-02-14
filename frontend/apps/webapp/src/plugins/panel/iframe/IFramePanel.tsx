// Libraries
import { PanelProps } from '@savantly/sprout-api';
import { CustomScrollbar, stylesFactory } from '@savantly/sprout-ui';
import { css, cx } from 'emotion';
/* eslint-disable */
import React from 'react';
/* eslint-enable */
// Types
import { IFrameOptions } from './types';

interface Props extends PanelProps<IFrameOptions> {}

export const IFramePanel = (props: Props) => {

  const { url } = props.options;
    const styles = getStyles();
    return (
      <CustomScrollbar autoHeightMin="100%">
        <iframe src={url} title="iframe panel" className={cx(styles.content)} />
      </CustomScrollbar>
    );
}

const getStyles = stylesFactory(() => {
  return {
    content: css`
      height: 100%;
    `
  };
});
