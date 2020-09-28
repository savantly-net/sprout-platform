import React, { memo, useCallback } from 'react';
import { FieldMatcherID, fieldMatchers } from '@savantly/sprout-api';
import { Input } from '../Input/Input';
export var FieldNameByRegexMatcherEditor = memo(function (props) {
    var options = props.options;
    var onBlur = useCallback(function (e) {
        return props.onChange(e.target.value);
    }, [props.onChange]);
    return React.createElement(Input, { placeholder: "Enter regular expression", defaultValue: options, onBlur: onBlur });
});
export var fieldNameByRegexMatcherItem = {
    id: FieldMatcherID.byRegexp,
    component: FieldNameByRegexMatcherEditor,
    matcher: fieldMatchers.get(FieldMatcherID.byRegexp),
    name: 'Fields with name matching regex',
    description: 'Set properties for fields with names matching a regex',
    optionsToLabel: function (options) { return options; },
};
//# sourceMappingURL=FieldNameByRegexMatcherEditor.js.map