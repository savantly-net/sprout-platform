import { __extends } from "tslib";
import React, { PureComponent } from 'react';
import { select, pie, arc, event } from 'd3';
import sum from 'lodash/sum';
import { GrafanaThemeType, formattedValueToString } from '@savantly/sprout-api';
import { colors as grafana_colors } from '../../utils/index';
export var PieChartType;
(function (PieChartType) {
    PieChartType["PIE"] = "pie";
    PieChartType["DONUT"] = "donut";
})(PieChartType || (PieChartType = {}));
var PieChart = /** @class */ (function (_super) {
    __extends(PieChart, _super);
    function PieChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PieChart.prototype.componentDidMount = function () {
        this.draw();
    };
    PieChart.prototype.componentDidUpdate = function () {
        this.draw();
    };
    PieChart.prototype.draw = function () {
        var _this = this;
        var _a = this.props, values = _a.values, pieType = _a.pieType, strokeWidth = _a.strokeWidth;
        if (values.length === 0) {
            return;
        }
        var data = values.map(function (datapoint) { return datapoint.numeric; });
        var names = values.map(function (datapoint) { return formattedValueToString(datapoint); });
        var colors = values.map(function (p, idx) {
            if (p.color) {
                return p.color;
            }
            return grafana_colors[idx % grafana_colors.length];
        });
        var total = sum(data) || 1;
        var percents = data.map(function (item) { return (item / total) * 100; });
        var width = this.containerElement.offsetWidth;
        var height = this.containerElement.offsetHeight;
        var radius = Math.min(width, height) / 2;
        var outerRadius = radius - radius / 10;
        var innerRadius = pieType === PieChartType.PIE ? 0 : radius - radius / 3;
        var svg = select(this.svgElement)
            .html('')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', "translate(" + width / 2 + "," + height / 2 + ")");
        var pieChart = pie();
        var customArc = arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)
            .padAngle(0);
        svg
            .selectAll('path')
            .data(pieChart(data))
            .enter()
            .append('path')
            .attr('d', customArc)
            .attr('fill', function (d, idx) { return colors[idx]; })
            .style('fill-opacity', 0.15)
            .style('stroke', function (d, idx) { return colors[idx]; })
            .style('stroke-width', strokeWidth + "px")
            .on('mouseover', function (d, idx) {
            select(_this.tooltipElement).style('opacity', 1);
            select(_this.tooltipValueElement).text(names[idx] + " (" + percents[idx].toFixed(2) + "%)");
        })
            .on('mousemove', function () {
            select(_this.tooltipElement)
                .style('top', event.pageY - height / 2 + "px")
                .style('left', event.pageX + "px");
        })
            .on('mouseout', function () {
            select(_this.tooltipElement).style('opacity', 0);
        });
    };
    PieChart.prototype.render = function () {
        var _this = this;
        var _a = this.props, height = _a.height, width = _a.width, values = _a.values;
        if (values.length > 0) {
            return (React.createElement("div", { className: "piechart-panel" },
                React.createElement("div", { ref: function (element) { return (_this.containerElement = element); }, className: "piechart-container", style: {
                        height: height * 0.9 + "px",
                        width: Math.min(width, height * 1.3) + "px",
                    } },
                    React.createElement("svg", { ref: function (element) { return (_this.svgElement = element); } })),
                React.createElement("div", { className: "piechart-tooltip", ref: function (element) { return (_this.tooltipElement = element); } },
                    React.createElement("div", { className: "piechart-tooltip-time" },
                        React.createElement("div", { id: "tooltip-value", className: "piechart-tooltip-value", ref: function (element) { return (_this.tooltipValueElement = element); } })))));
        }
        else {
            return (React.createElement("div", { className: "piechart-panel" },
                React.createElement("div", { className: "datapoints-warning" },
                    React.createElement("span", { className: "small" }, "No data points"))));
        }
    };
    PieChart.defaultProps = {
        pieType: 'pie',
        format: 'short',
        stat: 'current',
        strokeWidth: 1,
        theme: GrafanaThemeType.Dark,
    };
    return PieChart;
}(PureComponent));
export { PieChart };
//# sourceMappingURL=PieChart.js.map