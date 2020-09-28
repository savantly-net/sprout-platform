import { __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import { stylesFactory, ThemeContext } from '../../themes';
import { css } from 'emotion';
import { IconButton } from '../IconButton/IconButton';
export var FilterPill = function (_a) {
    var label = _a.label, selected = _a.selected, onClick = _a.onClick, _b = _a.icon, icon = _b === void 0 ? 'check' : _b;
    var theme = useContext(ThemeContext);
    var styles = getFilterPillStyles(theme, selected);
    return (React.createElement("div", { className: styles.wrapper, onClick: onClick },
        React.createElement(IconButton, { name: icon, onClick: function (e) {
                e.stopPropagation();
                onClick(e);
            }, className: styles.icon, surface: "header" }),
        React.createElement("span", { className: styles.label }, label)));
};
var getFilterPillStyles = stylesFactory(function (theme, isSelected) {
    var labelColor = isSelected ? theme.colors.text : theme.colors.textWeak;
    return {
        wrapper: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      padding: ", " ", ";\n      background: ", ";\n      border-radius: ", ";\n      display: inline-block;\n      padding: 0 ", " 0 ", ";\n      font-weight: ", ";\n      font-size: ", ";\n      color: ", ";\n      display: flex;\n      align-items: center;\n      height: 32px;\n      cursor: pointer;\n    "], ["\n      padding: ", " ", ";\n      background: ", ";\n      border-radius: ", ";\n      display: inline-block;\n      padding: 0 ", " 0 ", ";\n      font-weight: ", ";\n      font-size: ", ";\n      color: ", ";\n      display: flex;\n      align-items: center;\n      height: 32px;\n      cursor: pointer;\n    "])), theme.spacing.xxs, theme.spacing.sm, theme.colors.bg2, theme.border.radius.sm, theme.spacing.md, theme.spacing.xs, theme.typography.weight.semibold, theme.typography.size.sm, theme.colors.text),
        icon: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      margin-right: ", ";\n      margin-left: ", ";\n      color: ", ";\n    "], ["\n      margin-right: ", ";\n      margin-left: ", ";\n      color: ", ";\n    "])), theme.spacing.sm, theme.spacing.xs, labelColor),
        label: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      color: ", ";\n    "], ["\n      color: ", ";\n    "])), labelColor),
    };
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=FilterPill.js.map