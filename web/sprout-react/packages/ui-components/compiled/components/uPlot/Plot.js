import { __makeTemplateObject, __read } from "tslib";
import 'uplot/dist/uPlot.min.css';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { css } from 'emotion';
import uPlot from 'uplot';
import { useTheme } from '../../themes';
import { buildPlotContext, PlotContext } from './context';
import { buildPlotConfig, pluginLog, preparePlotData, shouldReinitialisePlot } from './utils';
import { usePlotPlugins } from './hooks';
// uPlot abstraction responsible for plot initialisation, setup and refresh
// Receives a data frame that is x-axis aligned, as of https://github.com/leeoniya/uPlot/tree/master/docs#data-format
// Exposes contexts for plugins registration and uPlot instance access
export var UPlotChart = function (props) {
    var theme = useTheme();
    var canvasRef = useRef(null);
    // instance of uPlot, exposed via PlotContext
    var _a = __read(useState(), 2), plotInstance = _a[0], setPlotInstance = _a[1];
    // Array with current plot data points, calculated when data frame is passed to a plot
    // const [plotData, setPlotData] = useState<uPlot.AlignedData>();
    // uPlot config
    var _b = __read(useState(), 2), currentPlotConfig = _b[0], setCurrentPlotConfig = _b[1];
    // uPlot plugins API hook
    var _c = usePlotPlugins(), arePluginsReady = _c.arePluginsReady, plugins = _c.plugins, registerPlugin = _c.registerPlugin;
    // Main function initialising uPlot. If final config is not settled it will do nothing
    // Will destroy existing uPlot instance
    var initPlot = useCallback(function () {
        if (!currentPlotConfig || !(canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current)) {
            return;
        }
        if (plotInstance) {
            pluginLog('uPlot core', false, 'destroying existing instance due to reinitialisation');
            plotInstance.destroy();
        }
        var data = preparePlotData(props.data);
        pluginLog('uPlot core', false, 'initialized with', data, currentPlotConfig);
        setPlotInstance(new uPlot(currentPlotConfig, data, canvasRef.current));
    }, [props, currentPlotConfig, arePluginsReady, canvasRef.current, plotInstance]);
    var hasConfigChanged = useCallback(function () {
        var config = buildPlotConfig(props, props.data, plugins, theme);
        if (!currentPlotConfig) {
            return false;
        }
        return shouldReinitialisePlot(currentPlotConfig, config);
    }, [props, props.data, currentPlotConfig]);
    // Initialise uPlot when config changes
    useEffect(function () {
        if (!currentPlotConfig) {
            return;
        }
        initPlot();
    }, [currentPlotConfig]);
    // Destroy uPlot on when components unmounts
    useEffect(function () {
        return function () {
            if (plotInstance) {
                pluginLog('uPlot core', false, 'destroying existing instance due to unmount');
                plotInstance.destroy();
            }
        };
    }, [plotInstance]);
    // Effect performed when all plugins have registered. Final config is set triggering plot initialisation
    useEffect(function () {
        if (!canvasRef) {
            throw new Error('Cannot render graph without canvas! Render Canvas as a child of Plot component.');
        }
        if (!arePluginsReady) {
            return;
        }
        if (canvasRef.current) {
            setCurrentPlotConfig(buildPlotConfig(props, props.data, plugins, theme));
        }
        return function () {
            if (plotInstance) {
                console.log('uPlot - destroy instance, unmount');
                plotInstance.destroy();
            }
        };
    }, [arePluginsReady]);
    // When data changes try to be clever about config updates, needs some more love
    useEffect(function () {
        var data = preparePlotData(props.data);
        var config = buildPlotConfig(props, props.data, plugins, theme);
        // See if series configs changes, re-initialise if necessary
        // this is a minimal check, need to update for field config cleverness ;)
        if (hasConfigChanged()) {
            setCurrentPlotConfig(config); // will trigger uPlot reinitialisation
            return;
        }
        else {
            pluginLog('uPlot core', true, 'updating plot data(throttled log!)');
            // If config hasn't changed just update uPlot's data
            plotInstance === null || plotInstance === void 0 ? void 0 : plotInstance.setData(data);
        }
    }, [props.data, props.timeRange]);
    // When size props changed update plot size synchronously
    useLayoutEffect(function () {
        if (plotInstance) {
            plotInstance.setSize({
                width: props.width,
                height: props.height,
            });
        }
    }, [plotInstance, props.width, props.height]);
    // Memoize plot context
    var plotCtx = useMemo(function () {
        return buildPlotContext(registerPlugin, canvasRef, props.data, plotInstance);
    }, [registerPlugin, canvasRef, props.data, plotInstance]);
    return (React.createElement(PlotContext.Provider, { value: plotCtx },
        React.createElement("div", { className: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          position: relative;\n          width: ", "px;\n          height: ", "px;\n        "], ["\n          position: relative;\n          width: ", "px;\n          height: ", "px;\n        "])), props.width, props.height) }, props.children)));
};
var templateObject_1;
//# sourceMappingURL=Plot.js.map