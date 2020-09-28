import { __assign, __rest } from "tslib";
import React from 'react';
import { FormLabel } from '../FormLabel/FormLabel';
import { cx } from 'emotion';
var defaultProps = {
    labelWidth: 6,
    inputWidth: 12,
};
/**
 * Default form field including label used in Grafana UI. Default input element is simple <input />. You can also pass
 * custom inputEl if required in which case inputWidth and inputProps are ignored.
 */
export var FormField = function (_a) {
    var label = _a.label, tooltip = _a.tooltip, labelWidth = _a.labelWidth, inputWidth = _a.inputWidth, inputEl = _a.inputEl, className = _a.className, inputProps = __rest(_a, ["label", "tooltip", "labelWidth", "inputWidth", "inputEl", "className"]);
    return (React.createElement("div", { className: cx('form-field', className) },
        React.createElement(FormLabel, { width: labelWidth, tooltip: tooltip }, label),
        inputEl || (React.createElement("input", __assign({ type: "text", className: "gf-form-input " + (inputWidth ? "width-" + inputWidth : '') }, inputProps)))));
};
FormField.displayName = 'FormField';
FormField.defaultProps = defaultProps;
//# sourceMappingURL=FormField.js.map