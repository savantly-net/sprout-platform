import React from 'react';
import { Field, LinkModel, LogRowModel, LogsSortOrder, TimeZone, DataQueryResponse } from '@grafana/data';
import { RowContextOptions } from './LogRowContextProvider';
import { Themeable } from '../../types/theme';
interface Props extends Themeable {
    highlighterExpressions?: string[];
    row: LogRowModel;
    showDuplicates: boolean;
    showLabels: boolean;
    showTime: boolean;
    wrapLogMessage: boolean;
    timeZone: TimeZone;
    allowDetails?: boolean;
    logsSortOrder?: LogsSortOrder | null;
    getRows: () => LogRowModel[];
    onClickFilterLabel?: (key: string, value: string) => void;
    onClickFilterOutLabel?: (key: string, value: string) => void;
    onContextClick?: () => void;
    getRowContext: (row: LogRowModel, options?: RowContextOptions) => Promise<DataQueryResponse>;
    getFieldLinks?: (field: Field, rowIndex: number) => Array<LinkModel<Field>>;
    showContextToggle?: (row?: LogRowModel) => boolean;
    showParsedFields?: string[];
    onClickShowParsedField?: (key: string) => void;
    onClickHideParsedField?: (key: string) => void;
}
export declare const LogRow: React.FunctionComponent<Pick<Props, "row" | "timeZone" | "getRowContext" | "logsSortOrder" | "highlighterExpressions" | "wrapLogMessage" | "showContextToggle" | "getRows" | "onClickFilterLabel" | "onClickFilterOutLabel" | "showParsedFields" | "onClickShowParsedField" | "onClickHideParsedField" | "showDuplicates" | "getFieldLinks" | "showLabels" | "showTime" | "allowDetails" | "onContextClick">>;
export {};
