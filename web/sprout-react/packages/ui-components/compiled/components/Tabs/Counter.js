import { __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import { css } from 'emotion';
import { stylesFactory, ThemeContext } from '../../themes';
import { locale } from '@grafana/data';
var getStyles = stylesFactory(function (theme) {
    return {
        counter: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      label: counter;\n      margin-left: ", ";\n      border-radius: ", ";\n      background-color: ", ";\n      padding: ", " ", ";\n      color: ", ";\n      font-weight: ", ";\n      font-size: ", ";\n    "], ["\n      label: counter;\n      margin-left: ", ";\n      border-radius: ", ";\n      background-color: ", ";\n      padding: ", " ", ";\n      color: ", ";\n      font-weight: ", ";\n      font-size: ", ";\n    "])), theme.spacing.sm, theme.spacing.lg, theme.colors.bg2, theme.spacing.xxs, theme.spacing.sm, theme.colors.textWeak, theme.typography.weight.semibold, theme.typography.size.sm),
    };
});
export var Counter = function (_a) {
    var value = _a.value;
    var theme = useContext(ThemeContext);
    var styles = getStyles(theme);
    return React.createElement("span", { className: styles.counter }, locale(value, 0).text);
};
var templateObject_1;
//# sourceMappingURL=Counter.js.map