import { __read } from "tslib";
import React from 'react';
import { cx } from 'emotion';
import _ from 'lodash';
import { SegmentSelect, useExpandableLabel } from '.';
export function Segment(_a) {
    var options = _a.options, value = _a.value, onChange = _a.onChange, Component = _a.Component, className = _a.className, allowCustomValue = _a.allowCustomValue, placeholder = _a.placeholder;
    var _b = __read(useExpandableLabel(false), 4), Label = _b[0], width = _b[1], expanded = _b[2], setExpanded = _b[3];
    if (!expanded) {
        var label = _.isObject(value) ? value.label : value;
        return (React.createElement(Label, { Component: Component || (React.createElement("a", { className: cx('gf-form-label', 'query-part', !value && placeholder && 'query-placeholder', className) }, label || placeholder)) }));
    }
    return (React.createElement(SegmentSelect, { value: value && !_.isObject(value) ? { value: value } : value, options: options, width: width, onClickOutside: function () { return setExpanded(false); }, allowCustomValue: allowCustomValue, onChange: function (item) {
            setExpanded(false);
            onChange(item);
        } }));
}
//# sourceMappingURL=Segment.js.map