// Libraries
import { PanelProps } from '@savantly/sprout-api';
import { CustomScrollbar, stylesFactory } from '@savantly/sprout-ui';
import { css, cx } from 'emotion';
import React from 'react';
// Types
import { QueryPanelOptions } from './types';

interface Props extends PanelProps<QueryPanelOptions> {}

export const QueryPanel = (props: Props) => {

  const { url } = props.options;
    const styles = getStyles();
    return (
      <CustomScrollbar autoHeightMin="100%">
        <iframe src={url} className={cx(styles.content)} />
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
