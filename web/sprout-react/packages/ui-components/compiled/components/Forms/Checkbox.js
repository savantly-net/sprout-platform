import { __assign, __makeTemplateObject, __rest } from "tslib";
import React, { useCallback } from 'react';
import { getLabelStyles } from './Label';
import { useTheme, stylesFactory } from '../../themes';
import { css, cx } from 'emotion';
import { focusCss } from '../../themes/mixins';
export var getCheckboxStyles = stylesFactory(function (theme) {
    var labelStyles = getLabelStyles(theme);
    var checkboxSize = '16px';
    return {
        label: cx(labelStyles.label, css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        padding-left: ", "px;\n        white-space: nowrap;\n      "], ["\n        padding-left: ", "px;\n        white-space: nowrap;\n      "])), theme.spacing.formSpacingBase)),
        description: cx(labelStyles.description, css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        padding-left: ", "px;\n      "], ["\n        padding-left: ", "px;\n      "])), theme.spacing.formSpacingBase)),
        wrapper: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      position: relative;\n      padding-left: ", ";\n      vertical-align: middle;\n    "], ["\n      position: relative;\n      padding-left: ", ";\n      vertical-align: middle;\n    "])), checkboxSize),
        input: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      opacity: 0;\n      &:focus + span {\n        ", "\n      }\n\n      /**\n       * Using adjacent sibling selector to style checked state.\n       * Primarily to limit the classes necessary to use when these classes will be used\n       * for angular components styling\n       * */\n      &:checked + span {\n        background: blue;\n        background: ", ";\n        border: none;\n\n        &:hover {\n          background: ", ";\n        }\n\n        &:after {\n          content: '';\n          position: absolute;\n          left: 5px;\n          top: 1px;\n          width: 6px;\n          height: 12px;\n          border: solid ", ";\n          border-width: 0 3px 3px 0;\n          transform: rotate(45deg);\n        }\n      }\n    "], ["\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      opacity: 0;\n      &:focus + span {\n        ", "\n      }\n\n      /**\n       * Using adjacent sibling selector to style checked state.\n       * Primarily to limit the classes necessary to use when these classes will be used\n       * for angular components styling\n       * */\n      &:checked + span {\n        background: blue;\n        background: ", ";\n        border: none;\n\n        &:hover {\n          background: ", ";\n        }\n\n        &:after {\n          content: '';\n          position: absolute;\n          left: 5px;\n          top: 1px;\n          width: 6px;\n          height: 12px;\n          border: solid ", ";\n          border-width: 0 3px 3px 0;\n          transform: rotate(45deg);\n        }\n      }\n    "])), focusCss(theme), theme.colors.formCheckboxBgChecked, theme.colors.formCheckboxBgCheckedHover, theme.colors.formCheckboxCheckmark),
        checkmark: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      display: inline-block;\n      width: ", ";\n      height: ", ";\n      border-radius: ", ";\n      margin-right: ", "px;\n      background: ", ";\n      border: 1px solid ", ";\n      position: absolute;\n      top: 2px;\n      left: 0;\n\n      &:hover {\n        cursor: pointer;\n        border-color: ", ";\n      }\n    "], ["\n      display: inline-block;\n      width: ", ";\n      height: ", ";\n      border-radius: ", ";\n      margin-right: ", "px;\n      background: ", ";\n      border: 1px solid ", ";\n      position: absolute;\n      top: 2px;\n      left: 0;\n\n      &:hover {\n        cursor: pointer;\n        border-color: ", ";\n      }\n    "])), checkboxSize, checkboxSize, theme.border.radius.sm, theme.spacing.formSpacingBase, theme.colors.formInputBg, theme.colors.formInputBorder, theme.colors.formInputBorderHover),
    };
});
export var Checkbox = React.forwardRef(function (_a, ref) {
    var label = _a.label, description = _a.description, value = _a.value, onChange = _a.onChange, disabled = _a.disabled, inputProps = __rest(_a, ["label", "description", "value", "onChange", "disabled"]);
    var theme = useTheme();
    var handleOnChange = useCallback(function (e) {
        if (onChange) {
            onChange(e);
        }
    }, [onChange]);
    var styles = getCheckboxStyles(theme);
    return (React.createElement("label", { className: styles.wrapper },
        React.createElement("input", __assign({ type: "checkbox", className: styles.input, checked: value, disabled: disabled, onChange: handleOnChange }, inputProps, { ref: ref })),
        React.createElement("span", { className: styles.checkmark }),
        label && React.createElement("span", { className: styles.label }, label),
        description && (React.createElement(React.Fragment, null,
            React.createElement("br", null),
            React.createElement("span", { className: styles.description }, description)))));
});
Checkbox.displayName = 'Checkbox';
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=Checkbox.js.map