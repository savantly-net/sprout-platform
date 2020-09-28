import { FC } from 'react';
import { TimeZone } from '@grafana/data';
interface Props {
    timeZone?: TimeZone;
    timestamp?: number;
    onChangeTimeZone: (timeZone: TimeZone) => void;
}
export declare const TimePickerFooter: FC<Props>;
export {};
