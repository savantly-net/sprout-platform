import React from 'react';
import { number, text } from '@storybook/addon-knobs';
import { withCenteredStory } from '../../utils/storybook/withCenteredStory';
import { FormField } from './FormField';
var getKnobs = function () {
    return {
        label: text('label', 'Test'),
        tooltip: text('tooltip', 'This is a tooltip with information about this FormField'),
        labelWidth: number('labelWidth', 10),
        inputWidth: number('inputWidth', 20),
    };
};
export default {
    title: 'Forms/Legacy/FormField',
    component: FormField,
    decorators: [withCenteredStory],
};
export var basic = function () {
    var _a = getKnobs(), inputWidth = _a.inputWidth, label = _a.label, labelWidth = _a.labelWidth;
    return React.createElement(FormField, { label: label, labelWidth: labelWidth, inputWidth: inputWidth });
};
export var withTooltip = function () {
    var _a = getKnobs(), inputWidth = _a.inputWidth, label = _a.label, labelWidth = _a.labelWidth, tooltip = _a.tooltip;
    return React.createElement(FormField, { label: label, labelWidth: labelWidth, inputWidth: inputWidth, tooltip: tooltip });
};
//# sourceMappingURL=FormField.story.internal.js.map