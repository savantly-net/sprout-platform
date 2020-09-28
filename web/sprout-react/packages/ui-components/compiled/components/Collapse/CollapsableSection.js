import { __makeTemplateObject, __read } from "tslib";
import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { useStyles } from '../../themes';
import { Icon } from '..';
export var CollapsableSection = function (_a) {
    var _b;
    var label = _a.label, isOpen = _a.isOpen, children = _a.children;
    var _c = __read(useState(isOpen), 2), open = _c[0], toggleOpen = _c[1];
    var styles = useStyles(collapsableSectionStyles);
    var headerClass = cx((_b = {},
        _b[styles.header] = true,
        _b[styles.headerCollapsed] = !open,
        _b));
    var tooltip = "Click to " + (open ? 'collapse' : 'expand');
    return (React.createElement("div", null,
        React.createElement("div", { onClick: function () { return toggleOpen(!open); }, className: headerClass, title: tooltip },
            label,
            React.createElement(Icon, { name: open ? 'angle-down' : 'angle-right', size: "xl", className: styles.icon })),
        open && React.createElement("div", { className: styles.content }, children)));
};
var collapsableSectionStyles = function (theme) {
    return {
        header: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      display: flex;\n      justify-content: space-between;\n      font-size: ", ";\n      cursor: pointer;\n    "], ["\n      display: flex;\n      justify-content: space-between;\n      font-size: ", ";\n      cursor: pointer;\n    "])), theme.typography.size.lg),
        headerCollapsed: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      border-bottom: 1px solid ", ";\n    "], ["\n      border-bottom: 1px solid ", ";\n    "])), theme.colors.border2),
        icon: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      color: ", ";\n    "], ["\n      color: ", ";\n    "])), theme.colors.textWeak),
        content: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      padding: ", " 0;\n    "], ["\n      padding: ", " 0;\n    "])), theme.spacing.md),
    };
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=CollapsableSection.js.map