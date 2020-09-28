import { __makeTemplateObject } from "tslib";
import React, { useRef } from 'react';
import { css, cx } from 'emotion';
import useClickAway from 'react-use/lib/useClickAway';
import { Select } from '../Forms/Legacy/Select/Select';
export function SegmentSelect(_a) {
    var value = _a.value, _b = _a.options, options = _b === void 0 ? [] : _b, onChange = _a.onChange, onClickOutside = _a.onClickOutside, width = _a.width, _c = _a.noOptionsMessage, noOptionsMessage = _c === void 0 ? '' : _c, _d = _a.allowCustomValue, allowCustomValue = _d === void 0 ? false : _d;
    var ref = useRef(null);
    useClickAway(ref, function () {
        if (ref && ref.current) {
            // https://github.com/JedWatson/react-select/issues/188#issuecomment-279240292
            // Unfortunately there's no other way of retrieving the (not yet) created new option
            var input = ref.current.querySelector('input[id^="react-select-"]');
            if (input && input.value) {
                onChange({ value: input.value, label: input.value });
            }
            else {
                onClickOutside();
            }
        }
    });
    return (React.createElement("div", { ref: ref },
        React.createElement(Select, { className: cx(css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            width: ", "px;\n          "], ["\n            width: ", "px;\n          "])), width > 120 ? width : 120)), noOptionsMessage: function () { return noOptionsMessage; }, placeholder: "", autoFocus: true, isOpen: true, onChange: onChange, options: options, value: value, allowCustomValue: allowCustomValue })));
}
var templateObject_1;
//# sourceMappingURL=SegmentSelect.js.map