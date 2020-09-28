import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import { css } from 'emotion';
import { TimePickerTitle } from './TimePickerTitle';
import { TimeRangeOption } from './TimeRangeOption';
import { mapOptionToTimeRange } from './mapper';
import { stylesFactory } from '../../../themes';
var getStyles = stylesFactory(function () {
    return {
        title: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 8px 16px 5px 9px;\n    "], ["\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 8px 16px 5px 9px;\n    "]))),
    };
});
var getOptionsStyles = stylesFactory(function () {
    return {
        grow: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      flex-grow: 1;\n      align-items: flex-start;\n    "], ["\n      flex-grow: 1;\n      align-items: flex-start;\n    "]))),
    };
});
export var TimeRangeList = function (props) {
    var styles = getStyles();
    var title = props.title, options = props.options, placeholderEmpty = props.placeholderEmpty;
    if (typeof placeholderEmpty !== 'undefined' && options.length <= 0) {
        return React.createElement(React.Fragment, null, placeholderEmpty);
    }
    if (!title) {
        return React.createElement(Options, __assign({}, props));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.title },
            React.createElement(TimePickerTitle, null, title)),
        React.createElement(Options, __assign({}, props))));
};
var Options = function (_a) {
    var options = _a.options, value = _a.value, onSelect = _a.onSelect, timeZone = _a.timeZone;
    var styles = getOptionsStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null, options.map(function (option, index) { return (React.createElement(TimeRangeOption, { key: keyForOption(option, index), value: option, selected: isEqual(option, value), onSelect: function (option) { return onSelect(mapOptionToTimeRange(option, timeZone)); } })); })),
        React.createElement("div", { className: styles.grow })));
};
function keyForOption(option, index) {
    return option.from + "-" + option.to + "-" + index;
}
function isEqual(x, y) {
    if (!y || !x) {
        return false;
    }
    return y.raw.from === x.from && y.raw.to === x.to;
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=TimeRangeList.js.map