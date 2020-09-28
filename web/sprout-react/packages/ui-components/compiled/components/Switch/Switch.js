import { __assign, __makeTemplateObject, __rest } from "tslib";
import React, { useRef } from 'react';
import { css, cx } from 'emotion';
import uniqueId from 'lodash/uniqueId';
import { deprecationWarning } from '@grafana/data';
import { stylesFactory, useTheme } from '../../themes';
import { focusCss } from '../../themes/mixins';
export var getSwitchStyles = stylesFactory(function (theme) {
    return {
        switch: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      width: 32px;\n      height: 16px;\n      position: relative;\n\n      input {\n        opacity: 0;\n        left: -100vw;\n        z-index: -1000;\n        position: absolute;\n\n        &:disabled + label {\n          background: ", ";\n          cursor: not-allowed;\n        }\n\n        &:checked + label {\n          background: ", ";\n\n          &:hover {\n            background: ", ";\n          }\n\n          &::after {\n            transform: translate3d(18px, -50%, 0);\n          }\n        }\n\n        &:focus + label {\n          ", ";\n        }\n      }\n\n      label {\n        width: 100%;\n        height: 100%;\n        cursor: pointer;\n        border: none;\n        border-radius: 50px;\n        background: ", ";\n        transition: all 0.3s ease;\n\n        &:hover {\n          background: ", ";\n        }\n\n        &::after {\n          position: absolute;\n          display: block;\n          content: '';\n          width: 12px;\n          height: 12px;\n          border-radius: 6px;\n          background: ", ";\n          top: 50%;\n          transform: translate3d(2px, -50%, 0);\n          transition: transform 0.2s cubic-bezier(0.19, 1, 0.22, 1);\n        }\n      }\n    }\n    "], ["\n      width: 32px;\n      height: 16px;\n      position: relative;\n\n      input {\n        opacity: 0;\n        left: -100vw;\n        z-index: -1000;\n        position: absolute;\n\n        &:disabled + label {\n          background: ", ";\n          cursor: not-allowed;\n        }\n\n        &:checked + label {\n          background: ", ";\n\n          &:hover {\n            background: ", ";\n          }\n\n          &::after {\n            transform: translate3d(18px, -50%, 0);\n          }\n        }\n\n        &:focus + label {\n          ", ";\n        }\n      }\n\n      label {\n        width: 100%;\n        height: 100%;\n        cursor: pointer;\n        border: none;\n        border-radius: 50px;\n        background: ", ";\n        transition: all 0.3s ease;\n\n        &:hover {\n          background: ", ";\n        }\n\n        &::after {\n          position: absolute;\n          display: block;\n          content: '';\n          width: 12px;\n          height: 12px;\n          border-radius: 6px;\n          background: ", ";\n          top: 50%;\n          transform: translate3d(2px, -50%, 0);\n          transition: transform 0.2s cubic-bezier(0.19, 1, 0.22, 1);\n        }\n      }\n    }\n    "])), theme.colors.formSwitchBgDisabled, theme.colors.formSwitchBgActive, theme.colors.formSwitchBgActiveHover, focusCss(theme), theme.colors.formSwitchBg, theme.colors.formSwitchBgHover, theme.colors.formSwitchDot),
    };
});
export var Switch = React.forwardRef(function (_a, ref) {
    var value = _a.value, checked = _a.checked, _b = _a.disabled, disabled = _b === void 0 ? false : _b, onChange = _a.onChange, inputProps = __rest(_a, ["value", "checked", "disabled", "onChange"]);
    if (checked) {
        deprecationWarning('Switch', 'checked prop', 'value');
    }
    var theme = useTheme();
    var styles = getSwitchStyles(theme);
    var switchIdRef = useRef(uniqueId('switch-'));
    return (React.createElement("div", { className: cx(styles.switch) },
        React.createElement("input", __assign({ type: "checkbox", disabled: disabled, checked: value, onChange: function (event) {
                onChange === null || onChange === void 0 ? void 0 : onChange(event);
            }, id: switchIdRef.current }, inputProps, { ref: ref })),
        React.createElement("label", { htmlFor: switchIdRef.current })));
});
var templateObject_1;
//# sourceMappingURL=Switch.js.map