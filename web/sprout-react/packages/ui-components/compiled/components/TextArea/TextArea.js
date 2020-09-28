import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '../../themes';
import { getFocusStyle, sharedInputStyle } from '../Forms/commonStyles';
export var TextArea = React.forwardRef(function (_a, ref) {
    var invalid = _a.invalid, className = _a.className, props = __rest(_a, ["invalid", "className"]);
    var theme = useTheme();
    var styles = getTextAreaStyle(theme, invalid);
    return React.createElement("textarea", __assign({}, props, { className: cx(styles.textarea, className), ref: ref }));
});
var getTextAreaStyle = stylesFactory(function (theme, invalid) {
    if (invalid === void 0) { invalid = false; }
    return {
        textarea: cx(sharedInputStyle(theme), getFocusStyle(theme), css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        border-radius: ", ";\n        padding: ", "px ", "px;\n        width: 100%;\n        border-color: ", ";\n      "], ["\n        border-radius: ", ";\n        padding: ", "px ", "px;\n        width: 100%;\n        border-color: ", ";\n      "])), theme.border.radius.sm, theme.spacing.formSpacingBase / 4, theme.spacing.formSpacingBase, invalid ? theme.palette.redBase : theme.colors.formInputBorder)),
    };
});
TextArea.displayName = 'TextArea';
var templateObject_1;
//# sourceMappingURL=TextArea.js.map