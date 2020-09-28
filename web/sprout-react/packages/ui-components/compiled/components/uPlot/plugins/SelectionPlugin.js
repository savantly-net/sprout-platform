import { __read } from "tslib";
import { useState, useEffect, useCallback } from 'react';
import { usePlotCanvas, usePlotPluginContext } from '../context';
import { pluginLog } from '../utils';
export var SelectionPlugin = function (_a) {
    var onSelect = _a.onSelect, onDismiss = _a.onDismiss, lazy = _a.lazy, id = _a.id, children = _a.children;
    var pluginId = "SelectionPlugin:" + id;
    var pluginsApi = usePlotPluginContext();
    var canvas = usePlotCanvas();
    var _b = __read(useState(null), 2), selection = _b[0], setSelection = _b[1];
    //
    useEffect(function () {
        if (!lazy && selection) {
            pluginLog(pluginId, false, 'selected', selection);
            onSelect(selection);
        }
    }, [selection]);
    var clearSelection = useCallback(function () {
        setSelection(null);
    }, [setSelection]);
    useEffect(function () {
        pluginsApi.registerPlugin({
            id: pluginId,
            hooks: {
                setSelect: function (u) {
                    var min = u.posToVal(u.select.left, 'x');
                    var max = u.posToVal(u.select.left + u.select.width, 'x');
                    setSelection({
                        min: min,
                        max: max,
                        bbox: {
                            left: u.bbox.left / window.devicePixelRatio + u.select.left,
                            top: u.bbox.top / window.devicePixelRatio,
                            height: u.bbox.height / window.devicePixelRatio,
                            width: u.select.width,
                        },
                    });
                },
            },
        });
        return function () {
            if (onDismiss) {
                onDismiss();
            }
        };
    }, []);
    if (!children || !canvas || !selection) {
        return null;
    }
    return children({
        selection: selection,
        clearSelection: clearSelection,
    });
};
//# sourceMappingURL=SelectionPlugin.js.map