import { __makeTemplateObject } from "tslib";
import React from 'react';
import { css } from 'emotion';
import { selectThemeVariant, stylesFactory, useTheme } from '../../themes';
import { Label } from '../Forms/Label';
import { Icon } from '../Icon/Icon';
export var FieldConfigItemHeaderTitle = function (_a) {
    var title = _a.title, description = _a.description, onRemove = _a.onRemove, children = _a.children, transparent = _a.transparent;
    var theme = useTheme();
    var styles = getFieldConfigItemHeaderTitleStyles(theme);
    return (React.createElement("div", { className: !transparent ? styles.headerWrapper : '' },
        React.createElement("div", { className: styles.header },
            React.createElement(Label, { description: description }, title),
            React.createElement("div", { className: styles.remove, onClick: function () { return onRemove(); }, "aria-label": "FieldConfigItemHeaderTitle remove button" },
                React.createElement(Icon, { name: "trash-alt" }))),
        children));
};
var getFieldConfigItemHeaderTitleStyles = stylesFactory(function (theme) {
    var headerBg = selectThemeVariant({
        light: theme.palette.white,
        dark: theme.palette.dark1,
    }, theme.type);
    return {
        headerWrapper: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      background: ", ";\n      padding: ", " 0;\n    "], ["\n      background: ", ";\n      padding: ", " 0;\n    "])), headerBg, theme.spacing.xs),
        header: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      display: flex;\n      justify-content: space-between;\n      padding: ", " ", " 0 ", ";\n    "], ["\n      display: flex;\n      justify-content: space-between;\n      padding: ", " ", " 0 ", ";\n    "])), theme.spacing.xs, theme.spacing.xs, theme.spacing.xs),
        remove: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      flex-grow: 0;\n      flex-shrink: 0;\n      cursor: pointer;\n      color: ", ";\n    "], ["\n      flex-grow: 0;\n      flex-shrink: 0;\n      cursor: pointer;\n      color: ", ";\n    "])), theme.palette.red88),
    };
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=FieldConfigItemHeaderTitle.js.map