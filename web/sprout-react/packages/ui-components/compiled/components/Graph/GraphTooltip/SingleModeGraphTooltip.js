import React from 'react';
import { getValueFromDimension, getColumnFromDimension, formattedValueToString, getDisplayProcessor, getFieldDisplayName, } from '@savantly/sprout-api';
import { SeriesTable } from './SeriesTable';
export var SingleModeGraphTooltip = function (_a) {
    var _b;
    var dimensions = _a.dimensions, activeDimensions = _a.activeDimensions, timeZone = _a.timeZone;
    // not hovering over a point, skip rendering
    if (activeDimensions.yAxis === null ||
        activeDimensions.yAxis[1] === undefined ||
        activeDimensions.xAxis === null ||
        activeDimensions.xAxis[1] === undefined) {
        return null;
    }
    var time = getValueFromDimension(dimensions.xAxis, activeDimensions.xAxis[0], activeDimensions.xAxis[1]);
    var timeField = getColumnFromDimension(dimensions.xAxis, activeDimensions.xAxis[0]);
    var processedTime = timeField.display ? formattedValueToString(timeField.display(time)) : time;
    var valueField = getColumnFromDimension(dimensions.yAxis, activeDimensions.yAxis[0]);
    var value = getValueFromDimension(dimensions.yAxis, activeDimensions.yAxis[0], activeDimensions.yAxis[1]);
    var display = (_b = valueField.display) !== null && _b !== void 0 ? _b : getDisplayProcessor({ field: valueField, timeZone: timeZone });
    var disp = display(value);
    return (React.createElement(SeriesTable, { series: [
            {
                color: disp.color,
                label: getFieldDisplayName(valueField),
                value: formattedValueToString(disp),
            },
        ], timestamp: processedTime }));
};
SingleModeGraphTooltip.displayName = 'SingleModeGraphTooltip';
//# sourceMappingURL=SingleModeGraphTooltip.js.map