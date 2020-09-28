import { __makeTemplateObject } from "tslib";
import { css } from 'emotion';
import { focusCss } from '../../themes/mixins';
export var getFocusStyle = function (theme) { return css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  &:focus {\n    ", "\n  }\n"], ["\n  &:focus {\n    ", "\n  }\n"])), focusCss(theme)); };
export var sharedInputStyle = function (theme, invalid) {
    if (invalid === void 0) { invalid = false; }
    var colors = theme.colors;
    var borderColor = invalid ? theme.palette.redBase : colors.formInputBorder;
    return css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    background-color: ", ";\n    line-height: ", ";\n    font-size: ", ";\n    color: ", ";\n    border: 1px solid ", ";\n    padding: 0 ", " 0 ", ";\n\n    &:-webkit-autofill,\n    &:-webkit-autofill:hover {\n      /* Welcome to 2005. This is a HACK to get rid od Chromes default autofill styling */\n      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0), inset 0 0 0 100px ", "!important;\n      -webkit-text-fill-color: ", " !important;\n    }\n\n    &:-webkit-autofill:focus {\n      /* Welcome to 2005. This is a HACK to get rid od Chromes default autofill styling */\n      box-shadow: 0 0 0 2px ", ", 0 0 0px 4px ", ",\n        inset 0 0 0 1px rgba(255, 255, 255, 0), inset 0 0 0 100px ", "!important;\n      -webkit-text-fill-color: ", " !important;\n    }\n\n    &:hover {\n      border-color: ", ";\n    }\n\n    &:focus {\n      outline: none;\n    }\n\n    &:disabled {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &::placeholder {\n      color: ", ";\n      opacity: 1;\n    }\n  "], ["\n    background-color: ", ";\n    line-height: ", ";\n    font-size: ", ";\n    color: ", ";\n    border: 1px solid ", ";\n    padding: 0 ", " 0 ", ";\n\n    &:-webkit-autofill,\n    &:-webkit-autofill:hover {\n      /* Welcome to 2005. This is a HACK to get rid od Chromes default autofill styling */\n      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0), inset 0 0 0 100px ", "!important;\n      -webkit-text-fill-color: ", " !important;\n    }\n\n    &:-webkit-autofill:focus {\n      /* Welcome to 2005. This is a HACK to get rid od Chromes default autofill styling */\n      box-shadow: 0 0 0 2px ", ", 0 0 0px 4px ", ",\n        inset 0 0 0 1px rgba(255, 255, 255, 0), inset 0 0 0 100px ", "!important;\n      -webkit-text-fill-color: ", " !important;\n    }\n\n    &:hover {\n      border-color: ", ";\n    }\n\n    &:focus {\n      outline: none;\n    }\n\n    &:disabled {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &::placeholder {\n      color: ", ";\n      opacity: 1;\n    }\n  "])), colors.formInputBg, theme.typography.lineHeight.md, theme.typography.size.md, colors.formInputText, borderColor, theme.spacing.sm, theme.spacing.sm, colors.formInputBg, colors.formInputText, theme.colors.bodyBg, theme.colors.formFocusOutline, colors.formInputBg, colors.formInputText, borderColor, colors.formInputBgDisabled, colors.formInputDisabledText, colors.formInputPlaceholderText);
};
export var inputSizes = function () {
    return {
        sm: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      width: ", ";\n    "], ["\n      width: ", ";\n    "])), inputSizesPixels('sm')),
        md: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      width: ", ";\n    "], ["\n      width: ", ";\n    "])), inputSizesPixels('md')),
        lg: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      width: ", ";\n    "], ["\n      width: ", ";\n    "])), inputSizesPixels('lg')),
        auto: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      width: ", ";\n    "], ["\n      width: ", ";\n    "])), inputSizesPixels('auto')),
    };
};
export var inputSizesPixels = function (size) {
    switch (size) {
        case 'sm':
            return '200px';
        case 'md':
            return '320px';
        case 'lg':
            return '580px';
        case 'auto':
        default:
            return 'auto';
    }
};
export var getPropertiesForButtonSize = function (props) {
    var hasText = props.hasText, hasIcon = props.hasIcon, size = props.size;
    var _a = props.theme, spacing = _a.spacing, typography = _a.typography, height = _a.height;
    switch (size) {
        case 'sm':
            return {
                padding: "0 " + spacing.sm,
                fontSize: typography.size.sm,
                height: height.sm,
            };
        case 'lg':
            return {
                padding: "0 " + (hasText ? spacing.lg : spacing.md) + " 0 " + (hasIcon ? spacing.md : spacing.lg),
                fontSize: typography.size.lg,
                height: height.lg,
            };
        case 'md':
        default:
            return {
                padding: "0 " + (hasText ? spacing.md : spacing.sm) + " 0 " + (hasIcon ? spacing.sm : spacing.md),
                fontSize: typography.size.md,
                height: height.md,
            };
    }
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=commonStyles.js.map