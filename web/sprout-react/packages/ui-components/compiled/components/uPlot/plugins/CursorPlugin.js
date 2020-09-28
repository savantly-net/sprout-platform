import { __read } from "tslib";
import { useState, useEffect, useRef, useCallback } from 'react';
import { pluginLog } from '../utils';
import { usePlotPluginContext } from '../context';
// Exposes API for Graph cursor position
export var CursorPlugin = function (_a) {
    var id = _a.id, children = _a.children, _b = _a.capture, capture = _b === void 0 ? 'mousemove' : _b, _c = _a.lock, lock = _c === void 0 ? false : _c;
    var pluginId = "CursorPlugin:" + id;
    var plotCanvas = useRef(null);
    var plotCanvasBBox = useRef({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 });
    var pluginsApi = usePlotPluginContext();
    // state exposed to the consumers, maybe better implement as CursorPlugin?
    var _d = __read(useState(null), 2), focusedSeriesIdx = _d[0], setFocusedSeriesIdx = _d[1];
    var _e = __read(useState(null), 2), focusedPointIdx = _e[0], setFocusedPointIdx = _e[1];
    var _f = __read(useState(null), 2), coords = _f[0], setCoords = _f[1];
    var clearCoords = useCallback(function () {
        setCoords(null);
    }, [setCoords]);
    useEffect(function () {
        pluginLog(pluginId, true, "Focused series: " + focusedSeriesIdx + ", focused point: " + focusedPointIdx);
    }, [focusedPointIdx, focusedSeriesIdx]);
    useEffect(function () {
        if (plotCanvas && plotCanvas.current) {
            plotCanvasBBox.current = plotCanvas.current.getBoundingClientRect();
        }
    }, [plotCanvas.current]);
    // on mount - init plugin
    useEffect(function () {
        var onMouseCapture = function (e) {
            setCoords({
                plotCanvas: {
                    x: e.clientX - plotCanvasBBox.current.left,
                    y: e.clientY - plotCanvasBBox.current.top,
                },
                viewport: {
                    x: e.clientX,
                    y: e.clientY,
                },
            });
        };
        var unregister = pluginsApi.registerPlugin({
            id: pluginId,
            hooks: {
                init: function (u) {
                    // @ts-ignore
                    plotCanvas.current = u.root.querySelector('.u-over');
                    // @ts-ignore
                    plotCanvas.current.addEventListener(capture, onMouseCapture);
                    if (!lock) {
                        // @ts-ignore
                        plotCanvas.current.addEventListener('mouseleave', clearCoords);
                    }
                },
                setCursor: function (u) {
                    setFocusedPointIdx(u.cursor.idx === undefined ? null : u.cursor.idx);
                },
                setSeries: function (u, idx) {
                    setFocusedSeriesIdx(idx);
                },
            },
        });
        return function () {
            if (plotCanvas && plotCanvas.current) {
                plotCanvas.current.removeEventListener(capture, onMouseCapture);
            }
            unregister();
        };
    }, []);
    // only render children if we are interacting with the canvas
    return coords
        ? children({
            focusedSeriesIdx: focusedSeriesIdx,
            focusedPointIdx: focusedPointIdx,
            coords: coords,
        })
        : null;
};
//# sourceMappingURL=CursorPlugin.js.map