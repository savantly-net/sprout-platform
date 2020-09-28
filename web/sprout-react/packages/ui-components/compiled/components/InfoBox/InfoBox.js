import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '../../themes';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { HorizontalGroup } from '../Layout/Layout';
import panelArtDark from './panelArt_dark.svg';
import panelArtLight from './panelArt_light.svg';
/**
 * This is a simple InfoBox component, the api is not considered stable yet and will likely see breaking changes
 * in future minor releases.
 * @Alpha
 */
export var InfoBox = React.memo(React.forwardRef(function (_a, ref) {
    var title = _a.title, className = _a.className, children = _a.children, branded = _a.branded, url = _a.url, urlTitle = _a.urlTitle, onDismiss = _a.onDismiss, otherProps = __rest(_a, ["title", "className", "children", "branded", "url", "urlTitle", "onDismiss"]);
    var theme = useTheme();
    var styles = getInfoBoxStyles(theme);
    var wrapperClassName = branded ? cx(styles.wrapperBranded, className) : cx(styles.wrapper, className);
    return (React.createElement("div", __assign({ className: wrapperClassName }, otherProps, { ref: ref }),
        React.createElement("div", null,
            React.createElement(HorizontalGroup, { justify: 'space-between', align: 'flex-start' },
                React.createElement("div", null, typeof title === 'string' ? React.createElement("h4", null, title) : title),
                onDismiss && React.createElement(IconButton, { name: 'times', onClick: onDismiss }))),
        React.createElement("div", null, children),
        url && (React.createElement("a", { href: url, className: styles.docsLink, target: "_blank" },
            React.createElement(Icon, { name: "book" }),
            " ",
            urlTitle || 'Read more'))));
}));
var getInfoBoxStyles = stylesFactory(function (theme) { return ({
    wrapper: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    position: relative;\n    padding: ", ";\n    background-color: ", ";\n    border-top: 3px solid ", ";\n    margin-bottom: ", ";\n    flex-grow: 1;\n\n    ul {\n      padding-left: ", ";\n    }\n\n    code {\n      @include font-family-monospace();\n      font-size: ", ";\n      background-color: ", ";\n      color: ", ";\n      border: 1px solid ", ";\n      border-radius: 4px;\n    }\n\n    p:last-child {\n      margin-bottom: 0;\n    }\n\n    &--max-lg {\n      max-width: ", ";\n    }\n  "], ["\n    position: relative;\n    padding: ", ";\n    background-color: ", ";\n    border-top: 3px solid ", ";\n    margin-bottom: ", ";\n    flex-grow: 1;\n\n    ul {\n      padding-left: ", ";\n    }\n\n    code {\n      @include font-family-monospace();\n      font-size: ", ";\n      background-color: ", ";\n      color: ", ";\n      border: 1px solid ", ";\n      border-radius: 4px;\n    }\n\n    p:last-child {\n      margin-bottom: 0;\n    }\n\n    &--max-lg {\n      max-width: ", ";\n    }\n  "])), theme.spacing.md, theme.colors.bg2, theme.palette.blue80, theme.spacing.md, theme.spacing.lg, theme.typography.size.sm, theme.colors.bg1, theme.colors.text, theme.colors.border2, theme.breakpoints.lg),
    wrapperBranded: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    padding: ", ";\n    border-radius: ", ";\n    position: relative;\n    box-shadow: 0 0 30px 10px rgba(0, 0, 0, ", ");\n    z-index: 0;\n\n    &:before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background-image: url(", ");\n      border-radius: ", ";\n      background-position: 50% 50%;\n      background-size: cover;\n      filter: saturate(80%);\n      z-index: -1;\n    }\n\n    p:last-child {\n      margin-bottom: 0;\n    }\n  "], ["\n    padding: ", ";\n    border-radius: ", ";\n    position: relative;\n    box-shadow: 0 0 30px 10px rgba(0, 0, 0, ", ");\n    z-index: 0;\n\n    &:before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background-image: url(", ");\n      border-radius: ", ";\n      background-position: 50% 50%;\n      background-size: cover;\n      filter: saturate(80%);\n      z-index: -1;\n    }\n\n    p:last-child {\n      margin-bottom: 0;\n    }\n  "])), theme.spacing.md, theme.border.radius.md, theme.isLight ? 0.05 : 0.2, theme.isLight ? panelArtLight : panelArtDark, theme.border.radius.md),
    docsLink: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    display: inline-block;\n    margin-top: ", ";\n    font-size: ", ";\n  "], ["\n    display: inline-block;\n    margin-top: ", ";\n    font-size: ", ";\n  "])), theme.spacing.md, theme.typography.size.sm),
}); });
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=InfoBox.js.map