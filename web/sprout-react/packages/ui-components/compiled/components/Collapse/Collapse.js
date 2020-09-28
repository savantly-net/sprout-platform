import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React, { useContext, useState } from 'react';
import { css, cx } from 'emotion';
import { ThemeContext } from '../../themes/ThemeContext';
import { stylesFactory } from '../../themes/stylesFactory';
import { Icon } from '../Icon/Icon';
var getStyles = stylesFactory(function (theme) { return ({
    collapse: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    label: collapse;\n    margin-bottom: ", ";\n  "], ["\n    label: collapse;\n    margin-bottom: ", ";\n  "])), theme.spacing.sm),
    collapseBody: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    label: collapse__body;\n    padding: ", "px;\n  "], ["\n    label: collapse__body;\n    padding: ", "px;\n  "])), theme.panelPadding),
    loader: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    label: collapse__loader;\n    height: 2px;\n    position: relative;\n    overflow: hidden;\n    background: none;\n    margin: ", ";\n  "], ["\n    label: collapse__loader;\n    height: 2px;\n    position: relative;\n    overflow: hidden;\n    background: none;\n    margin: ", ";\n  "])), theme.spacing.xs),
    loaderActive: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    label: collapse__loader_active;\n    &:after {\n      content: ' ';\n      display: block;\n      width: 25%;\n      top: 0;\n      top: -50%;\n      height: 250%;\n      position: absolute;\n      animation: loader 2s cubic-bezier(0.17, 0.67, 0.83, 0.67) 500ms;\n      animation-iteration-count: 100;\n      left: -25%;\n      background: ", ";\n    }\n    @keyframes loader {\n      from {\n        left: -25%;\n        opacity: 0.1;\n      }\n      to {\n        left: 100%;\n        opacity: 1;\n      }\n    }\n  "], ["\n    label: collapse__loader_active;\n    &:after {\n      content: ' ';\n      display: block;\n      width: 25%;\n      top: 0;\n      top: -50%;\n      height: 250%;\n      position: absolute;\n      animation: loader 2s cubic-bezier(0.17, 0.67, 0.83, 0.67) 500ms;\n      animation-iteration-count: 100;\n      left: -25%;\n      background: ", ";\n    }\n    @keyframes loader {\n      from {\n        left: -25%;\n        opacity: 0.1;\n      }\n      to {\n        left: 100%;\n        opacity: 1;\n      }\n    }\n  "])), theme.palette.blue85),
    header: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    label: collapse__header;\n    padding: ", " ", ";\n    display: flex;\n    cursor: inherit;\n    transition: all 0.1s linear;\n    cursor: pointer;\n  "], ["\n    label: collapse__header;\n    padding: ", " ", ";\n    display: flex;\n    cursor: inherit;\n    transition: all 0.1s linear;\n    cursor: pointer;\n  "])), theme.spacing.sm, theme.spacing.md),
    headerCollapsed: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    label: collapse__header--collapsed;\n    cursor: pointer;\n    padding: ", " ", ";\n  "], ["\n    label: collapse__header--collapsed;\n    cursor: pointer;\n    padding: ", " ", ";\n  "])), theme.spacing.sm, theme.spacing.md),
    headerButtons: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    label: collapse__header-buttons;\n    margin-right: ", ";\n    margin-top: ", ";\n    font-size: ", ";\n    line-height: ", ";\n    display: inherit;\n  "], ["\n    label: collapse__header-buttons;\n    margin-right: ", ";\n    margin-top: ", ";\n    font-size: ", ";\n    line-height: ", ";\n    display: inherit;\n  "])), theme.spacing.sm, theme.spacing.xxs, theme.typography.size.lg, theme.typography.heading.h6),
    headerButtonsCollapsed: css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    label: collapse__header-buttons--collapsed;\n    display: none;\n  "], ["\n    label: collapse__header-buttons--collapsed;\n    display: none;\n  "]))),
    headerLabel: css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    label: collapse__header-label;\n    font-weight: ", ";\n    margin-right: ", ";\n    font-size: ", ";\n  "], ["\n    label: collapse__header-label;\n    font-weight: ", ";\n    margin-right: ", ";\n    font-size: ", ";\n  "])), theme.typography.weight.semibold, theme.spacing.sm, theme.typography.heading.h6),
}); });
export var ControlledCollapse = function (_a) {
    var isOpen = _a.isOpen, onToggle = _a.onToggle, otherProps = __rest(_a, ["isOpen", "onToggle"]);
    var _b = __read(useState(isOpen), 2), open = _b[0], setOpen = _b[1];
    return (React.createElement(Collapse, __assign({ isOpen: open }, otherProps, { onToggle: function () {
            setOpen(!open);
            if (onToggle) {
                onToggle(!open);
            }
        } })));
};
export var Collapse = function (_a) {
    var isOpen = _a.isOpen, label = _a.label, loading = _a.loading, collapsible = _a.collapsible, onToggle = _a.onToggle, children = _a.children;
    var theme = useContext(ThemeContext);
    var style = getStyles(theme);
    var onClickToggle = function () {
        if (onToggle) {
            onToggle(!isOpen);
        }
    };
    var panelClass = cx([style.collapse, 'panel-container']);
    var loaderClass = loading ? cx([style.loader, style.loaderActive]) : cx([style.loader]);
    var headerClass = collapsible ? cx([style.header]) : cx([style.headerCollapsed]);
    var headerButtonsClass = collapsible ? cx([style.headerButtons]) : cx([style.headerButtonsCollapsed]);
    return (React.createElement("div", { className: panelClass },
        React.createElement("div", { className: headerClass, onClick: onClickToggle },
            React.createElement("div", { className: headerButtonsClass },
                React.createElement(Icon, { name: isOpen ? 'angle-up' : 'angle-down' })),
            React.createElement("div", { className: cx([style.headerLabel]) }, label)),
        isOpen && (React.createElement("div", { className: cx([style.collapseBody]) },
            React.createElement("div", { className: loaderClass }),
            children))));
};
Collapse.displayName = 'Collapse';
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=Collapse.js.map