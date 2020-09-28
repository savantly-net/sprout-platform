import { __assign, __read, __spread } from "tslib";
import React from 'react';
import { MappingType } from '@grafana/data';
import { Button } from '../Button/Button';
import { MappingRow } from './MappingRow';
export var ValueMappingsEditor = function (_a) {
    var value = _a.value, onChange = _a.onChange, children = _a.children;
    var onAdd = function () {
        var defaultMapping = {
            type: MappingType.ValueToText,
            from: '',
            to: '',
            text: '',
        };
        var id = Math.max.apply(Math, __spread(value.map(function (v) { return v.id; }), [0])) + 1;
        onChange(__spread(value, [
            __assign({ id: id }, defaultMapping),
        ]));
    };
    var onRemove = function (index) {
        onChange(value.filter(function (_, i) { return i !== index; }));
    };
    var onMappingChange = function (update) {
        onChange(value.map(function (item) { return (item.id === update.id ? update : item); }));
    };
    return (React.createElement(React.Fragment, null,
        value.map(function (valueMapping, index) { return (React.createElement(MappingRow, { key: valueMapping.text + "-" + index, valueMapping: valueMapping, onUpdate: onMappingChange, onRemove: function () { return onRemove(index); } })); }),
        React.createElement(Button, { size: "sm", icon: "plus", onClick: onAdd, "aria-label": "ValueMappingsEditor add mapping button", variant: "secondary" }, "Add value mapping")));
};
//# sourceMappingURL=ValueMappingsEditor.js.map