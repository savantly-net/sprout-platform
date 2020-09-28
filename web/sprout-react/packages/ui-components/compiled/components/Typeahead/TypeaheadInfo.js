import { __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import { css, cx } from 'emotion';
import { selectThemeVariant, ThemeContext } from '../..';
import { renderMarkdown, textUtil } from '@savantly/sprout-api';
var getStyles = function (theme, height, visible) {
    return {
        typeaheadItem: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      label: type-ahead-item;\n      z-index: 11;\n      padding: ", " ", " ", " ", ";\n      border-radius: ", ";\n      border: ", ";\n      overflow-y: scroll;\n      overflow-x: hidden;\n      outline: none;\n      background: ", ";\n      color: ", ";\n      box-shadow: ", ";\n      visibility: ", ";\n      width: 250px;\n      height: ", "px;\n      position: relative;\n      word-break: break-word;\n    "], ["\n      label: type-ahead-item;\n      z-index: 11;\n      padding: ", " ", " ", " ", ";\n      border-radius: ", ";\n      border: ",
            ";\n      overflow-y: scroll;\n      overflow-x: hidden;\n      outline: none;\n      background: ", ";\n      color: ", ";\n      box-shadow: ",
            ";\n      visibility: ", ";\n      width: 250px;\n      height: ", "px;\n      position: relative;\n      word-break: break-word;\n    "])), theme.spacing.sm, theme.spacing.sm, theme.spacing.sm, theme.spacing.md, theme.border.radius.md, selectThemeVariant({ light: "solid 1px " + theme.palette.gray5, dark: "solid 1px " + theme.palette.dark1 }, theme.type), selectThemeVariant({ light: theme.palette.white, dark: theme.palette.dark4 }, theme.type), theme.colors.text, selectThemeVariant({ light: "0 5px 10px 0 " + theme.palette.gray5, dark: "0 5px 10px 0 " + theme.palette.black }, theme.type), visible === true ? 'visible' : 'hidden', height + parseInt(theme.spacing.xxs, 10)),
    };
};
export var TypeaheadInfo = function (_a) {
    var item = _a.item, height = _a.height;
    var visible = item && !!item.documentation;
    var label = item ? item.label : '';
    var documentation = textUtil.sanitize(renderMarkdown(item === null || item === void 0 ? void 0 : item.documentation));
    var theme = useContext(ThemeContext);
    var styles = getStyles(theme, height, visible);
    return (React.createElement("div", { className: cx([styles.typeaheadItem]) },
        React.createElement("b", null, label),
        React.createElement("hr", null),
        React.createElement("div", { dangerouslySetInnerHTML: { __html: documentation } })));
};
var templateObject_1;
//# sourceMappingURL=TypeaheadInfo.js.map