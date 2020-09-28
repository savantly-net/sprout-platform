import { __assign, __makeTemplateObject, __rest } from "tslib";
import React, { useContext } from 'react';
import { css, cx } from 'emotion';
import tinycolor from 'tinycolor2';
import { stylesFactory, ThemeContext } from '../../themes';
import { getFocusStyle, getPropertiesForButtonSize } from '../Forms/commonStyles';
import { ButtonContent } from './ButtonContent';
var buttonVariantStyles = function (from, to, textColor) { return css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: linear-gradient(180deg, ", " 0%, ", " 100%);\n  color: ", ";\n  &:hover {\n    background: ", ";\n    color: ", ";\n  }\n\n  &:focus {\n    background: ", ";\n    outline: none;\n  }\n"], ["\n  background: linear-gradient(180deg, ", " 0%, ", " 100%);\n  color: ", ";\n  &:hover {\n    background: ", ";\n    color: ", ";\n  }\n\n  &:focus {\n    background: ", ";\n    outline: none;\n  }\n"])), from, to, textColor, from, textColor, from); };
var getPropertiesForVariant = function (theme, variant) {
    switch (variant) {
        case 'secondary':
            var from = theme.isLight ? theme.palette.gray7 : theme.palette.gray15;
            var to = theme.isLight
                ? tinycolor(from)
                    .darken(5)
                    .toString()
                : tinycolor(from)
                    .lighten(4)
                    .toString();
            return {
                borderColor: theme.isLight ? theme.palette.gray85 : theme.palette.gray25,
                background: buttonVariantStyles(from, to, theme.isLight ? theme.palette.gray25 : theme.palette.gray4),
            };
        case 'destructive':
            return {
                borderColor: theme.palette.redShade,
                background: buttonVariantStyles(theme.palette.redBase, theme.palette.redShade, theme.palette.white),
            };
        case 'link':
            return {
                borderColor: 'transparent',
                background: buttonVariantStyles('transparent', 'transparent', theme.colors.linkExternal),
                variantStyles: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          &:focus {\n            outline: none;\n            box-shadow: none;\n          }\n        "], ["\n          &:focus {\n            outline: none;\n            box-shadow: none;\n          }\n        "]))),
            };
        case 'primary':
        default:
            return {
                borderColor: theme.colors.bgBlue1,
                background: buttonVariantStyles(theme.colors.bgBlue1, theme.colors.bgBlue2, theme.palette.white),
            };
    }
};
var disabledStyles = css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  cursor: not-allowed;\n  opacity: 0.65;\n  box-shadow: none;\n"], ["\n  cursor: not-allowed;\n  opacity: 0.65;\n  box-shadow: none;\n"])));
export var getButtonStyles = stylesFactory(function (props) {
    var theme = props.theme, variant = props.variant;
    var _a = getPropertiesForButtonSize(props), padding = _a.padding, fontSize = _a.fontSize, height = _a.height;
    var _b = getPropertiesForVariant(theme, variant), background = _b.background, borderColor = _b.borderColor, variantStyles = _b.variantStyles;
    return {
        button: cx(css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        label: button;\n        display: inline-flex;\n        align-items: center;\n        font-weight: ", ";\n        font-family: ", ";\n        font-size: ", ";\n        padding: ", ";\n        height: ", "px;\n        // Deduct border from line-height for perfect vertical centering on windows and linux\n        line-height: ", "px;\n        vertical-align: middle;\n        cursor: pointer;\n        border: 1px solid ", ";\n        border-radius: ", ";\n        ", ";\n\n        &[disabled],\n        &:disabled {\n          ", ";\n        }\n      "], ["\n        label: button;\n        display: inline-flex;\n        align-items: center;\n        font-weight: ", ";\n        font-family: ", ";\n        font-size: ", ";\n        padding: ", ";\n        height: ", "px;\n        // Deduct border from line-height for perfect vertical centering on windows and linux\n        line-height: ", "px;\n        vertical-align: middle;\n        cursor: pointer;\n        border: 1px solid ", ";\n        border-radius: ", ";\n        ", ";\n\n        &[disabled],\n        &:disabled {\n          ", ";\n        }\n      "])), theme.typography.weight.semibold, theme.typography.fontFamily.sansSerif, fontSize, padding, height, height - 2, borderColor, theme.border.radius.sm, background, disabledStyles), getFocusStyle(theme), css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        ", "\n      "], ["\n        ", "\n      "])), variantStyles)),
        // used for buttons with icon only
        iconButton: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      padding-right: 0;\n    "], ["\n      padding-right: 0;\n    "]))),
        iconWrap: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      label: button-icon-wrap;\n      & + * {\n        margin-left: ", ";\n      }\n    "], ["\n      label: button-icon-wrap;\n      & + * {\n        margin-left: ", ";\n      }\n    "])), theme.spacing.sm),
    };
});
export var Button = React.forwardRef(function (_a, ref) {
    var variant = _a.variant, icon = _a.icon, children = _a.children, className = _a.className, otherProps = __rest(_a, ["variant", "icon", "children", "className"]);
    var theme = useContext(ThemeContext);
    var styles = getButtonStyles({
        theme: theme,
        size: otherProps.size || 'md',
        variant: variant || 'primary',
        hasText: children !== undefined,
        hasIcon: icon !== undefined,
    });
    return (React.createElement("button", __assign({ className: cx(styles.button, className) }, otherProps, { ref: ref }),
        React.createElement(ButtonContent, { icon: icon, size: otherProps.size }, children)));
});
Button.displayName = 'Button';
export var LinkButton = React.forwardRef(function (_a, ref) {
    var variant = _a.variant, icon = _a.icon, children = _a.children, className = _a.className, disabled = _a.disabled, otherProps = __rest(_a, ["variant", "icon", "children", "className", "disabled"]);
    var theme = useContext(ThemeContext);
    var styles = getButtonStyles({
        theme: theme,
        size: otherProps.size || 'md',
        variant: variant || 'primary',
        hasText: children !== undefined,
        hasIcon: icon !== undefined,
    });
    var linkButtonStyles = disabled &&
        cx(disabledStyles, css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n          pointer-events: none;\n        "], ["\n          pointer-events: none;\n        "]))));
    return (React.createElement("a", __assign({ className: cx(styles.button, linkButtonStyles, className) }, otherProps, { ref: ref, tabIndex: disabled ? -1 : 0 }),
        React.createElement(ButtonContent, { icon: icon, size: otherProps.size }, children)));
});
LinkButton.displayName = 'LinkButton';
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=Button.js.map