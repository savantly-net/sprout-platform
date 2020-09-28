import { __assign, __makeTemplateObject } from "tslib";
import React, { useCallback } from 'react';
import { getColorFromHexRgbOrName, } from '@savantly/sprout-api';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { getTheme, stylesFactory } from '../../themes';
import { Icon } from '../Icon/Icon';
import { css } from 'emotion';
import { ColorPickerTrigger } from '../ColorPicker/ColorPickerTrigger';
// Supporting FixedColor only currently
export var ColorValueEditor = function (_a) {
    var _b;
    var value = _a.value, onChange = _a.onChange, item = _a.item;
    var settings = item.settings;
    var theme = getTheme();
    var styles = getStyles(theme);
    var color = (value === null || value === void 0 ? void 0 : value.fixedColor) || ((_b = item.defaultValue) === null || _b === void 0 ? void 0 : _b.fixedColor);
    var onValueChange = useCallback(function (color) {
        onChange(__assign(__assign({}, value), { fixedColor: color }));
    }, [value]);
    return (React.createElement(ColorPicker, { color: color || '', onChange: onValueChange, enableNamedColors: !(settings === null || settings === void 0 ? void 0 : settings.disableNamedColors) }, function (_a) {
        var _b;
        var ref = _a.ref, showColorPicker = _a.showColorPicker, hideColorPicker = _a.hideColorPicker;
        return (React.createElement("div", { className: styles.spot, onBlur: hideColorPicker },
            React.createElement("div", { className: styles.colorPicker },
                React.createElement(ColorPickerTrigger, { ref: ref, onClick: showColorPicker, onMouseLeave: hideColorPicker, color: color ? getColorFromHexRgbOrName(color, theme.type) : theme.colors.formInputBorder })),
            React.createElement("div", { className: styles.colorText, onClick: showColorPicker }, (_b = color !== null && color !== void 0 ? color : settings === null || settings === void 0 ? void 0 : settings.textWhenUndefined) !== null && _b !== void 0 ? _b : 'Pick Color'),
            value && (settings === null || settings === void 0 ? void 0 : settings.allowUndefined) && (React.createElement(Icon, { className: styles.trashIcon, name: "trash-alt", onClick: function () { return onChange(undefined); } }))));
    }));
};
var getStyles = stylesFactory(function (theme) {
    return {
        spot: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      color: ", ";\n      background: ", ";\n      padding: 3px;\n      border: 1px solid ", ";\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      &:hover {\n        border: 1px solid ", ";\n      }\n    "], ["\n      color: ", ";\n      background: ", ";\n      padding: 3px;\n      border: 1px solid ", ";\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      &:hover {\n        border: 1px solid ", ";\n      }\n    "])), theme.colors.text, theme.colors.formInputBg, theme.colors.formInputBorder, theme.colors.formInputBorderHover),
        colorPicker: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      padding: 0 ", ";\n    "], ["\n      padding: 0 ", ";\n    "])), theme.spacing.sm),
        colorText: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      cursor: pointer;\n      flex-grow: 1;\n    "], ["\n      cursor: pointer;\n      flex-grow: 1;\n    "]))),
        trashIcon: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      cursor: pointer;\n      color: ", ";\n      &:hover {\n        color: ", ";\n      }\n    "], ["\n      cursor: pointer;\n      color: ", ";\n      &:hover {\n        color: ", ";\n      }\n    "])), theme.colors.textWeak, theme.colors.text),
    };
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=color.js.map