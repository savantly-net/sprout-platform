import React from 'react';
import { LogRowModel } from '@savantly/sprout-api';
import { LogRowContextRows, LogRowContextQueryErrors, HasMoreContextRows } from './LogRowContextProvider';
interface LogRowContextProps {
    row: LogRowModel;
    context: LogRowContextRows;
    errors?: LogRowContextQueryErrors;
    hasMoreContextRows?: HasMoreContextRows;
    onOutsideClick: () => void;
    onLoadMoreContext: () => void;
}
export declare const LogRowContext: React.FunctionComponent<LogRowContextProps>;
export {};
