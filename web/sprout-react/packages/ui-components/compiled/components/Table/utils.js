import { __read, __values } from "tslib";
import memoizeOne from 'memoize-one';
import { FieldType, formattedValueToString, getFieldDisplayName, } from '@grafana/data';
import { DefaultCell } from './DefaultCell';
import { BarGaugeCell } from './BarGaugeCell';
import { TableCellDisplayMode } from './types';
import { JSONViewCell } from './JSONViewCell';
import { ImageCell } from './ImageCell';
export function getTextAlign(field) {
    if (!field) {
        return 'flex-start';
    }
    if (field.config.custom) {
        var custom = field.config.custom;
        switch (custom.align) {
            case 'right':
                return 'flex-end';
            case 'left':
                return 'flex-start';
            case 'center':
                return 'center';
        }
    }
    if (field.type === FieldType.number) {
        return 'flex-end';
    }
    return 'flex-start';
}
export function getColumns(data, availableWidth, columnMinWidth) {
    var e_1, _a, e_2, _b;
    var columns = [];
    var fieldCountWithoutWidth = data.fields.length;
    var _loop_1 = function (fieldIndex, field) {
        var fieldTableOptions = (field.config.custom || {});
        if (fieldTableOptions.hidden) {
            return "continue";
        }
        if (fieldTableOptions.width) {
            availableWidth -= fieldTableOptions.width;
            fieldCountWithoutWidth -= 1;
        }
        var selectSortType = function (type) {
            switch (type) {
                case FieldType.number:
                case FieldType.time:
                    return 'basic';
                default:
                    return 'alphanumeric';
            }
        };
        var Cell = getCellComponent(fieldTableOptions.displayMode, field);
        columns.push({
            Cell: Cell,
            id: fieldIndex.toString(),
            Header: getFieldDisplayName(field, data),
            accessor: function (row, i) {
                return field.values.get(i);
            },
            sortType: selectSortType(field.type),
            width: fieldTableOptions.width,
            minWidth: 50,
            filter: memoizeOne(filterByValue),
            justifyContent: getTextAlign(field),
        });
    };
    try {
        for (var _c = __values(data.fields.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
            var _e = __read(_d.value, 2), fieldIndex = _e[0], field = _e[1];
            _loop_1(fieldIndex, field);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // divide up the rest of the space
    var sharedWidth = availableWidth / fieldCountWithoutWidth;
    try {
        for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
            var column = columns_1_1.value;
            if (!column.width) {
                column.width = Math.max(sharedWidth, columnMinWidth);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (columns_1_1 && !columns_1_1.done && (_b = columns_1.return)) _b.call(columns_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return columns;
}
function getCellComponent(displayMode, field) {
    switch (displayMode) {
        case TableCellDisplayMode.ColorText:
        case TableCellDisplayMode.ColorBackground:
            return DefaultCell;
        case TableCellDisplayMode.Image:
            return ImageCell;
        case TableCellDisplayMode.LcdGauge:
        case TableCellDisplayMode.BasicGauge:
        case TableCellDisplayMode.GradientGauge:
            return BarGaugeCell;
        case TableCellDisplayMode.JSONView:
            return JSONViewCell;
    }
    // Default or Auto
    if (field.type === FieldType.other) {
        return JSONViewCell;
    }
    return DefaultCell;
}
export function filterByValue(rows, id, filterValues) {
    if (rows.length === 0) {
        return rows;
    }
    if (!filterValues) {
        return rows;
    }
    return rows.filter(function (row) {
        if (!row.values.hasOwnProperty(id)) {
            return false;
        }
        var value = row.values[id];
        return filterValues.find(function (filter) { return filter.value === value; }) !== undefined;
    });
}
export function calculateUniqueFieldValues(rows, field) {
    if (!field || rows.length === 0) {
        return {};
    }
    var set = {};
    for (var index = 0; index < rows.length; index++) {
        var fieldIndex = parseInt(rows[index].id, 10);
        var fieldValue = field.values.get(fieldIndex);
        var displayValue = field.display ? field.display(fieldValue) : fieldValue;
        var value = field.display ? formattedValueToString(displayValue) : displayValue;
        set[value || '(Blanks)'] = fieldValue;
    }
    return set;
}
export function valuesToOptions(unique) {
    return Object.keys(unique)
        .reduce(function (all, key) { return all.concat({ value: unique[key], label: key }); }, [])
        .sort(sortOptions);
}
export function sortOptions(a, b) {
    if (a.label === undefined && b.label === undefined) {
        return 0;
    }
    if (a.label === undefined && b.label !== undefined) {
        return -1;
    }
    if (a.label !== undefined && b.label === undefined) {
        return 1;
    }
    if (a.label < b.label) {
        return -1;
    }
    if (a.label > b.label) {
        return 1;
    }
    return 0;
}
export function getFilteredOptions(options, filterValues) {
    if (!filterValues) {
        return [];
    }
    return options.filter(function (option) { return filterValues.some(function (filtered) { return filtered.value === option.value; }); });
}
//# sourceMappingURL=utils.js.map