import { __makeTemplateObject } from "tslib";
import React from 'react';
import { css } from 'emotion';
import { stylesFactory, useTheme } from '../../themes';
import { Icon } from '../Icon/Icon';
var getStyles = stylesFactory(function (theme) { return ({
    content: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    white-space: nowrap;\n    height: 100%;\n  "], ["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    white-space: nowrap;\n    height: 100%;\n  "]))),
    icon: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    & + * {\n      margin-left: ", ";\n    }\n  "], ["\n    & + * {\n      margin-left: ", ";\n    }\n  "])), theme.spacing.sm),
}); });
export function ButtonContent(props) {
    var icon = props.icon, children = props.children, size = props.size;
    var theme = useTheme();
    var styles = getStyles(theme);
    if (!children) {
        return React.createElement("span", { className: styles.content }, icon && React.createElement(Icon, { name: icon, size: size }));
    }
    var iconElement = icon && (React.createElement("span", { className: styles.icon },
        React.createElement(Icon, { name: icon, size: size })));
    return (React.createElement("span", { className: styles.content },
        iconElement,
        React.createElement("span", null, children)));
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=ButtonContent.js.map