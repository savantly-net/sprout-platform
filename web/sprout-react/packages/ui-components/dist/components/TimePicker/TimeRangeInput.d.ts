import { FC } from 'react';
import { TimeRange, TimeZone } from '@grafana/data';
export declare const defaultTimeRange: TimeRange;
export interface Props {
    value: TimeRange;
    timeZone?: TimeZone;
    onChange: (timeRange: TimeRange) => void;
    onChangeTimeZone?: (timeZone: TimeZone) => void;
    hideTimeZone?: boolean;
    placeholder?: string;
    clearable?: boolean;
}
export declare const TimeRangeInput: FC<Props>;
