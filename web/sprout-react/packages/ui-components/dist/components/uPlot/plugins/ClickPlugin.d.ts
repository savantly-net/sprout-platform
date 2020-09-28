import React from 'react';
import { PlotPluginProps } from '../types';
interface ClickPluginAPI {
    point: {
        seriesIdx: number | null;
        dataIdx: number | null;
    };
    coords: {
        plotCanvas: Coords;
        viewport: Coords;
    };
    clearSelection: () => void;
}
interface ClickPluginProps extends PlotPluginProps {
    onClick: (e: {
        seriesIdx: number | null;
        dataIdx: number | null;
    }) => void;
    children: (api: ClickPluginAPI) => React.ReactElement | null;
}
interface Coords {
    x: number;
    y: number;
}
export declare const ClickPlugin: React.FC<ClickPluginProps>;
export {};
