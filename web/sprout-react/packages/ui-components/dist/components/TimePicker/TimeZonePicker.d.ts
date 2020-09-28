import React from 'react';
import { TimeZone } from '@savantly/sprout-api';
export interface Props {
    onChange: (timeZone: TimeZone | undefined) => void;
    value?: TimeZone;
    width?: number;
    autoFocus?: boolean;
    onBlur?: () => void;
    includeInternal?: boolean;
}
export declare const TimeZonePicker: React.FC<Props>;
