import { __makeTemplateObject } from "tslib";
import { css, cx } from 'emotion';
import { styleMixins, stylesFactory } from '../../themes';
import { getScrollbarWidth } from '../../utils';
export var getTableStyles = stylesFactory(function (theme) {
    var palette = theme.palette, colors = theme.colors;
    var headerBg = theme.colors.bg2;
    var borderColor = theme.colors.border1;
    var resizerColor = theme.isLight ? palette.blue95 : palette.blue77;
    var cellPadding = 6;
    var lineHeight = theme.typography.lineHeight.md;
    var bodyFontSize = 14;
    var cellHeight = cellPadding * 2 + bodyFontSize * lineHeight;
    var rowHoverBg = styleMixins.hoverColor(theme.colors.bg1, theme);
    var scollbarWidth = getScrollbarWidth();
    var buildCellContainerStyle = function (color, background) {
        return css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      padding: ", "px;\n      width: 100%;\n      height: 100%;\n      display: flex;\n      align-items: center;\n      border-right: 1px solid ", ";\n\n      ", ";\n      ", ";\n\n      &:last-child {\n        border-right: none;\n\n        > div {\n          padding-right: ", "px;\n        }\n      }\n\n      &:hover {\n        overflow: visible;\n        width: auto !important;\n        box-shadow: 0 0 2px ", ";\n        background: ", ";\n        z-index: 1;\n\n        .cell-filter-actions\u00A0 {\n          display: inline-flex;\n        }\n      }\n    "], ["\n      padding: ", "px;\n      width: 100%;\n      height: 100%;\n      display: flex;\n      align-items: center;\n      border-right: 1px solid ", ";\n\n      ", ";\n      ", ";\n\n      &:last-child {\n        border-right: none;\n\n        > div {\n          padding-right: ", "px;\n        }\n      }\n\n      &:hover {\n        overflow: visible;\n        width: auto !important;\n        box-shadow: 0 0 2px ", ";\n        background: ", ";\n        z-index: 1;\n\n        .cell-filter-actions\u00A0 {\n          display: inline-flex;\n        }\n      }\n    "])), cellPadding, borderColor, color ? "color: " + color + ";" : '', background ? "background: " + background + ";" : '', scollbarWidth + cellPadding, theme.colors.formFocusOutline, background !== null && background !== void 0 ? background : rowHoverBg);
    };
    return {
        theme: theme,
        cellHeight: cellHeight,
        buildCellContainerStyle: buildCellContainerStyle,
        cellPadding: cellPadding,
        cellHeightInner: bodyFontSize * lineHeight,
        rowHeight: cellHeight + 2,
        table: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      height: 100%;\n      width: 100%;\n      overflow: auto;\n      display: flex;\n    "], ["\n      height: 100%;\n      width: 100%;\n      overflow: auto;\n      display: flex;\n    "]))),
        thead: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      label: thead;\n      height: ", "px;\n      overflow-y: auto;\n      overflow-x: hidden;\n      background: ", ";\n      position: relative;\n    "], ["\n      label: thead;\n      height: ", "px;\n      overflow-y: auto;\n      overflow-x: hidden;\n      background: ", ";\n      position: relative;\n    "])), cellHeight, headerBg),
        headerCell: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      padding: ", "px;\n      overflow: hidden;\n      white-space: nowrap;\n      color: ", ";\n      border-right: 1px solid ", ";\n      display: flex;\n\n      &:last-child {\n        border-right: none;\n      }\n    "], ["\n      padding: ", "px;\n      overflow: hidden;\n      white-space: nowrap;\n      color: ", ";\n      border-right: 1px solid ", ";\n      display: flex;\n\n      &:last-child {\n        border-right: none;\n      }\n    "])), cellPadding, colors.textBlue, theme.colors.panelBg),
        headerCellLabel: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      cursor: pointer;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      display: flex;\n      margin-right: ", ";\n    "], ["\n      cursor: pointer;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      display: flex;\n      margin-right: ", ";\n    "])), theme.spacing.xs),
        cellContainer: buildCellContainerStyle(),
        cellText: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      cursor: text;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      user-select: text;\n      white-space: nowrap;\n    "], ["\n      cursor: text;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      user-select: text;\n      white-space: nowrap;\n    "]))),
        cellLink: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      cursor: pointer;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      user-select: text;\n      white-space: nowrap;\n      text-decoration: underline;\n    "], ["\n      cursor: pointer;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      user-select: text;\n      white-space: nowrap;\n      text-decoration: underline;\n    "]))),
        headerFilter: css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      label: headerFilter;\n      cursor: pointer;\n    "], ["\n      label: headerFilter;\n      cursor: pointer;\n    "]))),
        row: css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      label: row;\n      border-bottom: 1px solid ", ";\n\n      &:hover {\n        background-color: ", ";\n      }\n    "], ["\n      label: row;\n      border-bottom: 1px solid ", ";\n\n      &:hover {\n        background-color: ", ";\n      }\n    "])), borderColor, rowHoverBg),
        imageCell: css(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n      height: 100%;\n    "], ["\n      height: 100%;\n    "]))),
        resizeHandle: css(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n      label: resizeHandle;\n      cursor: col-resize !important;\n      display: inline-block;\n      background: ", ";\n      opacity: 0;\n      transition: opacity 0.2s ease-in-out;\n      width: 8px;\n      height: 100%;\n      position: absolute;\n      right: -4px;\n      border-radius: 3px;\n      top: 0;\n      z-index: ", ";\n      touch-action: none;\n\n      &:hover {\n        opacity: 1;\n      }\n    "], ["\n      label: resizeHandle;\n      cursor: col-resize !important;\n      display: inline-block;\n      background: ", ";\n      opacity: 0;\n      transition: opacity 0.2s ease-in-out;\n      width: 8px;\n      height: 100%;\n      position: absolute;\n      right: -4px;\n      border-radius: 3px;\n      top: 0;\n      z-index: ", ";\n      touch-action: none;\n\n      &:hover {\n        opacity: 1;\n      }\n    "])), resizerColor, theme.zIndex.dropdown),
        filterWrapper: cx(css(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n        label: filterWrapper;\n        display: none;\n        justify-content: flex-end;\n        flex-grow: 1;\n        opacity: 0.6;\n        padding-left: ", ";\n      "], ["\n        label: filterWrapper;\n        display: none;\n        justify-content: flex-end;\n        flex-grow: 1;\n        opacity: 0.6;\n        padding-left: ", ";\n      "])), theme.spacing.xxs), 'cell-filter-actions'),
        filterItem: css(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n      label: filterItem;\n      cursor: pointer;\n      padding: 0 ", ";\n    "], ["\n      label: filterItem;\n      cursor: pointer;\n      padding: 0 ", ";\n    "])), theme.spacing.xxs),
    };
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;
//# sourceMappingURL=styles.js.map