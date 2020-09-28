import { __assign, __makeTemplateObject, __rest } from "tslib";
import { selectThemeVariant, ThemeContext } from '../../index';
import { css, cx } from 'emotion';
import _ from 'lodash';
import React, { useRef, useContext, useMemo } from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import { List } from '../index';
import tinycolor from 'tinycolor2';
import { stylesFactory } from '../../themes';
var getStyles = stylesFactory(function (theme) {
    var wrapperBg = selectThemeVariant({
        light: theme.palette.white,
        dark: theme.palette.dark2,
    }, theme.type);
    var wrapperShadow = selectThemeVariant({
        light: theme.palette.gray5,
        dark: theme.palette.black,
    }, theme.type);
    var itemColor = selectThemeVariant({
        light: theme.palette.black,
        dark: theme.palette.white,
    }, theme.type);
    var itemDocsColor = selectThemeVariant({
        light: theme.palette.dark3,
        dark: theme.palette.gray2,
    }, theme.type);
    var itemBgHover = selectThemeVariant({
        light: theme.palette.gray5,
        dark: theme.palette.dark7,
    }, theme.type);
    var itemBgActive = selectThemeVariant({
        light: theme.palette.gray6,
        dark: theme.palette.dark9,
    }, theme.type);
    var separatorColor = selectThemeVariant({
        light: tinycolor(wrapperBg.toString())
            .darken(10)
            .toString(),
        dark: tinycolor(wrapperBg.toString())
            .lighten(10)
            .toString(),
    }, theme.type);
    return {
        list: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      border-bottom: 1px solid ", ";\n      &:last-child {\n        border: none;\n      }\n    "], ["\n      border-bottom: 1px solid ", ";\n      &:last-child {\n        border: none;\n      }\n    "])), separatorColor),
        wrapper: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      background: ", ";\n      z-index: 1;\n      width: 250px;\n      box-shadow: 0 5px 10px 0 ", ";\n    "], ["\n      background: ", ";\n      z-index: 1;\n      width: 250px;\n      box-shadow: 0 5px 10px 0 ", ";\n    "])), wrapperBg, wrapperShadow),
        item: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      background: none;\n      padding: 2px 8px;\n      color: ", ";\n      cursor: pointer;\n      &:hover {\n        background: ", ";\n      }\n    "], ["\n      background: none;\n      padding: 2px 8px;\n      color: ", ";\n      cursor: pointer;\n      &:hover {\n        background: ", ";\n      }\n    "])), itemColor, itemBgHover),
        label: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      color: ", ";\n    "], ["\n      color: ", ";\n    "])), theme.colors.textWeak),
        activeItem: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      background: ", ";\n      &:hover {\n        background: ", ";\n      }\n    "], ["\n      background: ", ";\n      &:hover {\n        background: ", ";\n      }\n    "])), itemBgActive, itemBgActive),
        itemValue: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      font-family: ", ";\n      font-size: ", ";\n    "], ["\n      font-family: ", ";\n      font-size: ", ";\n    "])), theme.typography.fontFamily.monospace, theme.typography.size.sm),
        itemDocs: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      margin-top: ", ";\n      color: ", ";\n    "], ["\n      margin-top: ", ";\n      color: ", ";\n    "])), theme.spacing.xs, itemDocsColor),
    };
});
export var DataLinkSuggestions = function (_a) {
    var suggestions = _a.suggestions, otherProps = __rest(_a, ["suggestions"]);
    var ref = useRef(null);
    var theme = useContext(ThemeContext);
    useClickAway(ref, function () {
        if (otherProps.onClose) {
            otherProps.onClose();
        }
    });
    var groupedSuggestions = useMemo(function () {
        return _.groupBy(suggestions, function (s) { return s.origin; });
    }, [suggestions]);
    var styles = getStyles(theme);
    return (React.createElement("div", { ref: ref, className: styles.wrapper }, Object.keys(groupedSuggestions).map(function (key, i) {
        var indexOffset = i === 0
            ? 0
            : Object.keys(groupedSuggestions).reduce(function (acc, current, index) {
                if (index >= i) {
                    return acc;
                }
                return acc + groupedSuggestions[current].length;
            }, 0);
        return (React.createElement(DataLinkSuggestionsList, __assign({}, otherProps, { suggestions: groupedSuggestions[key], label: "" + _.capitalize(key), activeIndex: otherProps.activeIndex, activeIndexOffset: indexOffset, key: key })));
    })));
};
DataLinkSuggestions.displayName = 'DataLinkSuggestions';
var DataLinkSuggestionsList = React.memo(function (_a) {
    var activeIndex = _a.activeIndex, activeIndexOffset = _a.activeIndexOffset, label = _a.label, onClose = _a.onClose, onSuggestionSelect = _a.onSuggestionSelect, suggestions = _a.suggestions;
    var theme = useContext(ThemeContext);
    var styles = getStyles(theme);
    return (React.createElement(React.Fragment, null,
        React.createElement(List, { className: styles.list, items: suggestions, renderItem: function (item, index) {
                return (React.createElement("div", { className: cx(styles.item, index + activeIndexOffset === activeIndex && styles.activeItem), onClick: function () {
                        onSuggestionSelect(item);
                    }, title: item.documentation },
                    React.createElement("span", { className: styles.itemValue },
                        React.createElement("span", { className: styles.label }, label),
                        " ",
                        item.label)));
            } })));
});
DataLinkSuggestionsList.displayName = 'DataLinkSuggestionsList';
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=DataLinkSuggestions.js.map