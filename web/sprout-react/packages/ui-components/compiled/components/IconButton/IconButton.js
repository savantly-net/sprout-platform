import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { Icon, getSvgSize } from '../Icon/Icon';
import { stylesFactory } from '../../themes/stylesFactory';
import { css, cx } from 'emotion';
import { useTheme } from '../../themes/ThemeContext';
import { Tooltip } from '../Tooltip/Tooltip';
export var IconButton = React.forwardRef(function (_a, ref) {
    var name = _a.name, _b = _a.size, size = _b === void 0 ? 'md' : _b, _c = _a.surface, surface = _c === void 0 ? 'panel' : _c, iconType = _a.iconType, tooltip = _a.tooltip, tooltipPlacement = _a.tooltipPlacement, className = _a.className, restProps = __rest(_a, ["name", "size", "surface", "iconType", "tooltip", "tooltipPlacement", "className"]);
    var theme = useTheme();
    var styles = getStyles(theme, surface, size);
    var button = (React.createElement("button", __assign({ ref: ref }, restProps, { className: cx(styles.button, className) }),
        React.createElement(Icon, { name: name, size: size, className: styles.icon, type: iconType })));
    if (tooltip) {
        return (React.createElement(Tooltip, { content: tooltip, placement: tooltipPlacement }, button));
    }
    return button;
});
IconButton.displayName = 'IconButton';
function getHoverColor(theme, surface) {
    switch (surface) {
        case 'dashboard':
            return theme.isLight ? theme.palette.gray95 : theme.palette.gray15;
        case 'panel':
            return theme.isLight ? theme.palette.gray6 : theme.palette.gray15;
        case 'header':
            return theme.isLight ? theme.colors.bg3 : theme.palette.gray25;
    }
}
var getStyles = stylesFactory(function (theme, surface, size) {
    var hoverColor = getHoverColor(theme, surface);
    var pixelSize = getSvgSize(size);
    return {
        button: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      width: ", "px;\n      height: ", "px;\n      background: transparent;\n      border: none;\n      padding: 0;\n      margin: 0;\n      outline: none;\n      box-shadow: none;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      position: relative;\n      z-index: 0;\n      margin-right: ", ";\n\n      &[disabled],\n      &:disabled {\n        cursor: not-allowed;\n        opacity: 0.65;\n        box-shadow: none;\n      }\n\n      &:before {\n        content: '';\n        display: block;\n        opacity: 1;\n        position: absolute;\n        transition-duration: 0.2s;\n        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n        z-index: -1;\n        bottom: -8px;\n        left: -8px;\n        right: -8px;\n        top: -8px;\n        background: none;\n        border-radius: 50%;\n        box-sizing: border-box;\n        transform: scale(0);\n        transition-property: transform, opacity;\n      }\n\n      &:hover {\n        color: ", ";\n\n        &:before {\n          background-color: ", ";\n          border: none;\n          box-shadow: none;\n          opacity: 1;\n          transform: scale(0.8);\n        }\n      }\n    "], ["\n      width: ", "px;\n      height: ", "px;\n      background: transparent;\n      border: none;\n      padding: 0;\n      margin: 0;\n      outline: none;\n      box-shadow: none;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      position: relative;\n      z-index: 0;\n      margin-right: ", ";\n\n      &[disabled],\n      &:disabled {\n        cursor: not-allowed;\n        opacity: 0.65;\n        box-shadow: none;\n      }\n\n      &:before {\n        content: '';\n        display: block;\n        opacity: 1;\n        position: absolute;\n        transition-duration: 0.2s;\n        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n        z-index: -1;\n        bottom: -8px;\n        left: -8px;\n        right: -8px;\n        top: -8px;\n        background: none;\n        border-radius: 50%;\n        box-sizing: border-box;\n        transform: scale(0);\n        transition-property: transform, opacity;\n      }\n\n      &:hover {\n        color: ", ";\n\n        &:before {\n          background-color: ", ";\n          border: none;\n          box-shadow: none;\n          opacity: 1;\n          transform: scale(0.8);\n        }\n      }\n    "])), pixelSize, pixelSize, theme.spacing.xs, theme.colors.linkHover, hoverColor),
        icon: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      margin-bottom: 0;\n      vertical-align: baseline;\n      display: flex;\n    "], ["\n      margin-bottom: 0;\n      vertical-align: baseline;\n      display: flex;\n    "]))),
    };
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=IconButton.js.map