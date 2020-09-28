import React from 'react';
import { action } from '@storybook/addon-actions';
import { ToggleButton, ToggleButtonGroup } from './ToggleButtonGroup';
import { UseState } from '../../utils/storybook/UseState';
import { withCenteredStory } from '../../utils/storybook/withCenteredStory';
export default {
    title: 'Forms/Legacy/ToggleButtonGroup',
    component: ToggleButtonGroup,
    decorators: [withCenteredStory],
};
var options = [
    { value: 'first', label: 'First' },
    { value: 'second', label: 'Second' },
    { value: 'third', label: 'Third' },
];
export var basic = function () {
    return (React.createElement(UseState, { initialState: {
            value: 'first',
        } }, function (value, updateValue) {
        return (React.createElement(ToggleButtonGroup, { label: "Options" }, options.map(function (option, index) {
            return (React.createElement(ToggleButton, { key: option.value + "-" + index, value: option.value, onChange: function (newValue) {
                    action('on change')(newValue);
                    updateValue({ value: newValue });
                }, selected: value.value === option.value }, option.label));
        })));
    }));
};
//# sourceMappingURL=ToggleButtonGroup.story.internal.js.map