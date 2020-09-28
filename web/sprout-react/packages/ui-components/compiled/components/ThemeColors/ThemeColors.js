import { __makeTemplateObject } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
import { useTheme } from '../../themes/ThemeContext';
import { Icon } from '../Icon/Icon';
import { HorizontalGroup } from '../Layout/Layout';
var DemoBox = function (_a) {
    var bg = _a.bg, border = _a.border, children = _a.children;
    var style = cx(css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      padding: 16px 32px;\n      background: ", ";\n      width: 100%;\n    "], ["\n      padding: 16px 32px;\n      background: ", ";\n      width: 100%;\n    "])), bg), border
        ? css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          border: 1px solid ", ";\n        "], ["\n          border: 1px solid ", ";\n        "])), border) : null);
    return (React.createElement("div", { className: style },
        React.createElement("div", { className: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n          padding-bottom: 16px;\n        "], ["\n          padding-bottom: 16px;\n        "]))) }, name),
        children));
};
var DemoText = function (_a) {
    var color = _a.color, bold = _a.bold, size = _a.size, children = _a.children;
    var style = css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    padding: 4px;\n    color: ", ";\n    font-weight: ", ";\n    font-size: ", "px;\n  "], ["\n    padding: 4px;\n    color: ", ";\n    font-weight: ", ";\n    font-size: ", "px;\n  "])), color !== null && color !== void 0 ? color : 'inherit', bold ? 500 : 400, size !== null && size !== void 0 ? size : 14);
    return React.createElement("div", { className: style }, children);
};
export var ThemeColors = function () {
    var theme = useTheme();
    return (React.createElement("div", { className: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        width: 100%;\n      "], ["\n        width: 100%;\n      "]))) },
        React.createElement(DemoBox, { bg: theme.colors.dashboardBg },
            React.createElement(DemoText, null, "theme.colors.dashboardBg"),
            React.createElement(DemoBox, { bg: theme.colors.bg1, border: theme.colors.border1 },
                React.createElement(DemoText, null, "theme.colors.bg1 is the main & preferred content background for text and elements This box is using border1"),
                React.createElement(DemoBox, { bg: theme.colors.bg2, border: theme.colors.border2 },
                    React.createElement(DemoText, null, "colors.bg2 background used for elements placed on colors.bg1. Using colors.border1 should be used on elements placed ontop of bg1. Ths box is using border2."),
                    React.createElement(DemoBox, { bg: theme.colors.bg3, border: theme.colors.border2 },
                        React.createElement(DemoText, null, "colors.bg3 background used for elements placed on colors.bg2."))))),
        React.createElement(HorizontalGroup, null,
            React.createElement(DemoBox, { bg: theme.colors.bodyBg },
                React.createElement(React.Fragment, null,
                    "Text on main body background (bg1)",
                    React.createElement(DemoText, { color: theme.colors.textHeading, size: 24 },
                        "textHeading Usually a bit bigger text ",
                        React.createElement(Icon, { name: "trash-alt" })),
                    React.createElement(DemoText, { color: theme.colors.text },
                        "text ",
                        React.createElement(Icon, { name: "trash-alt" })),
                    React.createElement(DemoText, { color: theme.colors.textSemiWeak },
                        "textSemiWeak ",
                        React.createElement(Icon, { name: "trash-alt" })),
                    React.createElement(DemoText, { color: theme.colors.textWeak },
                        "textWeak ",
                        React.createElement(Icon, { name: "trash-alt" })),
                    React.createElement(DemoText, { color: theme.colors.textFaint },
                        "textFaint ",
                        React.createElement(Icon, { name: "trash-alt" })),
                    React.createElement(DemoText, { color: theme.colors.textStrong },
                        "textStrong ",
                        React.createElement(Icon, { name: "trash-alt" })),
                    React.createElement(DemoText, { color: theme.colors.formInputText },
                        "formInputText ",
                        React.createElement(Icon, { name: "trash-alt" })),
                    React.createElement(DemoText, { color: theme.colors.formLabel, bold: true },
                        "formLabel is also bold ",
                        React.createElement(Icon, { name: "trash-alt" })),
                    React.createElement(DemoText, { color: theme.colors.formDescription },
                        "formDescription ",
                        React.createElement(Icon, { name: "trash-alt" })),
                    React.createElement(DemoText, { color: theme.colors.textBlue, bold: true }, "textBlue usually bold"),
                    React.createElement(DemoText, { color: theme.colors.link }, "link"),
                    React.createElement(DemoText, { color: theme.colors.linkHover }, "linkHover"),
                    React.createElement(DemoText, { color: theme.colors.linkDisabled }, "linkDisabled"),
                    React.createElement(DemoText, { color: theme.colors.linkExternal }, "linkExternal"))),
            React.createElement(DemoBox, { bg: theme.colors.formInputBg },
                "This is inside form input bg (same as dashboard bg)",
                React.createElement(DemoText, { color: theme.colors.formInputText }, "formInputText"),
                React.createElement(DemoText, { color: theme.colors.formInputDisabledText }, "formInputDisabledText"),
                React.createElement(DemoText, { color: theme.colors.formInputPlaceholderText }, "formInputPlaceholderText")),
            React.createElement(DemoBox, { bg: theme.colors.bg2 },
                "Inside bg2",
                React.createElement(DemoText, { color: theme.colors.text },
                    "text ",
                    React.createElement(Icon, { name: "trash-alt" })),
                React.createElement(DemoText, { color: theme.colors.textWeak },
                    "textWeak ",
                    React.createElement(Icon, { name: "trash-alt" })),
                React.createElement(DemoText, { color: theme.colors.textFaint },
                    "textFaint ",
                    React.createElement(Icon, { name: "trash-alt" })),
                React.createElement(DemoText, { color: theme.colors.textStrong },
                    "textStrong ",
                    React.createElement(Icon, { name: "trash-alt" }))))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=ThemeColors.js.map