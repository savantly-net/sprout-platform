import React from 'react';
import uPlot from 'uplot';
import { PlotPlugin } from './types';
import { DataFrame, Field, FieldConfig } from '@savantly/sprout-api';
interface PlotCanvasContextType {
    width: number;
    height: number;
    plot: {
        width: number;
        height: number;
        top: number;
        left: number;
    };
}
interface PlotContextType {
    u?: uPlot;
    series?: uPlot.Series[];
    canvas?: PlotCanvasContextType;
    canvasRef: any;
    registerPlugin: (plugin: PlotPlugin) => () => void;
    data: DataFrame;
}
declare type PlotPluginsContextType = {
    registerPlugin: (plugin: PlotPlugin) => () => void;
};
export declare const PlotContext: React.Context<PlotContextType | null>;
export declare const usePlotContext: () => PlotContextType | null;
export declare const usePlotPluginContext: () => PlotPluginsContextType;
interface PlotDataAPI {
    /** Data frame passed to graph, x-axis aligned */
    data: DataFrame;
    /** Returns field by index */
    getField: (idx: number) => Field;
    /** Returns x-axis fields */
    getXAxisFields: () => Field[];
    /** Returns x-axis fields */
    getYAxisFields: () => Field[];
    /** Returns field value by field and value index */
    getFieldValue: (fieldIdx: number, rowIdx: number) => any;
    /** Returns field config by field index */
    getFieldConfig: (fieldIdx: number) => FieldConfig;
}
export declare const usePlotData: () => PlotDataAPI;
export declare const usePlotCanvas: () => PlotCanvasContextType | null;
export declare const buildPlotContext: (registerPlugin: any, canvasRef: any, data: DataFrame, u?: uPlot | undefined) => PlotContextType | null;
export {};
