import React, { FC } from 'react';
import { ThresholdsConfig, ThresholdsMode, VizOrientation } from '@savantly/sprout-api';
import { BarGauge, BarGaugeDisplayMode } from '../BarGauge/BarGauge';
import { TableCellProps, TableCellDisplayMode } from './types';

const defaultScale: ThresholdsConfig = {
  mode: ThresholdsMode.Absolute,
  steps: [
    {
      color: 'blue',
      value: -Infinity,
    },
    {
      color: 'green',
      value: 20,
    },
  ],
};

export const BarGaugeCell: FC<TableCellProps> = props => {
  const { field, column, tableStyles, cell, cellProps } = props;

  let { config } = field;
  if (!config.thresholds) {
    config = {
      ...config,
      thresholds: defaultScale,
    };
  }

  const displayValue = field.display!(cell.value);
  let barGaugeMode = BarGaugeDisplayMode.Gradient;

  if (field.config.custom && field.config.custom.displayMode === TableCellDisplayMode.LcdGauge) {
    barGaugeMode = BarGaugeDisplayMode.Lcd;
  } else if (field.config.custom && field.config.custom.displayMode === TableCellDisplayMode.BasicGauge) {
    barGaugeMode = BarGaugeDisplayMode.Basic;
  }

  let width;
  if (column.width) {
    width = (column.width as number) - tableStyles.cellPadding * 2;
  } else {
    width = tableStyles.cellPadding * 2;
  }

  return (
    <div {...cellProps} className={tableStyles.cellContainer}>
      <BarGauge
        width={width}
        height={tableStyles.cellHeightInner}
        field={config}
        display={field.display}
        value={displayValue}
        orientation={VizOrientation.Horizontal}
        theme={tableStyles.theme}
        itemSpacing={1}
        lcdCellWidth={8}
        displayMode={barGaugeMode}
      />
    </div>
  );
};
