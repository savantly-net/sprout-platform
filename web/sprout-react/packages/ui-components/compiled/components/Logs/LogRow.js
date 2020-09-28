import { __extends, __makeTemplateObject } from "tslib";
import React, { PureComponent } from 'react';
import { dateTimeFormat, } from '@grafana/data';
import { Icon } from '../Icon/Icon';
import { cx, css } from 'emotion';
import { LogRowContextProvider, } from './LogRowContextProvider';
import { withTheme } from '../../themes/index';
import { getLogRowStyles } from './getLogRowStyles';
import { stylesFactory } from '../../themes/stylesFactory';
import { selectThemeVariant } from '../../themes/selectThemeVariant';
//Components
import { LogDetails } from './LogDetails';
import { LogRowMessageParsed } from './LogRowMessageParsed';
import { LogRowMessage } from './LogRowMessage';
import { LogLabels } from './LogLabels';
var getStyles = stylesFactory(function (theme) {
    var bgColor = selectThemeVariant({ light: theme.palette.gray7, dark: theme.palette.dark2 }, theme.type);
    return {
        topVerticalAlign: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      label: topVerticalAlign;\n      vertical-align: top;\n      margin-top: -", ";\n      margin-left: -", ";\n    "], ["\n      label: topVerticalAlign;\n      vertical-align: top;\n      margin-top: -", ";\n      margin-left: -", ";\n    "])), theme.spacing.xs, theme.spacing.xxs),
        hoverBackground: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      label: hoverBackground;\n      background-color: ", ";\n    "], ["\n      label: hoverBackground;\n      background-color: ", ";\n    "])), bgColor),
    };
});
/**
 * Renders a log line.
 *
 * When user hovers over it for a certain time, it lazily parses the log line.
 * Once a parser is found, it will determine fields, that will be highlighted.
 * When the user requests stats for a field, they will be calculated and rendered below the row.
 */
var UnThemedLogRow = /** @class */ (function (_super) {
    __extends(UnThemedLogRow, _super);
    function UnThemedLogRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showContext: false,
            showDetails: false,
            hasHoverBackground: false,
        };
        _this.toggleContext = function () {
            _this.setState(function (state) {
                return {
                    showContext: !state.showContext,
                };
            });
        };
        /**
         * We are using onMouse events to change background of Log Details Table to hover-state-background when hovered over Log
         * Row and vice versa, when context is not open. This can't be done with css because we use 2 separate table rows without common parent element.
         */
        _this.addHoverBackground = function () {
            if (!_this.state.showContext) {
                _this.setState({
                    hasHoverBackground: true,
                });
            }
        };
        _this.clearHoverBackground = function () {
            if (!_this.state.showContext) {
                _this.setState({
                    hasHoverBackground: false,
                });
            }
        };
        _this.toggleDetails = function () {
            if (_this.props.allowDetails) {
                return;
            }
            _this.setState(function (state) {
                return {
                    showDetails: !state.showDetails,
                };
            });
        };
        return _this;
    }
    UnThemedLogRow.prototype.renderTimeStamp = function (epochMs) {
        return dateTimeFormat(epochMs, {
            timeZone: this.props.timeZone,
        });
    };
    UnThemedLogRow.prototype.renderLogRow = function (context, errors, hasMoreContextRows, updateLimit) {
        var _a;
        var _b = this.props, getRows = _b.getRows, onClickFilterLabel = _b.onClickFilterLabel, onClickFilterOutLabel = _b.onClickFilterOutLabel, onClickShowParsedField = _b.onClickShowParsedField, onClickHideParsedField = _b.onClickHideParsedField, highlighterExpressions = _b.highlighterExpressions, allowDetails = _b.allowDetails, row = _b.row, showDuplicates = _b.showDuplicates, showContextToggle = _b.showContextToggle, showLabels = _b.showLabels, showTime = _b.showTime, showParsedFields = _b.showParsedFields, wrapLogMessage = _b.wrapLogMessage, theme = _b.theme, getFieldLinks = _b.getFieldLinks;
        var _c = this.state, showDetails = _c.showDetails, showContext = _c.showContext, hasHoverBackground = _c.hasHoverBackground;
        var style = getLogRowStyles(theme, row.logLevel);
        var styles = getStyles(theme);
        var hoverBackground = cx(style.logsRow, (_a = {}, _a[styles.hoverBackground] = hasHoverBackground, _a));
        return (React.createElement(React.Fragment, null,
            React.createElement("tr", { className: hoverBackground, onMouseEnter: this.addHoverBackground, onMouseLeave: this.clearHoverBackground, onClick: this.toggleDetails },
                showDuplicates && (React.createElement("td", { className: style.logsRowDuplicates }, row.duplicates && row.duplicates > 0 ? row.duplicates + 1 + "x" : null)),
                React.createElement("td", { className: style.logsRowLevel }),
                !allowDetails && (React.createElement("td", { title: showDetails ? 'Hide log details' : 'See log details', className: style.logsRowToggleDetails },
                    React.createElement(Icon, { className: styles.topVerticalAlign, name: showDetails ? 'angle-down' : 'angle-right' }))),
                showTime && React.createElement("td", { className: style.logsRowLocalTime }, this.renderTimeStamp(row.timeEpochMs)),
                showLabels && row.uniqueLabels && (React.createElement("td", { className: style.logsRowLabels },
                    React.createElement(LogLabels, { labels: row.uniqueLabels }))),
                showParsedFields && showParsedFields.length > 0 ? (React.createElement(LogRowMessageParsed, { row: row, showParsedFields: showParsedFields, getFieldLinks: getFieldLinks })) : (React.createElement(LogRowMessage, { highlighterExpressions: highlighterExpressions, row: row, getRows: getRows, errors: errors, hasMoreContextRows: hasMoreContextRows, updateLimit: updateLimit, context: context, contextIsOpen: showContext, showContextToggle: showContextToggle, wrapLogMessage: wrapLogMessage, onToggleContext: this.toggleContext }))),
            this.state.showDetails && (React.createElement(LogDetails, { className: hoverBackground, onMouseEnter: this.addHoverBackground, onMouseLeave: this.clearHoverBackground, showDuplicates: showDuplicates, getFieldLinks: getFieldLinks, onClickFilterLabel: onClickFilterLabel, onClickFilterOutLabel: onClickFilterOutLabel, onClickShowParsedField: onClickShowParsedField, onClickHideParsedField: onClickHideParsedField, getRows: getRows, row: row, showParsedFields: showParsedFields }))));
    };
    UnThemedLogRow.prototype.render = function () {
        var _this = this;
        var showContext = this.state.showContext;
        var logsSortOrder = this.props.logsSortOrder;
        if (showContext) {
            return (React.createElement(React.Fragment, null,
                React.createElement(LogRowContextProvider, { row: this.props.row, getRowContext: this.props.getRowContext, logsSortOrder: logsSortOrder }, function (_a) {
                    var result = _a.result, errors = _a.errors, hasMoreContextRows = _a.hasMoreContextRows, updateLimit = _a.updateLimit;
                    return React.createElement(React.Fragment, null, _this.renderLogRow(result, errors, hasMoreContextRows, updateLimit));
                })));
        }
        return this.renderLogRow();
    };
    return UnThemedLogRow;
}(PureComponent));
export var LogRow = withTheme(UnThemedLogRow);
LogRow.displayName = 'LogRow';
var templateObject_1, templateObject_2;
//# sourceMappingURL=LogRow.js.map