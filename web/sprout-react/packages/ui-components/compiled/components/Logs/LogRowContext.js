import { __assign, __makeTemplateObject, __read } from "tslib";
import React, { useContext, useRef, useState, useLayoutEffect, useEffect } from 'react';
import { css, cx } from 'emotion';
import { Alert } from '../Alert/Alert';
import { selectThemeVariant } from '../../themes/selectThemeVariant';
import { ThemeContext } from '../../themes/ThemeContext';
import { CustomScrollbar } from '../CustomScrollbar/CustomScrollbar';
import { List } from '../List/List';
import { ClickOutsideWrapper } from '../ClickOutsideWrapper/ClickOutsideWrapper';
var getLogRowContextStyles = function (theme) {
    var gradientTop = selectThemeVariant({
        light: theme.palette.white,
        dark: theme.palette.dark1,
    }, theme.type);
    var gradientBottom = selectThemeVariant({
        light: theme.palette.gray7,
        dark: theme.palette.dark2,
    }, theme.type);
    var boxShadowColor = selectThemeVariant({
        light: theme.palette.gray5,
        dark: theme.palette.black,
    }, theme.type);
    var borderColor = selectThemeVariant({
        light: theme.palette.gray5,
        dark: theme.palette.dark9,
    }, theme.type);
    return {
        commonStyles: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      position: absolute;\n      width: calc(100% + 20px);\n      left: -10px;\n      height: 250px;\n      z-index: 2;\n      overflow: hidden;\n      background: ", ";\n      background: linear-gradient(180deg, ", " 0%, ", " 104.25%);\n      box-shadow: 0px 2px 4px ", ", 0px 0px 2px ", ";\n      border: 1px solid ", ";\n      border-radius: ", ";\n    "], ["\n      position: absolute;\n      width: calc(100% + 20px);\n      left: -10px;\n      height: 250px;\n      z-index: 2;\n      overflow: hidden;\n      background: ", ";\n      background: linear-gradient(180deg, ", " 0%, ", " 104.25%);\n      box-shadow: 0px 2px 4px ", ", 0px 0px 2px ", ";\n      border: 1px solid ", ";\n      border-radius: ", ";\n    "])), theme.colors.bodyBg, gradientTop, gradientBottom, boxShadowColor, boxShadowColor, borderColor, theme.border.radius.md),
        header: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      height: 30px;\n      padding: 0 10px;\n      display: flex;\n      align-items: center;\n      background: ", ";\n    "], ["\n      height: 30px;\n      padding: 0 10px;\n      display: flex;\n      align-items: center;\n      background: ", ";\n    "])), borderColor),
        logs: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      height: 220px;\n      padding: 10px;\n    "], ["\n      height: 220px;\n      padding: 10px;\n    "]))),
    };
};
var LogRowContextGroupHeader = function (_a) {
    var row = _a.row, rows = _a.rows, onLoadMoreContext = _a.onLoadMoreContext, canLoadMoreRows = _a.canLoadMoreRows;
    var theme = useContext(ThemeContext);
    var header = getLogRowContextStyles(theme).header;
    return (React.createElement("div", { className: header },
        React.createElement("span", { className: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n          opacity: 0.6;\n        "], ["\n          opacity: 0.6;\n        "]))) },
            "Found ",
            rows.length,
            " rows."),
        (rows.length >= 10 || (rows.length > 10 && rows.length % 10 !== 0)) && canLoadMoreRows && (React.createElement("span", { className: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n            margin-left: 10px;\n            &:hover {\n              text-decoration: underline;\n              cursor: pointer;\n            }\n          "], ["\n            margin-left: 10px;\n            &:hover {\n              text-decoration: underline;\n              cursor: pointer;\n            }\n          "]))), onClick: onLoadMoreContext }, "Load 10 more"))));
};
var LogRowContextGroup = function (_a) {
    var row = _a.row, rows = _a.rows, error = _a.error, className = _a.className, shouldScrollToBottom = _a.shouldScrollToBottom, canLoadMoreRows = _a.canLoadMoreRows, onLoadMoreContext = _a.onLoadMoreContext;
    var theme = useContext(ThemeContext);
    var _b = getLogRowContextStyles(theme), commonStyles = _b.commonStyles, logs = _b.logs;
    var _c = __read(useState(0), 2), scrollTop = _c[0], setScrollTop = _c[1];
    var listContainerRef = useRef();
    useLayoutEffect(function () {
        if (shouldScrollToBottom && listContainerRef.current) {
            setScrollTop(listContainerRef.current.offsetHeight);
        }
    });
    var headerProps = {
        row: row,
        rows: rows,
        onLoadMoreContext: onLoadMoreContext,
        canLoadMoreRows: canLoadMoreRows,
    };
    return (React.createElement("div", { className: cx(className, commonStyles) },
        shouldScrollToBottom && !error && React.createElement(LogRowContextGroupHeader, __assign({}, headerProps)),
        React.createElement("div", { className: logs },
            React.createElement(CustomScrollbar, { autoHide: true, scrollTop: scrollTop },
                React.createElement("div", { ref: listContainerRef },
                    !error && (React.createElement(List, { items: rows, renderItem: function (item) {
                            return (React.createElement("div", { className: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n                        padding: 5px 0;\n                      "], ["\n                        padding: 5px 0;\n                      "]))) }, item));
                        } })),
                    error && React.createElement(Alert, { title: error })))),
        !shouldScrollToBottom && !error && React.createElement(LogRowContextGroupHeader, __assign({}, headerProps))));
};
export var LogRowContext = function (_a) {
    var row = _a.row, context = _a.context, errors = _a.errors, onOutsideClick = _a.onOutsideClick, onLoadMoreContext = _a.onLoadMoreContext, hasMoreContextRows = _a.hasMoreContextRows;
    var handleEscKeyDown = function (e) {
        if (e.keyCode === 27) {
            onOutsideClick();
        }
    };
    useEffect(function () {
        document.addEventListener('keydown', handleEscKeyDown, false);
        return function () {
            document.removeEventListener('keydown', handleEscKeyDown, false);
        };
    }, []);
    return (React.createElement(ClickOutsideWrapper, { onClick: onOutsideClick },
        React.createElement("div", { onClick: function (e) { return e.stopPropagation(); } },
            context.after && (React.createElement(LogRowContextGroup, { rows: context.after, error: errors && errors.after, row: row, className: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n              top: -250px;\n            "], ["\n              top: -250px;\n            "]))), shouldScrollToBottom: true, canLoadMoreRows: hasMoreContextRows ? hasMoreContextRows.after : false, onLoadMoreContext: onLoadMoreContext })),
            context.before && (React.createElement(LogRowContextGroup, { onLoadMoreContext: onLoadMoreContext, canLoadMoreRows: hasMoreContextRows ? hasMoreContextRows.before : false, row: row, rows: context.before, error: errors && errors.before, className: css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n              top: 100%;\n            "], ["\n              top: 100%;\n            "]))) })))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=LogRowContext.js.map