import { __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import { css, cx } from 'emotion';
import { LegendSeriesIcon } from '../Legend/LegendSeriesIcon';
import { LegendStatsList } from '../Legend/LegendStatsList';
import { ThemeContext } from '../../themes/ThemeContext';
import { stylesFactory } from '../../themes';
import { formattedValueToString } from '@grafana/data';
export var GraphLegendListItem = function (_a) {
    var item = _a.item, onSeriesColorChange = _a.onSeriesColorChange, onToggleAxis = _a.onToggleAxis, onLabelClick = _a.onLabelClick;
    var theme = useContext(ThemeContext);
    var styles = getStyles(theme);
    return (React.createElement(React.Fragment, null,
        React.createElement(LegendSeriesIcon, { disabled: !onSeriesColorChange, color: item.color, onColorChange: function (color) {
                if (onSeriesColorChange) {
                    onSeriesColorChange(item.label, color);
                }
            }, onToggleAxis: onToggleAxis, yAxis: item.yAxis }),
        React.createElement("div", { onClick: function (event) {
                if (onLabelClick) {
                    onLabelClick(item, event);
                }
            }, className: cx(styles.label, !item.isVisible && styles.labelDisabled) }, item.label),
        item.displayValues && React.createElement(LegendStatsList, { stats: item.displayValues })));
};
var getStyles = stylesFactory(function (theme) {
    return {
        row: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      label: LegendRow;\n      font-size: ", ";\n      td {\n        padding: ", " ", ";\n        white-space: nowrap;\n      }\n    "], ["\n      label: LegendRow;\n      font-size: ", ";\n      td {\n        padding: ", " ", ";\n        white-space: nowrap;\n      }\n    "])), theme.typography.size.sm, theme.spacing.xxs, theme.spacing.sm),
        label: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      label: LegendLabel;\n      cursor: pointer;\n      white-space: nowrap;\n    "], ["\n      label: LegendLabel;\n      cursor: pointer;\n      white-space: nowrap;\n    "]))),
        labelDisabled: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      label: LegendLabelDisabled;\n      color: ", ";\n    "], ["\n      label: LegendLabelDisabled;\n      color: ", ";\n    "])), theme.colors.linkDisabled),
        itemWrapper: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      display: flex;\n      white-space: nowrap;\n    "], ["\n      display: flex;\n      white-space: nowrap;\n    "]))),
        value: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      text-align: right;\n    "], ["\n      text-align: right;\n    "]))),
        yAxisLabel: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      color: ", ";\n    "], ["\n      color: ", ";\n    "])), theme.palette.gray2),
    };
});
export var GraphLegendTableRow = function (_a) {
    var item = _a.item, onSeriesColorChange = _a.onSeriesColorChange, onToggleAxis = _a.onToggleAxis, onLabelClick = _a.onLabelClick, className = _a.className;
    var theme = useContext(ThemeContext);
    var styles = getStyles(theme);
    return (React.createElement("tr", { className: cx(styles.row, className) },
        React.createElement("td", null,
            React.createElement("span", { className: styles.itemWrapper },
                React.createElement(LegendSeriesIcon, { disabled: !!onSeriesColorChange, color: item.color, onColorChange: function (color) {
                        if (onSeriesColorChange) {
                            onSeriesColorChange(item.label, color);
                        }
                    }, onToggleAxis: onToggleAxis, yAxis: item.yAxis }),
                React.createElement("div", { onClick: function (event) {
                        if (onLabelClick) {
                            onLabelClick(item, event);
                        }
                    }, className: styles.label },
                    item.label,
                    " ",
                    item.yAxis === 2 && React.createElement("span", { className: styles.yAxisLabel }, "(right y-axis)")))),
        item.displayValues &&
            item.displayValues.map(function (stat, index) {
                return (React.createElement("td", { className: styles.value, key: stat.title + "-" + index }, formattedValueToString(stat)));
            })));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=GraphLegendItem.js.map