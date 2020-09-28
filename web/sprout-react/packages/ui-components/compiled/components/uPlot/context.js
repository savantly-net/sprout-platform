import React, { useCallback, useContext } from 'react';
export var PlotContext = React.createContext(null);
// Exposes uPlot instance and bounding box of the entire canvas and plot area
export var usePlotContext = function () {
    return useContext(PlotContext);
};
var throwWhenNoContext = function (name) {
    throw new Error(name + " must be used within PlotContext");
};
// Exposes API for registering uPlot plugins
export var usePlotPluginContext = function () {
    var ctx = useContext(PlotContext);
    if (!ctx) {
        throwWhenNoContext('usePlotPluginContext');
    }
    return {
        registerPlugin: ctx.registerPlugin,
    };
};
export var usePlotData = function () {
    var ctx = useContext(PlotContext);
    var getField = useCallback(function (idx) {
        if (!ctx) {
            throwWhenNoContext('usePlotData');
        }
        return ctx.data.fields[idx];
    }, [ctx]);
    var getFieldConfig = useCallback(function (idx) {
        var field = getField(idx);
        return field.config;
    }, [ctx]);
    var getFieldValue = useCallback(function (fieldIdx, rowIdx) {
        var field = getField(fieldIdx);
        return field.values.get(rowIdx);
    }, [ctx]);
    var getXAxisFields = useCallback(function () {
        // by uPlot convention x-axis is always first field
        // this may change when we introduce non-time x-axis and multiple x-axes (https://leeoniya.github.io/uPlot/demos/time-periods.html)
        return [getField(0)];
    }, [ctx]);
    var getYAxisFields = useCallback(function () {
        if (!ctx) {
            throwWhenNoContext('usePlotData');
        }
        // by uPlot convention x-axis is always first field
        // this may change when we introduce non-time x-axis and multiple x-axes (https://leeoniya.github.io/uPlot/demos/time-periods.html)
        return ctx.data.fields.slice(1);
    }, [ctx]);
    if (!ctx) {
        throwWhenNoContext('usePlotData');
    }
    return {
        data: ctx.data,
        getField: getField,
        getFieldValue: getFieldValue,
        getFieldConfig: getFieldConfig,
        getXAxisFields: getXAxisFields,
        getYAxisFields: getYAxisFields,
    };
};
// Returns bbox of the plot canvas (only the graph, no axes)
export var usePlotCanvas = function () {
    var ctx = usePlotContext();
    if (!ctx) {
        throwWhenNoContext('usePlotCanvas');
    }
    return ctx.canvas || null;
};
export var buildPlotContext = function (registerPlugin, canvasRef, data, u) {
    return {
        u: u,
        series: u === null || u === void 0 ? void 0 : u.series,
        canvas: u
            ? {
                width: u.width,
                height: u.height,
                plot: {
                    width: u.bbox.width / window.devicePixelRatio,
                    height: u.bbox.height / window.devicePixelRatio,
                    top: u.bbox.top / window.devicePixelRatio,
                    left: u.bbox.left / window.devicePixelRatio,
                },
            }
            : undefined,
        registerPlugin: registerPlugin,
        canvasRef: canvasRef,
        data: data,
    };
};
//# sourceMappingURL=context.js.map