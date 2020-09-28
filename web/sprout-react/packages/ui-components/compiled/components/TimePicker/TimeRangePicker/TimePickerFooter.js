import { __makeTemplateObject, __read } from "tslib";
import React, { useState, useCallback } from 'react';
import { css, cx } from 'emotion';
import { getTimeZoneInfo } from '@savantly/sprout-api';
import { stylesFactory, useTheme } from '../../../themes';
import { TimeZoneTitle } from '../TimeZonePicker/TimeZoneTitle';
import { TimeZoneDescription } from '../TimeZonePicker/TimeZoneDescription';
import { TimeZoneOffset } from '../TimeZonePicker/TimeZoneOffset';
import { Button } from '../../Button';
import { TimeZonePicker } from '../TimeZonePicker';
import isString from 'lodash/isString';
import { selectors } from '@grafana/e2e-selectors';
export var TimePickerFooter = function (props) {
    var timeZone = props.timeZone, _a = props.timestamp, timestamp = _a === void 0 ? Date.now() : _a, onChangeTimeZone = props.onChangeTimeZone;
    var _b = __read(useState(false), 2), isEditing = _b[0], setEditing = _b[1];
    var onToggleChangeTz = useCallback(function (event) {
        if (event) {
            event.stopPropagation();
        }
        setEditing(!isEditing);
    }, [isEditing, setEditing]);
    var theme = useTheme();
    var style = getStyle(theme);
    if (!isString(timeZone)) {
        return null;
    }
    var info = getTimeZoneInfo(timeZone, timestamp);
    if (!info) {
        return null;
    }
    if (isEditing) {
        return (React.createElement("div", { className: cx(style.container, style.editContainer) },
            React.createElement("div", { "aria-label": selectors.components.TimeZonePicker.container, className: style.timeZoneContainer },
                React.createElement(TimeZonePicker, { includeInternal: true, onChange: function (timeZone) {
                        onToggleChangeTz();
                        if (isString(timeZone)) {
                            onChangeTimeZone(timeZone);
                        }
                    }, autoFocus: true, onBlur: onToggleChangeTz }))));
    }
    return (React.createElement("div", { className: style.container },
        React.createElement("div", { className: style.timeZoneContainer },
            React.createElement("div", { className: style.timeZone },
                React.createElement(TimeZoneTitle, { title: info.name }),
                React.createElement("div", { className: style.spacer }),
                React.createElement(TimeZoneDescription, { info: info })),
            React.createElement(TimeZoneOffset, { timeZone: timeZone, timestamp: timestamp })),
        React.createElement("div", { className: style.spacer }),
        React.createElement(Button, { variant: "secondary", onClick: onToggleChangeTz, size: "sm" }, "Change time zone")));
};
var getStyle = stylesFactory(function (theme) {
    return {
        container: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      border-top: 1px solid ", ";\n      padding: 11px;\n      display: flex;\n      flex-direction: row;\n      justify-content: space-between;\n      align-items: center;\n    "], ["\n      border-top: 1px solid ", ";\n      padding: 11px;\n      display: flex;\n      flex-direction: row;\n      justify-content: space-between;\n      align-items: center;\n    "])), theme.colors.border1),
        editContainer: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      padding: 7px;\n    "], ["\n      padding: 7px;\n    "]))),
        spacer: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      margin-left: 7px;\n    "], ["\n      margin-left: 7px;\n    "]))),
        timeZoneContainer: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      display: flex;\n      flex-direction: row;\n      justify-content: space-between;\n      align-items: center;\n      flex-grow: 1;\n    "], ["\n      display: flex;\n      flex-direction: row;\n      justify-content: space-between;\n      align-items: center;\n      flex-grow: 1;\n    "]))),
        timeZone: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      display: flex;\n      flex-direction: row;\n      align-items: baseline;\n      flex-grow: 1;\n    "], ["\n      display: flex;\n      flex-direction: row;\n      align-items: baseline;\n      flex-grow: 1;\n    "]))),
    };
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=TimePickerFooter.js.map