import { __assign, __makeTemplateObject, __rest } from "tslib";
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { css } from 'emotion';
export function Form(_a) {
    var defaultValues = _a.defaultValues, onSubmit = _a.onSubmit, _b = _a.validateOnMount, validateOnMount = _b === void 0 ? false : _b, validateFieldsOnMount = _a.validateFieldsOnMount, children = _a.children, _c = _a.validateOn, validateOn = _c === void 0 ? 'onSubmit' : _c, _d = _a.maxWidth, maxWidth = _d === void 0 ? 600 : _d, htmlProps = __rest(_a, ["defaultValues", "onSubmit", "validateOnMount", "validateFieldsOnMount", "children", "validateOn", "maxWidth"]);
    var _e = useForm({
        mode: validateOn,
        defaultValues: defaultValues,
    }), handleSubmit = _e.handleSubmit, register = _e.register, errors = _e.errors, control = _e.control, triggerValidation = _e.triggerValidation, getValues = _e.getValues, formState = _e.formState, watch = _e.watch;
    useEffect(function () {
        if (validateOnMount) {
            triggerValidation(validateFieldsOnMount);
        }
    }, []);
    return (React.createElement("form", __assign({ className: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        max-width: ", "px;\n        width: 100%;\n      "], ["\n        max-width: ", "px;\n        width: 100%;\n      "])), maxWidth), onSubmit: handleSubmit(onSubmit) }, htmlProps), children({ register: register, errors: errors, control: control, getValues: getValues, formState: formState, watch: watch })));
}
var templateObject_1;
//# sourceMappingURL=Form.js.map