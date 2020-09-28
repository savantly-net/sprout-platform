import React from 'react';
import { PlotPluginProps } from '../types';
interface Selection {
    min: number;
    max: number;
    bbox: {
        top: number;
        left: number;
        width: number;
        height: number;
    };
}
interface SelectionPluginAPI {
    selection: Selection;
    clearSelection: () => void;
}
interface SelectionPluginProps extends PlotPluginProps {
    onSelect: (selection: Selection) => void;
    onDismiss?: () => void;
    lazy?: boolean;
    children?: (api: SelectionPluginAPI) => JSX.Element;
}
export declare const SelectionPlugin: React.FC<SelectionPluginProps>;
export {};
