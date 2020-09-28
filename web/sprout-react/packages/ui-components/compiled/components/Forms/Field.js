import { __makeTemplateObject } from "tslib";
import React from 'react';
import { Label } from './Label';
import { stylesFactory, useTheme } from '../../themes';
import { css, cx } from 'emotion';
import { FieldValidationMessage } from './FieldValidationMessage';
export var getFieldStyles = stylesFactory(function (theme) {
    return {
        field: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      display: flex;\n      flex-direction: column;\n      margin-bottom: ", "px;\n    "], ["\n      display: flex;\n      flex-direction: column;\n      margin-bottom: ", "px;\n    "])), theme.spacing.formSpacingBase * 2),
        fieldHorizontal: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      flex-direction: row;\n      justify-content: space-between;\n      flex-wrap: wrap;\n    "], ["\n      flex-direction: row;\n      justify-content: space-between;\n      flex-wrap: wrap;\n    "]))),
        fieldValidationWrapper: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      margin-top: ", "px;\n    "], ["\n      margin-top: ", "px;\n    "])), theme.spacing.formSpacingBase / 2),
        fieldValidationWrapperHorizontal: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      flex: 1 1 100%;\n    "], ["\n      flex: 1 1 100%;\n    "]))),
    };
});
export var Field = function (_a) {
    var label = _a.label, description = _a.description, horizontal = _a.horizontal, invalid = _a.invalid, loading = _a.loading, disabled = _a.disabled, required = _a.required, error = _a.error, children = _a.children, className = _a.className;
    var theme = useTheme();
    var inputId;
    var styles = getFieldStyles(theme);
    // Get the first, and only, child to retrieve form input's id
    var child = React.Children.map(children, function (c) { return c; })[0];
    if (child) {
        // Retrieve input's id to apply on the label for correct click interaction
        inputId = child.props.id;
    }
    var labelElement = typeof label === 'string' ? (React.createElement(Label, { htmlFor: inputId, description: description }, "" + label + (required ? ' *' : ''))) : (label);
    return (React.createElement("div", { className: cx(styles.field, horizontal && styles.fieldHorizontal, className) },
        labelElement,
        React.createElement("div", null,
            React.cloneElement(children, { invalid: invalid, disabled: disabled, loading: loading }),
            invalid && error && !horizontal && (React.createElement("div", { className: styles.fieldValidationWrapper },
                React.createElement(FieldValidationMessage, null, error)))),
        invalid && error && horizontal && (React.createElement("div", { className: cx(styles.fieldValidationWrapper, styles.fieldValidationWrapperHorizontal) },
            React.createElement(FieldValidationMessage, null, error)))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=Field.js.map