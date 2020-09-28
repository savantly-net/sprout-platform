import { __makeTemplateObject, __read } from "tslib";
import React, { useContext, useRef, useState, useLayoutEffect } from 'react';
import { css, cx } from 'emotion';
import useClickAway from 'react-use/lib/useClickAway';
import { selectThemeVariant, ThemeContext } from '../../index';
import { stylesFactory } from '../../themes/stylesFactory';
import { Portal, List } from '../index';
import { Icon } from '../Icon/Icon';
var getContextMenuStyles = stylesFactory(function (theme) {
    var linkColor = selectThemeVariant({
        light: theme.palette.dark2,
        dark: theme.colors.text,
    }, theme.type);
    var linkColorHover = selectThemeVariant({
        light: theme.colors.link,
        dark: theme.palette.white,
    }, theme.type);
    var wrapperBg = selectThemeVariant({
        light: theme.palette.gray7,
        dark: theme.palette.dark2,
    }, theme.type);
    var wrapperShadow = selectThemeVariant({
        light: theme.palette.gray3,
        dark: theme.palette.black,
    }, theme.type);
    var itemColor = selectThemeVariant({
        light: theme.palette.black,
        dark: theme.palette.white,
    }, theme.type);
    var groupLabelColor = selectThemeVariant({
        light: theme.palette.gray1,
        dark: theme.colors.textWeak,
    }, theme.type);
    var itemBgHover = selectThemeVariant({
        light: theme.palette.gray5,
        dark: theme.palette.dark7,
    }, theme.type);
    var headerBg = selectThemeVariant({
        light: theme.palette.white,
        dark: theme.palette.dark1,
    }, theme.type);
    var headerSeparator = selectThemeVariant({
        light: theme.palette.white,
        dark: theme.palette.dark7,
    }, theme.type);
    return {
        header: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      padding: 4px;\n      border-bottom: 1px solid ", ";\n      background: ", ";\n      margin-bottom: ", ";\n      border-radius: ", " ", " 0 0;\n    "], ["\n      padding: 4px;\n      border-bottom: 1px solid ", ";\n      background: ", ";\n      margin-bottom: ", ";\n      border-radius: ", " ", " 0 0;\n    "])), headerSeparator, headerBg, theme.spacing.xs, theme.border.radius.sm, theme.border.radius.sm),
        wrapper: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      background: ", ";\n      z-index: 1;\n      box-shadow: 0 2px 5px 0 ", ";\n      min-width: 200px;\n      display: inline-block;\n      border-radius: ", ";\n    "], ["\n      background: ", ";\n      z-index: 1;\n      box-shadow: 0 2px 5px 0 ", ";\n      min-width: 200px;\n      display: inline-block;\n      border-radius: ", ";\n    "])), wrapperBg, wrapperShadow, theme.border.radius.sm),
        link: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      color: ", ";\n      display: flex;\n      cursor: pointer;\n      &:hover {\n        color: ", ";\n        text-decoration: none;\n      }\n    "], ["\n      color: ", ";\n      display: flex;\n      cursor: pointer;\n      &:hover {\n        color: ", ";\n        text-decoration: none;\n      }\n    "])), linkColor, linkColorHover),
        item: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      background: none;\n      padding: 4px 8px;\n      color: ", ";\n      border-left: 2px solid transparent;\n      cursor: pointer;\n      &:hover {\n        background: ", ";\n        border-image: linear-gradient(#f05a28 30%, #fbca0a 99%);\n        border-image-slice: 1;\n      }\n    "], ["\n      background: none;\n      padding: 4px 8px;\n      color: ", ";\n      border-left: 2px solid transparent;\n      cursor: pointer;\n      &:hover {\n        background: ", ";\n        border-image: linear-gradient(#f05a28 30%, #fbca0a 99%);\n        border-image-slice: 1;\n      }\n    "])), itemColor, itemBgHover),
        groupLabel: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      color: ", ";\n      font-size: ", ";\n      line-height: ", ";\n      padding: ", " ", ";\n    "], ["\n      color: ", ";\n      font-size: ", ";\n      line-height: ", ";\n      padding: ", " ", ";\n    "])), groupLabelColor, theme.typography.size.sm, theme.typography.lineHeight.md, theme.spacing.xs, theme.spacing.sm),
        icon: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      opacity: 0.7;\n      margin-right: 10px;\n      color: ", ";\n    "], ["\n      opacity: 0.7;\n      margin-right: 10px;\n      color: ", ";\n    "])), theme.colors.linkDisabled),
    };
});
export var ContextMenu = React.memo(function (_a) {
    var x = _a.x, y = _a.y, onClose = _a.onClose, items = _a.items, renderHeader = _a.renderHeader;
    var theme = useContext(ThemeContext);
    var menuRef = useRef(null);
    var _b = __read(useState({}), 2), positionStyles = _b[0], setPositionStyles = _b[1];
    useLayoutEffect(function () {
        var menuElement = menuRef.current;
        if (menuElement) {
            var rect = menuElement.getBoundingClientRect();
            var OFFSET = 5;
            var collisions = {
                right: window.innerWidth < x + rect.width,
                bottom: window.innerHeight < rect.bottom + rect.height + OFFSET,
            };
            setPositionStyles({
                position: 'fixed',
                left: collisions.right ? x - rect.width - OFFSET : x - OFFSET,
                top: collisions.bottom ? y - rect.height - OFFSET : y + OFFSET,
            });
        }
    }, [menuRef.current]);
    useClickAway(menuRef, function () {
        if (onClose) {
            onClose();
        }
    });
    var styles = getContextMenuStyles(theme);
    var header = renderHeader && renderHeader();
    return (React.createElement(Portal, null,
        React.createElement("div", { ref: menuRef, style: positionStyles, className: styles.wrapper },
            header && React.createElement("div", { className: styles.header }, header),
            React.createElement(List, { items: items || [], renderItem: function (item, index) {
                    return (React.createElement(React.Fragment, null,
                        React.createElement(ContextMenuGroupComponent, { group: item, onClick: onClose })));
                } }))));
});
var ContextMenuItemComponent = React.memo(function (_a) {
    var url = _a.url, icon = _a.icon, label = _a.label, target = _a.target, onClick = _a.onClick, className = _a.className;
    var theme = useContext(ThemeContext);
    var styles = getContextMenuStyles(theme);
    return (React.createElement("div", { className: styles.item },
        React.createElement("a", { href: url ? url : undefined, target: target, className: cx(className, styles.link), onClick: function (e) {
                if (onClick) {
                    onClick(e);
                }
            } },
            icon && React.createElement(Icon, { name: icon, className: styles.icon }),
            " ",
            label)));
});
var ContextMenuGroupComponent = function (_a) {
    var group = _a.group, onClick = _a.onClick;
    var theme = useContext(ThemeContext);
    var styles = getContextMenuStyles(theme);
    if (group.items.length === 0) {
        return null;
    }
    return (React.createElement("div", null,
        group.label && React.createElement("div", { className: styles.groupLabel }, group.label),
        React.createElement(List, { items: group.items || [], renderItem: function (item) {
                return (React.createElement(ContextMenuItemComponent, { url: item.url, label: item.label, target: item.target, icon: item.icon, onClick: function (e) {
                        if (item.onClick) {
                            item.onClick(e);
                        }
                        // Typically closes the context menu
                        if (onClick) {
                            onClick();
                        }
                    } }));
            } })));
};
ContextMenu.displayName = 'ContextMenu';
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=ContextMenu.js.map