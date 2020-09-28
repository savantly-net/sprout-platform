/// <reference types="jquery" />
import React, { PureComponent } from 'react';
import { TimeRange, GraphSeriesXY, TimeZone } from '@savantly/sprout-api';
import { FlotPosition, FlotItem } from './types';
import { TooltipProps } from '../Chart/Tooltip';
export interface GraphProps {
    ariaLabel?: string;
    children?: JSX.Element | JSX.Element[];
    series: GraphSeriesXY[];
    timeRange: TimeRange;
    timeZone?: TimeZone;
    showLines?: boolean;
    showPoints?: boolean;
    showBars?: boolean;
    width: number;
    height: number;
    isStacked?: boolean;
    lineWidth?: number;
    onHorizontalRegionSelected?: (from: number, to: number) => void;
}
interface GraphState {
    pos?: FlotPosition;
    contextPos?: FlotPosition;
    isTooltipVisible: boolean;
    isContextVisible: boolean;
    activeItem?: FlotItem<GraphSeriesXY>;
    contextItem?: FlotItem<GraphSeriesXY>;
}
export declare class Graph extends PureComponent<GraphProps, GraphState> {
    static defaultProps: {
        showLines: boolean;
        showPoints: boolean;
        showBars: boolean;
        isStacked: boolean;
        lineWidth: number;
    };
    state: GraphState;
    element: HTMLElement | null;
    $element: any;
    componentDidUpdate(prevProps: GraphProps, prevState: GraphState): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onPlotSelected: (event: JQueryEventObject, ranges: {
        xaxis: {
            from: number;
            to: number;
        };
    }) => void;
    onPlotHover: (event: JQueryEventObject, pos: FlotPosition, item?: FlotItem<any> | undefined) => void;
    onPlotClick: (event: JQueryEventObject, contextPos: FlotPosition, item?: FlotItem<any> | undefined) => void;
    getYAxes(series: GraphSeriesXY[]): {
        show: boolean;
        index: any;
        position: string;
        min: any;
        tickDecimals: any;
    }[] | {
        show: boolean;
        min: number;
        max: number;
    }[];
    renderTooltip: () => React.ReactElement<TooltipProps, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
    renderContextMenu: () => JSX.Element | null;
    getBarWidth: () => number;
    draw(): void;
    render(): JSX.Element;
}
export default Graph;
