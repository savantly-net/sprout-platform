import React from 'react';
import { SelectableValue } from '@savantly/sprout-api';
import { SegmentProps } from '.';
export interface SegmentSyncProps<T> extends SegmentProps<T> {
    value?: T | SelectableValue<T>;
    onChange: (item: SelectableValue<T>) => void;
    options: Array<SelectableValue<T>>;
}
export declare function Segment<T>({ options, value, onChange, Component, className, allowCustomValue, placeholder, }: React.PropsWithChildren<SegmentSyncProps<T>>): JSX.Element;
