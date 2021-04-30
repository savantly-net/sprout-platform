// Libraries
import { PanelProps } from '@savantly/sprout-api';
import { CustomScrollbar, stylesFactory } from '@savantly/sprout-ui';
import { LoadingIcon, MarkdownViewer } from '@sprout-platform/ui';
import { css, cx } from 'emotion';
import React from 'react';
import { useWidgetDataById } from './api/widgetApi';
import { WidgetDataType, WidgetPanelOptions } from './types';

interface Props extends PanelProps<WidgetPanelOptions> {}

// TODO: change rendering based on data type
const RenderData = ({ data, dataType }: { data: any; dataType: WidgetDataType }) => {
  if (data) {
    if (dataType === 'MARKDOWN' || dataType === 'MARKUP') {
      return (
        <MarkdownViewer className={cx(getStyles().content)} allowDangerousHtml={true}>
          {data}
        </MarkdownViewer>
      );
    } else {
      return <pre className={cx(getStyles().content)}>{data}</pre>;
    }
  } else {
    return <LoadingIcon />;
  }
};

export const WidgetPanel = (props: Props) => {
  const { dataId, dataSourceId } = props.options;
  const widgetData = useWidgetDataById(dataSourceId, dataId);

  return (
    <CustomScrollbar autoHeightMin="100%">
      {widgetData && <RenderData data={widgetData.data} dataType={widgetData.dataType} />}
    </CustomScrollbar>
  );
};

const getStyles = stylesFactory(() => {
  return {
    content: css`
      height: 100%;
      border: none;
    `
  };
});