import { __makeTemplateObject } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
import { dateTimeFormat } from '@grafana/data';
import { useTheme, stylesFactory } from '../../../themes';
import isString from 'lodash/isString';
export var TimeZoneOffset = function (props) {
    var theme = useTheme();
    var timestamp = props.timestamp, timeZone = props.timeZone, className = props.className;
    var styles = getStyles(theme);
    if (!isString(timeZone)) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("span", { className: styles.localTime }, formatLocalTime(timestamp, timeZone)),
        React.createElement("span", { className: cx(styles.offset, className) }, formatUtcOffset(timestamp, timeZone))));
};
export var formatUtcOffset = function (timestamp, timeZone) {
    var offset = dateTimeFormat(timestamp, {
        timeZone: timeZone,
        format: 'Z',
    });
    if (offset === '+00:00') {
        return 'UTC';
    }
    return "UTC" + offset;
};
var formatLocalTime = function (timestamp, timeZone) {
    return dateTimeFormat(timestamp, {
        timeZone: timeZone,
        format: 'HH:mm',
    });
};
var getStyles = stylesFactory(function (theme) {
    var textBase = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    font-weight: normal;\n    font-size: ", ";\n    color: ", ";\n    white-space: normal;\n  "], ["\n    font-weight: normal;\n    font-size: ", ";\n    color: ", ";\n    white-space: normal;\n  "])), theme.typography.size.sm, theme.colors.textWeak);
    return {
        localTime: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      display: none;\n      ", ";\n      color: ", ";\n    "], ["\n      display: none;\n      ", ";\n      color: ", ";\n    "])), textBase, theme.colors.text),
        offset: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      ", ";\n      color: ", ";\n      background: ", ";\n      padding: 2px 5px;\n      border-radius: 2px;\n      margin-left: 4px;\n    "], ["\n      ", ";\n      color: ", ";\n      background: ", ";\n      padding: 2px 5px;\n      border-radius: 2px;\n      margin-left: 4px;\n    "])), textBase, theme.colors.text, theme.colors.bg2),
    };
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=TimeZoneOffset.js.map