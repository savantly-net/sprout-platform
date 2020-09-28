// Libraries
import { __makeTemplateObject } from "tslib";
import React from 'react';
import { css } from 'emotion';
import { Graph } from './Graph';
import { GraphLegend } from './GraphLegend';
import { CustomScrollbar } from '../CustomScrollbar/CustomScrollbar';
import { stylesFactory } from '../../themes';
var getGraphWithLegendStyles = stylesFactory(function (_a) {
    var placement = _a.placement;
    return ({
        wrapper: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: ", ";\n    height: 100%;\n  "], ["\n    display: flex;\n    flex-direction: ", ";\n    height: 100%;\n  "])), placement === 'under' ? 'column' : 'row'),
        graphContainer: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    min-height: 65%;\n    flex-grow: 1;\n  "], ["\n    min-height: 65%;\n    flex-grow: 1;\n  "]))),
        legendContainer: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    padding: 10px 0;\n    max-height: ", ";\n  "], ["\n    padding: 10px 0;\n    max-height: ", ";\n  "])), placement === 'under' ? '35%' : 'none'),
    });
});
var shouldHideLegendItem = function (data, hideEmpty, hideZero) {
    if (hideEmpty === void 0) { hideEmpty = false; }
    if (hideZero === void 0) { hideZero = false; }
    var isZeroOnlySeries = data.reduce(function (acc, current) { return acc + (current[1] || 0); }, 0) === 0;
    var isNullOnlySeries = !data.reduce(function (acc, current) { return acc && current[1] !== null; }, true);
    return (hideEmpty && isNullOnlySeries) || (hideZero && isZeroOnlySeries);
};
export var GraphWithLegend = function (props) {
    var series = props.series, timeRange = props.timeRange, width = props.width, height = props.height, showBars = props.showBars, showLines = props.showLines, showPoints = props.showPoints, sortLegendBy = props.sortLegendBy, sortLegendDesc = props.sortLegendDesc, isLegendVisible = props.isLegendVisible, displayMode = props.displayMode, placement = props.placement, onSeriesAxisToggle = props.onSeriesAxisToggle, onSeriesColorChange = props.onSeriesColorChange, onSeriesToggle = props.onSeriesToggle, onToggleSort = props.onToggleSort, hideEmpty = props.hideEmpty, hideZero = props.hideZero, isStacked = props.isStacked, lineWidth = props.lineWidth, onHorizontalRegionSelected = props.onHorizontalRegionSelected, timeZone = props.timeZone, children = props.children, ariaLabel = props.ariaLabel;
    var _a = getGraphWithLegendStyles(props), graphContainer = _a.graphContainer, wrapper = _a.wrapper, legendContainer = _a.legendContainer;
    var legendItems = series.reduce(function (acc, s) {
        return shouldHideLegendItem(s.data, hideEmpty, hideZero)
            ? acc
            : acc.concat([
                {
                    label: s.label,
                    color: s.color || '',
                    isVisible: s.isVisible,
                    yAxis: s.yAxis.index,
                    displayValues: s.info || [],
                },
            ]);
    }, []);
    return (React.createElement("div", { className: wrapper, "aria-label": ariaLabel },
        React.createElement("div", { className: graphContainer },
            React.createElement(Graph, { series: series, timeRange: timeRange, timeZone: timeZone, showLines: showLines, showPoints: showPoints, showBars: showBars, width: width, height: height, key: isLegendVisible ? 'legend-visible' : 'legend-invisible', isStacked: isStacked, lineWidth: lineWidth, onHorizontalRegionSelected: onHorizontalRegionSelected }, children)),
        isLegendVisible && (React.createElement("div", { className: legendContainer },
            React.createElement(CustomScrollbar, { hideHorizontalTrack: true },
                React.createElement(GraphLegend, { items: legendItems, displayMode: displayMode, placement: placement, sortBy: sortLegendBy, sortDesc: sortLegendDesc, onLabelClick: function (item, event) {
                        if (onSeriesToggle) {
                            onSeriesToggle(item.label, event);
                        }
                    }, onSeriesColorChange: onSeriesColorChange, onSeriesAxisToggle: onSeriesAxisToggle, onToggleSort: onToggleSort }))))));
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=GraphWithLegend.js.map