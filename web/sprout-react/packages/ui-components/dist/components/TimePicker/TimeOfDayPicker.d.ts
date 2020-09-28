import { FC } from 'react';
import { DateTime } from '@grafana/data';
import { FormInputSize } from '../Forms/types';
export interface Props {
    onChange: (value: DateTime) => void;
    value?: DateTime;
    showHour?: boolean;
    minuteStep?: number;
    size?: FormInputSize;
}
export declare const TimeOfDayPicker: FC<Props>;
