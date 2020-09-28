import React from 'react';
export var TableCell = function (_a) {
    var cell = _a.cell, field = _a.field, tableStyles = _a.tableStyles, onCellFilterAdded = _a.onCellFilterAdded;
    var cellProps = cell.getCellProps();
    if (!field.display) {
        return null;
    }
    if (cellProps.style) {
        cellProps.style.minWidth = cellProps.style.width;
        cellProps.style.justifyContent = cell.column.justifyContent;
    }
    return (React.createElement(React.Fragment, null, cell.render('Cell', {
        field: field,
        tableStyles: tableStyles,
        onCellFilterAdded: onCellFilterAdded,
        cellProps: cellProps,
    })));
};
//# sourceMappingURL=TableCell.js.map