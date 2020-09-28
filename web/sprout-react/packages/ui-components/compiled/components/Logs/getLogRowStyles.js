import { __makeTemplateObject } from "tslib";
import { css } from 'emotion';
import { LogLevel } from '@grafana/data';
import { selectThemeVariant } from '../../themes/selectThemeVariant';
import { stylesFactory } from '../../themes';
export var getLogRowStyles = stylesFactory(function (theme, logLevel) {
    var logColor = selectThemeVariant({ light: theme.palette.gray5, dark: theme.palette.gray2 }, theme.type);
    var borderColor = selectThemeVariant({ light: theme.palette.gray5, dark: theme.palette.gray2 }, theme.type);
    var bgColor = selectThemeVariant({ light: theme.palette.gray5, dark: theme.palette.dark4 }, theme.type);
    var context = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    label: context;\n    visibility: hidden;\n    white-space: nowrap;\n    position: relative;\n  "], ["\n    label: context;\n    visibility: hidden;\n    white-space: nowrap;\n    position: relative;\n  "])));
    switch (logLevel) {
        case LogLevel.crit:
        case LogLevel.critical:
            logColor = '#705da0';
            break;
        case LogLevel.error:
        case LogLevel.err:
            logColor = '#e24d42';
            break;
        case LogLevel.warning:
        case LogLevel.warn:
            logColor = theme.palette.yellow;
            break;
        case LogLevel.info:
            logColor = '#7eb26d';
            break;
        case LogLevel.debug:
            logColor = '#1f78c1';
            break;
        case LogLevel.trace:
            logColor = '#6ed0e0';
            break;
    }
    return {
        logsRowMatchHighLight: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      label: logs-row__match-highlight;\n      background: inherit;\n      padding: inherit;\n      color: ", ";\n      background-color: rgba(", ", 0.1);\n    "], ["\n      label: logs-row__match-highlight;\n      background: inherit;\n      padding: inherit;\n      color: ", ";\n      background-color: rgba(", ", 0.1);\n    "])), theme.palette.yellow, theme.palette.yellow),
        logsRowMatchHighLightPreview: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      label: logs-row__match-highlight--preview;\n      background-color: rgba(", ", 0.2);\n      border-bottom-style: dotted;\n    "], ["\n      label: logs-row__match-highlight--preview;\n      background-color: rgba(", ", 0.2);\n      border-bottom-style: dotted;\n    "])), theme.palette.yellow),
        logsRowsTable: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      label: logs-rows;\n      font-family: ", ";\n      font-size: ", ";\n      width: 100%;\n    "], ["\n      label: logs-rows;\n      font-family: ", ";\n      font-size: ", ";\n      width: 100%;\n    "])), theme.typography.fontFamily.monospace, theme.typography.size.sm),
        logsRowsHorizontalScroll: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      label: logs-rows__horizontal-scroll;\n      overflow: scroll;\n    "], ["\n      label: logs-rows__horizontal-scroll;\n      overflow: scroll;\n    "]))),
        context: context,
        logsRow: css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      label: logs-row;\n      width: 100%;\n      cursor: pointer;\n      vertical-align: top;\n      &:hover {\n        .", " {\n          visibility: visible;\n          z-index: 1;\n          margin-left: 10px;\n          text-decoration: underline;\n          &:hover {\n            color: ", ";\n          }\n        }\n      }\n      td:last-child {\n        width: 100%;\n      }\n\n      > td {\n        padding-right: ", ";\n        border-top: ", " solid transparent;\n        border-bottom: ", " solid transparent;\n        height: 100%;\n      }\n\n      &:hover {\n        background: ", ";\n      }\n    "], ["\n      label: logs-row;\n      width: 100%;\n      cursor: pointer;\n      vertical-align: top;\n      &:hover {\n        .", " {\n          visibility: visible;\n          z-index: 1;\n          margin-left: 10px;\n          text-decoration: underline;\n          &:hover {\n            color: ", ";\n          }\n        }\n      }\n      td:last-child {\n        width: 100%;\n      }\n\n      > td {\n        padding-right: ", ";\n        border-top: ", " solid transparent;\n        border-bottom: ", " solid transparent;\n        height: 100%;\n      }\n\n      &:hover {\n        background: ", ";\n      }\n    "])), context, theme.palette.yellow, theme.spacing.sm, theme.border.width.sm, theme.border.width.sm, theme.colors.bodyBg),
        logsRowDuplicates: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      label: logs-row__duplicates;\n      text-align: right;\n      width: 4em;\n      cursor: default;\n    "], ["\n      label: logs-row__duplicates;\n      text-align: right;\n      width: 4em;\n      cursor: default;\n    "]))),
        logsRowLevel: css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      label: logs-row__level;\n      position: relative;\n      max-width: 10px;\n      cursor: default;\n      &::after {\n        content: '';\n        display: block;\n        position: absolute;\n        top: 1px;\n        bottom: 1px;\n        width: 3px;\n        background-color: ", ";\n      }\n    "], ["\n      label: logs-row__level;\n      position: relative;\n      max-width: 10px;\n      cursor: default;\n      &::after {\n        content: '';\n        display: block;\n        position: absolute;\n        top: 1px;\n        bottom: 1px;\n        width: 3px;\n        background-color: ", ";\n      }\n    "])), logColor),
        logsRowToggleDetails: css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      label: logs-row-toggle-details__level;\n      position: relative;\n      font-size: 9px;\n      padding-top: 5px;\n      max-width: 15px;\n    "], ["\n      label: logs-row-toggle-details__level;\n      position: relative;\n      font-size: 9px;\n      padding-top: 5px;\n      max-width: 15px;\n    "]))),
        logsRowLocalTime: css(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n      label: logs-row__localtime;\n      white-space: nowrap;\n    "], ["\n      label: logs-row__localtime;\n      white-space: nowrap;\n    "]))),
        logsRowLabels: css(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n      label: logs-row__labels;\n      white-space: nowrap;\n      max-width: 22em;\n    "], ["\n      label: logs-row__labels;\n      white-space: nowrap;\n      max-width: 22em;\n    "]))),
        logsRowMessage: css(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n      label: logs-row__message;\n      white-space: pre-wrap;\n      word-break: break-all;\n    "], ["\n      label: logs-row__message;\n      white-space: pre-wrap;\n      word-break: break-all;\n    "]))),
        //Log details specific CSS
        logDetailsContainer: css(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n      label: logs-row-details-table;\n      border: 1px solid ", ";\n      padding: 0 ", " ", ";\n      border-radius: 3px;\n      margin: 20px 8px 20px 16px;\n      cursor: default;\n    "], ["\n      label: logs-row-details-table;\n      border: 1px solid ", ";\n      padding: 0 ", " ", ";\n      border-radius: 3px;\n      margin: 20px 8px 20px 16px;\n      cursor: default;\n    "])), borderColor, theme.spacing.sm, theme.spacing.sm),
        logDetailsTable: css(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n      label: logs-row-details-table;\n      line-height: 18px;\n      width: 100%;\n      td:last-child {\n        width: 100%;\n      }\n    "], ["\n      label: logs-row-details-table;\n      line-height: 18px;\n      width: 100%;\n      td:last-child {\n        width: 100%;\n      }\n    "]))),
        logsDetailsIcon: css(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n      label: logs-row-details__icon;\n      position: relative;\n      color: ", ";\n      padding-top: 6px;\n      padding-left: 6px;\n    "], ["\n      label: logs-row-details__icon;\n      position: relative;\n      color: ", ";\n      padding-top: 6px;\n      padding-left: 6px;\n    "])), theme.palette.gray3),
        logDetailsLabel: css(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n      label: logs-row-details__label;\n      max-width: 30em;\n      min-width: 20em;\n      padding: 0 ", ";\n      overflow-wrap: break-word;\n    "], ["\n      label: logs-row-details__label;\n      max-width: 30em;\n      min-width: 20em;\n      padding: 0 ", ";\n      overflow-wrap: break-word;\n    "])), theme.spacing.sm),
        logDetailsHeading: css(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n      label: logs-row-details__heading;\n      font-weight: ", ";\n      padding: ", " 0 ", ";\n    "], ["\n      label: logs-row-details__heading;\n      font-weight: ", ";\n      padding: ", " 0 ", ";\n    "])), theme.typography.weight.bold, theme.spacing.sm, theme.spacing.xs),
        logDetailsValue: css(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n      label: logs-row-details__row;\n      position: relative;\n      vertical-align: middle;\n      cursor: default;\n      &:hover {\n        background-color: ", ";\n      }\n    "], ["\n      label: logs-row-details__row;\n      position: relative;\n      vertical-align: middle;\n      cursor: default;\n      &:hover {\n        background-color: ", ";\n      }\n    "])), bgColor),
    };
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18;
//# sourceMappingURL=getLogRowStyles.js.map