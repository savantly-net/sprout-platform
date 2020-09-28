import React, { ReactNode } from 'react';
import { TimeOption, TimeZone } from '@savantly/sprout-api';
import { TimeRange } from '@savantly/sprout-api';
interface Props {
    title?: string;
    options: TimeOption[];
    value?: TimeRange;
    onSelect: (option: TimeRange) => void;
    placeholderEmpty?: ReactNode;
    timeZone?: TimeZone;
}
export declare const TimeRangeList: React.FC<Props>;
export {};
