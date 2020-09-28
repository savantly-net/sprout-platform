import React from 'react';
import { TimeZone } from '@savantly/sprout-api';
import { TooltipMode } from '../../Chart/Tooltip';
interface TooltipPluginProps {
    mode?: TooltipMode;
    timeZone: TimeZone;
}
export declare const TooltipPlugin: React.FC<TooltipPluginProps>;
export {};
