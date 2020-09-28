import { __read } from "tslib";
import React, { useState, useCallback, useEffect } from 'react';
import { isDateTime, dateMath, dateTimeFormat, dateTimeParse, rangeUtil, } from '@savantly/sprout-api';
import { TimePickerCalendar } from './TimePickerCalendar';
import { Field } from '../../Forms/Field';
import { Input } from '../../Input/Input';
import { Button } from '../../Button';
var errorMessage = 'Please enter a past date or "now"';
export var TimeRangeForm = function (props) {
    var value = props.value, _a = props.isFullscreen, isFullscreen = _a === void 0 ? false : _a, timeZone = props.timeZone, roundup = props.roundup;
    var _b = __read(useState(valueToState(value.raw.from, false, timeZone)), 2), from = _b[0], setFrom = _b[1];
    var _c = __read(useState(valueToState(value.raw.to, true, timeZone)), 2), to = _c[0], setTo = _c[1];
    var _d = __read(useState(false), 2), isOpen = _d[0], setOpen = _d[1];
    // Synchronize internal state with external value
    useEffect(function () {
        setFrom(valueToState(value.raw.from, false, timeZone));
        setTo(valueToState(value.raw.to, true, timeZone));
    }, [value.raw.from, value.raw.to, timeZone]);
    var onOpen = useCallback(function (event) {
        event.preventDefault();
        setOpen(true);
    }, [setOpen]);
    var onFocus = useCallback(function (event) {
        if (!isFullscreen) {
            return;
        }
        onOpen(event);
    }, [isFullscreen, onOpen]);
    var onApply = useCallback(function (e) {
        e.preventDefault();
        if (to.invalid || from.invalid) {
            return;
        }
        var raw = { from: from.value, to: to.value };
        var timeRange = rangeUtil.convertRawToRange(raw, timeZone);
        props.onApply(timeRange);
    }, [from, to, roundup, timeZone]);
    var onChange = useCallback(function (from, to) {
        setFrom(valueToState(from, false, timeZone));
        setTo(valueToState(to, true, timeZone));
    }, [timeZone]);
    var icon = isFullscreen ? null : React.createElement(Button, { icon: "calendar-alt", variant: "secondary", onClick: onOpen });
    return (React.createElement(React.Fragment, null,
        React.createElement(Field, { label: "From", invalid: from.invalid, error: errorMessage },
            React.createElement(Input, { onClick: function (event) { return event.stopPropagation(); }, onFocus: onFocus, onChange: function (event) { return setFrom(eventToState(event, false, timeZone)); }, addonAfter: icon, "aria-label": "TimePicker from field", value: from.value })),
        React.createElement(Field, { label: "To", invalid: to.invalid, error: errorMessage },
            React.createElement(Input, { onClick: function (event) { return event.stopPropagation(); }, onFocus: onFocus, onChange: function (event) { return setTo(eventToState(event, true, timeZone)); }, addonAfter: icon, "aria-label": "TimePicker to field", value: to.value })),
        React.createElement(Button, { "aria-label": "TimePicker submit button", onClick: onApply }, "Apply time range"),
        React.createElement(TimePickerCalendar, { isFullscreen: isFullscreen, isOpen: isOpen, from: dateTimeParse(from.value, { timeZone: timeZone }), to: dateTimeParse(to.value, { timeZone: timeZone }), onApply: onApply, onClose: function () { return setOpen(false); }, onChange: onChange, timeZone: timeZone, isReversed: props.isReversed })));
};
function eventToState(event, roundup, timeZone) {
    return valueToState(event.currentTarget.value, roundup, timeZone);
}
function valueToState(raw, roundup, timeZone) {
    var value = valueAsString(raw, timeZone);
    var invalid = !isValid(value, roundup, timeZone);
    return { value: value, invalid: invalid };
}
function valueAsString(value, timeZone) {
    if (isDateTime(value)) {
        return dateTimeFormat(value, { timeZone: timeZone });
    }
    return value;
}
function isValid(value, roundUp, timeZone) {
    if (isDateTime(value)) {
        return value.isValid();
    }
    if (dateMath.isMathString(value)) {
        return dateMath.isValid(value);
    }
    var parsed = dateTimeParse(value, { roundUp: roundUp, timeZone: timeZone });
    return parsed.isValid();
}
//# sourceMappingURL=TimeRangeForm.js.map