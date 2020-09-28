import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
import { getTimeZoneInfo } from '@savantly/sprout-api';
import { useTheme } from '../../../themes/ThemeContext';
import { stylesFactory } from '../../../themes/stylesFactory';
import { Icon } from '../../Icon/Icon';
import { TimeZoneOffset } from './TimeZoneOffset';
import { TimeZoneDescription } from './TimeZoneDescription';
import { TimeZoneTitle } from './TimeZoneTitle';
import isString from 'lodash/isString';
var offsetClassName = 'tz-utc-offset';
export var WideTimeZoneOption = function (props, ref) {
    var children = props.children, innerProps = props.innerProps, data = props.data, isSelected = props.isSelected, isFocused = props.isFocused;
    var theme = useTheme();
    var styles = getStyles(theme);
    var timestamp = Date.now();
    var containerStyles = cx(styles.container, isFocused && styles.containerFocused);
    if (!isString(data.value)) {
        return null;
    }
    return (React.createElement("div", __assign({ className: containerStyles }, innerProps, { "aria-label": "Select option" }),
        React.createElement("div", { className: cx(styles.leftColumn, styles.row) },
            React.createElement("div", { className: cx(styles.leftColumn, styles.wideRow) },
                React.createElement(TimeZoneTitle, { title: children }),
                React.createElement("div", { className: styles.spacer }),
                React.createElement(TimeZoneDescription, { info: getTimeZoneInfo(data.value, timestamp) })),
            React.createElement("div", { className: styles.rightColumn },
                React.createElement(TimeZoneOffset, { timeZone: data.value, timestamp: timestamp, className: offsetClassName }),
                isSelected && (React.createElement("span", null,
                    React.createElement(Icon, { name: "check" })))))));
};
export var CompactTimeZoneOption = function (props, ref) {
    var children = props.children, innerProps = props.innerProps, data = props.data, isSelected = props.isSelected, isFocused = props.isFocused;
    var theme = useTheme();
    var styles = getStyles(theme);
    var timestamp = Date.now();
    var containerStyles = cx(styles.container, isFocused && styles.containerFocused);
    if (!isString(data.value)) {
        return null;
    }
    return (React.createElement("div", __assign({ className: containerStyles }, innerProps, { "aria-label": "Select option" }),
        React.createElement("div", { className: styles.body },
            React.createElement("div", { className: styles.row },
                React.createElement("div", { className: styles.leftColumn },
                    React.createElement(TimeZoneTitle, { title: children })),
                React.createElement("div", { className: styles.rightColumn }, isSelected && (React.createElement("span", null,
                    React.createElement(Icon, { name: "check" }))))),
            React.createElement("div", { className: styles.row },
                React.createElement("div", { className: styles.leftColumn },
                    React.createElement(TimeZoneDescription, { info: getTimeZoneInfo(data.value, timestamp) })),
                React.createElement("div", { className: styles.rightColumn },
                    React.createElement(TimeZoneOffset, { timestamp: timestamp, timeZone: data.value, className: offsetClassName }))))));
};
var getStyles = stylesFactory(function (theme) {
    var offsetHoverBg = theme.isDark ? theme.palette.gray05 : theme.palette.white;
    return {
        container: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      display: flex;\n      align-items: center;\n      flex-direction: row;\n      flex-shrink: 0;\n      white-space: nowrap;\n      cursor: pointer;\n      border-left: 2px solid transparent;\n      padding: 6px 8px 4px;\n\n      &:hover {\n        background: ", ";\n\n        span.", " {\n          background: ", ";\n        }\n      }\n    "], ["\n      display: flex;\n      align-items: center;\n      flex-direction: row;\n      flex-shrink: 0;\n      white-space: nowrap;\n      cursor: pointer;\n      border-left: 2px solid transparent;\n      padding: 6px 8px 4px;\n\n      &:hover {\n        background: ", ";\n\n        span.", " {\n          background: ", ";\n        }\n      }\n    "])), theme.colors.dropdownOptionHoverBg, offsetClassName, offsetHoverBg),
        containerFocused: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      background: ", ";\n      border-image: linear-gradient(#f05a28 30%, #fbca0a 99%);\n      border-image-slice: 1;\n      border-style: solid;\n      border-top: 0;\n      border-right: 0;\n      border-bottom: 0;\n      border-left-width: 2px;\n\n      span.", " {\n        background: ", ";\n      }\n    "], ["\n      background: ", ";\n      border-image: linear-gradient(#f05a28 30%, #fbca0a 99%);\n      border-image-slice: 1;\n      border-style: solid;\n      border-top: 0;\n      border-right: 0;\n      border-bottom: 0;\n      border-left-width: 2px;\n\n      span.", " {\n        background: ", ";\n      }\n    "])), theme.colors.dropdownOptionHoverBg, offsetClassName, offsetHoverBg),
        body: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      display: flex;\n      font-weight: ", ";\n      flex-direction: column;\n      flex-grow: 1;\n    "], ["\n      display: flex;\n      font-weight: ", ";\n      flex-direction: column;\n      flex-grow: 1;\n    "])), theme.typography.weight.semibold),
        row: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      display: flex;\n      flex-direction: row;\n    "], ["\n      display: flex;\n      flex-direction: row;\n    "]))),
        leftColumn: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      flex-grow: 1;\n      text-overflow: ellipsis;\n    "], ["\n      flex-grow: 1;\n      text-overflow: ellipsis;\n    "]))),
        rightColumn: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      justify-content: flex-end;\n      align-items: center;\n    "], ["\n      justify-content: flex-end;\n      align-items: center;\n    "]))),
        wideRow: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      display: flex;\n      flex-direction: row;\n      align-items: baseline;\n    "], ["\n      display: flex;\n      flex-direction: row;\n      align-items: baseline;\n    "]))),
        spacer: css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      margin-left: 6px;\n    "], ["\n      margin-left: 6px;\n    "]))),
    };
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=TimeZoneOption.js.map