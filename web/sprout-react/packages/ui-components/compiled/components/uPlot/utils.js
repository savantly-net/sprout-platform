import { __assign, __read, __spread, __values } from "tslib";
import throttle from 'lodash/throttle';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import tinycolor from 'tinycolor2';
import { FieldType, formattedValueToString, getColorFromHexRgbOrName, getFieldDisplayName, getTimeField, getTimeZoneInfo, rangeUtil, systemDateFormats, } from '@savantly/sprout-api';
import { colors } from '../../utils';
import uPlot from 'uplot';
var defaultFormatter = function (v) { return (v == null ? '-' : v.toFixed(1)); };
var ALLOWED_FORMAT_STRINGS_REGEX = /\b(YYYY|YY|MMMM|MMM|MM|M|DD|D|WWWW|WWW|HH|H|h|AA|aa|a|mm|m|ss|s|fff)\b/g;
export var timeFormatToTemplate = function (f) {
    return f.replace(ALLOWED_FORMAT_STRINGS_REGEX, function (match) { return "{" + match + "}"; });
};
var timeStampsConfig = [
    [3600 * 24 * 365, '{YYYY}', 7, '{YYYY}'],
    [3600 * 24 * 28, "{" + timeFormatToTemplate(systemDateFormats.interval.month), 7, '{MMM}\n{YYYY}'],
    [
        3600 * 24,
        "{" + timeFormatToTemplate(systemDateFormats.interval.day),
        7,
        timeFormatToTemplate(systemDateFormats.interval.day) + "\n" + timeFormatToTemplate(systemDateFormats.interval.year),
    ],
    [
        3600,
        "{" + timeFormatToTemplate(systemDateFormats.interval.minute),
        4,
        timeFormatToTemplate(systemDateFormats.interval.minute) + "\n" + timeFormatToTemplate(systemDateFormats.interval.day),
    ],
    [
        60,
        "{" + timeFormatToTemplate(systemDateFormats.interval.second),
        4,
        timeFormatToTemplate(systemDateFormats.interval.second) + "\n" + timeFormatToTemplate(systemDateFormats.interval.day),
    ],
    [
        1,
        ":{ss}",
        2,
        ":{ss}\n" + timeFormatToTemplate(systemDateFormats.interval.day) + " " + timeFormatToTemplate(systemDateFormats.interval.minute),
    ],
    [
        1e-3,
        ':{ss}.{fff}',
        2,
        ":{ss}.{fff}\n" + timeFormatToTemplate(systemDateFormats.interval.day) + " " + timeFormatToTemplate(systemDateFormats.interval.minute),
    ],
];
export function rangeToMinMax(timeRange) {
    var v = rangeUtil.convertRawToRange(timeRange);
    return [v.from.valueOf() / 1000, v.to.valueOf() / 1000];
}
// based on aligned data frames creates config for scales, axes and series
export var buildSeriesConfig = function (data, timeRange, theme) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var series = [{}];
    var scales = {
        x: {
            time: true,
        },
    };
    var axes = [];
    var timeIndex = getTimeField(data).timeIndex;
    if (timeIndex === undefined) {
        timeIndex = 0; // assuming first field represents x-domain
        scales.x.time = false;
    }
    // x-axis
    axes.push({
        show: true,
        stroke: theme.colors.text,
        grid: {
            show: true,
            stroke: theme.palette.gray4,
            width: 1 / devicePixelRatio,
        },
        values: timeStampsConfig,
    });
    var seriesIdx = 0;
    var _loop_1 = function (i) {
        var field = data.fields[i];
        var config = field.config;
        var customConfig = config.custom;
        console.log(customConfig);
        var fmt = (_a = field.display) !== null && _a !== void 0 ? _a : defaultFormatter;
        if (i === timeIndex || field.type !== FieldType.number) {
            return "continue";
        }
        var scale = config.unit || '__fixed';
        if (!scales[scale]) {
            scales[scale] = {};
            axes.push({
                scale: scale,
                label: (_c = (_b = config.custom) === null || _b === void 0 ? void 0 : _b.axis) === null || _c === void 0 ? void 0 : _c.label,
                show: true,
                size: ((_e = (_d = config.custom) === null || _d === void 0 ? void 0 : _d.axis) === null || _e === void 0 ? void 0 : _e.width) || 80,
                stroke: theme.colors.text,
                side: ((_g = (_f = config.custom) === null || _f === void 0 ? void 0 : _f.axis) === null || _g === void 0 ? void 0 : _g.side) || 3,
                grid: {
                    show: (_j = (_h = config.custom) === null || _h === void 0 ? void 0 : _h.axis) === null || _j === void 0 ? void 0 : _j.grid,
                    stroke: theme.palette.gray4,
                    width: 1 / devicePixelRatio,
                },
                values: function (u, vals) { return vals.map(function (v) { return formattedValueToString(fmt(v)); }); },
            });
        }
        var seriesColor = ((_k = customConfig === null || customConfig === void 0 ? void 0 : customConfig.line) === null || _k === void 0 ? void 0 : _k.color) && ((_l = customConfig === null || customConfig === void 0 ? void 0 : customConfig.line) === null || _l === void 0 ? void 0 : _l.color.fixedColor)
            ? getColorFromHexRgbOrName((_m = customConfig.line) === null || _m === void 0 ? void 0 : _m.color.fixedColor)
            : colors[seriesIdx];
        series.push({
            scale: scale,
            label: getFieldDisplayName(field, data),
            stroke: seriesColor,
            fill: ((_o = customConfig === null || customConfig === void 0 ? void 0 : customConfig.fill) === null || _o === void 0 ? void 0 : _o.alpha) ? tinycolor(seriesColor)
                .setAlpha((_p = customConfig === null || customConfig === void 0 ? void 0 : customConfig.fill) === null || _p === void 0 ? void 0 : _p.alpha)
                .toRgbString()
                : undefined,
            width: ((_q = customConfig === null || customConfig === void 0 ? void 0 : customConfig.line) === null || _q === void 0 ? void 0 : _q.show) ? ((_r = customConfig === null || customConfig === void 0 ? void 0 : customConfig.line) === null || _r === void 0 ? void 0 : _r.width) || 1 : 0,
            points: {
                show: (_s = customConfig === null || customConfig === void 0 ? void 0 : customConfig.points) === null || _s === void 0 ? void 0 : _s.show,
                size: ((_t = customConfig === null || customConfig === void 0 ? void 0 : customConfig.points) === null || _t === void 0 ? void 0 : _t.radius) || 5,
            },
            spanGaps: (customConfig === null || customConfig === void 0 ? void 0 : customConfig.nullValues) === 'connected',
        });
        seriesIdx += 1;
    };
    for (var i = 0; i < data.fields.length; i++) {
        _loop_1(i);
    }
    return {
        scales: scales,
        series: series,
        axes: axes,
    };
};
export var buildPlotConfig = function (props, data, plugins, theme) {
    var _a;
    var seriesConfig = buildSeriesConfig(data, props.timeRange, theme);
    var tzDate;
    // When plotting time series use correct timezone for timestamps
    if (seriesConfig.scales.x.time) {
        var tz_1 = (_a = getTimeZoneInfo(props.timeZone, Date.now())) === null || _a === void 0 ? void 0 : _a.ianaName;
        if (tz_1) {
            tzDate = function (ts) { return uPlot.tzDate(new Date(ts * 1e3), tz_1); };
        }
    }
    return __assign({ width: props.width, height: props.height, focus: {
            alpha: 1,
        }, cursor: {
            focus: {
                prox: 30,
            },
        }, legend: {
            show: false,
        }, plugins: Object.entries(plugins).map(function (p) { return ({
            hooks: p[1].hooks,
        }); }), hooks: {}, tzDate: tzDate }, seriesConfig);
};
export var preparePlotData = function (data) {
    var _a;
    var plotData = [];
    // Prepare x axis
    var timeIndex = getTimeField(data).timeIndex;
    var xvals = data.fields[timeIndex].values.toArray();
    if (!isNaN(timeIndex)) {
        xvals = xvals.map(function (v) { return v / 1000; });
    }
    plotData.push(xvals);
    for (var i = 0; i < data.fields.length; i++) {
        var field = data.fields[i];
        // already handled time and we ignore non-numeric fields
        if (i === timeIndex || field.type !== FieldType.number) {
            continue;
        }
        var values = field.values.toArray();
        if (((_a = field.config.custom) === null || _a === void 0 ? void 0 : _a.nullValues) === 'asZero') {
            values = values.map(function (v) { return (v === null ? 0 : v); });
        }
        plotData.push(values);
    }
    return plotData;
};
/**
 * Based on two config objects indicates whether or not uPlot needs reinitialisation
 * This COULD be done based on data frames, but keeping it this way for now as a simplification
 */
export var shouldReinitialisePlot = function (prevConfig, config) {
    var e_1, _a, e_2, _b;
    var _c, _d, _e, _f, _g, _h;
    // reinitialise when number of series, scales or axes changes
    if (((_c = prevConfig.series) === null || _c === void 0 ? void 0 : _c.length) !== ((_d = config.series) === null || _d === void 0 ? void 0 : _d.length) ||
        ((_e = prevConfig.axes) === null || _e === void 0 ? void 0 : _e.length) !== ((_f = config.axes) === null || _f === void 0 ? void 0 : _f.length) ||
        ((_g = prevConfig.scales) === null || _g === void 0 ? void 0 : _g.length) !== ((_h = config.scales) === null || _h === void 0 ? void 0 : _h.length)) {
        return true;
    }
    var idx = 0;
    // reinitialise when any of the series config changes
    if (config.series && prevConfig.series) {
        try {
            for (var _j = __values(config.series), _k = _j.next(); !_k.done; _k = _j.next()) {
                var series = _k.value;
                if (!isEqual(series, prevConfig.series[idx])) {
                    return true;
                }
                idx++;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_k && !_k.done && (_a = _j.return)) _a.call(_j);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    if (config.axes && prevConfig.axes) {
        idx = 0;
        try {
            for (var _l = __values(config.axes), _m = _l.next(); !_m.done; _m = _l.next()) {
                var axis = _m.value;
                // Comparing axes config, skipping values property as it changes across config builds - probably need to be more clever
                if (!isEqual(omit(axis, 'values'), omit(prevConfig.axes[idx], 'values'))) {
                    return true;
                }
                idx++;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_m && !_m.done && (_b = _l.return)) _b.call(_l);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return false;
};
// Dev helpers
export var throttledLog = throttle(function () {
    var t = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
    }
    console.log.apply(console, __spread(t));
}, 500);
export var pluginLog = function (id, throttle) {
    if (throttle === void 0) { throttle = false; }
    var t = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        t[_i - 2] = arguments[_i];
    }
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    var fn = throttle ? throttledLog : console.log;
    fn.apply(void 0, __spread(["[Plugin: " + id + "]: "], t));
};
//# sourceMappingURL=utils.js.map