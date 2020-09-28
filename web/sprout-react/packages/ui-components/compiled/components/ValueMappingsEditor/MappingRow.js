import { __assign } from "tslib";
import React from 'react';
import { HorizontalGroup } from '../Layout/Layout';
import { IconButton, Label, RadioButtonGroup } from '../index';
import { Field } from '../Forms/Field';
import { Input } from '../Input/Input';
import { MappingType } from '@savantly/sprout-api';
var MAPPING_OPTIONS = [
    { value: MappingType.ValueToText, label: 'Value' },
    { value: MappingType.RangeToText, label: 'Range' },
];
export var MappingRow = function (_a) {
    var valueMapping = _a.valueMapping, onUpdate = _a.onUpdate, onRemove = _a.onRemove;
    var type = valueMapping.type;
    var onMappingValueChange = function (value) {
        onUpdate(__assign(__assign({}, valueMapping), { value: value }));
    };
    var onMappingFromChange = function (value) {
        onUpdate(__assign(__assign({}, valueMapping), { from: value }));
    };
    var onMappingToChange = function (value) {
        onUpdate(__assign(__assign({}, valueMapping), { to: value }));
    };
    var onMappingTextChange = function (value) {
        onUpdate(__assign(__assign({}, valueMapping), { text: value }));
    };
    var onMappingTypeChange = function (mappingType) {
        onUpdate(__assign(__assign({}, valueMapping), { type: mappingType }));
    };
    var onKeyDown = function (handler) { return function (e) {
        if (e.key === 'Enter') {
            handler(e.currentTarget.value);
        }
    }; };
    var renderRow = function () {
        if (type === MappingType.RangeToText) {
            return (React.createElement(React.Fragment, null,
                React.createElement(HorizontalGroup, null,
                    React.createElement(Field, { label: "From" },
                        React.createElement(Input, { type: "number", defaultValue: valueMapping.from, onBlur: function (e) { return onMappingFromChange(e.currentTarget.value); }, onKeyDown: onKeyDown(onMappingFromChange) })),
                    React.createElement(Field, { label: "To" },
                        React.createElement(Input, { type: "number", defaultValue: valueMapping.to, onBlur: function (e) { return onMappingToChange(e.currentTarget.value); }, onKeyDown: onKeyDown(onMappingToChange) }))),
                React.createElement(Field, { label: "Text" },
                    React.createElement(Input, { defaultValue: valueMapping.text, onBlur: function (e) { return onMappingTextChange(e.currentTarget.value); }, onKeyDown: onKeyDown(onMappingTextChange) }))));
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(Field, { label: "Value" },
                React.createElement(Input, { defaultValue: valueMapping.value, onBlur: function (e) { return onMappingValueChange(e.currentTarget.value); }, onKeyDown: onKeyDown(onMappingValueChange) })),
            React.createElement(Field, { label: "Text" },
                React.createElement(Input, { defaultValue: valueMapping.text, onBlur: function (e) { return onMappingTextChange(e.currentTarget.value); }, onKeyDown: onKeyDown(onMappingTextChange) }))));
    };
    var label = (React.createElement(HorizontalGroup, { justify: "space-between", align: "center" },
        React.createElement(Label, null, "Mapping type"),
        React.createElement(IconButton, { name: "times", onClick: onRemove, "aria-label": "ValueMappingsEditor remove button" })));
    return (React.createElement("div", null,
        React.createElement(Field, { label: label },
            React.createElement(RadioButtonGroup, { options: MAPPING_OPTIONS, value: type, onChange: function (type) {
                    onMappingTypeChange(type);
                } })),
        renderRow()));
};
//# sourceMappingURL=MappingRow.js.map