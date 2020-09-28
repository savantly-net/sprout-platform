import React, { Component } from 'react';
import { SelectableValue } from '@savantly/sprout-api';
import { GrafanaTheme } from '@savantly/sprout-api';
export declare const defaultIntervals: string[];
export interface Props {
    intervals?: string[];
    onRefresh?: () => any;
    onIntervalChanged: (interval: string) => void;
    value?: string;
    tooltip?: string;
    hasLiveOption?: boolean;
    refreshButton?: React.ReactNode;
    buttonSelectClassName?: string;
    theme: GrafanaTheme;
}
export declare class RefreshPickerBase extends Component<Props> {
    static offOption: {
        label: string;
        value: string;
    };
    static liveOption: {
        label: string;
        value: string;
    };
    static isLive: (refreshInterval?: string | undefined) => boolean;
    constructor(props: Props);
    intervalsToOptions: (intervals: string[] | undefined) => Array<SelectableValue<string>>;
    onChangeSelect: (item: SelectableValue<string>) => void;
    shouldComponentUpdate(nextProps: Props): boolean;
    render(): JSX.Element;
}
export declare const RefreshPicker: React.FunctionComponent<Pick<Props, "value" | "tooltip" | "intervals" | "onRefresh" | "onIntervalChanged" | "hasLiveOption" | "refreshButton" | "buttonSelectClassName">> & {
    offOption: typeof RefreshPickerBase.offOption;
    liveOption: typeof RefreshPickerBase.liveOption;
    isLive: typeof RefreshPickerBase.isLive;
};
