import { __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import { css, cx } from 'emotion';
import { ThemeContext } from '../../index';
import { Icon } from '../Icon/Icon';
export var AlphaNotice = function (_a) {
    var state = _a.state, text = _a.text, className = _a.className;
    var tooltipContent = text || 'This feature is a work in progress and updates may include breaking changes';
    var theme = useContext(ThemeContext);
    var styles = cx(className, css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      background: linear-gradient(to bottom, ", ", ", ");\n      color: ", ";\n      white-space: nowrap;\n      border-radius: 3px;\n      text-shadow: none;\n      font-size: 13px;\n      padding: 4px 8px;\n      cursor: help;\n      display: inline-block;\n    "], ["\n      background: linear-gradient(to bottom, ", ", ", ");\n      color: ", ";\n      white-space: nowrap;\n      border-radius: 3px;\n      text-shadow: none;\n      font-size: 13px;\n      padding: 4px 8px;\n      cursor: help;\n      display: inline-block;\n    "])), theme.palette.blue85, theme.palette.blue77, theme.palette.gray7));
    return (React.createElement("div", { className: styles, title: tooltipContent },
        React.createElement(Icon, { name: "exclamation-triangle" }),
        " ",
        state));
};
var templateObject_1;
//# sourceMappingURL=AlphaNotice.js.map