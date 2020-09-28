import { __read } from "tslib";
import React, { useState } from 'react';
import { Button } from '../Button';
import { Select } from '../Select/Select';
import { FullWidthButtonContainer } from '../Button/FullWidthButtonContainer';
import { selectors } from '@grafana/e2e-selectors';
export function ValuePicker(_a) {
    var label = _a.label, icon = _a.icon, options = _a.options, onChange = _a.onChange, variant = _a.variant, _b = _a.size, size = _b === void 0 ? 'sm' : _b, _c = _a.isFullWidth, isFullWidth = _c === void 0 ? true : _c, menuPlacement = _a.menuPlacement;
    var _d = __read(useState(false), 2), isPicking = _d[0], setIsPicking = _d[1];
    var buttonEl = (React.createElement(Button, { size: size || 'sm', icon: icon || 'plus', onClick: function () { return setIsPicking(true); }, variant: variant }, label));
    return (React.createElement(React.Fragment, null,
        !isPicking && (isFullWidth ? React.createElement(FullWidthButtonContainer, null, buttonEl) : buttonEl),
        isPicking && (React.createElement("span", { "aria-label": selectors.components.ValuePicker.select(label) },
            React.createElement(Select, { placeholder: label, options: options, isOpen: true, onCloseMenu: function () { return setIsPicking(false); }, autoFocus: true, onChange: function (value) {
                    setIsPicking(false);
                    onChange(value);
                }, menuPlacement: menuPlacement })))));
}
//# sourceMappingURL=ValuePicker.js.map