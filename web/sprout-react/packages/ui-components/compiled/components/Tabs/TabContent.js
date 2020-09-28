import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { stylesFactory, useTheme } from '../../themes';
import { css, cx } from 'emotion';
var getTabContentStyle = stylesFactory(function (theme) {
    return {
        tabContent: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      padding: ", ";\n    "], ["\n      padding: ", ";\n    "])), theme.spacing.sm),
    };
});
export var TabContent = function (_a) {
    var children = _a.children, className = _a.className, restProps = __rest(_a, ["children", "className"]);
    var theme = useTheme();
    var styles = getTabContentStyle(theme);
    return (React.createElement("div", __assign({}, restProps, { className: cx(styles.tabContent, className) }), children));
};
var templateObject_1;
//# sourceMappingURL=TabContent.js.map