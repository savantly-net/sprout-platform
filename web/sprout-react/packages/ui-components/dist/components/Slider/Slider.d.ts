import { FunctionComponent } from 'react';
import { Orientation } from '../../types/orientation';
export interface Props {
    min: number;
    max: number;
    orientation?: Orientation;
    /** Set current positions of handle(s). If only 1 value supplied, only 1 handle displayed. */
    value?: number[];
    reverse?: boolean;
    step?: number;
    tooltipAlwaysVisible?: boolean;
    formatTooltipResult?: (value: number) => number | string;
    onChange?: (values: number[]) => void;
    onAfterChange?: (values: number[]) => void;
}
export declare const Slider: FunctionComponent<Props>;
