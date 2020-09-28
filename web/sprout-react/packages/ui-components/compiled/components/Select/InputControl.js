import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { useTheme } from '../../themes/ThemeContext';
import { sharedInputStyle } from '../Forms/commonStyles';
import { getInputStyles } from '../Input/Input';
import { css, cx } from 'emotion';
import { stylesFactory } from '../../themes';
import { focusCss } from '../../themes/mixins';
var getInputControlStyles = stylesFactory(function (theme, invalid, focused, disabled, withPrefix) {
    var styles = getInputStyles({ theme: theme, invalid: invalid });
    return {
        wrapper: cx(styles.wrapper, sharedInputStyle(theme, invalid), focused && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            ", "\n          "], ["\n            ", "\n          "])), focusCss(theme)), disabled && styles.inputDisabled, css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          min-height: 32px;\n          height: auto;\n          flex-direction: row;\n          padding-right: 0;\n          max-width: 100%;\n          align-items: center;\n          cursor: default;\n          display: flex;\n          flex-wrap: wrap;\n          justify-content: space-between;\n          position: relative;\n          box-sizing: border-box;\n        "], ["\n          min-height: 32px;\n          height: auto;\n          flex-direction: row;\n          padding-right: 0;\n          max-width: 100%;\n          align-items: center;\n          cursor: default;\n          display: flex;\n          flex-wrap: wrap;\n          justify-content: space-between;\n          position: relative;\n          box-sizing: border-box;\n        "]))), withPrefix && css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n            padding-left: 0;\n          "], ["\n            padding-left: 0;\n          "])))),
        prefix: cx(styles.prefix, css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n          position: relative;\n        "], ["\n          position: relative;\n        "])))),
    };
});
export var InputControl = React.forwardRef(function InputControl(_a, ref) {
    var focused = _a.focused, invalid = _a.invalid, disabled = _a.disabled, children = _a.children, innerProps = _a.innerProps, prefix = _a.prefix, otherProps = __rest(_a, ["focused", "invalid", "disabled", "children", "innerProps", "prefix"]);
    var theme = useTheme();
    var styles = getInputControlStyles(theme, invalid, focused, disabled, !!prefix);
    return (React.createElement("div", __assign({ className: styles.wrapper }, innerProps, { ref: ref }),
        prefix && React.createElement("div", { className: cx(styles.prefix) }, prefix),
        children));
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=InputControl.js.map