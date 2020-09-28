import { __makeTemplateObject } from "tslib";
import React from 'react';
import { css } from 'emotion';
import { selectors } from '@grafana/e2e-selectors';
import { useTheme } from '../../themes';
import { Icon } from '../Icon/Icon';
function getIconFromSeverity(severity) {
    switch (severity) {
        case 'error':
        case 'warning':
            return 'exclamation-triangle';
        case 'info':
            return 'info-circle';
        case 'success':
            return 'check';
        default:
            return '';
    }
}
export var Alert = function (_a) {
    var title = _a.title, buttonText = _a.buttonText, onButtonClick = _a.onButtonClick, onRemove = _a.onRemove, children = _a.children, buttonContent = _a.buttonContent, _b = _a.severity, severity = _b === void 0 ? 'error' : _b;
    var theme = useTheme();
    var styles = getStyles(theme, severity, !!buttonContent);
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { className: styles.alert, "aria-label": selectors.components.Alert.alert(severity) },
            React.createElement("div", { className: styles.icon },
                React.createElement(Icon, { size: "xl", name: getIconFromSeverity(severity) })),
            React.createElement("div", { className: styles.body },
                React.createElement("div", { className: styles.title }, title),
                children && React.createElement("div", null, children)),
            onRemove ? (React.createElement("button", { type: "button", className: styles.close, onClick: onRemove }, buttonContent || React.createElement(Icon, { name: "times", size: "lg" }))) : onButtonClick ? (React.createElement("button", { type: "button", className: "btn btn-outline-danger", onClick: onButtonClick }, buttonText)) : null)));
};
var getStyles = function (theme, severity, outline) {
    var _a = theme.palette, redBase = _a.redBase, redShade = _a.redShade, greenBase = _a.greenBase, greenShade = _a.greenShade, blue80 = _a.blue80, blue77 = _a.blue77, white = _a.white;
    var backgrounds = {
        error: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      background: linear-gradient(90deg, ", ", ", ");\n    "], ["\n      background: linear-gradient(90deg, ", ", ", ");\n    "])), redBase, redShade),
        warning: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      background: linear-gradient(90deg, ", ", ", ");\n    "], ["\n      background: linear-gradient(90deg, ", ", ", ");\n    "])), redBase, redShade),
        info: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      background: linear-gradient(100deg, ", ", ", ");\n    "], ["\n      background: linear-gradient(100deg, ", ", ", ");\n    "])), blue80, blue77),
        success: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      background: linear-gradient(100deg, ", ", ", ");\n    "], ["\n      background: linear-gradient(100deg, ", ", ", ");\n    "])), greenBase, greenShade),
    };
    return {
        container: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      z-index: ", ";\n    "], ["\n      z-index: ", ";\n    "])), theme.zIndex.tooltip),
        alert: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      padding: 15px 20px;\n      margin-bottom: ", ";\n      position: relative;\n      color: ", ";\n      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);\n      border-radius: ", ";\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      ", "\n    "], ["\n      padding: 15px 20px;\n      margin-bottom: ", ";\n      position: relative;\n      color: ", ";\n      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);\n      border-radius: ", ";\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      ", "\n    "])), theme.spacing.xs, white, theme.border.radius.md, backgrounds[severity]),
        icon: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      padding: 0 ", " 0 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 35px;\n    "], ["\n      padding: 0 ", " 0 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 35px;\n    "])), theme.spacing.md),
        title: css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      font-weight: ", ";\n    "], ["\n      font-weight: ", ";\n    "])), theme.typography.weight.semibold),
        body: css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      flex-grow: 1;\n      margin: 0 ", " 0 0;\n\n      a {\n        color: ", ";\n        text-decoration: underline;\n      }\n    "], ["\n      flex-grow: 1;\n      margin: 0 ", " 0 0;\n\n      a {\n        color: ", ";\n        text-decoration: underline;\n      }\n    "])), theme.spacing.md, white),
        close: css(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n      background: none;\n      display: flex;\n      align-items: center;\n      border: ", ";\n      border-radius: ", ";\n    "], ["\n      background: none;\n      display: flex;\n      align-items: center;\n      border: ", ";\n      border-radius: ", ";\n    "])), outline ? "1px solid " + white : 'none', theme.border.radius.sm),
    };
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=Alert.js.map