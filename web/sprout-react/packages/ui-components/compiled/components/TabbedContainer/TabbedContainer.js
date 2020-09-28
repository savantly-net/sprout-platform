import { __makeTemplateObject, __read } from "tslib";
import React, { useState } from 'react';
import { css } from 'emotion';
import { stylesFactory, useTheme } from '../../themes';
import { TabsBar, Tab, IconButton, CustomScrollbar, TabContent } from '../..';
var getStyles = stylesFactory(function (theme) {
    return {
        container: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      height: 100%;\n    "], ["\n      height: 100%;\n    "]))),
        tabContent: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      padding: ", ";\n      background-color: ", ";\n    "], ["\n      padding: ", ";\n      background-color: ", ";\n    "])), theme.spacing.md, theme.colors.bodyBg),
        close: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      position: absolute;\n      right: 16px;\n      top: 5px;\n      cursor: pointer;\n      font-size: ", ";\n    "], ["\n      position: absolute;\n      right: 16px;\n      top: 5px;\n      cursor: pointer;\n      font-size: ", ";\n    "])), theme.typography.size.lg),
        tabs: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      padding-top: ", ";\n      border-color: ", ";\n      ul {\n        margin-left: ", ";\n      }\n    "], ["\n      padding-top: ", ";\n      border-color: ", ";\n      ul {\n        margin-left: ", ";\n      }\n    "])), theme.spacing.sm, theme.colors.formInputBorder, theme.spacing.md),
        scrollbar: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      min-height: 100% !important;\n      background-color: ", ";\n    "], ["\n      min-height: 100% !important;\n      background-color: ", ";\n    "])), theme.colors.panelBg),
    };
});
export function TabbedContainer(props) {
    var _a, _b;
    var _c = __read(useState(props.tabs.some(function (tab) { return tab.value === props.defaultTab; }) ? props.defaultTab : (_a = props.tabs) === null || _a === void 0 ? void 0 : _a[0].value), 2), activeTab = _c[0], setActiveTab = _c[1];
    var onSelectTab = function (item) {
        setActiveTab(item.value);
    };
    var tabs = props.tabs, onClose = props.onClose, closeIconTooltip = props.closeIconTooltip;
    var theme = useTheme();
    var styles = getStyles(theme);
    return (React.createElement("div", { className: styles.container },
        React.createElement(TabsBar, { className: styles.tabs },
            tabs.map(function (t) { return (React.createElement(Tab, { key: t.value, label: t.label, active: t.value === activeTab, onChangeTab: function () { return onSelectTab(t); }, icon: t.icon })); }),
            React.createElement(IconButton, { className: styles.close, onClick: onClose, name: "times", title: closeIconTooltip !== null && closeIconTooltip !== void 0 ? closeIconTooltip : 'Close' })),
        React.createElement(CustomScrollbar, { className: styles.scrollbar },
            React.createElement(TabContent, { className: styles.tabContent }, (_b = tabs.find(function (t) { return t.value === activeTab; })) === null || _b === void 0 ? void 0 : _b.content))));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=TabbedContainer.js.map