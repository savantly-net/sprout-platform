import { __makeTemplateObject } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '../../../themes';
import { HorizontalGroup, VerticalGroup } from '../../Layout/Layout';
import { IconButton } from '../../IconButton/IconButton';
export var DataLinksListItem = function (_a) {
    var link = _a.link, onEdit = _a.onEdit, onRemove = _a.onRemove;
    var theme = useTheme();
    var styles = getDataLinkListItemStyles(theme);
    var hasTitle = link.title.trim() !== '';
    var hasUrl = link.url.trim() !== '';
    return (React.createElement("div", { className: styles.wrapper },
        React.createElement(VerticalGroup, { spacing: "xs" },
            React.createElement(HorizontalGroup, { justify: "space-between", align: "flex-start", width: "100%" },
                React.createElement("div", { className: cx(styles.title, !hasTitle && styles.notConfigured) }, hasTitle ? link.title : 'Data link title not provided'),
                React.createElement(HorizontalGroup, null,
                    React.createElement(IconButton, { name: "pen", onClick: onEdit }),
                    React.createElement(IconButton, { name: "times", onClick: onRemove }))),
            React.createElement("div", { className: cx(styles.url, !hasUrl && styles.notConfigured), title: link.url }, hasUrl ? link.url : 'Data link url not provided'))));
};
var getDataLinkListItemStyles = stylesFactory(function (theme) {
    return {
        wrapper: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      margin-bottom: ", ";\n      width: 100%;\n      &:last-child {\n        margin-bottom: 0;\n      }\n    "], ["\n      margin-bottom: ", ";\n      width: 100%;\n      &:last-child {\n        margin-bottom: 0;\n      }\n    "])), theme.spacing.md),
        notConfigured: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      font-style: italic;\n    "], ["\n      font-style: italic;\n    "]))),
        title: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      color: ", ";\n      font-size: ", ";\n      font-weight: ", ";\n    "], ["\n      color: ", ";\n      font-size: ", ";\n      font-weight: ", ";\n    "])), theme.colors.formLabel, theme.typography.size.sm, theme.typography.weight.semibold),
        url: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      color: ", ";\n      font-size: ", ";\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      max-width: 90%;\n    "], ["\n      color: ", ";\n      font-size: ", ";\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      max-width: 90%;\n    "])), theme.colors.textWeak, theme.typography.size.sm),
    };
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=DataLinksListItem.js.map