import { __makeTemplateObject, __read } from "tslib";
import React, { useRef, useState } from 'react';
import { cx, css } from 'emotion';
import useClickAway from 'react-use/lib/useClickAway';
import { measureText } from '../../utils/measureText';
import { useExpandableLabel } from '.';
var FONT_SIZE = 14;
export function SegmentInput(_a) {
    var initialValue = _a.value, onChange = _a.onChange, Component = _a.Component, className = _a.className, placeholder = _a.placeholder, _b = _a.autofocus, autofocus = _b === void 0 ? false : _b;
    var ref = useRef(null);
    var _c = __read(useState(initialValue), 2), value = _c[0], setValue = _c[1];
    var _d = __read(useState(measureText((initialValue || '').toString(), FONT_SIZE).width), 2), inputWidth = _d[0], setInputWidth = _d[1];
    var _e = __read(useExpandableLabel(autofocus), 4), Label = _e[0], expanded = _e[2], setExpanded = _e[3];
    useClickAway(ref, function () {
        setExpanded(false);
        onChange(value);
    });
    if (!expanded) {
        return (React.createElement(Label, { Component: Component || (React.createElement("a", { className: cx('gf-form-label', 'query-part', !value && placeholder && 'query-placeholder', className) }, initialValue || placeholder)) }));
    }
    var inputWidthStyle = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: ", "px;\n  "], ["\n    width: ", "px;\n  "])), Math.max(inputWidth + 20, 32));
    return (React.createElement("input", { ref: ref, autoFocus: true, className: cx("gf-form gf-form-input", inputWidthStyle), value: value, onChange: function (item) {
            var width = measureText(item.target.value, FONT_SIZE).width;
            setInputWidth(width);
            setValue(item.target.value);
        }, onBlur: function () {
            setExpanded(false);
            onChange(value);
        }, onKeyDown: function (e) {
            if ([13, 27].includes(e.keyCode)) {
                setExpanded(false);
                onChange(value);
            }
        } }));
}
var templateObject_1;
//# sourceMappingURL=SegmentInput.js.map