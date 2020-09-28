import React, { PureComponent } from 'react';
import { DisplayValue, FieldConfig, Threshold } from '@grafana/data';
import { Themeable } from '../../types';
export interface Props extends Themeable {
    height: number;
    field: FieldConfig;
    showThresholdMarkers: boolean;
    showThresholdLabels: boolean;
    width: number;
    value: DisplayValue;
    onClick?: React.MouseEventHandler<HTMLElement>;
    className?: string;
}
export declare class Gauge extends PureComponent<Props> {
    canvasElement: any;
    static defaultProps: Partial<Props>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    getFormattedThresholds(decimals: number): Threshold[];
    getFontScale(length: number): number;
    draw(): void;
    renderVisualization: () => JSX.Element;
    render(): JSX.Element;
}
