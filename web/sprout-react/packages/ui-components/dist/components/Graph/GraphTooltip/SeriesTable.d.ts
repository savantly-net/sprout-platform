import React from 'react';
import { GraphSeriesValue } from '@savantly/sprout-api';
export interface SeriesTableRowProps {
    color?: string;
    label?: string;
    value: string | GraphSeriesValue;
    isActive?: boolean;
}
interface SeriesTableProps {
    timestamp?: string | GraphSeriesValue;
    series: SeriesTableRowProps[];
}
export declare const SeriesTable: React.FC<SeriesTableProps>;
export {};
