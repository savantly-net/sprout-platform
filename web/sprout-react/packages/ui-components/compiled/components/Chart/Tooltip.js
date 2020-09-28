import { __makeTemplateObject } from "tslib";
import React from 'react';
import { css } from 'emotion';
import { Portal } from '../Portal/Portal';
import { TooltipContainer } from './TooltipContainer';
export var Tooltip = function (_a) {
    var content = _a.content, position = _a.position, offset = _a.offset;
    if (position) {
        return (React.createElement(Portal, { className: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          position: absolute;\n          top: 0;\n          left: 0;\n          pointer-events: none;\n          width: 100%;\n          height: 100%;\n        "], ["\n          position: absolute;\n          top: 0;\n          left: 0;\n          pointer-events: none;\n          width: 100%;\n          height: 100%;\n        "]))) },
            React.createElement(TooltipContainer, { position: position, offset: offset || { x: 0, y: 0 } }, content)));
    }
    return null;
};
Tooltip.displayName = 'ChartTooltip';
var templateObject_1;
//# sourceMappingURL=Tooltip.js.map