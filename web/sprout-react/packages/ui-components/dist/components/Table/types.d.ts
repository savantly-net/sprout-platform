import { CellProps } from 'react-table';
import { Field } from '@grafana/data';
import { TableStyles } from './styles';
import { CSSProperties, FC } from 'react';
export interface TableFieldOptions {
    width: number;
    align: FieldTextAlignment;
    displayMode: TableCellDisplayMode;
    hidden?: boolean;
}
export declare enum TableCellDisplayMode {
    Auto = "auto",
    ColorText = "color-text",
    ColorBackground = "color-background",
    GradientGauge = "gradient-gauge",
    LcdGauge = "lcd-gauge",
    JSONView = "json-view",
    BasicGauge = "basic",
    Image = "image"
}
export declare type FieldTextAlignment = 'auto' | 'left' | 'right' | 'center';
export interface TableRow {
    [x: string]: any;
}
export declare const FILTER_FOR_OPERATOR = "=";
export declare const FILTER_OUT_OPERATOR = "!=";
export declare type FilterOperator = typeof FILTER_FOR_OPERATOR | typeof FILTER_OUT_OPERATOR;
export declare type FilterItem = {
    key: string;
    value: string;
    operator: FilterOperator;
};
export declare type TableFilterActionCallback = (item: FilterItem) => void;
export declare type TableColumnResizeActionCallback = (fieldDisplayName: string, width: number) => void;
export declare type TableSortByActionCallback = (state: TableSortByFieldState[]) => void;
export interface TableSortByFieldState {
    displayName: string;
    desc?: boolean;
}
export interface TableCellProps extends CellProps<any> {
    tableStyles: TableStyles;
    cellProps: CSSProperties;
    field: Field;
    onCellFilterAdded: TableFilterActionCallback;
}
export declare type CellComponent = FC<TableCellProps>;
