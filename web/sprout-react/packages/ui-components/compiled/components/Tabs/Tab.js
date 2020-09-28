import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
import { selectors } from '@grafana/e2e-selectors';
import { Icon } from '../Icon/Icon';
import { stylesFactory, useTheme } from '../../themes';
import { Counter } from './Counter';
export var Tab = React.forwardRef(function (_a, ref) {
    var label = _a.label, active = _a.active, icon = _a.icon, onChangeTab = _a.onChangeTab, counter = _a.counter, className = _a.className, href = _a.href, otherProps = __rest(_a, ["label", "active", "icon", "onChangeTab", "counter", "className", "href"]);
    var theme = useTheme();
    var tabsStyles = getTabStyles(theme);
    var content = function () { return (React.createElement(React.Fragment, null,
        icon && React.createElement(Icon, { name: icon }),
        label,
        typeof counter === 'number' && React.createElement(Counter, { value: counter }))); };
    return (React.createElement("li", __assign({}, otherProps, { className: cx(!href && tabsStyles.padding, tabsStyles.tabItem, active && tabsStyles.activeStyle), onClick: onChangeTab, "aria-label": otherProps['aria-label'] || selectors.components.Tab.title(label), ref: ref }), href ? (React.createElement("a", { href: href, className: tabsStyles.padding }, content())) : (React.createElement(React.Fragment, null, content()))));
});
var getTabStyles = stylesFactory(function (theme) {
    var colors = theme.colors;
    return {
        tabItem: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      list-style: none;\n      margin-right: ", ";\n      position: relative;\n      display: block;\n      border: solid transparent;\n      border-width: 0 1px 1px;\n      border-radius: ", " ", " 0 0;\n      color: ", ";\n      cursor: pointer;\n\n      svg {\n        margin-right: ", ";\n      }\n\n      a {\n        display: block;\n        height: 100%;\n      }\n      &:hover,\n      &:focus {\n        color: ", ";\n      }\n    "], ["\n      list-style: none;\n      margin-right: ", ";\n      position: relative;\n      display: block;\n      border: solid transparent;\n      border-width: 0 1px 1px;\n      border-radius: ", " ", " 0 0;\n      color: ", ";\n      cursor: pointer;\n\n      svg {\n        margin-right: ", ";\n      }\n\n      a {\n        display: block;\n        height: 100%;\n      }\n      &:hover,\n      &:focus {\n        color: ", ";\n      }\n    "])), theme.spacing.md, theme.border.radius.md, theme.border.radius.md, colors.text, theme.spacing.sm, colors.linkHover),
        padding: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      padding: 11px 15px 9px;\n    "], ["\n      padding: 11px 15px 9px;\n    "]))),
        activeStyle: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      label: activeTabStyle;\n      border-color: ", " ", " transparent;\n      background: ", ";\n      color: ", ";\n      overflow: hidden;\n\n      &::before {\n        display: block;\n        content: ' ';\n        position: absolute;\n        left: 0;\n        right: 0;\n        height: 2px;\n        top: 0;\n        background-image: linear-gradient(to right, #f05a28 30%, #fbca0a 99%);\n      }\n    "], ["\n      label: activeTabStyle;\n      border-color: ", " ", " transparent;\n      background: ", ";\n      color: ", ";\n      overflow: hidden;\n\n      &::before {\n        display: block;\n        content: ' ';\n        position: absolute;\n        left: 0;\n        right: 0;\n        height: 2px;\n        top: 0;\n        background-image: linear-gradient(to right, #f05a28 30%, #fbca0a 99%);\n      }\n    "])), theme.palette.orange, colors.pageHeaderBorder, colors.bodyBg, colors.link),
    };
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Tab.js.map