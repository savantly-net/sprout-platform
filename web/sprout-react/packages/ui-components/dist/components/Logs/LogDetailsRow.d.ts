import React from 'react';
import { Field, LinkModel, LogLabelStatsModel } from '@savantly/sprout-api';
import { Themeable } from '../../types/theme';
export interface Props extends Themeable {
    parsedValue: string;
    parsedKey: string;
    isLabel?: boolean;
    onClickFilterLabel?: (key: string, value: string) => void;
    onClickFilterOutLabel?: (key: string, value: string) => void;
    links?: Array<LinkModel<Field>>;
    getStats: () => LogLabelStatsModel[] | null;
    showParsedFields?: string[];
    onClickShowParsedField?: (key: string) => void;
    onClickHideParsedField?: (key: string) => void;
}
export declare const LogDetailsRow: React.FunctionComponent<Pick<Props, "isLabel" | "parsedValue" | "parsedKey" | "onClickFilterLabel" | "onClickFilterOutLabel" | "links" | "getStats" | "showParsedFields" | "onClickShowParsedField" | "onClickHideParsedField">>;
