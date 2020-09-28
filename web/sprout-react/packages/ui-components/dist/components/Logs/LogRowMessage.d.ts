import React from 'react';
import { LogRowModel } from '@grafana/data';
import { LogRowContextQueryErrors, HasMoreContextRows, LogRowContextRows } from './LogRowContextProvider';
import { Themeable } from '../../types/theme';
export declare const MAX_CHARACTERS = 100000;
interface Props extends Themeable {
    row: LogRowModel;
    hasMoreContextRows?: HasMoreContextRows;
    contextIsOpen: boolean;
    wrapLogMessage: boolean;
    errors?: LogRowContextQueryErrors;
    context?: LogRowContextRows;
    showContextToggle?: (row?: LogRowModel) => boolean;
    highlighterExpressions?: string[];
    getRows: () => LogRowModel[];
    onToggleContext: () => void;
    updateLimit?: () => void;
}
export declare const LogRowMessage: React.FunctionComponent<Pick<Props, "row" | "errors" | "context" | "hasMoreContextRows" | "highlighterExpressions" | "contextIsOpen" | "wrapLogMessage" | "showContextToggle" | "getRows" | "onToggleContext" | "updateLimit">>;
export {};
