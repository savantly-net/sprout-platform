import uPlot from 'uplot';
export declare function renderPlugin({ spikes, outerRadius, innerRadius }?: {
    spikes?: number | undefined;
    outerRadius?: number | undefined;
    innerRadius?: number | undefined;
}): {
    opts: (u: uPlot, opts: uPlot.Options) => void;
    hooks: {};
};
