import React from 'react';
import { GraphLegend, LegendDisplayMode } from '../..';
import { usePlotData } from '../context';
import { FieldType, getColorFromHexRgbOrName, getFieldDisplayName } from '@savantly/sprout-api';
import { colors } from '../../../utils';
export var LegendPlugin = function (_a) {
    var _b;
    var placement = _a.placement, _c = _a.displayMode, displayMode = _c === void 0 ? LegendDisplayMode.List : _c;
    var data = usePlotData().data;
    var legendItems = [];
    var seriesIdx = 0;
    for (var i = 0; i < data.fields.length; i++) {
        var field = data.fields[i];
        if (field.type === FieldType.time) {
            continue;
        }
        legendItems.push({
            color: field.config.color && field.config.color.fixedColor
                ? getColorFromHexRgbOrName(field.config.color.fixedColor)
                : colors[seriesIdx],
            label: getFieldDisplayName(field, data),
            isVisible: true,
            //flot vs uPlot differences
            yAxis: ((_b = field.config.custom.axis) === null || _b === void 0 ? void 0 : _b.side) === 1 ? 3 : 1,
        });
        seriesIdx++;
    }
    return (React.createElement(GraphLegend, { placement: placement === 'top' || placement === 'bottom' ? 'under' : 'right', items: legendItems, displayMode: displayMode }));
};
//# sourceMappingURL=LegendPlugin.js.map