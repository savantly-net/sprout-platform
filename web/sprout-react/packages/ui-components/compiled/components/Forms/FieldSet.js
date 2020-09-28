import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '../../themes';
import { Legend } from './Legend';
export var FieldSet = function (_a) {
    var label = _a.label, children = _a.children, className = _a.className, rest = __rest(_a, ["label", "children", "className"]);
    var theme = useTheme();
    var styles = getStyles(theme);
    return (React.createElement("fieldset", __assign({ className: cx(styles.wrapper, className) }, rest),
        label && React.createElement(Legend, null, label),
        children));
};
var getStyles = stylesFactory(function (theme) {
    return {
        wrapper: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      margin-bottom: ", "px;\n    "], ["\n      margin-bottom: ", "px;\n    "])), theme.spacing.formSpacingBase * 4),
    };
});
var templateObject_1;
//# sourceMappingURL=FieldSet.js.map