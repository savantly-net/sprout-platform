/// <reference types="lodash" />
import { DataFrame, GrafanaTheme, RawTimeRange, TimeRange } from '@grafana/data';
import uPlot from 'uplot';
import { PlotPlugin, PlotProps } from './types';
export declare const timeFormatToTemplate: (f: string) => string;
export declare function rangeToMinMax(timeRange: RawTimeRange): [number, number];
export declare const buildSeriesConfig: (data: DataFrame, timeRange: TimeRange, theme: GrafanaTheme) => {
    series: uPlot.Series[];
    scales: Record<string, uPlot.Scale>;
    axes: uPlot.Axis[];
};
export declare const buildPlotConfig: (props: PlotProps, data: DataFrame, plugins: Record<string, PlotPlugin>, theme: GrafanaTheme) => uPlot.Options;
export declare const preparePlotData: (data: DataFrame) => uPlot.AlignedData;
/**
 * Based on two config objects indicates whether or not uPlot needs reinitialisation
 * This COULD be done based on data frames, but keeping it this way for now as a simplification
 */
export declare const shouldReinitialisePlot: (prevConfig: uPlot.Options, config: uPlot.Options) => boolean;
export declare const throttledLog: ((...t: any[]) => void) & import("lodash").Cancelable;
export declare const pluginLog: (id: string, throttle?: boolean, ...t: any[]) => void;
