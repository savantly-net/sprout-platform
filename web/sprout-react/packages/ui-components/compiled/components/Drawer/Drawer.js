import { __makeTemplateObject, __read } from "tslib";
import React, { useState } from 'react';
import RcDrawer from 'rc-drawer';
import { css } from 'emotion';
import { selectors } from '@grafana/e2e-selectors';
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar';
import { IconButton } from '../IconButton/IconButton';
import { stylesFactory, useTheme } from '../../themes';
var getStyles = stylesFactory(function (theme, scrollableContent) {
    return {
        drawer: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      .drawer-content {\n        background-color: ", ";\n        display: flex;\n        flex-direction: column;\n        overflow: hidden;\n      }\n      z-index: ", ";\n    "], ["\n      .drawer-content {\n        background-color: ", ";\n        display: flex;\n        flex-direction: column;\n        overflow: hidden;\n      }\n      z-index: ", ";\n    "])), theme.colors.bodyBg, theme.zIndex.dropdown),
        header: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      background-color: ", ";\n      z-index: 1;\n      flex-grow: 0;\n      padding-top: ", ";\n    "], ["\n      background-color: ", ";\n      z-index: 1;\n      flex-grow: 0;\n      padding-top: ", ";\n    "])), theme.colors.bg2, theme.spacing.xs),
        actions: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      display: flex;\n      align-items: baseline;\n      justify-content: flex-end;\n    "], ["\n      display: flex;\n      align-items: baseline;\n      justify-content: flex-end;\n    "]))),
        titleWrapper: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      margin-bottom: ", ";\n      padding: 0 ", " 0 ", ";\n    "], ["\n      margin-bottom: ", ";\n      padding: 0 ", " 0 ", ";\n    "])), theme.spacing.lg, theme.spacing.sm, theme.spacing.lg),
        titleSpacing: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      margin-bottom: ", ";\n    "], ["\n      margin-bottom: ", ";\n    "])), theme.spacing.md),
        content: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      padding: ", ";\n      flex-grow: 1;\n      overflow: ", ";\n      z-index: 0;\n      height: 100%;\n    "], ["\n      padding: ", ";\n      flex-grow: 1;\n      overflow: ", ";\n      z-index: 0;\n      height: 100%;\n    "])), theme.spacing.md, !scrollableContent ? 'hidden' : 'auto'),
    };
});
export var Drawer = function (_a) {
    var children = _a.children, _b = _a.inline, inline = _b === void 0 ? false : _b, onClose = _a.onClose, _c = _a.closeOnMaskClick, closeOnMaskClick = _c === void 0 ? true : _c, _d = _a.scrollableContent, scrollableContent = _d === void 0 ? false : _d, title = _a.title, subtitle = _a.subtitle, _e = _a.width, width = _e === void 0 ? '40%' : _e, _f = _a.expandable, expandable = _f === void 0 ? false : _f;
    var theme = useTheme();
    var drawerStyles = getStyles(theme, scrollableContent);
    var _g = __read(useState(false), 2), isExpanded = _g[0], setIsExpanded = _g[1];
    var currentWidth = isExpanded ? '100%' : width;
    return (React.createElement(RcDrawer, { level: null, handler: false, open: true, onClose: onClose, maskClosable: closeOnMaskClick, placement: "right", width: currentWidth, getContainer: inline ? false : 'body', style: { position: "" + (inline && 'absolute') }, className: drawerStyles.drawer, "aria-label": typeof title === 'string'
            ? selectors.components.Drawer.General.title(title)
            : selectors.components.Drawer.General.title('no title') },
        typeof title === 'string' && (React.createElement("div", { className: drawerStyles.header },
            React.createElement("div", { className: drawerStyles.actions },
                expandable && !isExpanded && (React.createElement(IconButton, { name: "angle-left", size: "xl", onClick: function () { return setIsExpanded(true); }, surface: "header", "aria-label": selectors.components.Drawer.General.expand })),
                expandable && isExpanded && (React.createElement(IconButton, { name: "angle-right", size: "xl", onClick: function () { return setIsExpanded(false); }, surface: "header", "aria-label": selectors.components.Drawer.General.contract })),
                React.createElement(IconButton, { name: "times", size: "xl", onClick: onClose, surface: "header", "aria-label": selectors.components.Drawer.General.close })),
            React.createElement("div", { className: drawerStyles.titleWrapper },
                React.createElement("h3", null, title),
                typeof subtitle === 'string' && React.createElement("div", { className: "muted" }, subtitle),
                typeof subtitle !== 'string' && subtitle))),
        typeof title !== 'string' && title,
        React.createElement("div", { className: drawerStyles.content }, !scrollableContent ? children : React.createElement(CustomScrollbar, null, children))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=Drawer.js.map