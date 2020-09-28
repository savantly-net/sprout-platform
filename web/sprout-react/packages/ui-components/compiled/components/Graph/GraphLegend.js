import { __assign, __makeTemplateObject, __rest } from "tslib";
import React, { useContext } from 'react';
import { LegendDisplayMode } from '../Legend/Legend';
import { GraphLegendListItem, GraphLegendTableRow } from './GraphLegendItem';
import { LegendTable } from '../Legend/LegendTable';
import { LegendList } from '../Legend/LegendList';
import union from 'lodash/union';
import sortBy from 'lodash/sortBy';
import { ThemeContext } from '../../themes/ThemeContext';
import { css } from 'emotion';
import { selectThemeVariant } from '../../themes/index';
export var GraphLegend = function (_a) {
    var items = _a.items, displayMode = _a.displayMode, sortKey = _a.sortBy, sortDesc = _a.sortDesc, onToggleSort = _a.onToggleSort, onSeriesAxisToggle = _a.onSeriesAxisToggle, placement = _a.placement, className = _a.className, graphLegendItemProps = __rest(_a, ["items", "displayMode", "sortBy", "sortDesc", "onToggleSort", "onSeriesAxisToggle", "placement", "className"]);
    var theme = useContext(ThemeContext);
    if (displayMode === LegendDisplayMode.Table) {
        var columns = items
            .map(function (item) {
            if (item.displayValues) {
                return item.displayValues.map(function (i) { return i.title; });
            }
            return [];
        })
            .reduce(function (acc, current) {
            return union(acc, current.filter(function (item) { return !!item; }));
        }, ['']);
        var sortedItems = sortKey
            ? sortBy(items, function (item) {
                if (item.displayValues) {
                    var stat = item.displayValues.filter(function (stat) { return stat.title === sortKey; })[0];
                    return stat && stat.numeric;
                }
                return undefined;
            })
            : items;
        var legendTableEvenRowBackground_1 = selectThemeVariant({
            dark: theme.palette.dark6,
            light: theme.palette.gray5,
        }, theme.type);
        return (React.createElement(LegendTable, { className: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          font-size: ", ";\n          th {\n            padding: ", " ", ";\n          }\n        "], ["\n          font-size: ", ";\n          th {\n            padding: ", " ", ";\n          }\n        "])), theme.typography.size.sm, theme.spacing.xxs, theme.spacing.sm), items: sortDesc ? sortedItems.reverse() : sortedItems, columns: columns, placement: placement, sortBy: sortKey, sortDesc: sortDesc, itemRenderer: function (item, index) { return (React.createElement(GraphLegendTableRow, __assign({ key: item.label + "-" + index, item: item, onToggleAxis: function () {
                    if (onSeriesAxisToggle) {
                        onSeriesAxisToggle(item.label, item.yAxis === 1 ? 2 : 1);
                    }
                }, className: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n              background: ", ";\n            "], ["\n              background: ", ";\n            "])), index % 2 === 0 ? legendTableEvenRowBackground_1 : 'none') }, graphLegendItemProps))); }, onToggleSort: onToggleSort }));
    }
    return (React.createElement(LegendList, { items: items, placement: placement, itemRenderer: function (item) { return (React.createElement(GraphLegendListItem, __assign({ item: item, onToggleAxis: function () {
                if (onSeriesAxisToggle) {
                    onSeriesAxisToggle(item.label, item.yAxis === 1 ? 2 : 1);
                }
            } }, graphLegendItemProps))); } }));
};
GraphLegend.displayName = 'GraphLegend';
var templateObject_1, templateObject_2;
//# sourceMappingURL=GraphLegend.js.map