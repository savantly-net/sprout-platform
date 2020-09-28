import { __assign, __values } from "tslib";
import React, { memo, useCallback, useMemo } from 'react';
import { getFieldDisplayName } from '@savantly/sprout-api';
import { useAbsoluteLayout, useFilters, useResizeColumns, useSortBy, useTable, } from 'react-table';
import { FixedSizeList } from 'react-window';
import { getColumns } from './utils';
import { useTheme } from '../../themes';
import { getTableStyles } from './styles';
import { Icon } from '../Icon/Icon';
import { CustomScrollbar } from '../CustomScrollbar/CustomScrollbar';
import { Filter } from './Filter';
import { TableCell } from './TableCell';
var COLUMN_MIN_WIDTH = 150;
function useTableStateReducer(props) {
    return useCallback(function (newState, action) {
        var e_1, _a;
        switch (action.type) {
            case 'columnDoneResizing':
                if (props.onColumnResize) {
                    var data = props.data;
                    var info = newState.columnResizing.headerIdWidths[0];
                    var columnIdString = info[0];
                    var fieldIndex = parseInt(columnIdString, 10);
                    var width = Math.round(newState.columnResizing.columnWidths[columnIdString]);
                    var field = data.fields[fieldIndex];
                    if (!field) {
                        return newState;
                    }
                    var fieldDisplayName = getFieldDisplayName(field, data);
                    props.onColumnResize(fieldDisplayName, width);
                }
            case 'toggleSortBy':
                if (props.onSortByChange) {
                    var data = props.data;
                    var sortByFields = [];
                    try {
                        for (var _b = __values(newState.sortBy), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var sortItem = _c.value;
                            var field = data.fields[parseInt(sortItem.id, 10)];
                            if (!field) {
                                continue;
                            }
                            sortByFields.push({
                                displayName: getFieldDisplayName(field, data),
                                desc: sortItem.desc,
                            });
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    props.onSortByChange(sortByFields);
                }
                break;
        }
        return newState;
    }, [props.onColumnResize, props.onSortByChange, props.data]);
}
function getInitialState(props, columns) {
    var e_2, _a, e_3, _b;
    var state = {};
    if (props.initialSortBy) {
        state.sortBy = [];
        try {
            for (var _c = __values(props.initialSortBy), _d = _c.next(); !_d.done; _d = _c.next()) {
                var sortBy = _d.value;
                try {
                    for (var columns_1 = (e_3 = void 0, __values(columns)), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                        var col = columns_1_1.value;
                        if (col.Header === sortBy.displayName) {
                            state.sortBy.push({ id: col.id, desc: sortBy.desc });
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (columns_1_1 && !columns_1_1.done && (_b = columns_1.return)) _b.call(columns_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return state;
}
export var Table = memo(function (props) {
    var ariaLabel = props.ariaLabel, data = props.data, height = props.height, onCellFilterAdded = props.onCellFilterAdded, width = props.width, _a = props.columnMinWidth, columnMinWidth = _a === void 0 ? COLUMN_MIN_WIDTH : _a, noHeader = props.noHeader, _b = props.resizable, resizable = _b === void 0 ? true : _b;
    var theme = useTheme();
    var tableStyles = getTableStyles(theme);
    // React table data array. This data acts just like a dummy array to let react-table know how many rows exist
    // The cells use the field to look up values
    var memoizedData = useMemo(function () {
        if (!data.fields.length) {
            return [];
        }
        // as we only use this to fake the length of our data set for react-table we need to make sure we always return an array
        // filled with values at each index otherwise we'll end up trying to call accessRow for null|undefined value in
        // https://github.com/tannerlinsley/react-table/blob/7be2fc9d8b5e223fc998af88865ae86a88792fdb/src/hooks/useTable.js#L585
        return Array(data.length).fill(0);
    }, [data]);
    // React-table column definitions
    var memoizedColumns = useMemo(function () { return getColumns(data, width, columnMinWidth); }, [data, width, columnMinWidth]);
    // Internal react table state reducer
    var stateReducer = useTableStateReducer(props);
    var options = useMemo(function () { return ({
        columns: memoizedColumns,
        data: memoizedData,
        disableResizing: !resizable,
        stateReducer: stateReducer,
        initialState: getInitialState(props, memoizedColumns),
    }); }, [memoizedColumns, memoizedData, stateReducer, resizable]);
    var _c = useTable(options, useFilters, useSortBy, useAbsoluteLayout, useResizeColumns), getTableProps = _c.getTableProps, headerGroups = _c.headerGroups, rows = _c.rows, prepareRow = _c.prepareRow, totalColumnsWidth = _c.totalColumnsWidth;
    var RenderRow = React.useCallback(function (_a) {
        var index = _a.index, style = _a.style;
        var row = rows[index];
        prepareRow(row);
        return (React.createElement("div", __assign({}, row.getRowProps({ style: style }), { className: tableStyles.row }), row.cells.map(function (cell, index) { return (React.createElement(TableCell, { key: index, field: data.fields[index], tableStyles: tableStyles, cell: cell, onCellFilterAdded: onCellFilterAdded })); })));
    }, [prepareRow, rows]);
    var headerHeight = noHeader ? 0 : tableStyles.cellHeight;
    return (React.createElement("div", __assign({}, getTableProps(), { className: tableStyles.table, "aria-label": ariaLabel }),
        React.createElement(CustomScrollbar, { hideVerticalTrack: true },
            React.createElement("div", { style: { width: totalColumnsWidth + "px" } },
                !noHeader && (React.createElement("div", null, headerGroups.map(function (headerGroup) {
                    return (React.createElement("div", __assign({ className: tableStyles.thead }, headerGroup.getHeaderGroupProps()), headerGroup.headers.map(function (column, index) {
                        return renderHeaderCell(column, tableStyles, data.fields[index]);
                    })));
                }))),
                React.createElement(FixedSizeList, { height: height - headerHeight, itemCount: rows.length, itemSize: tableStyles.rowHeight, width: '100%', style: { overflow: 'hidden auto' } }, RenderRow)))));
});
Table.displayName = 'Table';
function renderHeaderCell(column, tableStyles, field) {
    var headerProps = column.getHeaderProps();
    if (column.canResize) {
        headerProps.style.userSelect = column.isResizing ? 'none' : 'auto'; // disables selecting text while resizing
    }
    headerProps.style.position = 'absolute';
    headerProps.style.justifyContent = column.justifyContent;
    return (React.createElement("div", __assign({ className: tableStyles.headerCell }, headerProps),
        column.canSort && (React.createElement(React.Fragment, null,
            React.createElement("div", __assign({}, column.getSortByToggleProps(), { className: tableStyles.headerCellLabel, title: column.render('Header') }),
                React.createElement("div", null, column.render('Header')),
                React.createElement("div", null, column.isSorted && (column.isSortedDesc ? React.createElement(Icon, { name: "arrow-down" }) : React.createElement(Icon, { name: "arrow-up" })))),
            column.canFilter && React.createElement(Filter, { column: column, tableStyles: tableStyles, field: field }))),
        !column.canSort && column.render('Header'),
        !column.canSort && column.canFilter && React.createElement(Filter, { column: column, tableStyles: tableStyles, field: field }),
        column.canResize && React.createElement("div", __assign({}, column.getResizerProps(), { className: tableStyles.resizeHandle }))));
}
//# sourceMappingURL=Table.js.map