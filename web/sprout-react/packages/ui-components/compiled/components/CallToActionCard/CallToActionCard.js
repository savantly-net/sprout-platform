import { __makeTemplateObject } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
import { stylesFactory } from '../../themes';
var getCallToActionCardStyles = stylesFactory(function (theme) { return ({
    wrapper: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    label: call-to-action-card;\n    padding: ", ";\n    background: ", ";\n    border-radius: ", ";\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  "], ["\n    label: call-to-action-card;\n    padding: ", ";\n    background: ", ";\n    border-radius: ", ";\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  "])), theme.spacing.lg, theme.colors.bg2, theme.border.radius.md),
    message: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    margin-bottom: ", ";\n    font-style: italic;\n  "], ["\n    margin-bottom: ", ";\n    font-style: italic;\n  "])), theme.spacing.lg),
    footer: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    margin-top: ", ";\n  "], ["\n    margin-top: ", ";\n  "])), theme.spacing.lg),
}); });
export var CallToActionCard = function (_a) {
    var message = _a.message, callToActionElement = _a.callToActionElement, footer = _a.footer, theme = _a.theme, className = _a.className;
    var css = getCallToActionCardStyles(theme);
    return (React.createElement("div", { className: cx([css.wrapper, className]) },
        message && React.createElement("div", { className: css.message }, message),
        callToActionElement,
        footer && React.createElement("div", { className: css.footer }, footer)));
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=CallToActionCard.js.map