import { __makeTemplateObject } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
import { Icon } from '../Icon/Icon';
import { useTheme, stylesFactory } from '../../themes';
export var getFieldValidationMessageStyles = stylesFactory(function (theme) {
    return {
        fieldValidationMessage: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      font-size: ", ";\n      font-weight: ", ";\n      margin: ", ";\n      padding: ", ";\n      color: ", ";\n      background: ", ";\n      border-radius: ", ";\n      position: relative;\n      display: inline-block;\n\n      &:before {\n        content: '';\n        position: absolute;\n        left: 9px;\n        top: -4px;\n        width: 0;\n        height: 0;\n        border-left: 4px solid transparent;\n        border-right: 4px solid transparent;\n        border-bottom: 4px solid ", ";\n      }\n    "], ["\n      font-size: ", ";\n      font-weight: ", ";\n      margin: ", ";\n      padding: ", ";\n      color: ", ";\n      background: ", ";\n      border-radius: ", ";\n      position: relative;\n      display: inline-block;\n\n      &:before {\n        content: '';\n        position: absolute;\n        left: 9px;\n        top: -4px;\n        width: 0;\n        height: 0;\n        border-left: 4px solid transparent;\n        border-right: 4px solid transparent;\n        border-bottom: 4px solid ", ";\n      }\n    "])), theme.typography.size.sm, theme.typography.weight.semibold, theme.spacing.formValidationMessageMargin, theme.spacing.formValidationMessagePadding, theme.colors.formValidationMessageText, theme.colors.formValidationMessageBg, theme.border.radius.sm, theme.colors.formValidationMessageBg),
        fieldValidationMessageIcon: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      margin-right: ", "px;\n    "], ["\n      margin-right: ", "px;\n    "])), theme.spacing.formSpacingBase),
    };
});
export var FieldValidationMessage = function (_a) {
    var children = _a.children, className = _a.className;
    var theme = useTheme();
    var styles = getFieldValidationMessageStyles(theme);
    return (React.createElement("div", { role: "alert", className: cx(styles.fieldValidationMessage, className) },
        React.createElement(Icon, { className: styles.fieldValidationMessageIcon, name: "exclamation-triangle" }),
        children));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=FieldValidationMessage.js.map