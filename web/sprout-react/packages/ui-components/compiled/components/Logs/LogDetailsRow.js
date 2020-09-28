import { __extends, __makeTemplateObject } from "tslib";
import React, { PureComponent } from 'react';
import { css, cx } from 'emotion';
import { withTheme } from '../../themes/index';
import { getLogRowStyles } from './getLogRowStyles';
import { stylesFactory } from '../../themes/stylesFactory';
//Components
import { LogLabelStats } from './LogLabelStats';
import { IconButton } from '../IconButton/IconButton';
import { Tag } from '..';
var getStyles = stylesFactory(function (theme) {
    return {
        noHoverBackground: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      label: noHoverBackground;\n      :hover {\n        background-color: transparent;\n      }\n    "], ["\n      label: noHoverBackground;\n      :hover {\n        background-color: transparent;\n      }\n    "]))),
        hoverCursor: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      label: hoverCursor;\n      cursor: pointer;\n    "], ["\n      label: hoverCursor;\n      cursor: pointer;\n    "]))),
        wordBreakAll: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      label: wordBreakAll;\n      word-break: break-all;\n    "], ["\n      label: wordBreakAll;\n      word-break: break-all;\n    "]))),
        showingField: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      color: ", ";\n    "], ["\n      color: ", ";\n    "])), theme.palette.blue95),
    };
});
var UnThemedLogDetailsRow = /** @class */ (function (_super) {
    __extends(UnThemedLogDetailsRow, _super);
    function UnThemedLogDetailsRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showFieldsStats: false,
            fieldCount: 0,
            fieldStats: null,
        };
        _this.showField = function () {
            var _a = _this.props, onClickShowParsedField = _a.onClickShowParsedField, parsedKey = _a.parsedKey;
            if (onClickShowParsedField) {
                onClickShowParsedField(parsedKey);
            }
        };
        _this.hideField = function () {
            var _a = _this.props, onClickHideParsedField = _a.onClickHideParsedField, parsedKey = _a.parsedKey;
            if (onClickHideParsedField) {
                onClickHideParsedField(parsedKey);
            }
        };
        _this.filterLabel = function () {
            var _a = _this.props, onClickFilterLabel = _a.onClickFilterLabel, parsedKey = _a.parsedKey, parsedValue = _a.parsedValue;
            if (onClickFilterLabel) {
                onClickFilterLabel(parsedKey, parsedValue);
            }
        };
        _this.filterOutLabel = function () {
            var _a = _this.props, onClickFilterOutLabel = _a.onClickFilterOutLabel, parsedKey = _a.parsedKey, parsedValue = _a.parsedValue;
            if (onClickFilterOutLabel) {
                onClickFilterOutLabel(parsedKey, parsedValue);
            }
        };
        _this.showStats = function () {
            var showFieldsStats = _this.state.showFieldsStats;
            if (!showFieldsStats) {
                var fieldStats = _this.props.getStats();
                var fieldCount = fieldStats ? fieldStats.reduce(function (sum, stat) { return sum + stat.count; }, 0) : 0;
                _this.setState({ fieldStats: fieldStats, fieldCount: fieldCount });
            }
            _this.toggleFieldsStats();
        };
        return _this;
    }
    UnThemedLogDetailsRow.prototype.toggleFieldsStats = function () {
        this.setState(function (state) {
            return {
                showFieldsStats: !state.showFieldsStats,
            };
        });
    };
    UnThemedLogDetailsRow.prototype.render = function () {
        var _a;
        var _b = this.props, theme = _b.theme, parsedKey = _b.parsedKey, parsedValue = _b.parsedValue, isLabel = _b.isLabel, links = _b.links, showParsedFields = _b.showParsedFields;
        var _c = this.state, showFieldsStats = _c.showFieldsStats, fieldStats = _c.fieldStats, fieldCount = _c.fieldCount;
        var styles = getStyles(theme);
        var style = getLogRowStyles(theme);
        var toggleFieldButton = !isLabel && showParsedFields && showParsedFields.includes(parsedKey) ? (React.createElement(IconButton, { name: "eye", className: styles.showingField, title: "Hide this field", onClick: this.hideField })) : (React.createElement(IconButton, { name: "eye", title: "Show this field instead of the message", onClick: this.showField }));
        return (React.createElement("tr", { className: cx(style.logDetailsValue, (_a = {}, _a[styles.noHoverBackground] = showFieldsStats, _a)) },
            React.createElement("td", { className: style.logsDetailsIcon, colSpan: isLabel ? undefined : 2 },
                React.createElement(IconButton, { name: "signal", title: 'Ad-hoc statistics', onClick: this.showStats })),
            isLabel && (React.createElement(React.Fragment, null,
                React.createElement("td", { className: style.logsDetailsIcon },
                    React.createElement(IconButton, { name: "search-plus", title: "Filter for value", onClick: this.filterLabel })),
                React.createElement("td", { className: style.logsDetailsIcon },
                    React.createElement(IconButton, { name: "search-minus", title: "Filter out value", onClick: this.filterOutLabel })))),
            !isLabel && (React.createElement(React.Fragment, null,
                React.createElement("td", { className: style.logsDetailsIcon }, toggleFieldButton))),
            React.createElement("td", { className: style.logDetailsLabel }, parsedKey),
            React.createElement("td", { className: styles.wordBreakAll },
                parsedValue,
                links &&
                    links.map(function (link) {
                        return (React.createElement(React.Fragment, null,
                            "\u00A0",
                            React.createElement(FieldLink, { link: link })));
                    }),
                showFieldsStats && (React.createElement(LogLabelStats, { stats: fieldStats, label: parsedKey, value: parsedValue, rowCount: fieldCount, isLabel: isLabel })))));
    };
    return UnThemedLogDetailsRow;
}(PureComponent));
var getLinkStyles = stylesFactory(function () {
    return {
        tag: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      margin-left: 6px;\n      font-size: 11px;\n      padding: 2px 6px;\n    "], ["\n      margin-left: 6px;\n      font-size: 11px;\n      padding: 2px 6px;\n    "]))),
    };
});
function FieldLink(_a) {
    var link = _a.link;
    var styles = getLinkStyles();
    return (React.createElement("a", { href: link.href, target: '_blank', onClick: link.onClick
            ? function (event) {
                if (!(event.ctrlKey || event.metaKey || event.shiftKey) && link.onClick) {
                    event.preventDefault();
                    link.onClick(event);
                }
            }
            : undefined },
        React.createElement(Tag, { name: link.title, className: styles.tag, colorIndex: 6 })));
}
export var LogDetailsRow = withTheme(UnThemedLogDetailsRow);
LogDetailsRow.displayName = 'LogDetailsRow';
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=LogDetailsRow.js.map