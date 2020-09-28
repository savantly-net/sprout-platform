import { __assign, __extends, __makeTemplateObject } from "tslib";
// Libraries
import React, { PureComponent, memo } from 'react';
import { css, cx } from 'emotion';
// Components
import { Tooltip } from '../Tooltip/Tooltip';
import { Icon } from '../Icon/Icon';
import { TimePickerContent } from './TimeRangePicker/TimePickerContent';
import { ClickOutsideWrapper } from '../ClickOutsideWrapper/ClickOutsideWrapper';
// Utils & Services
import { stylesFactory } from '../../themes/stylesFactory';
import { withTheme, useTheme } from '../../themes/ThemeContext';
// Types
import { isDateTime, rangeUtil, dateTimeFormat, timeZoneFormatUserFriendly } from '@savantly/sprout-api';
import { dateMath } from '@savantly/sprout-api';
import { otherOptions, quickOptions } from './rangeOptions';
var getStyles = stylesFactory(function (theme) {
    return {
        container: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      position: relative;\n      display: flex;\n      flex-flow: column nowrap;\n    "], ["\n      position: relative;\n      display: flex;\n      flex-flow: column nowrap;\n    "]))),
        buttons: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      display: flex;\n    "], ["\n      display: flex;\n    "]))),
        caretIcon: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      margin-left: ", ";\n    "], ["\n      margin-left: ", ";\n    "])), theme.spacing.xs),
        clockIcon: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      margin-left: ", ";\n      margin-right: ", ";\n    "], ["\n      margin-left: ", ";\n      margin-right: ", ";\n    "])), theme.spacing.xs, theme.spacing.xs),
        noRightBorderStyle: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      label: noRightBorderStyle;\n      border-right: 0;\n    "], ["\n      label: noRightBorderStyle;\n      border-right: 0;\n    "]))),
    };
});
var getLabelStyles = stylesFactory(function (theme) {
    return {
        container: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      display: inline-block;\n    "], ["\n      display: inline-block;\n    "]))),
        utc: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      color: ", ";\n      font-size: 75%;\n      padding: 3px;\n      font-weight: ", ";\n    "], ["\n      color: ", ";\n      font-size: 75%;\n      padding: 3px;\n      font-weight: ", ";\n    "])), theme.palette.orange, theme.typography.weight.semibold),
    };
});
var UnthemedTimeRangePicker = /** @class */ (function (_super) {
    __extends(UnthemedTimeRangePicker, _super);
    function UnthemedTimeRangePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
        };
        _this.onChange = function (timeRange) {
            _this.props.onChange(timeRange);
            _this.setState({ isOpen: false });
        };
        _this.onOpen = function (event) {
            var isOpen = _this.state.isOpen;
            event.stopPropagation();
            event.preventDefault();
            _this.setState({ isOpen: !isOpen });
        };
        _this.onClose = function () {
            _this.setState({ isOpen: false });
        };
        return _this;
    }
    UnthemedTimeRangePicker.prototype.render = function () {
        var _a, _b;
        var _c = this.props, value = _c.value, onMoveBackward = _c.onMoveBackward, onMoveForward = _c.onMoveForward, onZoom = _c.onZoom, timeZone = _c.timeZone, timeSyncButton = _c.timeSyncButton, isSynced = _c.isSynced, theme = _c.theme, history = _c.history, onChangeTimeZone = _c.onChangeTimeZone;
        var isOpen = this.state.isOpen;
        var styles = getStyles(theme);
        var hasAbsolute = isDateTime(value.raw.from) || isDateTime(value.raw.to);
        var syncedTimePicker = timeSyncButton && isSynced;
        var timePickerIconClass = cx((_a = {}, _a['icon-brand-gradient'] = syncedTimePicker, _a));
        var timePickerButtonClass = cx('btn navbar-button navbar-button--tight', (_b = {},
            _b["btn--radius-right-0 " + styles.noRightBorderStyle] = !!timeSyncButton,
            _b["explore-active-button"] = syncedTimePicker,
            _b));
        return (React.createElement("div", { className: styles.container },
            React.createElement("div", { className: styles.buttons },
                hasAbsolute && (React.createElement("button", { className: "btn navbar-button navbar-button--tight", onClick: onMoveBackward },
                    React.createElement(Icon, { name: "angle-left", size: "lg" }))),
                React.createElement("div", null,
                    React.createElement(Tooltip, { content: React.createElement(TimePickerTooltip, { timeRange: value, timeZone: timeZone }), placement: "bottom" },
                        React.createElement("button", { "aria-label": "TimePicker Open Button", className: timePickerButtonClass, onClick: this.onOpen },
                            React.createElement(Icon, { name: "clock-nine", className: cx(styles.clockIcon, timePickerIconClass), size: "lg" }),
                            React.createElement(TimePickerButtonLabel, __assign({}, this.props)),
                            React.createElement("span", { className: styles.caretIcon }, React.createElement(Icon, { name: isOpen ? 'angle-up' : 'angle-down', size: "lg" })))),
                    isOpen && (React.createElement(ClickOutsideWrapper, { includeButtonPress: false, onClick: this.onClose },
                        React.createElement(TimePickerContent, { timeZone: timeZone, value: value, onChange: this.onChange, otherOptions: otherOptions, quickOptions: quickOptions, history: history, showHistory: true, onChangeTimeZone: onChangeTimeZone })))),
                timeSyncButton,
                hasAbsolute && (React.createElement("button", { className: "btn navbar-button navbar-button--tight", onClick: onMoveForward },
                    React.createElement(Icon, { name: "angle-right", size: "lg" }))),
                React.createElement(Tooltip, { content: ZoomOutTooltip, placement: "bottom" },
                    React.createElement("button", { className: "btn navbar-button navbar-button--zoom", onClick: onZoom },
                        React.createElement(Icon, { name: "search-minus", size: "lg" }))))));
    };
    return UnthemedTimeRangePicker;
}(PureComponent));
export { UnthemedTimeRangePicker };
var ZoomOutTooltip = function () { return (React.createElement(React.Fragment, null,
    "Time range zoom out ",
    React.createElement("br", null),
    " CTRL+Z")); };
var TimePickerTooltip = function (_a) {
    var timeRange = _a.timeRange, timeZone = _a.timeZone;
    var theme = useTheme();
    var styles = getLabelStyles(theme);
    return (React.createElement(React.Fragment, null,
        dateTimeFormat(timeRange.from, { timeZone: timeZone }),
        React.createElement("div", { className: "text-center" }, "to"),
        dateTimeFormat(timeRange.to, { timeZone: timeZone }),
        React.createElement("div", { className: "text-center" },
            React.createElement("span", { className: styles.utc }, timeZoneFormatUserFriendly(timeZone)))));
};
export var TimePickerButtonLabel = memo(function (_a) {
    var hideText = _a.hideText, value = _a.value, timeZone = _a.timeZone;
    var theme = useTheme();
    var styles = getLabelStyles(theme);
    if (hideText) {
        return null;
    }
    return (React.createElement("span", { className: styles.container },
        React.createElement("span", null, formattedRange(value, timeZone)),
        React.createElement("span", { className: styles.utc }, rangeUtil.describeTimeRangeAbbreviation(value, timeZone))));
});
var formattedRange = function (value, timeZone) {
    var adjustedTimeRange = {
        to: dateMath.isMathString(value.raw.to) ? value.raw.to : value.to,
        from: dateMath.isMathString(value.raw.from) ? value.raw.from : value.from,
    };
    return rangeUtil.describeTimeRange(adjustedTimeRange, timeZone);
};
export var TimeRangePicker = withTheme(UnthemedTimeRangePicker);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=TimeRangePicker.js.map