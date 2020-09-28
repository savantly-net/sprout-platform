import { PlotPlugin } from './types';
export declare const usePlotPlugins: () => {
    arePluginsReady: boolean;
    plugins: Record<string, PlotPlugin>;
    registerPlugin: (plugin: PlotPlugin) => () => void;
};
