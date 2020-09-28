import React from 'react';
import { LogRowModel, Field, LinkModel } from '@grafana/data';
import { Themeable } from '../../types/theme';
export interface Props extends Themeable {
    row: LogRowModel;
    showParsedFields: string[];
    getFieldLinks?: (field: Field, rowIndex: number) => Array<LinkModel<Field>>;
}
export declare const LogRowMessageParsed: React.FunctionComponent<Pick<Props, "row" | "showParsedFields" | "getFieldLinks">>;
