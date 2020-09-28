import React, { useCallback } from 'react';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea/TextArea';
export var StringValueEditor = function (_a) {
    var _b, _c, _d;
    var value = _a.value, onChange = _a.onChange, item = _a.item;
    var Component = ((_b = item.settings) === null || _b === void 0 ? void 0 : _b.useTextarea) ? TextArea : Input;
    var onValueChange = useCallback(function (e) {
        var _a;
        if (e.hasOwnProperty('key')) {
            // handling keyboard event
            var evt = e;
            if (evt.key === 'Enter' && !((_a = item.settings) === null || _a === void 0 ? void 0 : _a.useTextarea)) {
                onChange(evt.currentTarget.value.trim() === '' ? undefined : evt.currentTarget.value);
            }
        }
        else {
            // handling form event
            var evt = e;
            onChange(evt.currentTarget.value.trim() === '' ? undefined : evt.currentTarget.value);
        }
    }, [onChange]);
    return (React.createElement(Component, { placeholder: (_c = item.settings) === null || _c === void 0 ? void 0 : _c.placeholder, defaultValue: value || '', rows: (((_d = item.settings) === null || _d === void 0 ? void 0 : _d.useTextarea) && item.settings.rows) || 5, onBlur: onValueChange, onKeyDown: onValueChange }));
};
//# sourceMappingURL=string.js.map