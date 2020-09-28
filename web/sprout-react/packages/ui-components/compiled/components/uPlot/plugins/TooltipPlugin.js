import { __read, __spread } from "tslib";
import React from 'react';
import { Portal } from '../../Portal/Portal';
import { usePlotContext, usePlotData } from '../context';
import { CursorPlugin } from './CursorPlugin';
import { SeriesTable } from '../../Graph/GraphTooltip/SeriesTable';
import { FieldType, formattedValueToString, getDisplayProcessor, getFieldDisplayName } from '@savantly/sprout-api';
import { TooltipContainer } from '../../Chart/TooltipContainer';
export var TooltipPlugin = function (_a) {
    var _b = _a.mode, mode = _b === void 0 ? 'single' : _b, timeZone = _a.timeZone;
    var pluginId = 'PlotTooltip';
    var plotContext = usePlotContext();
    var _c = usePlotData(), data = _c.data, getField = _c.getField, getXAxisFields = _c.getXAxisFields;
    var xAxisFields = getXAxisFields();
    // assuming single x-axis
    var xAxisField = xAxisFields[0];
    var xAxisFmt = xAxisField.display || getDisplayProcessor({ field: xAxisField, timeZone: timeZone });
    return (React.createElement(CursorPlugin, { id: pluginId }, function (_a) {
        var focusedSeriesIdx = _a.focusedSeriesIdx, focusedPointIdx = _a.focusedPointIdx, coords = _a.coords;
        if (!plotContext || !plotContext.series) {
            return null;
        }
        var tooltip = null;
        // when no no cursor interaction
        if (focusedPointIdx === null) {
            return null;
        }
        // when interacting with a point in single mode
        if (mode === 'single' && focusedSeriesIdx !== null) {
            var xVal = xAxisFmt(xAxisFields[0].values.get(focusedPointIdx)).text;
            var field = getField(focusedSeriesIdx);
            var fieldFmt = field.display || getDisplayProcessor({ field: field, timeZone: timeZone });
            tooltip = (React.createElement(SeriesTable, { series: [
                    {
                        // stroke is typed as CanvasRenderingContext2D['strokeStyle'] - we are using strings only for now
                        color: plotContext.series[focusedSeriesIdx].stroke,
                        label: getFieldDisplayName(field, data),
                        value: fieldFmt(field.values.get(focusedPointIdx)).text,
                    },
                ], timestamp: xVal }));
        }
        if (mode === 'multi') {
            var xVal = xAxisFmt(xAxisFields[0].values.get(focusedPointIdx)).text;
            tooltip = (React.createElement(SeriesTable, { series: data.fields.reduce(function (agg, f, i) {
                    // skipping time field and non-numeric fields
                    if (f.type === FieldType.time || f.type !== FieldType.number) {
                        return agg;
                    }
                    return __spread(agg, [
                        {
                            // stroke is typed as CanvasRenderingContext2D['strokeStyle'] - we are using strings only for now
                            color: plotContext.series[i].stroke,
                            label: getFieldDisplayName(f, data),
                            value: formattedValueToString(f.display(f.values.get(focusedPointIdx))),
                            isActive: focusedSeriesIdx === i,
                        },
                    ]);
                }, []), timestamp: xVal }));
        }
        if (!tooltip) {
            return null;
        }
        return (React.createElement(Portal, null,
            React.createElement(TooltipContainer, { position: { x: coords.viewport.x, y: coords.viewport.y }, offset: { x: 10, y: 10 } }, tooltip)));
    }));
};
//# sourceMappingURL=TooltipPlugin.js.map