import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { css } from 'emotion';
import { Button } from '../Button';
import { SelectBase } from './SelectBase';
import { stylesFactory, useTheme } from '../../themes';
import { Icon } from '../Icon/Icon';
var SelectButton = React.forwardRef(function (_a, ref) {
    var icon = _a.icon, children = _a.children, isOpen = _a.isOpen, buttonProps = __rest(_a, ["icon", "children", "isOpen"]);
    var getStyles = stylesFactory(function (theme) { return ({
        wrapper: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        max-width: 200px;\n        text-overflow: ellipsis;\n      "], ["\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        max-width: 200px;\n        text-overflow: ellipsis;\n      "]))),
        iconWrap: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        padding: 0 15px 0 0;\n      "], ["\n        padding: 0 15px 0 0;\n      "]))),
        caretWrap: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        padding-left: ", ";\n        margin-left: ", ";\n        margin-right: -", ";\n        height: 100%;\n      "], ["\n        padding-left: ", ";\n        margin-left: ", ";\n        margin-right: -", ";\n        height: 100%;\n      "])), theme.spacing.sm, theme.spacing.sm, theme.spacing.sm),
    }); });
    var styles = getStyles(useTheme());
    return (React.createElement(Button, __assign({}, buttonProps, { ref: ref, icon: icon }),
        React.createElement("span", { className: styles.wrapper },
            React.createElement("span", null, children),
            React.createElement("span", { className: styles.caretWrap },
                React.createElement(Icon, { name: isOpen ? 'angle-up' : 'angle-down' })))));
});
export function ButtonSelect(_a) {
    var placeholder = _a.placeholder, icon = _a.icon, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, className = _a.className, disabled = _a.disabled, selectProps = __rest(_a, ["placeholder", "icon", "variant", "size", "className", "disabled"]);
    var buttonProps = {
        icon: icon,
        variant: variant,
        size: size,
        className: className,
        disabled: disabled,
    };
    return (React.createElement(SelectBase, __assign({}, selectProps, { renderControl: React.forwardRef(function (_a, ref) {
            var onBlur = _a.onBlur, onClick = _a.onClick, value = _a.value, isOpen = _a.isOpen;
            return (React.createElement(SelectButton, __assign({}, buttonProps, { ref: ref, onBlur: onBlur, onClick: onClick, isOpen: isOpen }), value ? value.label : placeholder));
        }) })));
}
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=ButtonSelect.js.map