import React, { PureComponent, FormEvent } from 'react';
import { TimeRange, TimeZone } from '@savantly/sprout-api';
import { Themeable } from '../../types';
export interface Props extends Themeable {
    hideText?: boolean;
    value: TimeRange;
    timeZone?: TimeZone;
    timeSyncButton?: JSX.Element;
    isSynced?: boolean;
    onChange: (timeRange: TimeRange) => void;
    onChangeTimeZone: (timeZone: TimeZone) => void;
    onMoveBackward: () => void;
    onMoveForward: () => void;
    onZoom: () => void;
    history?: TimeRange[];
}
export interface State {
    isOpen: boolean;
}
export declare class UnthemedTimeRangePicker extends PureComponent<Props, State> {
    state: State;
    onChange: (timeRange: any) => void;
    onOpen: (event: FormEvent<HTMLButtonElement>) => void;
    onClose: () => void;
    render(): JSX.Element;
}
export declare const TimePickerButtonLabel: React.NamedExoticComponent<Pick<Props, "value" | "timeZone" | "hideText">>;
export declare const TimeRangePicker: React.FunctionComponent<Pick<Props, "value" | "history" | "onChange" | "timeZone" | "onChangeTimeZone" | "hideText" | "timeSyncButton" | "isSynced" | "onMoveBackward" | "onMoveForward" | "onZoom">>;
