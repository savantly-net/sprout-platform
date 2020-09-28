import React from 'react';
import { TimeOption } from '@savantly/sprout-api';
interface Props {
    value: TimeOption;
    selected?: boolean;
    onSelect: (option: TimeOption) => void;
}
export declare const TimeRangeOption: React.NamedExoticComponent<Props>;
export {};
