import { __extends, __makeTemplateObject } from "tslib";
import React, { Component } from 'react';
import classNames from 'classnames';
import { css } from 'emotion';
import { Tooltip } from '../Tooltip/Tooltip';
import { Icon } from '../Icon/Icon';
import { ButtonSelect } from '../Forms/Legacy/Select/ButtonSelect';
import memoizeOne from 'memoize-one';
import { withTheme } from '../../themes';
export var defaultIntervals = ['5s', '10s', '30s', '1m', '5m', '15m', '30m', '1h', '2h', '1d'];
var getStyles = memoizeOne(function (theme) {
    return {
        selectButton: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      label: selectButton;\n      .select-button-value {\n        color: ", ";\n      }\n    "], ["\n      label: selectButton;\n      .select-button-value {\n        color: ", ";\n      }\n    "])), theme.palette.orange),
    };
});
var RefreshPickerBase = /** @class */ (function (_super) {
    __extends(RefreshPickerBase, _super);
    function RefreshPickerBase(props) {
        var _this = _super.call(this, props) || this;
        _this.intervalsToOptions = function (intervals) {
            var intervalsOrDefault = intervals || defaultIntervals;
            var options = intervalsOrDefault.map(function (interval) { return ({ label: interval, value: interval }); });
            if (_this.props.hasLiveOption) {
                options.unshift(RefreshPicker.liveOption);
            }
            options.unshift(RefreshPicker.offOption);
            return options;
        };
        _this.onChangeSelect = function (item) {
            var onIntervalChanged = _this.props.onIntervalChanged;
            if (onIntervalChanged) {
                // @ts-ignore
                onIntervalChanged(item.value);
            }
        };
        return _this;
    }
    RefreshPickerBase.prototype.shouldComponentUpdate = function (nextProps) {
        var _this = this;
        var _a;
        var intervalsDiffer = (_a = nextProps.intervals) === null || _a === void 0 ? void 0 : _a.some(function (interval, i) { var _a; return ((_a = _this.props.intervals) === null || _a === void 0 ? void 0 : _a[i]) !== interval; });
        return (intervalsDiffer ||
            this.props.onRefresh !== nextProps.onRefresh ||
            this.props.onIntervalChanged !== nextProps.onIntervalChanged ||
            this.props.value !== nextProps.value ||
            this.props.tooltip !== nextProps.tooltip ||
            this.props.hasLiveOption !== nextProps.hasLiveOption ||
            this.props.refreshButton !== nextProps.refreshButton ||
            this.props.buttonSelectClassName !== nextProps.buttonSelectClassName ||
            this.props.theme !== nextProps.theme);
    };
    RefreshPickerBase.prototype.render = function () {
        var _a = this.props, onRefresh = _a.onRefresh, intervals = _a.intervals, tooltip = _a.tooltip, value = _a.value, refreshButton = _a.refreshButton, buttonSelectClassName = _a.buttonSelectClassName, theme = _a.theme;
        var options = this.intervalsToOptions(intervals);
        var currentValue = value || '';
        var selectedValue = options.find(function (item) { return item.value === currentValue; }) || RefreshPicker.offOption;
        var styles = getStyles(theme);
        var cssClasses = classNames({
            'refresh-picker': true,
            'refresh-picker--off': selectedValue.label === RefreshPicker.offOption.label,
            'refresh-picker--live': selectedValue === RefreshPicker.liveOption,
        });
        return (React.createElement("div", { className: cssClasses },
            React.createElement("div", { className: "refresh-picker-buttons" },
                refreshButton ? (refreshButton) : (React.createElement(Tooltip, { placement: "top", content: tooltip },
                    React.createElement("button", { className: "btn btn--radius-right-0 navbar-button navbar-button--border-right-0", onClick: onRefresh },
                        React.createElement(Icon, { name: "sync", size: "lg" })))),
                React.createElement(ButtonSelect, { className: classNames('navbar-button--attached', styles.selectButton, buttonSelectClassName), value: selectedValue, label: selectedValue.label, options: options, onChange: this.onChangeSelect, maxMenuHeight: 380 }))));
    };
    RefreshPickerBase.offOption = { label: 'Off', value: '' };
    RefreshPickerBase.liveOption = { label: 'Live', value: 'LIVE' };
    RefreshPickerBase.isLive = function (refreshInterval) { return refreshInterval === RefreshPicker.liveOption.value; };
    return RefreshPickerBase;
}(Component));
export { RefreshPickerBase };
export var RefreshPicker = withTheme(RefreshPickerBase);
var templateObject_1;
//# sourceMappingURL=RefreshPicker.js.map