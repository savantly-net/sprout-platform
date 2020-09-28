import React, { PropsWithChildren } from 'react';
import { TimeZone } from '@savantly/sprout-api';
interface Props {
    timestamp: number;
    timeZone: TimeZone | undefined;
    className?: string;
}
export declare const TimeZoneOffset: React.FC<PropsWithChildren<Props>>;
export declare const formatUtcOffset: (timestamp: number, timeZone: any) => string;
export {};
