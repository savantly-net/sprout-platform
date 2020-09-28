import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
import { SeriesColorPicker } from '../ColorPicker/ColorPicker';
import { SeriesIcon } from './SeriesIcon';
export var LegendSeriesIcon = function (_a) {
    var disabled = _a.disabled, yAxis = _a.yAxis, color = _a.color, onColorChange = _a.onColorChange, onToggleAxis = _a.onToggleAxis;
    var iconProps = {
        color: color,
    };
    if (!disabled) {
        iconProps = __assign(__assign({}, iconProps), { className: 'pointer' });
    }
    return disabled ? (React.createElement("span", { className: cx('graph-legend-icon', disabled && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            cursor: default;\n          "], ["\n            cursor: default;\n          "])))) },
        React.createElement(SeriesIcon, __assign({}, iconProps)))) : (React.createElement(SeriesColorPicker, { yaxis: yAxis, color: color, onChange: onColorChange, onToggleAxis: onToggleAxis, enableNamedColors: true }, function (_a) {
        var ref = _a.ref, showColorPicker = _a.showColorPicker, hideColorPicker = _a.hideColorPicker;
        return (React.createElement("span", { ref: ref, onClick: showColorPicker, onMouseLeave: hideColorPicker, className: "graph-legend-icon" },
            React.createElement(SeriesIcon, __assign({}, iconProps))));
    }));
};
LegendSeriesIcon.displayName = 'LegendSeriesIcon';
var templateObject_1;
//# sourceMappingURL=LegendSeriesIcon.js.map