import { __makeTemplateObject } from "tslib";
import React from 'react';
import { useTheme, stylesFactory } from '../../../themes';
import { css, cx } from 'emotion';
import { getPropertiesForButtonSize } from '../commonStyles';
import { focusCss } from '../../../themes/mixins';
var getRadioButtonStyles = stylesFactory(function (theme, size, fullWidth) {
    var _a = getPropertiesForButtonSize({
        theme: theme,
        size: size,
        hasIcon: false,
        hasText: true,
        variant: 'secondary',
    }), fontSize = _a.fontSize, height = _a.height, padding = _a.padding;
    var c = theme.palette;
    var textColor = theme.colors.textSemiWeak;
    var textColorHover = theme.colors.text;
    var textColorActive = theme.colors.textBlue;
    var borderColor = theme.colors.border2;
    var borderColorHover = theme.colors.border3;
    var borderColorActive = theme.colors.border2;
    var bg = theme.colors.bodyBg;
    var bgDisabled = theme.isLight ? c.gray95 : c.gray15;
    var bgActive = theme.colors.bg2;
    var border = "1px solid " + borderColor;
    var borderActive = "1px solid " + borderColorActive;
    var borderHover = "1px solid " + borderColorHover;
    return {
        radio: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      position: absolute;\n      opacity: 0;\n      z-index: -1000;\n\n      &:checked + label {\n        border: ", ";\n        color: ", ";\n        background: ", ";\n        z-index: 3;\n      }\n\n      &:focus + label {\n        ", ";\n        z-index: 3;\n      }\n\n      &:disabled + label {\n        cursor: default;\n        background: ", ";\n        color: ", ";\n      }\n    "], ["\n      position: absolute;\n      opacity: 0;\n      z-index: -1000;\n\n      &:checked + label {\n        border: ", ";\n        color: ", ";\n        background: ", ";\n        z-index: 3;\n      }\n\n      &:focus + label {\n        ", ";\n        z-index: 3;\n      }\n\n      &:disabled + label {\n        cursor: default;\n        background: ", ";\n        color: ", ";\n      }\n    "])), borderActive, textColorActive, bgActive, focusCss(theme), bgDisabled, textColor),
        radioLabel: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      display: inline-block;\n      position: relative;\n      font-size: ", ";\n      height: ", "px;\n      // Deduct border from line-height for perfect vertical centering on windows and linux\n      line-height: ", "px;\n      color: ", ";\n      padding: ", ";\n      margin-left: -1px;\n      border-radius: ", ";\n      border: ", ";\n      background: ", ";\n      cursor: pointer;\n      z-index: 1;\n      flex-grow: ", ";\n      text-align: center;\n\n      user-select: none;\n\n      &:hover {\n        color: ", ";\n        border: ", ";\n        z-index: 2;\n      }\n    "], ["\n      display: inline-block;\n      position: relative;\n      font-size: ", ";\n      height: ", "px;\n      // Deduct border from line-height for perfect vertical centering on windows and linux\n      line-height: ", "px;\n      color: ", ";\n      padding: ", ";\n      margin-left: -1px;\n      border-radius: ", ";\n      border: ", ";\n      background: ", ";\n      cursor: pointer;\n      z-index: 1;\n      flex-grow: ", ";\n      text-align: center;\n\n      user-select: none;\n\n      &:hover {\n        color: ", ";\n        border: ", ";\n        z-index: 2;\n      }\n    "])), fontSize, height, height - 2, textColor, padding, theme.border.radius.sm, border, bg, fullWidth ? 1 : 0, textColorHover, borderHover),
    };
});
export var RadioButton = function (_a) {
    var children = _a.children, _b = _a.active, active = _b === void 0 ? false : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.size, size = _d === void 0 ? 'md' : _d, onChange = _a.onChange, id = _a.id, _e = _a.name, name = _e === void 0 ? undefined : _e, fullWidth = _a.fullWidth;
    var theme = useTheme();
    var styles = getRadioButtonStyles(theme, size, fullWidth);
    return (React.createElement(React.Fragment, null,
        React.createElement("input", { type: "radio", className: cx(styles.radio), onChange: onChange, disabled: disabled, id: id, checked: active, name: name }),
        React.createElement("label", { className: cx(styles.radioLabel), htmlFor: id }, children)));
};
RadioButton.displayName = 'RadioButton';
var templateObject_1, templateObject_2;
//# sourceMappingURL=RadioButton.js.map