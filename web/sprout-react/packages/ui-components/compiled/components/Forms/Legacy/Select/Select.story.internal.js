import { __read } from "tslib";
import React, { useState, useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs';
import { withCenteredStory } from '../../../../utils/storybook/withCenteredStory';
import { UseState } from '../../../../utils/storybook/UseState';
import { Select, AsyncSelect } from './Select';
export default {
    title: 'Forms/Legacy/Select',
    component: Select,
    decorators: [withCenteredStory, withKnobs],
};
var initialState = { label: 'A label', value: 'A value' };
var options = object('Options:', [
    initialState,
    { label: 'Another label', value: 'Another value 1' },
    { label: 'Another label', value: 'Another value 2' },
    { label: 'Another label', value: 'Another value 3' },
    { label: 'Another label', value: 'Another value 4' },
    { label: 'Another label', value: 'Another value 5' },
    { label: 'Another label', value: 'Another value ' },
]);
export var basic = function () {
    var value = object('Selected Value:', initialState);
    return (React.createElement(UseState, { initialState: value }, function (value, updateValue) {
        return (React.createElement(Select, { placeholder: "Choose...", options: options, width: 20, onChange: function (value) {
                action('onChanged fired')(value);
                updateValue(value);
            } }));
    }));
};
export var withAllowCustomValue = function () {
    // @ts-ignore
    var value = object('Selected Value:', null);
    return (React.createElement(UseState, { initialState: value }, function (value, updateValue) {
        return (React.createElement(Select, { placeholder: "Choose...", options: options, width: 20, allowCustomValue: true, onChange: function (value) {
                action('onChanged fired')(value);
                updateValue(value);
            } }));
    }));
};
export var asyncSelect = function () {
    var _a = __read(useState(true), 2), isLoading = _a[0], setIsLoading = _a[1];
    var _b = __read(useState(), 2), value = _b[0], setValue = _b[1];
    var loadAsyncOptions = useCallback(function (inputValue) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                setIsLoading(false);
                resolve(options.filter(function (option) { return option.label && option.label.includes(inputValue); }));
            }, 1000);
        });
    }, [value]);
    return (React.createElement(AsyncSelect, { value: value, defaultOptions: true, width: 20, isLoading: isLoading, loadOptions: loadAsyncOptions, onChange: function (value) {
            action('onChange')(value);
            setValue(value);
        } }));
};
//# sourceMappingURL=Select.story.internal.js.map