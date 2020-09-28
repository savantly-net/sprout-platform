import React from 'react';
import { Dimensions, TimeZone } from '@grafana/data';
import { FlotPosition } from '../Graph/types';
export declare type TooltipMode = 'single' | 'multi' | 'none';
export declare type ActiveDimensions<T extends Dimensions = any> = {
    [key in keyof T]: [number, number | undefined] | null;
};
export interface TooltipContentProps<T extends Dimensions = any> {
    dimensions: T;
    activeDimensions?: ActiveDimensions<T>;
    timeZone?: TimeZone;
    pos: FlotPosition;
    mode: TooltipMode;
}
export interface TooltipProps {
    /** Element used as tooltips content */
    content?: React.ReactElement<any>;
    /** Optional component to be used as a tooltip content */
    tooltipComponent?: React.ComponentType<TooltipContentProps>;
    /** x/y position relative to the window */
    position?: {
        x: number;
        y: number;
    };
    /** x/y offset relative to tooltip origin element, i.e. graph's datapoint */
    offset?: {
        x: number;
        y: number;
    };
    mode?: TooltipMode;
}
export declare const Tooltip: React.FC<TooltipProps>;
