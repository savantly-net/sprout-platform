import { __makeTemplateObject, __read } from "tslib";
import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { dateTime, dateMath } from '@grafana/data';
import { useStyles } from '../../themes/ThemeContext';
import { ClickOutsideWrapper } from '../ClickOutsideWrapper/ClickOutsideWrapper';
import { Icon } from '../Icon/Icon';
import { getInputStyles } from '../Input/Input';
import { getFocusStyle } from '../Forms/commonStyles';
import { TimePickerButtonLabel } from './TimeRangePicker';
import { TimePickerContent } from './TimeRangePicker/TimePickerContent';
import { otherOptions, quickOptions } from './rangeOptions';
export var defaultTimeRange = {
    from: dateTime().subtract(6, 'hour'),
    to: dateTime(),
    raw: { from: 'now-6h', to: 'now' },
};
var isValidTimeRange = function (range) {
    return dateMath.isValid(range.from) && dateMath.isValid(range.to);
};
var noop = function () { };
export var TimeRangeInput = function (_a) {
    var value = _a.value, onChange = _a.onChange, onChangeTimeZone = _a.onChangeTimeZone, clearable = _a.clearable, _b = _a.hideTimeZone, hideTimeZone = _b === void 0 ? true : _b, _c = _a.timeZone, timeZone = _c === void 0 ? 'browser' : _c, _d = _a.placeholder, placeholder = _d === void 0 ? 'Select time range' : _d;
    var _e = __read(useState(false), 2), isOpen = _e[0], setIsOpen = _e[1];
    var styles = useStyles(getStyles);
    var onOpen = function (event) {
        event.stopPropagation();
        event.preventDefault();
        setIsOpen(!isOpen);
    };
    var onClose = function () {
        setIsOpen(false);
    };
    var onRangeChange = function (timeRange) {
        onClose();
        onChange(timeRange);
    };
    var onRangeClear = function (event) {
        event.stopPropagation();
        var from = dateTime(null);
        var to = dateTime(null);
        onChange({ from: from, to: to, raw: { from: from, to: to } });
    };
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { tabIndex: 0, className: styles.pickerInput, "aria-label": "TimePicker Open Button", onClick: onOpen },
            isValidTimeRange(value) ? (React.createElement(TimePickerButtonLabel, { value: value, timeZone: timeZone })) : (React.createElement("span", { className: styles.placeholder }, placeholder)),
            React.createElement("span", { className: styles.caretIcon },
                isValidTimeRange(value) && clearable && (React.createElement(Icon, { className: styles.clearIcon, name: "times", size: "lg", onClick: onRangeClear })),
                React.createElement(Icon, { name: isOpen ? 'angle-up' : 'angle-down', size: "lg" }))),
        isOpen && (React.createElement(ClickOutsideWrapper, { includeButtonPress: false, onClick: onClose },
            React.createElement(TimePickerContent, { timeZone: timeZone, value: isValidTimeRange(value) ? value : defaultTimeRange, onChange: onRangeChange, otherOptions: otherOptions, quickOptions: quickOptions, onChangeTimeZone: onChangeTimeZone || noop, className: styles.content, hideTimeZone: hideTimeZone, isReversed: true })))));
};
var getStyles = function (theme) {
    var inputStyles = getInputStyles({ theme: theme, invalid: false });
    return {
        container: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      display: flex;\n      position: relative;\n    "], ["\n      display: flex;\n      position: relative;\n    "]))),
        content: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      margin-left: 0;\n    "], ["\n      margin-left: 0;\n    "]))),
        pickerInput: cx(inputStyles.input, inputStyles.wrapper, css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        cursor: pointer;\n        padding-right: 0;\n        ", ";\n      "], ["\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        cursor: pointer;\n        padding-right: 0;\n        ", ";\n      "])), getFocusStyle(theme))),
        caretIcon: cx(inputStyles.suffix, css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        position: relative;\n        margin-left: ", ";\n      "], ["\n        position: relative;\n        margin-left: ", ";\n      "])), theme.spacing.xs)),
        clearIcon: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      margin-right: ", ";\n      &:hover {\n        color: ", ";\n      }\n    "], ["\n      margin-right: ", ";\n      &:hover {\n        color: ", ";\n      }\n    "])), theme.spacing.xs, theme.colors.linkHover),
        placeholder: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      color: ", ";\n      opacity: 1;\n    "], ["\n      color: ", ";\n      opacity: 1;\n    "])), theme.colors.formInputPlaceholderText),
    };
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=TimeRangeInput.js.map