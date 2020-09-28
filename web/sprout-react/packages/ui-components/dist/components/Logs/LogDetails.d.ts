import React from 'react';
import { Field, LinkModel, LogRowModel } from '@grafana/data';
import { Themeable } from '../../types/theme';
export interface Props extends Themeable {
    row: LogRowModel;
    showDuplicates: boolean;
    getRows: () => LogRowModel[];
    className?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClickFilterLabel?: (key: string, value: string) => void;
    onClickFilterOutLabel?: (key: string, value: string) => void;
    getFieldLinks?: (field: Field, rowIndex: number) => Array<LinkModel<Field>>;
    showParsedFields?: string[];
    onClickShowParsedField?: (key: string) => void;
    onClickHideParsedField?: (key: string) => void;
}
export declare const LogDetails: React.FunctionComponent<Pick<Props, "className" | "onMouseEnter" | "onMouseLeave" | "row" | "getRows" | "onClickFilterLabel" | "onClickFilterOutLabel" | "showParsedFields" | "onClickShowParsedField" | "onClickHideParsedField" | "showDuplicates" | "getFieldLinks">>;
