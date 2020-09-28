import { __assign, __makeTemplateObject, __read } from "tslib";
import React, { memo, useCallback, useEffect, useState } from 'react';
import { css } from 'emotion';
import Calendar from 'react-calendar/dist/entry.nostyle';
import { dateTime, dateTimeParse } from '@grafana/data';
import { stylesFactory, useTheme } from '../../../themes';
import { TimePickerTitle } from './TimePickerTitle';
import { Button } from '../../Button';
import { Icon } from '../../Icon/Icon';
import { Portal } from '../../Portal/Portal';
import { ClickOutsideWrapper } from '../../ClickOutsideWrapper/ClickOutsideWrapper';
var getStyles = stylesFactory(function (theme, isReversed) {
    if (isReversed === void 0) { isReversed = false; }
    var containerBorder = theme.isDark ? theme.palette.dark9 : theme.palette.gray5;
    return {
        container: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      top: -1px;\n      position: absolute;\n      ", ": 544px;\n      box-shadow: ", " 0px 20px ", ";\n      background-color: ", ";\n      z-index: -1;\n      border: 1px solid ", ";\n      border-radius: 2px 0 0 2px;\n\n      &:after {\n        display: block;\n        background-color: ", ";\n        width: 19px;\n        height: 100%;\n        content: ", ";\n        position: absolute;\n        top: 0;\n        right: -19px;\n        border-left: 1px solid ", ";\n      }\n    "], ["\n      top: -1px;\n      position: absolute;\n      ", ": 544px;\n      box-shadow: ", " 0px 20px ", ";\n      background-color: ", ";\n      z-index: -1;\n      border: 1px solid ", ";\n      border-radius: 2px 0 0 2px;\n\n      &:after {\n        display: block;\n        background-color: ", ";\n        width: 19px;\n        height: 100%;\n        content: ", ";\n        position: absolute;\n        top: 0;\n        right: -19px;\n        border-left: 1px solid ", ";\n      }\n    "])), isReversed ? 'left' : 'right', isReversed ? '10px' : '0px', theme.colors.dropdownShadow, theme.colors.bodyBg, containerBorder, theme.colors.bodyBg, !isReversed ? ' ' : '', theme.colors.border1),
        modal: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      position: fixed;\n      top: 20%;\n      width: 100%;\n      z-index: ", ";\n    "], ["\n      position: fixed;\n      top: 20%;\n      width: 100%;\n      z-index: ", ";\n    "])), theme.zIndex.modal),
        content: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      margin: 0 auto;\n      width: 268px;\n    "], ["\n      margin: 0 auto;\n      width: 268px;\n    "]))),
        backdrop: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      position: fixed;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      background: #202226;\n      opacity: 0.7;\n      z-index: ", ";\n      text-align: center;\n    "], ["\n      position: fixed;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      background: #202226;\n      opacity: 0.7;\n      z-index: ", ";\n      text-align: center;\n    "])), theme.zIndex.modalBackdrop),
    };
});
var getFooterStyles = stylesFactory(function (theme) {
    return {
        container: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      background-color: ", ";\n      display: flex;\n      justify-content: center;\n      padding: 10px;\n      align-items: stretch;\n    "], ["\n      background-color: ", ";\n      display: flex;\n      justify-content: center;\n      padding: 10px;\n      align-items: stretch;\n    "])), theme.colors.bodyBg),
        apply: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      margin-right: 4px;\n      width: 100%;\n      justify-content: center;\n    "], ["\n      margin-right: 4px;\n      width: 100%;\n      justify-content: center;\n    "]))),
    };
});
var getBodyStyles = stylesFactory(function (theme) {
    return {
        title: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      color: ", ";\n      background-color: ", ";\n      font-size: ", ";\n      border: 1px solid transparent;\n\n      &:hover {\n        position: relative;\n      }\n    "], ["\n      color: ", ";\n      background-color: ", ";\n      font-size: ", ";\n      border: 1px solid transparent;\n\n      &:hover {\n        position: relative;\n      }\n    "])), theme.colors.text, theme.colors.bodyBg, theme.typography.size.md),
        body: css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      z-index: ", ";\n      background-color: ", ";\n      width: 268px;\n\n      .react-calendar__navigation__label,\n      .react-calendar__navigation__arrow,\n      .react-calendar__navigation {\n        padding-top: 4px;\n        background-color: inherit;\n        color: ", ";\n        border: 0;\n        font-weight: ", ";\n      }\n\n      .react-calendar__month-view__weekdays {\n        background-color: inherit;\n        text-align: center;\n        color: ", ";\n\n        abbr {\n          border: 0;\n          text-decoration: none;\n          cursor: default;\n          display: block;\n          padding: 4px 0 4px 0;\n        }\n      }\n\n      .react-calendar__month-view__days {\n        background-color: inherit;\n      }\n\n      .react-calendar__tile,\n      .react-calendar__tile--now {\n        margin-bottom: 4px;\n        background-color: inherit;\n        height: 26px;\n      }\n\n      .react-calendar__navigation__label,\n      .react-calendar__navigation > button:focus,\n      .time-picker-calendar-tile:focus {\n        outline: 0;\n      }\n\n      .react-calendar__tile--active,\n      .react-calendar__tile--active:hover {\n        color: ", ";\n        font-weight: ", ";\n        background: ", ";\n        box-shadow: none;\n        border: 0px;\n      }\n\n      .react-calendar__tile--rangeEnd,\n      .react-calendar__tile--rangeStart {\n        padding: 0;\n        border: 0px;\n        color: ", ";\n        font-weight: ", ";\n        background: ", ";\n\n        abbr {\n          background-color: ", ";\n          border-radius: 100px;\n          display: block;\n          padding-top: 2px;\n          height: 26px;\n        }\n      }\n\n      .react-calendar__tile--rangeStart {\n        border-top-left-radius: 20px;\n        border-bottom-left-radius: 20px;\n      }\n\n      .react-calendar__tile--rangeEnd {\n        border-top-right-radius: 20px;\n        border-bottom-right-radius: 20px;\n      }\n    "], ["\n      z-index: ", ";\n      background-color: ", ";\n      width: 268px;\n\n      .react-calendar__navigation__label,\n      .react-calendar__navigation__arrow,\n      .react-calendar__navigation {\n        padding-top: 4px;\n        background-color: inherit;\n        color: ", ";\n        border: 0;\n        font-weight: ", ";\n      }\n\n      .react-calendar__month-view__weekdays {\n        background-color: inherit;\n        text-align: center;\n        color: ", ";\n\n        abbr {\n          border: 0;\n          text-decoration: none;\n          cursor: default;\n          display: block;\n          padding: 4px 0 4px 0;\n        }\n      }\n\n      .react-calendar__month-view__days {\n        background-color: inherit;\n      }\n\n      .react-calendar__tile,\n      .react-calendar__tile--now {\n        margin-bottom: 4px;\n        background-color: inherit;\n        height: 26px;\n      }\n\n      .react-calendar__navigation__label,\n      .react-calendar__navigation > button:focus,\n      .time-picker-calendar-tile:focus {\n        outline: 0;\n      }\n\n      .react-calendar__tile--active,\n      .react-calendar__tile--active:hover {\n        color: ", ";\n        font-weight: ", ";\n        background: ", ";\n        box-shadow: none;\n        border: 0px;\n      }\n\n      .react-calendar__tile--rangeEnd,\n      .react-calendar__tile--rangeStart {\n        padding: 0;\n        border: 0px;\n        color: ", ";\n        font-weight: ", ";\n        background: ", ";\n\n        abbr {\n          background-color: ", ";\n          border-radius: 100px;\n          display: block;\n          padding-top: 2px;\n          height: 26px;\n        }\n      }\n\n      .react-calendar__tile--rangeStart {\n        border-top-left-radius: 20px;\n        border-bottom-left-radius: 20px;\n      }\n\n      .react-calendar__tile--rangeEnd {\n        border-top-right-radius: 20px;\n        border-bottom-right-radius: 20px;\n      }\n    "])), theme.zIndex.modal, theme.colors.bodyBg, theme.colors.text, theme.typography.weight.semibold, theme.palette.blue77, theme.palette.white, theme.typography.weight.semibold, theme.palette.blue95, theme.palette.white, theme.typography.weight.semibold, theme.palette.blue95, theme.palette.blue77),
    };
});
var getHeaderStyles = stylesFactory(function (theme) {
    return {
        container: css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      background-color: ", ";\n      display: flex;\n      justify-content: space-between;\n      padding: 7px;\n    "], ["\n      background-color: ", ";\n      display: flex;\n      justify-content: space-between;\n      padding: 7px;\n    "])), theme.colors.bodyBg),
    };
});
var stopPropagation = function (event) { return event.stopPropagation(); };
export var TimePickerCalendar = memo(function (props) {
    var theme = useTheme();
    var styles = getStyles(theme, props.isReversed);
    var isOpen = props.isOpen, isFullscreen = props.isFullscreen;
    if (!isOpen) {
        return null;
    }
    if (isFullscreen) {
        return (React.createElement(ClickOutsideWrapper, { onClick: props.onClose },
            React.createElement("div", { className: styles.container, onClick: stopPropagation },
                React.createElement(Body, __assign({}, props)))));
    }
    return (React.createElement(Portal, null,
        React.createElement("div", { className: styles.modal, onClick: stopPropagation },
            React.createElement("div", { className: styles.content },
                React.createElement(Header, __assign({}, props)),
                React.createElement(Body, __assign({}, props)),
                React.createElement(Footer, __assign({}, props)))),
        React.createElement("div", { className: styles.backdrop, onClick: stopPropagation })));
});
var Header = memo(function (_a) {
    var onClose = _a.onClose;
    var theme = useTheme();
    var styles = getHeaderStyles(theme);
    return (React.createElement("div", { className: styles.container },
        React.createElement(TimePickerTitle, null, "Select a time range"),
        React.createElement(Icon, { name: "times", onClick: onClose })));
});
var Body = memo(function (_a) {
    var onChange = _a.onChange, from = _a.from, to = _a.to, timeZone = _a.timeZone;
    var _b = __read(useState(), 2), value = _b[0], setValue = _b[1];
    var theme = useTheme();
    var onCalendarChange = useOnCalendarChange(onChange, timeZone);
    var styles = getBodyStyles(theme);
    useEffect(function () {
        setValue(inputToValue(from, to));
    }, []);
    return (React.createElement(Calendar, { selectRange: true, next2Label: null, prev2Label: null, className: styles.body, tileClassName: styles.title, value: value, nextLabel: React.createElement(Icon, { name: "angle-right" }), prevLabel: React.createElement(Icon, { name: "angle-left" }), onChange: onCalendarChange, locale: "en" }));
});
var Footer = memo(function (_a) {
    var onClose = _a.onClose, onApply = _a.onApply;
    var theme = useTheme();
    var styles = getFooterStyles(theme);
    return (React.createElement("div", { className: styles.container },
        React.createElement(Button, { className: styles.apply, onClick: onApply }, "Apply time range"),
        React.createElement(Button, { variant: "secondary", onClick: onClose }, "Cancel")));
});
export function inputToValue(from, to, invalidDateDefault) {
    if (invalidDateDefault === void 0) { invalidDateDefault = new Date(); }
    var fromAsDate = from.toDate();
    var toAsDate = to.toDate();
    var fromAsValidDate = dateTime(fromAsDate).isValid() ? fromAsDate : invalidDateDefault;
    var toAsValidDate = dateTime(toAsDate).isValid() ? toAsDate : invalidDateDefault;
    if (fromAsValidDate > toAsValidDate) {
        return [toAsValidDate, fromAsValidDate];
    }
    return [fromAsValidDate, toAsValidDate];
}
function useOnCalendarChange(onChange, timeZone) {
    return useCallback(function (value) {
        if (!Array.isArray(value)) {
            return console.error('onCalendarChange: should be run in selectRange={true}');
        }
        var from = dateTimeParse(dateInfo(value[0]), { timeZone: timeZone });
        var to = dateTimeParse(dateInfo(value[1]), { timeZone: timeZone });
        onChange(from, to);
    }, [onChange]);
}
function dateInfo(date) {
    return [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=TimePickerCalendar.js.map