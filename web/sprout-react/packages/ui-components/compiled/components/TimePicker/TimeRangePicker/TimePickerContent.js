import { __assign, __makeTemplateObject, __read } from "tslib";
import { isDateTime } from '@savantly/sprout-api';
import { css, cx } from 'emotion';
import React, { memo, useState } from 'react';
import { useMedia } from 'react-use';
import { stylesFactory, useTheme } from '../../../themes';
import { CustomScrollbar } from '../../CustomScrollbar/CustomScrollbar';
import { Icon } from '../../Icon/Icon';
import { mapRangeToTimeOption } from './mapper';
import { TimePickerTitle } from './TimePickerTitle';
import { TimeRangeForm } from './TimeRangeForm';
import { TimeRangeList } from './TimeRangeList';
import { TimePickerFooter } from './TimePickerFooter';
var getStyles = stylesFactory(function (theme, isReversed) {
    var containerBorder = theme.isDark ? theme.palette.dark9 : theme.palette.gray5;
    return {
        container: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      background: ", ";\n      box-shadow: 0px 0px 20px ", ";\n      position: absolute;\n      z-index: ", ";\n      width: 546px;\n      top: 116%;\n      border-radius: 2px;\n      border: 1px solid ", ";\n      right: ", ";\n\n      @media only screen and (max-width: ", ") {\n        width: 262px;\n      }\n    "], ["\n      background: ", ";\n      box-shadow: 0px 0px 20px ", ";\n      position: absolute;\n      z-index: ", ";\n      width: 546px;\n      top: 116%;\n      border-radius: 2px;\n      border: 1px solid ", ";\n      right: ", ";\n\n      @media only screen and (max-width: ", ") {\n        width: 262px;\n      }\n    "])), theme.colors.bodyBg, theme.colors.dropdownShadow, theme.zIndex.modal, containerBorder, isReversed ? 'unset' : 0, theme.breakpoints.lg),
        body: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      display: flex;\n      height: 381px;\n    "], ["\n      display: flex;\n      height: 381px;\n    "]))),
        leftSide: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      display: flex;\n      flex-direction: column;\n      border-right: ", ";\n      width: 60%;\n      overflow: hidden;\n      order: ", ";\n\n      @media only screen and (max-width: ", ") {\n        display: none;\n      }\n    "], ["\n      display: flex;\n      flex-direction: column;\n      border-right: ", ";\n      width: 60%;\n      overflow: hidden;\n      order: ", ";\n\n      @media only screen and (max-width: ", ") {\n        display: none;\n      }\n    "])), isReversed ? 'none' : "1px solid " + theme.colors.border1, isReversed ? 1 : 0, theme.breakpoints.lg),
        rightSide: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      width: 40% !important;\n      border-right: ", ";\n\n      @media only screen and (max-width: ", ") {\n        width: 100% !important;\n      }\n    "], ["\n      width: 40% !important;\n      border-right: ", ";\n\n      @media only screen and (max-width: ", ") {\n        width: 100% !important;\n      }\n    "])), isReversed ? "1px solid " + theme.colors.border1 : 'none', theme.breakpoints.lg),
        spacing: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      margin-top: 16px;\n    "], ["\n      margin-top: 16px;\n    "]))),
    };
});
var getNarrowScreenStyles = stylesFactory(function (theme) {
    var formBackground = theme.isDark ? theme.palette.gray15 : theme.palette.gray98;
    return {
        header: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      display: flex;\n      flex-direction: row;\n      justify-content: space-between;\n      align-items: center;\n      border-bottom: 1px solid ", ";\n      padding: 7px 9px 7px 9px;\n    "], ["\n      display: flex;\n      flex-direction: row;\n      justify-content: space-between;\n      align-items: center;\n      border-bottom: 1px solid ", ";\n      padding: 7px 9px 7px 9px;\n    "])), theme.colors.border1),
        body: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      border-bottom: 1px solid ", ";\n      background: ", ";\n      box-shadow: inset 0px 2px 2px ", ";\n    "], ["\n      border-bottom: 1px solid ", ";\n      background: ", ";\n      box-shadow: inset 0px 2px 2px ", ";\n    "])), theme.colors.border1, formBackground, theme.colors.dropdownShadow),
        form: css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      padding: 7px 9px 7px 9px;\n    "], ["\n      padding: 7px 9px 7px 9px;\n    "]))),
    };
});
var getFullScreenStyles = stylesFactory(function (theme) {
    return {
        container: css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      padding-top: 9px;\n      padding-left: 11px;\n      padding-right: 20%;\n    "], ["\n      padding-top: 9px;\n      padding-left: 11px;\n      padding-right: 20%;\n    "]))),
        title: css(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n      margin-bottom: 11px;\n    "], ["\n      margin-bottom: 11px;\n    "]))),
        recent: css(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n      flex-grow: 1;\n      display: flex;\n      flex-direction: column;\n      justify-content: flex-end;\n    "], ["\n      flex-grow: 1;\n      display: flex;\n      flex-direction: column;\n      justify-content: flex-end;\n    "]))),
    };
});
var getEmptyListStyles = stylesFactory(function (theme) {
    var formBackground = theme.isDark ? theme.palette.gray15 : theme.palette.gray98;
    return {
        container: css(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n      background-color: ", ";\n      padding: 12px;\n      margin: 12px;\n\n      a,\n      span {\n        font-size: 13px;\n      }\n    "], ["\n      background-color: ", ";\n      padding: 12px;\n      margin: 12px;\n\n      a,\n      span {\n        font-size: 13px;\n      }\n    "])), formBackground),
        link: css(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n      color: ", ";\n    "], ["\n      color: ", ";\n    "])), theme.colors.linkExternal),
    };
});
export var TimePickerContentWithScreenSize = function (props) {
    var theme = useTheme();
    var styles = getStyles(theme, props.isReversed);
    var historyOptions = mapToHistoryOptions(props.history, props.timeZone);
    var _a = props.quickOptions, quickOptions = _a === void 0 ? [] : _a, _b = props.otherOptions, otherOptions = _b === void 0 ? [] : _b, isFullscreen = props.isFullscreen;
    return (React.createElement("div", { className: cx(styles.container, props.className) },
        React.createElement("div", { className: styles.body },
            React.createElement("div", { className: styles.leftSide },
                React.createElement(FullScreenForm, __assign({}, props, { visible: isFullscreen, historyOptions: historyOptions }))),
            React.createElement(CustomScrollbar, { className: styles.rightSide },
                React.createElement(NarrowScreenForm, __assign({}, props, { visible: !isFullscreen, historyOptions: historyOptions })),
                React.createElement(TimeRangeList, { title: "Relative time ranges", options: quickOptions, onSelect: props.onChange, value: props.value, timeZone: props.timeZone }),
                React.createElement("div", { className: styles.spacing }),
                React.createElement(TimeRangeList, { title: "Other quick ranges", options: otherOptions, onSelect: props.onChange, value: props.value, timeZone: props.timeZone }))),
        !props.hideTimeZone && isFullscreen && (React.createElement(TimePickerFooter, { timeZone: props.timeZone, onChangeTimeZone: props.onChangeTimeZone }))));
};
export var TimePickerContent = function (props) {
    var theme = useTheme();
    var isFullscreen = useMedia("(min-width: " + theme.breakpoints.lg + ")");
    return React.createElement(TimePickerContentWithScreenSize, __assign({}, props, { isFullscreen: isFullscreen }));
};
var NarrowScreenForm = function (props) {
    if (!props.visible) {
        return null;
    }
    var theme = useTheme();
    var styles = getNarrowScreenStyles(theme);
    var isAbsolute = isDateTime(props.value.raw.from) || isDateTime(props.value.raw.to);
    var _a = __read(useState(isAbsolute), 2), collapsed = _a[0], setCollapsed = _a[1];
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { "aria-label": "TimePicker absolute time range", className: styles.header, onClick: function () { return setCollapsed(!collapsed); } },
            React.createElement(TimePickerTitle, null, "Absolute time range"),
            React.createElement(Icon, { name: collapsed ? 'angle-up' : 'angle-down' })),
        collapsed && (React.createElement("div", { className: styles.body },
            React.createElement("div", { className: styles.form },
                React.createElement(TimeRangeForm, { value: props.value, onApply: props.onChange, timeZone: props.timeZone, isFullscreen: false })),
            props.showHistory && (React.createElement(TimeRangeList, { title: "Recently used absolute ranges", options: props.historyOptions || [], onSelect: props.onChange, value: props.value, placeholderEmpty: null, timeZone: props.timeZone }))))));
};
var FullScreenForm = function (props) {
    if (!props.visible) {
        return null;
    }
    var theme = useTheme();
    var styles = getFullScreenStyles(theme);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.container },
            React.createElement("div", { "aria-label": "TimePicker absolute time range", className: styles.title },
                React.createElement(TimePickerTitle, null, "Absolute time range")),
            React.createElement(TimeRangeForm, { value: props.value, timeZone: props.timeZone, onApply: props.onChange, isFullscreen: true, isReversed: props.isReversed })),
        props.showHistory && (React.createElement("div", { className: styles.recent },
            React.createElement(TimeRangeList, { title: "Recently used absolute ranges", options: props.historyOptions || [], onSelect: props.onChange, value: props.value, placeholderEmpty: React.createElement(EmptyRecentList, null), timeZone: props.timeZone })))));
};
var EmptyRecentList = memo(function () {
    var theme = useTheme();
    var styles = getEmptyListStyles(theme);
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", null,
            React.createElement("span", null, "It looks like you haven't used this timer picker before. As soon as you enter some time intervals, recently used intervals will appear here.")),
        React.createElement("div", null,
            React.createElement("a", { className: styles.link, href: "https://grafana.com/docs/grafana/latest/dashboards/time-range-controls", target: "_new" }, "Read the documentation"),
            React.createElement("span", null, " to find out more about how to enter custom time ranges."))));
});
function mapToHistoryOptions(ranges, timeZone) {
    if (!Array.isArray(ranges) || ranges.length === 0) {
        return [];
    }
    return ranges.slice(ranges.length - 4).map(function (range) { return mapRangeToTimeOption(range, timeZone); });
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;
//# sourceMappingURL=TimePickerContent.js.map