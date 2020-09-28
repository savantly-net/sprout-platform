import { __makeTemplateObject } from "tslib";
import React from 'react';
import { Range, createSliderWithTooltip } from 'rc-slider';
import { cx, css } from 'emotion';
import { Global, css as cssCore } from '@emotion/core';
import { stylesFactory } from '../../themes';
import { useTheme } from '../../themes/ThemeContext';
var getStyles = stylesFactory(function (theme, isHorizontal) {
    var trackColor = theme.isLight ? theme.palette.gray5 : theme.palette.dark6;
    var container = isHorizontal
        ? css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        width: 100%;\n        margin: ", " ", " ", " ", ";\n      "], ["\n        width: 100%;\n        margin: ", " ", " ", " ", ";\n      "])), theme.spacing.lg, theme.spacing.sm, theme.spacing.sm, theme.spacing.sm) : css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        height: 100%;\n        margin: ", " ", " ", " ", ";\n      "], ["\n        height: 100%;\n        margin: ", " ", " ", " ", ";\n      "])), theme.spacing.sm, theme.spacing.lg, theme.spacing.sm, theme.spacing.sm);
    return {
        container: container,
        slider: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      .rc-slider-vertical .rc-slider-handle {\n        margin-top: -10px;\n      }\n      .rc-slider-handle {\n        border: solid 2px ", ";\n        background-color: ", ";\n      }\n      .rc-slider-handle:hover {\n        border-color: ", ";\n      }\n      .rc-slider-handle:focus {\n        border-color: ", ";\n        box-shadow: none;\n      }\n      .rc-slider-handle:active {\n        border-color: ", ";\n        box-shadow: none;\n      }\n      .rc-slider-handle-click-focused:focus {\n        border-color: ", ";\n      }\n      .rc-slider-dot-active {\n        border-color: ", ";\n      }\n      .rc-slider-track {\n        background-color: ", ";\n      }\n      .rc-slider-rail {\n        background-color: ", ";\n        border: 1px solid ", ";\n      }\n    "], ["\n      .rc-slider-vertical .rc-slider-handle {\n        margin-top: -10px;\n      }\n      .rc-slider-handle {\n        border: solid 2px ", ";\n        background-color: ", ";\n      }\n      .rc-slider-handle:hover {\n        border-color: ", ";\n      }\n      .rc-slider-handle:focus {\n        border-color: ", ";\n        box-shadow: none;\n      }\n      .rc-slider-handle:active {\n        border-color: ", ";\n        box-shadow: none;\n      }\n      .rc-slider-handle-click-focused:focus {\n        border-color: ", ";\n      }\n      .rc-slider-dot-active {\n        border-color: ", ";\n      }\n      .rc-slider-track {\n        background-color: ", ";\n      }\n      .rc-slider-rail {\n        background-color: ", ";\n        border: 1px solid ", ";\n      }\n    "])), theme.palette.blue77, theme.palette.blue77, theme.palette.blue77, theme.palette.blue77, theme.palette.blue77, theme.palette.blue77, theme.palette.blue77, theme.palette.blue77, trackColor, trackColor),
        /** Global component from @emotion/core doesn't accept computed classname string returned from css from emotion.
         * It accepts object containing the computed name and flattened styles returned from css from @emotion/core
         * */
        tooltip: cssCore(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    body {\n      .rc-slider-tooltip {\n        cursor: grab;\n        user-select: none;\n        z-index: ", ";\n      }\n\n      .rc-slider-tooltip-inner {\n        color: ", ";\n        background-color: transparent !important;\n        border-radius: 0;\n        box-shadow: none;\n      }\n\n      .rc-slider-tooltip-placement-top .rc-slider-tooltip-arrow {\n        display: none;\n      }\n\n      .rc-slider-tooltip-placement-top {\n        padding: 0;\n      }\n    }\n  "], ["\n    body {\n      .rc-slider-tooltip {\n        cursor: grab;\n        user-select: none;\n        z-index: ", ";\n      }\n\n      .rc-slider-tooltip-inner {\n        color: ", ";\n        background-color: transparent !important;\n        border-radius: 0;\n        box-shadow: none;\n      }\n\n      .rc-slider-tooltip-placement-top .rc-slider-tooltip-arrow {\n        display: none;\n      }\n\n      .rc-slider-tooltip-placement-top {\n        padding: 0;\n      }\n    }\n  "])), theme.zIndex.tooltip, theme.colors.text),
    };
});
export var Slider = function (_a) {
    var min = _a.min, max = _a.max, onChange = _a.onChange, onAfterChange = _a.onAfterChange, _b = _a.orientation, orientation = _b === void 0 ? 'horizontal' : _b, reverse = _a.reverse, step = _a.step, formatTooltipResult = _a.formatTooltipResult, value = _a.value, _c = _a.tooltipAlwaysVisible, tooltipAlwaysVisible = _c === void 0 ? true : _c;
    var isHorizontal = orientation === 'horizontal';
    var theme = useTheme();
    var styles = getStyles(theme, isHorizontal);
    var RangeWithTooltip = createSliderWithTooltip(Range);
    return (React.createElement("div", { className: cx(styles.container, styles.slider) },
        React.createElement(Global, { styles: styles.tooltip }),
        React.createElement(RangeWithTooltip, { tipProps: {
                visible: tooltipAlwaysVisible,
                placement: isHorizontal ? 'top' : 'right',
            }, min: min, max: max, step: step, defaultValue: value || [min, max], tipFormatter: function (value) { return (formatTooltipResult ? formatTooltipResult(value) : value); }, onChange: onChange, onAfterChange: onAfterChange, vertical: !isHorizontal, reverse: reverse })));
};
Slider.displayName = 'Slider';
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=Slider.js.map