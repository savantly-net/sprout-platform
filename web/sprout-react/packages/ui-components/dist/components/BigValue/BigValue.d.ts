import React, { PureComponent } from 'react';
import { DisplayValue, GraphSeriesValue, DisplayValueAlignmentFactors } from '@grafana/data';
import { Themeable } from '../../types';
export interface BigValueSparkline {
    data: GraphSeriesValue[][];
    xMin?: number | null;
    xMax?: number | null;
    yMin?: number | null;
    yMax?: number | null;
    highlightIndex?: number;
}
export declare enum BigValueColorMode {
    Value = "value",
    Background = "background"
}
export declare enum BigValueGraphMode {
    None = "none",
    Line = "line",
    Area = "area"
}
export declare enum BigValueJustifyMode {
    Auto = "auto",
    Center = "center"
}
/**
 * Options for how the value & title are to be displayed
 */
export declare enum BigValueTextMode {
    Auto = "auto",
    Value = "value",
    ValueAndName = "value_and_name",
    Name = "name",
    None = "none"
}
export interface Props extends Themeable {
    height: number;
    width: number;
    value: DisplayValue;
    sparkline?: BigValueSparkline;
    onClick?: React.MouseEventHandler<HTMLElement>;
    className?: string;
    colorMode: BigValueColorMode;
    graphMode: BigValueGraphMode;
    justifyMode?: BigValueJustifyMode;
    alignmentFactors?: DisplayValueAlignmentFactors;
    textMode?: BigValueTextMode;
    /**
     * If part of a series of stat panes, this is the total number.
     * Used by BigValueTextMode.Auto text mode.
     */
    count?: number;
}
export declare class BigValue extends PureComponent<Props> {
    static defaultProps: Partial<Props>;
    render(): JSX.Element;
}
