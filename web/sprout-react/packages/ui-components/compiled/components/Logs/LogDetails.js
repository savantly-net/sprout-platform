import { __extends, __makeTemplateObject } from "tslib";
import React, { PureComponent } from 'react';
import memoizeOne from 'memoize-one';
import { css, cx } from 'emotion';
import { calculateFieldStats, calculateLogsLabelStats, calculateStats, getParser, } from '@savantly/sprout-api';
import { withTheme } from '../../themes/index';
import { getLogRowStyles } from './getLogRowStyles';
import { stylesFactory } from '../../themes/stylesFactory';
import { selectThemeVariant } from '../../themes/selectThemeVariant';
import { getAllFields } from './logParser';
//Components
import { LogDetailsRow } from './LogDetailsRow';
var getStyles = stylesFactory(function (theme) {
    var bgColor = selectThemeVariant({ light: theme.palette.gray7, dark: theme.palette.dark2 }, theme.type);
    return {
        hoverBackground: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      label: hoverBackground;\n      background-color: ", ";\n    "], ["\n      label: hoverBackground;\n      background-color: ", ";\n    "])), bgColor),
        logsRowLevelDetails: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      label: logs-row__level_details;\n      &::after {\n        top: -3px;\n      }\n    "], ["\n      label: logs-row__level_details;\n      &::after {\n        top: -3px;\n      }\n    "]))),
        logDetailsDefaultCursor: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      label: logDetailsDefaultCursor;\n      cursor: default;\n    "], ["\n      label: logDetailsDefaultCursor;\n      cursor: default;\n    "]))),
    };
});
var UnThemedLogDetails = /** @class */ (function (_super) {
    __extends(UnThemedLogDetails, _super);
    function UnThemedLogDetails() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getParser = memoizeOne(getParser);
        _this.getStatsForParsedField = function (key) {
            var matcher = _this.getParser(_this.props.row.entry).buildMatcher(key);
            return calculateFieldStats(_this.props.getRows(), matcher);
        };
        return _this;
    }
    UnThemedLogDetails.prototype.render = function () {
        var _this = this;
        var _a = this.props, row = _a.row, theme = _a.theme, onClickFilterOutLabel = _a.onClickFilterOutLabel, onClickFilterLabel = _a.onClickFilterLabel, getRows = _a.getRows, showDuplicates = _a.showDuplicates, className = _a.className, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, onClickShowParsedField = _a.onClickShowParsedField, onClickHideParsedField = _a.onClickHideParsedField, showParsedFields = _a.showParsedFields, getFieldLinks = _a.getFieldLinks;
        var style = getLogRowStyles(theme, row.logLevel);
        var styles = getStyles(theme);
        var labels = row.labels ? row.labels : {};
        var labelsAvailable = Object.keys(labels).length > 0;
        var fields = getAllFields(row, getFieldLinks);
        var parsedFieldsAvailable = fields && fields.length > 0;
        return (React.createElement("tr", { className: cx(className, styles.logDetailsDefaultCursor), onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
            showDuplicates && React.createElement("td", null),
            React.createElement("td", { className: cx(style.logsRowLevel, styles.logsRowLevelDetails) }),
            React.createElement("td", { colSpan: 4 },
                React.createElement("div", { className: style.logDetailsContainer },
                    React.createElement("table", { className: style.logDetailsTable },
                        React.createElement("tbody", null,
                            labelsAvailable && (React.createElement("tr", null,
                                React.createElement("td", { colSpan: 5, className: style.logDetailsHeading, "aria-label": "Log Labels" }, "Log Labels:"))),
                            Object.keys(labels).map(function (key) {
                                var value = labels[key];
                                return (React.createElement(LogDetailsRow, { key: key + "=" + value, parsedKey: key, parsedValue: value, isLabel: true, getStats: function () { return calculateLogsLabelStats(getRows(), key); }, onClickFilterOutLabel: onClickFilterOutLabel, onClickFilterLabel: onClickFilterLabel }));
                            }),
                            parsedFieldsAvailable && (React.createElement("tr", null,
                                React.createElement("td", { colSpan: 5, className: style.logDetailsHeading, "aria-label": "Parsed Fields" }, "Parsed Fields:"))),
                            fields.map(function (field) {
                                var key = field.key, value = field.value, links = field.links, fieldIndex = field.fieldIndex;
                                return (React.createElement(LogDetailsRow, { key: key + "=" + value, parsedKey: key, parsedValue: value, links: links, onClickShowParsedField: onClickShowParsedField, onClickHideParsedField: onClickHideParsedField, getStats: function () {
                                        return fieldIndex === undefined
                                            ? _this.getStatsForParsedField(key)
                                            : calculateStats(row.dataFrame.fields[fieldIndex].values.toArray());
                                    }, showParsedFields: showParsedFields }));
                            }),
                            !parsedFieldsAvailable && !labelsAvailable && (React.createElement("tr", null,
                                React.createElement("td", { colSpan: 5, "aria-label": "No details" }, "No details available")))))))));
    };
    return UnThemedLogDetails;
}(PureComponent));
export var LogDetails = withTheme(UnThemedLogDetails);
LogDetails.displayName = 'LogDetails';
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=LogDetails.js.map