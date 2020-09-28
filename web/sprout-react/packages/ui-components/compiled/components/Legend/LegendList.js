import { __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import { InlineList } from '../List/InlineList';
import { List } from '../List/List';
import { css, cx } from 'emotion';
import { ThemeContext } from '../../themes/ThemeContext';
import { stylesFactory } from '../../themes';
var getStyles = stylesFactory(function (theme) { return ({
    item: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    padding-left: 10px;\n    display: flex;\n    font-size: ", ";\n    white-space: nowrap;\n  "], ["\n    padding-left: 10px;\n    display: flex;\n    font-size: ", ";\n    white-space: nowrap;\n  "])), theme.typography.size.sm),
    wrapper: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: space-between;\n    width: 100%;\n  "], ["\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: space-between;\n    width: 100%;\n  "]))),
    section: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    display: flex;\n  "], ["\n    display: flex;\n  "]))),
    sectionRight: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    justify-content: flex-end;\n    flex-grow: 1;\n  "], ["\n    justify-content: flex-end;\n    flex-grow: 1;\n  "]))),
}); });
export var LegendList = function (_a) {
    var items = _a.items, itemRenderer = _a.itemRenderer, placement = _a.placement, className = _a.className;
    var theme = useContext(ThemeContext);
    var styles = getStyles(theme);
    var renderItem = function (item, index) {
        return React.createElement("span", { className: styles.item }, itemRenderer ? itemRenderer(item, index) : item.label);
    };
    var getItemKey = function (item) { return "" + item.label; };
    return placement === 'under' ? (React.createElement("div", { className: cx(styles.wrapper, className) },
        React.createElement("div", { className: styles.section },
            React.createElement(InlineList, { items: items.filter(function (item) { return item.yAxis === 1; }), renderItem: renderItem, getItemKey: getItemKey })),
        React.createElement("div", { className: cx(styles.section, styles.sectionRight) },
            React.createElement(InlineList, { items: items.filter(function (item) { return item.yAxis !== 1; }), renderItem: renderItem, getItemKey: getItemKey })))) : (React.createElement(List, { items: items, renderItem: renderItem, getItemKey: getItemKey, className: className }));
};
LegendList.displayName = 'LegendList';
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=LegendList.js.map