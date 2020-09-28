import { __assign, __makeTemplateObject, __rest } from "tslib";
import React, { useContext } from 'react';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { ThemeContext } from '../../themes';
import { SeriesIcon } from '../Legend/SeriesIcon';
import { getValueFromDimension, getDisplayProcessor, formattedValueToString, dateTimeFormat, } from '@grafana/data';
import { css } from 'emotion';
export var GraphContextMenu = function (_a) {
    var getContextMenuSource = _a.getContextMenuSource, timeZone = _a.timeZone, items = _a.items, dimensions = _a.dimensions, contextDimensions = _a.contextDimensions, otherProps = __rest(_a, ["getContextMenuSource", "timeZone", "items", "dimensions", "contextDimensions"]);
    var theme = useContext(ThemeContext);
    var source = getContextMenuSource();
    //  Do not render items that do not have label specified
    var itemsToRender = items
        ? items.map(function (group) { return (__assign(__assign({}, group), { items: group.items.filter(function (item) { return item.label; }) })); })
        : [];
    var renderHeader = function () {
        var _a, _b;
        if (!source) {
            return null;
        }
        // If dimensions supplied, we can calculate and display value
        var value;
        if ((dimensions === null || dimensions === void 0 ? void 0 : dimensions.yAxis) && ((_a = contextDimensions === null || contextDimensions === void 0 ? void 0 : contextDimensions.yAxis) === null || _a === void 0 ? void 0 : _a[1])) {
            var valueFromDimensions = getValueFromDimension(dimensions.yAxis, contextDimensions.yAxis[0], contextDimensions.yAxis[1]);
            var display = (_b = source.series.valueField.display) !== null && _b !== void 0 ? _b : getDisplayProcessor({
                field: source.series.valueField,
                timeZone: timeZone,
            });
            value = display(valueFromDimensions);
        }
        var formattedValue = dateTimeFormat(source.datapoint[0], {
            defaultWithMS: source.series.hasMsResolution,
            timeZone: timeZone,
        });
        return (React.createElement("div", { className: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          padding: ", " ", ";\n          font-size: ", ";\n          z-index: ", ";\n        "], ["\n          padding: ", " ", ";\n          font-size: ", ";\n          z-index: ", ";\n        "])), theme.spacing.xs, theme.spacing.sm, theme.typography.size.sm, theme.zIndex.tooltip) },
            React.createElement("strong", null, formattedValue),
            React.createElement("div", null,
                React.createElement(SeriesIcon, { color: source.series.color }),
                React.createElement("span", { className: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n              white-space: nowrap;\n              padding-left: ", ";\n            "], ["\n              white-space: nowrap;\n              padding-left: ", ";\n            "])), theme.spacing.xs) }, source.series.alias || source.series.label),
                value && (React.createElement("span", { className: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n                white-space: nowrap;\n                padding-left: ", ";\n              "], ["\n                white-space: nowrap;\n                padding-left: ", ";\n              "])), theme.spacing.md) }, formattedValueToString(value))))));
    };
    return React.createElement(ContextMenu, __assign({}, otherProps, { items: itemsToRender, renderHeader: renderHeader }));
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=GraphContextMenu.js.map