import { __makeTemplateObject } from "tslib";
import React from 'react';
import RcTimePicker from 'rc-time-picker';
import { css, cx } from 'emotion';
import { dateTime, dateTimeAsMoment } from '@savantly/sprout-api';
import { useTheme, Icon } from '../../index';
import { stylesFactory } from '../../themes';
import { inputSizes } from '../Forms/commonStyles';
import { focusCss } from '../../themes/mixins';
var getStyles = stylesFactory(function (theme) {
    var bgColor = theme.colors.formInputBg;
    var menuShadowColor = theme.colors.dropdownShadow;
    var optionBgHover = theme.colors.dropdownOptionHoverBg;
    var borderRadius = theme.border.radius.sm;
    var borderColor = theme.colors.formInputBorder;
    return {
        caretWrapper: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      position: absolute;\n      right: 8px;\n      top: 50%;\n      transform: translateY(-50%);\n      display: inline-block;\n      text-align: right;\n      color: ", ";\n    "], ["\n      position: absolute;\n      right: 8px;\n      top: 50%;\n      transform: translateY(-50%);\n      display: inline-block;\n      text-align: right;\n      color: ", ";\n    "])), theme.colors.textWeak),
        picker: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      .rc-time-picker-panel-select {\n        font-size: 14px;\n        background-color: ", ";\n        border-color: ", ";\n        li {\n          outline-width: 2px;\n          &.rc-time-picker-panel-select-option-selected {\n            background-color: inherit;\n            border: 1px solid ", ";\n            border-radius: ", ";\n          }\n\n          &:hover {\n            background: ", ";\n          }\n        }\n      }\n\n      .rc-time-picker-panel-inner {\n        box-shadow: 0px 4px 4px ", ";\n        background-color: ", ";\n        border-color: ", ";\n        border-radius: ", ";\n        margin-top: 3px;\n\n        .rc-time-picker-panel-input-wrap {\n          margin-right: 2px;\n\n          &,\n          .rc-time-picker-panel-input {\n            background-color: ", ";\n            padding-top: 2px;\n          }\n        }\n      }\n    "], ["\n      .rc-time-picker-panel-select {\n        font-size: 14px;\n        background-color: ", ";\n        border-color: ", ";\n        li {\n          outline-width: 2px;\n          &.rc-time-picker-panel-select-option-selected {\n            background-color: inherit;\n            border: 1px solid ", ";\n            border-radius: ", ";\n          }\n\n          &:hover {\n            background: ", ";\n          }\n        }\n      }\n\n      .rc-time-picker-panel-inner {\n        box-shadow: 0px 4px 4px ", ";\n        background-color: ", ";\n        border-color: ", ";\n        border-radius: ", ";\n        margin-top: 3px;\n\n        .rc-time-picker-panel-input-wrap {\n          margin-right: 2px;\n\n          &,\n          .rc-time-picker-panel-input {\n            background-color: ", ";\n            padding-top: 2px;\n          }\n        }\n      }\n    "])), bgColor, borderColor, theme.palette.orange, borderRadius, optionBgHover, menuShadowColor, bgColor, borderColor, borderRadius, bgColor),
        input: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      .rc-time-picker-input {\n        background-color: ", ";\n        border-radius: ", ";\n        border-color: ", ";\n        height: ", "px;\n\n        &:focus {\n          ", "\n        }\n      }\n    "], ["\n      .rc-time-picker-input {\n        background-color: ", ";\n        border-radius: ", ";\n        border-color: ", ";\n        height: ", "px;\n\n        &:focus {\n          ", "\n        }\n      }\n    "])), bgColor, borderRadius, borderColor, theme.spacing.formInputHeight, focusCss(theme)),
    };
});
export var TimeOfDayPicker = function (_a) {
    var _b = _a.minuteStep, minuteStep = _b === void 0 ? 1 : _b, _c = _a.showHour, showHour = _c === void 0 ? true : _c, onChange = _a.onChange, value = _a.value, _d = _a.size, size = _d === void 0 ? 'auto' : _d;
    var theme = useTheme();
    var styles = getStyles(theme);
    return (React.createElement("div", null,
        React.createElement(RcTimePicker, { className: cx(inputSizes()[size], styles.input), popupClassName: styles.picker, defaultValue: dateTimeAsMoment(), onChange: function (value) { return onChange(dateTime(value)); }, allowEmpty: false, showSecond: false, value: dateTimeAsMoment(value), showHour: showHour, minuteStep: minuteStep, inputIcon: React.createElement(Caret, { wrapperStyle: styles.caretWrapper }) })));
};
var Caret = function (_a) {
    var _b = _a.wrapperStyle, wrapperStyle = _b === void 0 ? '' : _b;
    return (React.createElement("div", { className: wrapperStyle },
        React.createElement(Icon, { name: "angle-down" })));
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=TimeOfDayPicker.js.map