import { __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import { css, cx } from 'emotion';
import { Icon } from '../Icon/Icon';
import { ThemeContext } from '../../themes/ThemeContext';
export var LegendTable = function (_a) {
    var items = _a.items, columns = _a.columns, sortBy = _a.sortBy, sortDesc = _a.sortDesc, itemRenderer = _a.itemRenderer, className = _a.className, onToggleSort = _a.onToggleSort;
    var theme = useContext(ThemeContext);
    return (React.createElement("table", { className: cx(css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          width: 100%;\n          td {\n            padding: 2px 10px;\n          }\n        "], ["\n          width: 100%;\n          td {\n            padding: 2px 10px;\n          }\n        "]))), className) },
        React.createElement("thead", null,
            React.createElement("tr", null, columns.map(function (columnHeader) {
                return (React.createElement("th", { key: columnHeader, className: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                  color: ", ";\n                  font-weight: bold;\n                  text-align: right;\n                  cursor: pointer;\n                "], ["\n                  color: ", ";\n                  font-weight: bold;\n                  text-align: right;\n                  cursor: pointer;\n                "])), theme.colors.textBlue), onClick: function () {
                        if (onToggleSort) {
                            onToggleSort(columnHeader);
                        }
                    } },
                    columnHeader,
                    sortBy === columnHeader && (React.createElement(Icon, { className: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n                      margin-left: ", ";\n                    "], ["\n                      margin-left: ", ";\n                    "])), theme.spacing.sm), name: sortDesc ? 'angle-down' : 'angle-up' }))));
            }))),
        React.createElement("tbody", null, items.map(function (item, index) {
            return itemRenderer ? (itemRenderer(item, index)) : (React.createElement("tr", { key: item.label + "-" + index },
                React.createElement("td", null, item.label)));
        }))));
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=LegendTable.js.map