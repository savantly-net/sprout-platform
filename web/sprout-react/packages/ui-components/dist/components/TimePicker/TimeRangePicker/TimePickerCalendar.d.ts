import React, { FormEvent } from 'react';
import { DateTime, TimeZone } from '@grafana/data';
interface Props {
    isOpen: boolean;
    from: DateTime;
    to: DateTime;
    onClose: () => void;
    onApply: (e: FormEvent<HTMLButtonElement>) => void;
    onChange: (from: DateTime, to: DateTime) => void;
    isFullscreen: boolean;
    timeZone?: TimeZone;
    isReversed?: boolean;
}
export declare const TimePickerCalendar: React.NamedExoticComponent<Props>;
export declare function inputToValue(from: DateTime, to: DateTime, invalidDateDefault?: Date): Date[];
export {};
