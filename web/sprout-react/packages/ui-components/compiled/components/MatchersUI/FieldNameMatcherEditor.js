import { __values } from "tslib";
import React, { memo, useMemo, useCallback } from 'react';
import { FieldMatcherID, fieldMatchers, getFieldDisplayName } from '@grafana/data';
import { Select } from '../Select/Select';
export var FieldNameMatcherEditor = memo(function (props) {
    var data = props.data, options = props.options;
    var names = useFieldDisplayNames(data);
    var selectOptions = useSelectOptions(names);
    var onChange = useCallback(function (selection) {
        if (!selection.value || !names.has(selection.value)) {
            return;
        }
        return props.onChange(selection.value);
    }, [names, props.onChange]);
    var selectedOption = selectOptions.find(function (v) { return v.value === options; });
    return React.createElement(Select, { value: selectedOption, options: selectOptions, onChange: onChange });
});
export var fieldNameMatcherItem = {
    id: FieldMatcherID.byName,
    component: FieldNameMatcherEditor,
    matcher: fieldMatchers.get(FieldMatcherID.byName),
    name: 'Fields with name',
    description: 'Set properties for a specific field',
    optionsToLabel: function (options) { return options; },
};
var useFieldDisplayNames = function (data) {
    return useMemo(function () {
        var e_1, _a, e_2, _b;
        var names = new Set();
        try {
            for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var frame = data_1_1.value;
                try {
                    for (var _c = (e_2 = void 0, __values(frame.fields)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var field = _d.value;
                        names.add(getFieldDisplayName(field, frame, data));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return names;
    }, [data]);
};
var useSelectOptions = function (displayNames) {
    return useMemo(function () {
        return Array.from(displayNames).map(function (n) { return ({
            value: n,
            label: n,
        }); });
    }, [displayNames]);
};
//# sourceMappingURL=FieldNameMatcherEditor.js.map