import React from 'react';
import { usePlotContext } from './context';
// Ref element to render the uPlot canvas to
// This is a required child of Plot component!
export var Canvas = function (_a) {
    var width = _a.width, height = _a.height;
    var plot = usePlotContext();
    if (!plot) {
        return null;
    }
    return React.createElement("div", { ref: plot.canvasRef });
};
Canvas.displayName = 'Canvas';
//# sourceMappingURL=Canvas.js.map