import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
import { toPascalCase } from '@grafana/data';
import { stylesFactory } from '../../themes/stylesFactory';
import { useTheme } from '../../themes/ThemeContext';
//@ts-ignore
import * as DefaultIcon from '@iconscout/react-unicons';
import * as MonoIcon from './assets';
var alwaysMonoIcons = ['grafana', 'favorite', 'heart-break', 'heart'];
var getIconStyles = stylesFactory(function (theme) {
    return {
        container: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      label: Icon;\n      display: inline-block;\n    "], ["\n      label: Icon;\n      display: inline-block;\n    "]))),
        icon: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      vertical-align: middle;\n      display: inline-block;\n      margin-bottom: ", ";\n      fill: currentColor;\n    "], ["\n      vertical-align: middle;\n      display: inline-block;\n      margin-bottom: ", ";\n      fill: currentColor;\n    "])), theme.spacing.xxs),
        orange: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      fill: ", ";\n    "], ["\n      fill: ", ";\n    "])), theme.palette.orange),
    };
});
export var Icon = React.forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 'md' : _c, _d = _a.type, type = _d === void 0 ? 'default' : _d, name = _a.name, className = _a.className, style = _a.style, divElementProps = __rest(_a, ["size", "type", "name", "className", "style"]);
    var theme = useTheme();
    var styles = getIconStyles(theme);
    var svgSize = getSvgSize(size);
    /* Temporary solution to display also font awesome icons */
    var isFontAwesome = name === null || name === void 0 ? void 0 : name.includes('fa-');
    if (isFontAwesome) {
        return React.createElement("i", __assign({ className: cx(name, className) }, divElementProps, { style: style }));
    }
    if (alwaysMonoIcons.includes(name)) {
        type = 'mono';
    }
    var iconName = type === 'default' ? "Uil" + toPascalCase(name) : toPascalCase(name);
    /* Unicons don't have type definitions */
    //@ts-ignore
    var Component = type === 'default' ? DefaultIcon[iconName] : MonoIcon[iconName];
    if (!Component) {
        return React.createElement("div", null);
    }
    return (React.createElement("div", __assign({ className: styles.container }, divElementProps, { ref: ref }),
        type === 'default' && React.createElement(Component, { size: svgSize, className: cx(styles.icon, className), style: style }),
        type === 'mono' && (React.createElement(Component, { size: svgSize, className: cx(styles.icon, (_b = {}, _b[styles.orange] = name === 'favorite', _b), className), style: style }))));
});
Icon.displayName = 'Icon';
/* Transform string with px to number and add 2 pxs as path in svg is 2px smaller */
export var getSvgSize = function (size) {
    switch (size) {
        case 'xs':
            return 12;
        case 'sm':
            return 14;
        case 'md':
            return 16;
        case 'lg':
            return 18;
        case 'xl':
            return 24;
        case 'xxl':
            return 36;
        case 'xxxl':
            return 48;
    }
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Icon.js.map