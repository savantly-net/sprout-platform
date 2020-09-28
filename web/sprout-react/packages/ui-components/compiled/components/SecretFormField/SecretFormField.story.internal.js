import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { SecretFormField } from './SecretFormField';
import { withCenteredStory } from '../../utils/storybook/withCenteredStory';
import { UseState } from '../../utils/storybook/UseState';
export default {
    title: 'Forms/SecretFormField',
    component: SecretFormField,
    decorators: [withCenteredStory],
};
var getSecretFormFieldKnobs = function () {
    return {
        isConfigured: boolean('Set configured state', false),
    };
};
export var basic = function () {
    var knobs = getSecretFormFieldKnobs();
    return (React.createElement(UseState, { initialState: "Input value" }, function (value, setValue) { return (React.createElement(SecretFormField, { label: 'Secret field', labelWidth: 10, value: value, isConfigured: knobs.isConfigured, onChange: function (e) { return setValue(e.currentTarget.value); }, onReset: function () {
            action('Value was reset')('');
            setValue('');
        } })); }));
};
//# sourceMappingURL=SecretFormField.story.internal.js.map