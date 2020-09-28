import { __makeTemplateObject, __read } from "tslib";
import React, { useState, useCallback, useRef } from 'react';
import { ClickPlugin } from './ClickPlugin';
import { Portal } from '../../Portal/Portal';
import { css } from 'emotion';
import useClickAway from 'react-use/lib/useClickAway';
export var ContextMenuPlugin = function (_a) {
    var onClose = _a.onClose;
    var _b = __read(useState(false), 2), isOpen = _b[0], setIsOpen = _b[1];
    var onClick = useCallback(function () {
        setIsOpen(!isOpen);
    }, [setIsOpen]);
    return (React.createElement(ClickPlugin, { id: "ContextMenu", onClick: onClick }, function (_a) {
        var point = _a.point, coords = _a.coords, clearSelection = _a.clearSelection;
        return (React.createElement(Portal, null,
            React.createElement(ContextMenu, { selection: { point: point, coords: coords }, onClose: function () {
                    clearSelection();
                    if (onClose) {
                        onClose();
                    }
                } })));
    }));
};
var ContextMenu = function (_a) {
    var onClose = _a.onClose, selection = _a.selection;
    var ref = useRef(null);
    useClickAway(ref, function () {
        if (onClose) {
            onClose();
        }
    });
    return (React.createElement("div", { ref: ref, className: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        background: yellow;\n        position: absolute;\n        // rendering in Portal, hence using viewport coords\n        top: ", "px;\n        left: ", "px;\n      "], ["\n        background: yellow;\n        position: absolute;\n        // rendering in Portal, hence using viewport coords\n        top: ", "px;\n        left: ", "px;\n      "])), selection.coords.viewport.y + 10, selection.coords.viewport.x + 10) },
        "Point: ",
        JSON.stringify(selection.point),
        " ",
        React.createElement("br", null),
        "Viewport coords: ",
        JSON.stringify(selection.coords.viewport)));
};
var templateObject_1;
//# sourceMappingURL=ContextMenuPlugin.js.map