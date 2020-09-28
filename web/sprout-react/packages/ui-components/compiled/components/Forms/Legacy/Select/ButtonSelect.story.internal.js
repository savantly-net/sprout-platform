import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object, text } from '@storybook/addon-knobs';
import { withCenteredStory } from '../../../../utils/storybook/withCenteredStory';
import { UseState } from '../../../../utils/storybook/UseState';
import { ButtonSelect } from './ButtonSelect';
export default {
    title: 'Forms/Select/ButtonSelect',
    component: ButtonSelect,
    decorators: [withCenteredStory, withKnobs],
};
export var basic = function () {
    var initialState = { label: 'A label', value: 'A value' };
    var value = object('Selected Value:', initialState);
    var options = object('Options:', [
        initialState,
        { label: 'Another label', value: 'Another value' },
    ]);
    return (React.createElement(UseState, { initialState: value }, function (value, updateValue) {
        return (React.createElement(ButtonSelect, { value: value, options: options, onChange: function (value) {
                action('onChanged fired')(value);
                updateValue(value);
            }, label: value.label ? value.label : '', className: "refresh-select", iconClass: text('iconClass', 'clock-nine') }));
    }));
};
//# sourceMappingURL=ButtonSelect.story.internal.js.map