import { __read } from "tslib";
import React, { useState } from 'react';
import { zip, fromPairs } from 'lodash';
import { withCenteredStory } from '../../../../utils/storybook/withCenteredStory';
import { Input } from './Input';
import { text, select } from '@storybook/addon-knobs';
import { EventsWithValidation } from '../../../../utils';
var getKnobs = function () {
    return {
        validation: text('Validation regex (will do a partial match if you do not anchor it)', ''),
        validationErrorMessage: text('Validation error message', 'Input not valid'),
        validationEvent: select('Validation event', fromPairs(zip(Object.keys(EventsWithValidation), Object.values(EventsWithValidation))), EventsWithValidation.onBlur),
    };
};
var Wrapper = function () {
    var _a;
    var _b = getKnobs(), validation = _b.validation, validationErrorMessage = _b.validationErrorMessage, validationEvent = _b.validationEvent;
    var _c = __read(useState(''), 2), value = _c[0], setValue = _c[1];
    var validations = (_a = {},
        _a[validationEvent] = [
            {
                rule: function (value) {
                    return !!value.match(validation);
                },
                errorMessage: validationErrorMessage,
            },
        ],
        _a);
    return React.createElement(Input, { value: value, onChange: function (e) { return setValue(e.currentTarget.value); }, validationEvents: validations });
};
export default {
    title: 'Forms/Legacy/Input',
    component: Input,
    decorators: [withCenteredStory],
};
export var basic = function () { return React.createElement(Wrapper, null); };
//# sourceMappingURL=Input.story.internal.js.map