import { __makeTemplateObject, __read } from "tslib";
import React, { useState, useCallback, useEffect } from 'react';
import { Global, css as cssCore } from '@emotion/core';
import { usePlotPluginContext } from '../context';
import { pluginLog } from '../utils';
import { CursorPlugin } from './CursorPlugin';
// Exposes API for Graph click interactions
export var ClickPlugin = function (_a) {
    var id = _a.id, onClick = _a.onClick, children = _a.children;
    var pluginId = "ClickPlugin:" + id;
    var pluginsApi = usePlotPluginContext();
    var _b = __read(useState(null), 2), point = _b[0], setPoint = _b[1];
    var clearSelection = useCallback(function () {
        pluginLog(pluginId, false, 'clearing click selection');
        setPoint(null);
    }, [setPoint]);
    useEffect(function () {
        var unregister = pluginsApi.registerPlugin({
            id: pluginId,
            hooks: {
                init: function (u) {
                    pluginLog(pluginId, false, 'init');
                    // for naive click&drag check
                    var isClick = false;
                    // REF: https://github.com/leeoniya/uPlot/issues/239
                    var pts = Array.from(u.root.querySelectorAll('.u-cursor-pt'));
                    var plotCanvas = u.root.querySelector('.u-over');
                    plotCanvas.addEventListener('mousedown', function (e) {
                        isClick = true;
                    });
                    plotCanvas.addEventListener('mousemove', function (e) {
                        isClick = false;
                    });
                    // TODO: remove listeners on unmount
                    plotCanvas.addEventListener('mouseup', function (e) {
                        if (!isClick) {
                            setPoint(null);
                            return;
                        }
                        isClick = true;
                        pluginLog(pluginId, false, 'canvas click');
                        if (e.target) {
                            var target = e.target;
                            if (!target.classList.contains('u-cursor-pt')) {
                                setPoint({ seriesIdx: null, dataIdx: null });
                            }
                        }
                    });
                    if (pts.length > 0) {
                        pts.forEach(function (pt, i) {
                            // TODO: remove listeners on unmount
                            pt.addEventListener('click', function (e) {
                                var seriesIdx = i + 1;
                                var dataIdx = u.cursor.idx;
                                pluginLog(id, false, seriesIdx, dataIdx);
                                setPoint({ seriesIdx: seriesIdx, dataIdx: dataIdx || null });
                                onClick({ seriesIdx: seriesIdx, dataIdx: dataIdx || null });
                            });
                        });
                    }
                },
            },
        });
        return function () {
            unregister();
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Global, { styles: cssCore(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        .uplot .u-cursor-pt {\n          pointer-events: auto !important;\n        }\n      "], ["\n        .uplot .u-cursor-pt {\n          pointer-events: auto !important;\n        }\n      "]))) }),
        React.createElement(CursorPlugin, { id: pluginId, capture: "mousedown", lock: true }, function (_a) {
            var coords = _a.coords;
            if (!point) {
                return null;
            }
            return children({
                point: point,
                coords: coords,
                clearSelection: clearSelection,
            });
        })));
};
var templateObject_1;
//# sourceMappingURL=ClickPlugin.js.map