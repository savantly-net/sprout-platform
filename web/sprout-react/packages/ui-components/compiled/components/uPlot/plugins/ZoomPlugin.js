import React from 'react';
import { SelectionPlugin } from './SelectionPlugin';
// min px width that triggers zoom
var MIN_ZOOM_DIST = 5;
export var ZoomPlugin = function (_a) {
    var onZoom = _a.onZoom;
    return (React.createElement(SelectionPlugin, { id: "Zoom", 
        /* very time series oriented for now */
        onSelect: function (selection) {
            if (selection.bbox.width < MIN_ZOOM_DIST) {
                return;
            }
            onZoom({ from: selection.min * 1000, to: selection.max * 1000 });
        } }));
};
//# sourceMappingURL=ZoomPlugin.js.map