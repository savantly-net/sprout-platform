import React from 'react';
import { PlotPluginProps } from '../types';
interface CursorPluginAPI {
    focusedSeriesIdx: number | null;
    focusedPointIdx: number | null;
    coords: {
        plotCanvas: Coords;
        viewport: Coords;
    };
}
interface CursorPluginProps extends PlotPluginProps {
    onMouseMove?: () => void;
    children: (api: CursorPluginAPI) => React.ReactElement | null;
    capture?: 'mousemove' | 'mousedown';
    lock?: boolean;
}
interface Coords {
    x: number;
    y: number;
}
export declare const CursorPlugin: React.FC<CursorPluginProps>;
export {};
