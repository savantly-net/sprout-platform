import React from 'react';
import { LegendDisplayMode } from '../..';
export declare type LegendPlacement = 'top' | 'bottom' | 'left' | 'right';
interface LegendPluginProps {
    placement: LegendPlacement;
    displayMode?: LegendDisplayMode;
}
export declare const LegendPlugin: React.FC<LegendPluginProps>;
export {};
