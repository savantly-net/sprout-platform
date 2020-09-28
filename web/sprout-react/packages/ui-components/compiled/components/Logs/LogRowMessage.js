import { __extends, __makeTemplateObject } from "tslib";
import React, { PureComponent } from 'react';
import _ from 'lodash';
import tinycolor from 'tinycolor2';
import { css, cx } from 'emotion';
import { findHighlightChunksInText } from '@savantly/sprout-api';
// @ts-ignore
import Highlighter from 'react-highlight-words';
import { selectThemeVariant } from '../../index';
import { withTheme } from '../../themes/index';
import { getLogRowStyles } from './getLogRowStyles';
import { stylesFactory } from '../../themes/stylesFactory';
//Components
import { LogRowContext } from './LogRowContext';
import { LogMessageAnsi } from './LogMessageAnsi';
export var MAX_CHARACTERS = 100000;
var getStyles = stylesFactory(function (theme) {
    var outlineColor = selectThemeVariant({
        light: theme.palette.white,
        dark: theme.palette.black,
    }, theme.type);
    return {
        positionRelative: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      label: positionRelative;\n      position: relative;\n    "], ["\n      label: positionRelative;\n      position: relative;\n    "]))),
        rowWithContext: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      label: rowWithContext;\n      z-index: 1;\n      outline: 9999px solid\n        ", ";\n    "], ["\n      label: rowWithContext;\n      z-index: 1;\n      outline: 9999px solid\n        ",
            ";\n    "])), tinycolor(outlineColor)
            .setAlpha(0.7)
            .toRgbString()),
        horizontalScroll: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      label: verticalScroll;\n      white-space: nowrap;\n    "], ["\n      label: verticalScroll;\n      white-space: nowrap;\n    "]))),
    };
});
var UnThemedLogRowMessage = /** @class */ (function (_super) {
    __extends(UnThemedLogRowMessage, _super);
    function UnThemedLogRowMessage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onContextToggle = function (e) {
            e.stopPropagation();
            _this.props.onToggleContext();
        };
        return _this;
    }
    UnThemedLogRowMessage.prototype.render = function () {
        var _a, _b;
        var _c = this.props, highlighterExpressions = _c.highlighterExpressions, row = _c.row, theme = _c.theme, errors = _c.errors, hasMoreContextRows = _c.hasMoreContextRows, updateLimit = _c.updateLimit, context = _c.context, contextIsOpen = _c.contextIsOpen, showContextToggle = _c.showContextToggle, wrapLogMessage = _c.wrapLogMessage, onToggleContext = _c.onToggleContext;
        var style = getLogRowStyles(theme, row.logLevel);
        var entry = row.entry, hasAnsi = row.hasAnsi, raw = row.raw;
        var previewHighlights = highlighterExpressions && !_.isEqual(highlighterExpressions, row.searchWords);
        var highlights = previewHighlights ? highlighterExpressions : row.searchWords;
        var needsHighlighter = highlights && highlights.length > 0 && highlights[0] && highlights[0].length > 0 && entry.length < MAX_CHARACTERS;
        var highlightClassName = previewHighlights
            ? cx([style.logsRowMatchHighLight, style.logsRowMatchHighLightPreview])
            : cx([style.logsRowMatchHighLight]);
        var styles = getStyles(theme);
        return (React.createElement("td", { className: style.logsRowMessage },
            React.createElement("div", { className: cx(styles.positionRelative, (_a = {}, _a[styles.horizontalScroll] = !wrapLogMessage, _a)) },
                contextIsOpen && context && (React.createElement(LogRowContext, { row: row, context: context, errors: errors, hasMoreContextRows: hasMoreContextRows, onOutsideClick: onToggleContext, onLoadMoreContext: function () {
                        if (updateLimit) {
                            updateLimit();
                        }
                    } })),
                React.createElement("span", { className: cx(styles.positionRelative, (_b = {}, _b[styles.rowWithContext] = contextIsOpen, _b)) }, needsHighlighter ? (React.createElement(Highlighter, { textToHighlight: entry, searchWords: highlights, findChunks: findHighlightChunksInText, highlightClassName: highlightClassName })) : hasAnsi ? (React.createElement(LogMessageAnsi, { value: raw })) : (entry)),
                (showContextToggle === null || showContextToggle === void 0 ? void 0 : showContextToggle(row)) && (React.createElement("span", { onClick: this.onContextToggle, className: cx(style.context) },
                    contextIsOpen ? 'Hide' : 'Show',
                    " context")))));
    };
    return UnThemedLogRowMessage;
}(PureComponent));
export var LogRowMessage = withTheme(UnThemedLogRowMessage);
LogRowMessage.displayName = 'LogRowMessage';
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=LogRowMessage.js.map