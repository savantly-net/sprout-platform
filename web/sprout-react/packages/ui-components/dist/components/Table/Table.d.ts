import { FC } from 'react';
import { DataFrame } from '@grafana/data';
import { TableColumnResizeActionCallback, TableFilterActionCallback, TableSortByActionCallback, TableSortByFieldState } from './types';
export interface Props {
    ariaLabel?: string;
    data: DataFrame;
    width: number;
    height: number;
    /** Minimal column width specified in pixels */
    columnMinWidth?: number;
    noHeader?: boolean;
    resizable?: boolean;
    initialSortBy?: TableSortByFieldState[];
    onColumnResize?: TableColumnResizeActionCallback;
    onSortByChange?: TableSortByActionCallback;
    onCellFilterAdded?: TableFilterActionCallback;
}
export declare const Table: FC<Props>;
