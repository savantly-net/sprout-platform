import React from 'react';
import { TimeZone, TimeRange } from '@grafana/data';
interface Props {
    isFullscreen: boolean;
    value: TimeRange;
    onApply: (range: TimeRange) => void;
    timeZone?: TimeZone;
    roundup?: boolean;
    isReversed?: boolean;
}
export declare const TimeRangeForm: React.FC<Props>;
export {};
