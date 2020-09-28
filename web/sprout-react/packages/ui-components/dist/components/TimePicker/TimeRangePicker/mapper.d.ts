import { TimeOption, TimeRange } from '@savantly/sprout-api';
export declare const mapOptionToTimeRange: (option: TimeOption, timeZone?: string | undefined) => TimeRange;
export declare const mapRangeToTimeOption: (range: TimeRange, timeZone?: string | undefined) => TimeOption;
