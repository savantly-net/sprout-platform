import { __assign, __makeTemplateObject, __rest } from "tslib";
import React, { forwardRef } from 'react';
import { cx, css } from 'emotion';
import { useTheme } from '../../themes';
import { getTagColor, getTagColorsFromName } from '../../utils';
export var Tag = forwardRef(function (_a, ref) {
    var name = _a.name, onClick = _a.onClick, className = _a.className, colorIndex = _a.colorIndex, rest = __rest(_a, ["name", "onClick", "className", "colorIndex"]);
    var theme = useTheme();
    var styles = getTagStyles(theme, name, colorIndex);
    var onTagClick = function (event) {
        if (onClick) {
            onClick(name, event);
        }
    };
    return (React.createElement("span", __assign({ key: name, ref: ref, onClick: onTagClick, className: cx(styles.wrapper, className) }, rest), name));
});
var getTagStyles = function (theme, name, colorIndex) {
    var colors;
    if (colorIndex === undefined) {
        colors = getTagColorsFromName(name);
    }
    else {
        colors = getTagColor(colorIndex);
    }
    return {
        wrapper: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      font-weight: ", ";\n      font-size: ", ";\n      line-height: ", ";\n      vertical-align: baseline;\n      background-color: ", ";\n      color: ", ";\n      white-space: nowrap;\n      text-shadow: none;\n      padding: 3px 6px;\n      border-radius: ", ";\n\n      :hover {\n        opacity: 0.85;\n        cursor: pointer;\n      }\n    "], ["\n      font-weight: ", ";\n      font-size: ", ";\n      line-height: ", ";\n      vertical-align: baseline;\n      background-color: ", ";\n      color: ", ";\n      white-space: nowrap;\n      text-shadow: none;\n      padding: 3px 6px;\n      border-radius: ", ";\n\n      :hover {\n        opacity: 0.85;\n        cursor: pointer;\n      }\n    "])), theme.typography.weight.semibold, theme.typography.size.sm, theme.typography.lineHeight.xs, colors.color, theme.palette.gray98, theme.border.radius.md),
    };
};
var templateObject_1;
//# sourceMappingURL=Tag.js.map