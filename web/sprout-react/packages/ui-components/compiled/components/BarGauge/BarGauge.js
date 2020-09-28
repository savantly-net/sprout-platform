import { __extends } from "tslib";
// Library
import React, { PureComponent } from 'react';
import tinycolor from 'tinycolor2';
import * as d3 from 'd3-scale-chromatic';
import { formattedValueToString, ThresholdsMode, FieldColorMode, } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
// Components
import { FormattedValueDisplay } from '../FormattedValueDisplay/FormattedValueDisplay';
// Utils
import { getColorFromHexRgbOrName } from '@grafana/data';
import { measureText, calculateFontSize } from '../../utils/measureText';
// Types
import { VizOrientation } from '@grafana/data';
var MIN_VALUE_HEIGHT = 18;
var MAX_VALUE_HEIGHT = 50;
var MIN_VALUE_WIDTH = 50;
var MAX_VALUE_WIDTH = 150;
var TITLE_LINE_HEIGHT = 1.5;
var VALUE_LINE_HEIGHT = 1;
var VALUE_LEFT_PADDING = 10;
export var BarGaugeDisplayMode;
(function (BarGaugeDisplayMode) {
    BarGaugeDisplayMode["Basic"] = "basic";
    BarGaugeDisplayMode["Lcd"] = "lcd";
    BarGaugeDisplayMode["Gradient"] = "gradient";
})(BarGaugeDisplayMode || (BarGaugeDisplayMode = {}));
var BarGauge = /** @class */ (function (_super) {
    __extends(BarGauge, _super);
    function BarGauge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BarGauge.prototype.render = function () {
        var _a = this.props, onClick = _a.onClick, className = _a.className;
        var title = this.props.value.title;
        var styles = getTitleStyles(this.props);
        if (!title) {
            return (React.createElement("div", { style: styles.wrapper, onClick: onClick, className: className }, this.renderBarAndValue()));
        }
        return (React.createElement("div", { style: styles.wrapper, onClick: onClick, className: className },
            React.createElement("div", { style: styles.title }, title),
            this.renderBarAndValue()));
    };
    BarGauge.prototype.renderBarAndValue = function () {
        switch (this.props.displayMode) {
            case 'lcd':
                return this.renderRetroBars();
            case 'basic':
            case 'gradient':
            default:
                return this.renderBasicAndGradientBars();
        }
    };
    BarGauge.prototype.renderBasicAndGradientBars = function () {
        var _a = this.props, value = _a.value, showUnfilled = _a.showUnfilled;
        var styles = getBasicAndGradientStyles(this.props);
        return (React.createElement("div", { style: styles.wrapper },
            React.createElement(FormattedValueDisplay, { "aria-label": selectors.components.Panels.Visualization.BarGauge.value, value: value, style: styles.value }),
            showUnfilled && React.createElement("div", { style: styles.emptyBar }),
            React.createElement("div", { style: styles.bar })));
    };
    BarGauge.prototype.getCellColor = function (positionValue) {
        var _a = this.props, value = _a.value, display = _a.display;
        if (positionValue === null) {
            return {
                background: 'gray',
                border: 'gray',
            };
        }
        var color = display ? display(positionValue).color : null;
        if (color) {
            // if we are past real value the cell is not "on"
            if (value === null || (positionValue !== null && positionValue > value.numeric)) {
                return {
                    background: tinycolor(color)
                        .setAlpha(0.18)
                        .toRgbString(),
                    border: 'transparent',
                    isLit: false,
                };
            }
            else {
                return {
                    background: tinycolor(color)
                        .setAlpha(0.95)
                        .toRgbString(),
                    backgroundShade: tinycolor(color)
                        .setAlpha(0.55)
                        .toRgbString(),
                    border: tinycolor(color)
                        .setAlpha(0.9)
                        .toRgbString(),
                    isLit: true,
                };
            }
        }
        return {
            background: 'gray',
            border: 'gray',
        };
    };
    BarGauge.prototype.renderRetroBars = function () {
        var _a = this.props, field = _a.field, value = _a.value, itemSpacing = _a.itemSpacing, alignmentFactors = _a.alignmentFactors, orientation = _a.orientation, lcdCellWidth = _a.lcdCellWidth;
        var _b = calculateBarAndValueDimensions(this.props), valueHeight = _b.valueHeight, valueWidth = _b.valueWidth, maxBarHeight = _b.maxBarHeight, maxBarWidth = _b.maxBarWidth, wrapperWidth = _b.wrapperWidth, wrapperHeight = _b.wrapperHeight;
        var minValue = field.min;
        var maxValue = field.max;
        var isVert = isVertical(orientation);
        var valueRange = maxValue - minValue;
        var maxSize = isVert ? maxBarHeight : maxBarWidth;
        var cellSpacing = itemSpacing;
        var cellCount = Math.floor(maxSize / lcdCellWidth);
        var cellSize = Math.floor((maxSize - cellSpacing * cellCount) / cellCount);
        var valueColor = getValueColor(this.props);
        var valueToBaseSizeOn = alignmentFactors ? alignmentFactors : value;
        var valueStyles = getValueStyles(valueToBaseSizeOn, valueColor, valueWidth, valueHeight, orientation);
        var containerStyles = {
            width: wrapperWidth + "px",
            height: wrapperHeight + "px",
            display: 'flex',
        };
        if (isVert) {
            containerStyles.flexDirection = 'column-reverse';
            containerStyles.alignItems = 'center';
        }
        else {
            containerStyles.flexDirection = 'row';
            containerStyles.alignItems = 'center';
            valueStyles.justifyContent = 'flex-end';
        }
        var cells = [];
        for (var i = 0; i < cellCount; i++) {
            var currentValue = minValue + (valueRange / cellCount) * i;
            var cellColor = this.getCellColor(currentValue);
            var cellStyles = {
                borderRadius: '2px',
            };
            if (cellColor.isLit) {
                cellStyles.backgroundImage = "radial-gradient(" + cellColor.background + " 10%, " + cellColor.backgroundShade + ")";
            }
            else {
                cellStyles.backgroundColor = cellColor.background;
            }
            if (isVert) {
                cellStyles.height = cellSize + "px";
                cellStyles.width = maxBarWidth + "px";
                cellStyles.marginTop = cellSpacing + "px";
            }
            else {
                cellStyles.width = cellSize + "px";
                cellStyles.height = maxBarHeight + "px";
                cellStyles.marginRight = cellSpacing + "px";
            }
            cells.push(React.createElement("div", { key: i.toString(), style: cellStyles }));
        }
        return (React.createElement("div", { style: containerStyles },
            cells,
            React.createElement(FormattedValueDisplay, { "aria-label": selectors.components.Panels.Visualization.BarGauge.value, value: value, style: valueStyles })));
    };
    BarGauge.defaultProps = {
        lcdCellWidth: 12,
        value: {
            text: '100',
            numeric: 100,
        },
        displayMode: BarGaugeDisplayMode.Gradient,
        orientation: VizOrientation.Horizontal,
        field: {
            min: 0,
            max: 100,
            thresholds: {
                mode: ThresholdsMode.Absolute,
                steps: [],
            },
        },
        itemSpacing: 8,
        showUnfilled: true,
    };
    return BarGauge;
}(PureComponent));
export { BarGauge };
function isVertical(orientation) {
    return orientation === VizOrientation.Vertical;
}
function calculateTitleDimensions(props) {
    var height = props.height, width = props.width, alignmentFactors = props.alignmentFactors, orientation = props.orientation;
    var title = alignmentFactors ? alignmentFactors.title : props.value.title;
    if (!title) {
        return { fontSize: 0, width: 0, height: 0, placement: 'above' };
    }
    if (isVertical(orientation)) {
        return {
            fontSize: 14,
            width: width,
            height: 14 * TITLE_LINE_HEIGHT,
            placement: 'below',
        };
    }
    // if height above 40 put text to above bar
    if (height > 40) {
        var maxTitleHeightRatio_1 = 0.45;
        var titleHeight_1 = Math.max(Math.min(height * maxTitleHeightRatio_1, MAX_VALUE_HEIGHT), 17);
        return {
            fontSize: titleHeight_1 / TITLE_LINE_HEIGHT,
            width: 0,
            height: titleHeight_1,
            placement: 'above',
        };
    }
    // title to left of bar scenario
    var maxTitleHeightRatio = 0.6;
    var titleHeight = Math.max(height * maxTitleHeightRatio, MIN_VALUE_HEIGHT);
    var titleFontSize = titleHeight / TITLE_LINE_HEIGHT;
    var textSize = measureText(title, titleFontSize);
    return {
        fontSize: titleFontSize,
        height: 0,
        width: textSize.width + 15,
        placement: 'left',
    };
}
export function getTitleStyles(props) {
    var wrapperStyles = {
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
    };
    var titleDim = calculateTitleDimensions(props);
    var titleStyles = {
        fontSize: titleDim.fontSize + "px",
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
    };
    if (isVertical(props.orientation)) {
        wrapperStyles.flexDirection = 'column-reverse';
        titleStyles.textAlign = 'center';
    }
    else {
        if (titleDim.placement === 'above') {
            wrapperStyles.flexDirection = 'column';
        }
        else {
            wrapperStyles.flexDirection = 'row';
            titleStyles.width = titleDim.width + "px";
            titleStyles.textAlign = 'right';
            titleStyles.paddingRight = '10px';
        }
    }
    return {
        wrapper: wrapperStyles,
        title: titleStyles,
    };
}
function calculateBarAndValueDimensions(props) {
    var height = props.height, width = props.width, orientation = props.orientation;
    var titleDim = calculateTitleDimensions(props);
    var maxBarHeight = 0;
    var maxBarWidth = 0;
    var valueHeight = 0;
    var valueWidth = 0;
    var wrapperWidth = 0;
    var wrapperHeight = 0;
    if (isVertical(orientation)) {
        valueHeight = Math.min(Math.max(height * 0.1, MIN_VALUE_HEIGHT), MAX_VALUE_HEIGHT);
        valueWidth = width;
        maxBarHeight = height - (titleDim.height + valueHeight);
        maxBarWidth = width;
        wrapperWidth = width;
        wrapperHeight = height - titleDim.height;
    }
    else {
        valueHeight = height - titleDim.height;
        valueWidth = Math.max(Math.min(width * 0.2, MAX_VALUE_WIDTH), MIN_VALUE_WIDTH);
        maxBarHeight = height - titleDim.height;
        maxBarWidth = width - valueWidth - titleDim.width;
        if (titleDim.placement === 'above') {
            wrapperWidth = width;
            wrapperHeight = height - titleDim.height;
        }
        else {
            wrapperWidth = width - titleDim.width;
            wrapperHeight = height;
        }
    }
    return {
        valueWidth: valueWidth,
        valueHeight: valueHeight,
        maxBarWidth: maxBarWidth,
        maxBarHeight: maxBarHeight,
        wrapperHeight: wrapperHeight,
        wrapperWidth: wrapperWidth,
    };
}
export function getValuePercent(value, minValue, maxValue) {
    return Math.min((value - minValue) / (maxValue - minValue), 1);
}
/**
 * Only exported to for unit test
 */
export function getBasicAndGradientStyles(props) {
    var displayMode = props.displayMode, field = props.field, value = props.value, alignmentFactors = props.alignmentFactors, orientation = props.orientation, theme = props.theme;
    var _a = calculateBarAndValueDimensions(props), valueWidth = _a.valueWidth, valueHeight = _a.valueHeight, maxBarHeight = _a.maxBarHeight, maxBarWidth = _a.maxBarWidth;
    var valuePercent = getValuePercent(value.numeric, field.min, field.max);
    var valueColor = getValueColor(props);
    var valueToBaseSizeOn = alignmentFactors ? alignmentFactors : value;
    var valueStyles = getValueStyles(valueToBaseSizeOn, valueColor, valueWidth, valueHeight, orientation);
    var isBasic = displayMode === 'basic';
    var wrapperStyles = {
        display: 'flex',
        flexGrow: 1,
    };
    var barStyles = {
        borderRadius: '3px',
        position: 'relative',
        zIndex: 1,
    };
    var emptyBar = {
        background: "rgba(" + (theme.isDark ? '255,255,255' : '0,0,0') + ", 0.07)",
        flexGrow: 1,
        display: 'flex',
        borderRadius: '3px',
        position: 'relative',
    };
    if (isVertical(orientation)) {
        var barHeight = Math.max(valuePercent * maxBarHeight, 1);
        // vertical styles
        wrapperStyles.flexDirection = 'column';
        wrapperStyles.justifyContent = 'flex-end';
        barStyles.transition = 'height 1s';
        barStyles.height = barHeight + "px";
        barStyles.width = maxBarWidth + "px";
        // adjust so that filled in bar is at the bottom
        emptyBar.bottom = '-3px';
        if (isBasic) {
            // Basic styles
            barStyles.background = "" + tinycolor(valueColor)
                .setAlpha(0.35)
                .toRgbString();
            barStyles.borderTop = "2px solid " + valueColor;
        }
        else {
            // Gradient styles
            barStyles.background = getBarGradient(props, maxBarHeight);
        }
    }
    else {
        var barWidth = Math.max(valuePercent * maxBarWidth, 1);
        // Custom styles for horizontal orientation
        wrapperStyles.flexDirection = 'row-reverse';
        wrapperStyles.justifyContent = 'flex-end';
        wrapperStyles.alignItems = 'stretch';
        barStyles.transition = 'width 1s';
        barStyles.height = maxBarHeight + "px";
        barStyles.width = barWidth + "px";
        // shift empty region back to fill gaps due to border radius
        emptyBar.left = '-3px';
        if (isBasic) {
            // Basic styles
            barStyles.background = "" + tinycolor(valueColor)
                .setAlpha(0.35)
                .toRgbString();
            barStyles.borderRight = "2px solid " + valueColor;
        }
        else {
            // Gradient styles
            barStyles.background = getBarGradient(props, maxBarWidth);
        }
    }
    return {
        wrapper: wrapperStyles,
        bar: barStyles,
        value: valueStyles,
        emptyBar: emptyBar,
    };
}
/**
 * Only exported to for unit test
 */
export function getBarGradient(props, maxSize) {
    var field = props.field, value = props.value, orientation = props.orientation;
    var cssDirection = isVertical(orientation) ? '0deg' : '90deg';
    var minValue = field.min;
    var maxValue = field.max;
    var gradient = '';
    var lastpos = 0;
    if (field.color && field.color.mode === FieldColorMode.Scheme) {
        var schemeSet = d3["scheme" + field.color.schemeName];
        if (!schemeSet) {
            // Error: unknown scheme
            var color = '#F00';
            gradient = "linear-gradient(" + cssDirection + ", " + color + ", " + color;
            gradient += " " + maxSize + "px, " + color;
            return gradient + ')';
        }
        // Get the scheme with as many steps as possible
        var scheme = schemeSet[schemeSet.length - 1];
        for (var i = 0; i < scheme.length; i++) {
            var color = scheme[i];
            var valuePercent = i / (scheme.length - 1);
            var pos = valuePercent * maxSize;
            var offset = Math.round(pos - (pos - lastpos) / 2);
            if (gradient === '') {
                gradient = "linear-gradient(" + cssDirection + ", " + color + ", " + color;
            }
            else {
                lastpos = pos;
                gradient += " " + offset + "px, " + color;
            }
        }
    }
    else {
        var thresholds = field.thresholds;
        for (var i = 0; i < thresholds.steps.length; i++) {
            var threshold = thresholds.steps[i];
            var color = getColorFromHexRgbOrName(threshold.color);
            var valuePercent = getValuePercent(threshold.value, minValue, maxValue);
            var pos = valuePercent * maxSize;
            var offset = Math.round(pos - (pos - lastpos) / 2);
            if (gradient === '') {
                gradient = "linear-gradient(" + cssDirection + ", " + color + ", " + color;
            }
            else if (value.numeric < threshold.value) {
                break;
            }
            else {
                lastpos = pos;
                gradient += " " + offset + "px, " + color;
            }
        }
    }
    return gradient + ')';
}
/**
 * Only exported to for unit test
 */
export function getValueColor(props) {
    var theme = props.theme, value = props.value;
    if (value.color) {
        return value.color;
    }
    return getColorFromHexRgbOrName('gray', theme.type);
}
function getValueStyles(value, color, width, height, orientation) {
    var styles = {
        color: color,
        height: height + "px",
        width: width + "px",
        display: 'flex',
        alignItems: 'center',
        lineHeight: VALUE_LINE_HEIGHT,
    };
    // how many pixels in wide can the text be?
    var textWidth = width;
    var formattedValueString = formattedValueToString(value);
    if (isVertical(orientation)) {
        styles.fontSize = calculateFontSize(formattedValueString, textWidth, height, VALUE_LINE_HEIGHT);
        styles.justifyContent = "center";
    }
    else {
        styles.fontSize = calculateFontSize(formattedValueString, textWidth - VALUE_LEFT_PADDING * 2, height, VALUE_LINE_HEIGHT);
        styles.justifyContent = "flex-end";
        styles.paddingLeft = VALUE_LEFT_PADDING + "px";
        styles.paddingRight = VALUE_LEFT_PADDING + "px";
        // Need to remove the left padding from the text width constraints
        textWidth -= VALUE_LEFT_PADDING;
    }
    return styles;
}
//# sourceMappingURL=BarGauge.js.map