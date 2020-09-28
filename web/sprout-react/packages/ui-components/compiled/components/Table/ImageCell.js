import { __assign } from "tslib";
import React from 'react';
export var ImageCell = function (props) {
    var cell = props.cell, tableStyles = props.tableStyles, cellProps = props.cellProps;
    return (React.createElement("div", __assign({}, cellProps, { className: tableStyles.cellContainer }),
        React.createElement("img", { src: cell.value, className: tableStyles.imageCell })));
};
//# sourceMappingURL=ImageCell.js.map