import { __makeTemplateObject } from "tslib";
import React from 'react';
import { stylesFactory } from '../../../themes/stylesFactory';
import { css, cx } from 'emotion';
import { SeriesIcon } from '../../Legend/SeriesIcon';
import { useTheme } from '../../../themes';
var getSeriesTableRowStyles = stylesFactory(function (theme) {
    return {
        icon: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      margin-right: ", ";\n    "], ["\n      margin-right: ", ";\n    "])), theme.spacing.xs),
        seriesTable: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      display: table;\n    "], ["\n      display: table;\n    "]))),
        seriesTableRow: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      display: table-row;\n      font-size: ", ";\n    "], ["\n      display: table-row;\n      font-size: ", ";\n    "])), theme.typography.size.sm),
        seriesTableCell: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      display: table-cell;\n    "], ["\n      display: table-cell;\n    "]))),
        label: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      word-break: break-all;\n    "], ["\n      word-break: break-all;\n    "]))),
        value: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      padding-left: ", ";\n    "], ["\n      padding-left: ", ";\n    "])), theme.spacing.md),
        activeSeries: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      font-weight: ", ";\n    "], ["\n      font-weight: ", ";\n    "])), theme.typography.weight.bold),
        timestamp: css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      font-weight: ", ";\n      font-size: ", ";\n    "], ["\n      font-weight: ", ";\n      font-size: ", ";\n    "])), theme.typography.weight.bold, theme.typography.size.sm),
    };
});
var SeriesTableRow = function (_a) {
    var color = _a.color, label = _a.label, value = _a.value, isActive = _a.isActive;
    var theme = useTheme();
    var styles = getSeriesTableRowStyles(theme);
    return (React.createElement("div", { className: cx(styles.seriesTableRow, isActive && styles.activeSeries) },
        color && (React.createElement("div", { className: styles.seriesTableCell },
            React.createElement(SeriesIcon, { color: color, className: styles.icon }))),
        React.createElement("div", { className: cx(styles.seriesTableCell, styles.label) }, label),
        React.createElement("div", { className: cx(styles.seriesTableCell, styles.value) }, value)));
};
export var SeriesTable = function (_a) {
    var timestamp = _a.timestamp, series = _a.series;
    var theme = useTheme();
    var styles = getSeriesTableRowStyles(theme);
    return (React.createElement(React.Fragment, null,
        timestamp && (React.createElement("div", { className: styles.timestamp, "aria-label": "Timestamp" }, timestamp)),
        series.map(function (s) {
            return React.createElement(SeriesTableRow, { isActive: s.isActive, label: s.label, color: s.color, value: s.value, key: s.label });
        })));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=SeriesTable.js.map