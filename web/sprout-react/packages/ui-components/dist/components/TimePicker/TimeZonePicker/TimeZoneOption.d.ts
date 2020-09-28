import React, { PropsWithChildren } from 'react';
import { SelectableValue } from '@savantly/sprout-api';
interface Props {
    isFocused: boolean;
    isSelected: boolean;
    innerProps: any;
    data: SelectableZone;
}
export interface SelectableZone extends SelectableValue<string> {
    searchIndex: string;
}
export declare const WideTimeZoneOption: React.FC<PropsWithChildren<Props>>;
export declare const CompactTimeZoneOption: React.FC<PropsWithChildren<Props>>;
export {};
