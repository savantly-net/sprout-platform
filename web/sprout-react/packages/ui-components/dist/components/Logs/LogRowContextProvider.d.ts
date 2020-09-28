import { LogRowModel, LogsSortOrder } from '@savantly/sprout-api';
import React from 'react';
import { DataQueryResponse } from '@savantly/sprout-api';
export interface RowContextOptions {
    direction?: 'BACKWARD' | 'FORWARD';
    limit?: number;
}
export interface LogRowContextRows {
    before?: string[];
    after?: string[];
}
export interface LogRowContextQueryErrors {
    before?: string;
    after?: string;
}
export interface HasMoreContextRows {
    before: boolean;
    after: boolean;
}
interface LogRowContextProviderProps {
    row: LogRowModel;
    logsSortOrder?: LogsSortOrder | null;
    getRowContext: (row: LogRowModel, options?: RowContextOptions) => Promise<DataQueryResponse>;
    children: (props: {
        result: LogRowContextRows;
        errors: LogRowContextQueryErrors;
        hasMoreContextRows: HasMoreContextRows;
        updateLimit: () => void;
        limit: number;
    }) => JSX.Element;
}
export declare const getRowContexts: (getRowContext: (row: any, options?: RowContextOptions | undefined) => Promise<DataQueryResponse>, row: any, limit: number, logsSortOrder?: LogsSortOrder | null) => Promise<{
    data: any[][];
    errors: string[];
}>;
export declare const LogRowContextProvider: React.FunctionComponent<LogRowContextProviderProps>;
export {};
