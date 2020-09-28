import { __assign } from "tslib";
import React from 'react';
import { formattedValueToString } from '@grafana/data';
import { TableCellDisplayMode } from './types';
import tinycolor from 'tinycolor2';
import { FilterActions } from './FilterActions';
export var DefaultCell = function (props) {
    var field = props.field, cell = props.cell, tableStyles = props.tableStyles, row = props.row, cellProps = props.cellProps;
    var displayValue = field.display(cell.value);
    var value = formattedValueToString(displayValue);
    var cellStyle = getCellStyle(tableStyles, field, displayValue);
    var showFilters = field.config.filterable;
    var link;
    var onClick;
    if (field.getLinks) {
        link = field.getLinks({
            valueRowIndex: row.index,
        })[0];
    }
    if (link && link.onClick) {
        onClick = function (event) {
            // Allow opening in new tab
            if (!(event.ctrlKey || event.metaKey || event.shiftKey) && link.onClick) {
                event.preventDefault();
                link.onClick(event);
            }
        };
    }
    return (React.createElement("div", __assign({}, cellProps, { className: cellStyle }),
        !link && React.createElement("div", { className: tableStyles.cellText }, value),
        link && (React.createElement("a", { href: link.href, onClick: onClick, target: link.target, title: link.title, className: tableStyles.cellLink }, value)),
        showFilters && cell.value && React.createElement(FilterActions, __assign({}, props))));
};
function getCellStyle(tableStyles, field, displayValue) {
    var _a, _b;
    if (((_a = field.config.custom) === null || _a === void 0 ? void 0 : _a.displayMode) === TableCellDisplayMode.ColorText) {
        return tableStyles.buildCellContainerStyle(displayValue.color);
    }
    if (((_b = field.config.custom) === null || _b === void 0 ? void 0 : _b.displayMode) === TableCellDisplayMode.ColorBackground) {
        var themeFactor = tableStyles.theme.isDark ? 1 : -0.7;
        var bgColor2 = tinycolor(displayValue.color)
            .darken(10 * themeFactor)
            .spin(5)
            .toRgbString();
        return tableStyles.buildCellContainerStyle('white', "linear-gradient(120deg, " + bgColor2 + ", " + displayValue.color + ")");
    }
    return tableStyles.cellContainer;
}
//# sourceMappingURL=DefaultCell.js.map