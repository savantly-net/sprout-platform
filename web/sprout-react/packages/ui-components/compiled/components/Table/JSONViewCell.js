import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
import { isString } from 'lodash';
import { Tooltip } from '../Tooltip/Tooltip';
import { JSONFormatter } from '../JSONFormatter/JSONFormatter';
import { useStyles } from '../../themes';
export var JSONViewCell = function (props) {
    var cell = props.cell, tableStyles = props.tableStyles, cellProps = props.cellProps;
    var txt = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    cursor: pointer;\n    font-family: monospace;\n  "], ["\n    cursor: pointer;\n    font-family: monospace;\n  "])));
    var value = cell.value;
    var displayValue = value;
    if (isString(value)) {
        try {
            value = JSON.parse(value);
        }
        catch (_a) { } // ignore errors
    }
    else {
        displayValue = JSON.stringify(value);
    }
    var content = React.createElement(JSONTooltip, { value: value });
    return (React.createElement("div", __assign({}, cellProps, { className: tableStyles.cellContainer }),
        React.createElement(Tooltip, { placement: "auto", content: content, theme: "info-alt" },
            React.createElement("div", { className: cx(tableStyles.cellText, txt) }, displayValue))));
};
var JSONTooltip = function (props) {
    var styles = useStyles(function (theme) {
        return {
            container: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        padding: ", ";\n      "], ["\n        padding: ", ";\n      "])), theme.spacing.xs),
        };
    });
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", null,
            React.createElement(JSONFormatter, { json: props.value, open: 4 }))));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=JSONViewCell.js.map