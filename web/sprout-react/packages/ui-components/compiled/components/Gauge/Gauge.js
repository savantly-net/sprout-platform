import { __extends } from "tslib";
import React, { PureComponent } from 'react';
import $ from 'jquery';
import { getColorFromHexRgbOrName, formattedValueToString, ThresholdsMode, getActiveThreshold, } from '@grafana/data';
import { selectThemeVariant } from '../../themes';
var FONT_SCALE = 1;
var Gauge = /** @class */ (function (_super) {
    __extends(Gauge, _super);
    function Gauge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderVisualization = function () {
            var _a = _this.props, width = _a.width, value = _a.value, height = _a.height, onClick = _a.onClick;
            var autoProps = calculateGaugeAutoProps(width, height, value.title);
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { height: autoProps.gaugeHeight + "px", width: '100%' }, ref: function (element) { return (_this.canvasElement = element); }, onClick: onClick }),
                autoProps.showLabel && (React.createElement("div", { style: {
                        textAlign: 'center',
                        fontSize: autoProps.titleFontSize,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        position: 'relative',
                        width: '100%',
                        top: '-4px',
                        cursor: 'default',
                    } }, value.title))));
        };
        return _this;
    }
    Gauge.prototype.componentDidMount = function () {
        this.draw();
    };
    Gauge.prototype.componentDidUpdate = function () {
        this.draw();
    };
    Gauge.prototype.getFormattedThresholds = function (decimals) {
        var _a, _b;
        var _c = this.props, field = _c.field, theme = _c.theme;
        var thresholds = (_a = field.thresholds) !== null && _a !== void 0 ? _a : (_b = Gauge.defaultProps.field) === null || _b === void 0 ? void 0 : _b.thresholds;
        var isPercent = thresholds.mode === ThresholdsMode.Percentage;
        var steps = thresholds.steps;
        var min = field.min;
        var max = field.max;
        if (isPercent) {
            min = 0;
            max = 100;
        }
        var first = getActiveThreshold(min, steps);
        var last = getActiveThreshold(max, steps);
        var formatted = [];
        formatted.push({ value: +min.toFixed(decimals), color: getColorFromHexRgbOrName(first.color, theme.type) });
        var skip = true;
        for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            if (skip) {
                if (first === step) {
                    skip = false;
                }
                continue;
            }
            var prev = steps[i - 1];
            formatted.push({ value: step.value, color: getColorFromHexRgbOrName(prev.color, theme.type) });
            if (step === last) {
                break;
            }
        }
        formatted.push({ value: +max.toFixed(decimals), color: getColorFromHexRgbOrName(last.color, theme.type) });
        return formatted;
    };
    Gauge.prototype.getFontScale = function (length) {
        if (length > 12) {
            return FONT_SCALE - (length * 5) / 110;
        }
        return FONT_SCALE - (length * 5) / 101;
    };
    Gauge.prototype.draw = function () {
        var _a;
        var _b = this.props, field = _b.field, showThresholdLabels = _b.showThresholdLabels, showThresholdMarkers = _b.showThresholdMarkers, width = _b.width, height = _b.height, theme = _b.theme, value = _b.value;
        var autoProps = calculateGaugeAutoProps(width, height, value.title);
        var dimension = Math.min(width, autoProps.gaugeHeight);
        var backgroundColor = selectThemeVariant({
            dark: theme.palette.dark8,
            light: theme.palette.gray6,
        }, theme.type);
        var gaugeWidthReduceRatio = showThresholdLabels ? 1.5 : 1;
        var gaugeWidth = Math.min(dimension / 5.5, 40) / gaugeWidthReduceRatio;
        var thresholdMarkersWidth = gaugeWidth / 5;
        var text = formattedValueToString(value);
        var fontSize = Math.min(dimension / 4, 100) * (text !== null ? this.getFontScale(text.length) : 1);
        var thresholdLabelFontSize = fontSize / 2.5;
        var min = field.min;
        var max = field.max;
        var numeric = value.numeric;
        if (((_a = field.thresholds) === null || _a === void 0 ? void 0 : _a.mode) === ThresholdsMode.Percentage) {
            min = 0;
            max = 100;
            if (value.percent === undefined) {
                numeric = ((numeric - min) / (max - min)) * 100;
            }
            else {
                numeric = value.percent * 100;
            }
        }
        var decimals = field.decimals === undefined ? 2 : field.decimals;
        if (showThresholdMarkers) {
            min = +min.toFixed(decimals);
            max = +max.toFixed(decimals);
        }
        var options = {
            series: {
                gauges: {
                    gauge: {
                        min: min,
                        max: max,
                        background: { color: backgroundColor },
                        border: { color: null },
                        shadow: { show: false },
                        width: gaugeWidth,
                    },
                    frame: { show: false },
                    label: { show: false },
                    layout: { margin: 0, thresholdWidth: 0, vMargin: 0 },
                    cell: { border: { width: 0 } },
                    threshold: {
                        values: this.getFormattedThresholds(decimals),
                        label: {
                            show: showThresholdLabels,
                            margin: thresholdMarkersWidth + 1,
                            font: { size: thresholdLabelFontSize },
                        },
                        show: showThresholdMarkers,
                        width: thresholdMarkersWidth,
                    },
                    value: {
                        color: value.color,
                        formatter: function () {
                            return text;
                        },
                        font: { size: fontSize, family: theme.typography.fontFamily.sansSerif },
                    },
                    show: true,
                },
            },
        };
        var plotSeries = {
            data: [[0, numeric]],
            label: value.title,
        };
        try {
            $.plot(this.canvasElement, [plotSeries], options);
        }
        catch (err) {
            console.error('Gauge rendering error', err, options, value);
        }
    };
    Gauge.prototype.render = function () {
        return (React.createElement("div", { style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
            }, className: this.props.className }, this.renderVisualization()));
    };
    Gauge.defaultProps = {
        showThresholdMarkers: true,
        showThresholdLabels: false,
        field: {
            min: 0,
            max: 100,
            thresholds: {
                mode: ThresholdsMode.Absolute,
                steps: [
                    { value: -Infinity, color: 'green' },
                    { value: 80, color: 'red' },
                ],
            },
        },
    };
    return Gauge;
}(PureComponent));
export { Gauge };
function calculateGaugeAutoProps(width, height, title) {
    var showLabel = title !== null && title !== undefined;
    var titleFontSize = Math.min((width * 0.15) / 1.5, 20); // 20% of height * line-height, max 40px
    var titleHeight = titleFontSize * 1.5;
    var availableHeight = showLabel ? height - titleHeight : height;
    var gaugeHeight = Math.min(availableHeight, width);
    return {
        showLabel: showLabel,
        gaugeHeight: gaugeHeight,
        titleFontSize: titleFontSize,
    };
}
//# sourceMappingURL=Gauge.js.map