import { __makeTemplateObject } from "tslib";
import React, { useCallback, useRef } from 'react';
import { css } from 'emotion';
import uniqueId from 'lodash/uniqueId';
import { RadioButton } from './RadioButton';
import { Icon } from '../../Icon/Icon';
var getRadioButtonGroupStyles = function () {
    return {
        wrapper: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      display: flex;\n      flex-direction: row;\n      flex-wrap: nowrap;\n      position: relative;\n    "], ["\n      display: flex;\n      flex-direction: row;\n      flex-wrap: nowrap;\n      position: relative;\n    "]))),
        radioGroup: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      display: flex;\n      flex-direction: row;\n      flex-wrap: nowrap;\n\n      label {\n        border-radius: 0px;\n\n        &:first-of-type {\n          border-radius: 2px 0px 0px 2px;\n        }\n\n        &:last-of-type {\n          border-radius: 0px 2px 2px 0px;\n        }\n      }\n    "], ["\n      display: flex;\n      flex-direction: row;\n      flex-wrap: nowrap;\n\n      label {\n        border-radius: 0px;\n\n        &:first-of-type {\n          border-radius: 2px 0px 0px 2px;\n        }\n\n        &:last-of-type {\n          border-radius: 0px 2px 2px 0px;\n        }\n      }\n    "]))),
        icon: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      margin-right: 6px;\n    "], ["\n      margin-right: 6px;\n    "]))),
    };
};
export function RadioButtonGroup(_a) {
    var options = _a.options, value = _a.value, onChange = _a.onChange, disabled = _a.disabled, disabledOptions = _a.disabledOptions, _b = _a.size, size = _b === void 0 ? 'md' : _b, _c = _a.fullWidth, fullWidth = _c === void 0 ? false : _c;
    var handleOnChange = useCallback(function (option) {
        return function () {
            if (onChange) {
                onChange(option.value);
            }
        };
    }, [onChange]);
    var id = uniqueId('radiogroup-');
    var groupName = useRef(id);
    var styles = getRadioButtonGroupStyles();
    return (React.createElement("div", { className: styles.radioGroup }, options.map(function (o, i) {
        var isItemDisabled = disabledOptions && o.value && disabledOptions.includes(o.value);
        return (React.createElement(RadioButton, { size: size, disabled: isItemDisabled || disabled, active: value === o.value, key: "o.label-" + i, onChange: handleOnChange(o), id: "option-" + o.value + "-" + id, name: groupName.current, fullWidth: fullWidth },
            o.icon && React.createElement(Icon, { name: o.icon, className: styles.icon }),
            o.label));
    })));
}
RadioButtonGroup.displayName = 'RadioButtonGroup';
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=RadioButtonGroup.js.map