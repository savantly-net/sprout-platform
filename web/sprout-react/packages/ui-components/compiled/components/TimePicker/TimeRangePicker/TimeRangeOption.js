import { __makeTemplateObject } from "tslib";
import React, { memo } from 'react';
import { css } from 'emotion';
import { useTheme, stylesFactory, selectThemeVariant } from '../../../themes';
import { Icon } from '../../Icon/Icon';
var getStyles = stylesFactory(function (theme) {
    var background = selectThemeVariant({
        light: theme.palette.gray7,
        dark: theme.palette.dark3,
    }, theme.type);
    return {
        container: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 7px 9px 7px 9px;\n      border-left: 2px solid rgba(255, 255, 255, 0);\n\n      &:hover {\n        background: ", ";\n        border-image: linear-gradient(#f05a28 30%, #fbca0a 99%);\n        border-image-slice: 1;\n        border-style: solid;\n        border-top: 0;\n        border-right: 0;\n        border-bottom: 0;\n        border-left-width: 2px;\n        cursor: pointer;\n      }\n    "], ["\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 7px 9px 7px 9px;\n      border-left: 2px solid rgba(255, 255, 255, 0);\n\n      &:hover {\n        background: ", ";\n        border-image: linear-gradient(#f05a28 30%, #fbca0a 99%);\n        border-image-slice: 1;\n        border-style: solid;\n        border-top: 0;\n        border-right: 0;\n        border-bottom: 0;\n        border-left-width: 2px;\n        cursor: pointer;\n      }\n    "])), background),
    };
});
export var TimeRangeOption = memo(function (_a) {
    var value = _a.value, onSelect = _a.onSelect, _b = _a.selected, selected = _b === void 0 ? false : _b;
    var theme = useTheme();
    var styles = getStyles(theme);
    return (React.createElement("div", { className: styles.container, onClick: function () { return onSelect(value); }, tabIndex: -1 },
        React.createElement("span", null, value.display),
        selected ? React.createElement(Icon, { name: "check" }) : null));
});
var templateObject_1;
//# sourceMappingURL=TimeRangeOption.js.map