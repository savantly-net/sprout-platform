import { __assign, __rest } from "tslib";
import React from 'react';
import { getColorForTheme } from '@grafana/data';
import upperFirst from 'lodash/upperFirst';
import find from 'lodash/find';
import { selectThemeVariant } from '../../themes/selectThemeVariant';
export var ColorSwatchVariant;
(function (ColorSwatchVariant) {
    ColorSwatchVariant["Small"] = "small";
    ColorSwatchVariant["Large"] = "large";
})(ColorSwatchVariant || (ColorSwatchVariant = {}));
export var ColorSwatch = function (_a) {
    var color = _a.color, label = _a.label, _b = _a.variant, variant = _b === void 0 ? ColorSwatchVariant.Small : _b, isSelected = _a.isSelected, theme = _a.theme, otherProps = __rest(_a, ["color", "label", "variant", "isSelected", "theme"]);
    var isSmall = variant === ColorSwatchVariant.Small;
    var swatchSize = isSmall ? '16px' : '32px';
    var selectedSwatchBorder = selectThemeVariant({
        light: theme.palette.white,
        dark: theme.palette.black,
    }, theme.type);
    var swatchStyles = {
        width: swatchSize,
        height: swatchSize,
        borderRadius: '50%',
        background: "" + color,
        marginRight: isSmall ? '0px' : '8px',
        boxShadow: isSelected ? "inset 0 0 0 2px " + color + ", inset 0 0 0 4px " + selectedSwatchBorder : 'none',
    };
    return (React.createElement("div", __assign({ style: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
        } }, otherProps),
        React.createElement("div", { style: swatchStyles }),
        variant === ColorSwatchVariant.Large && React.createElement("span", null, label)));
};
var NamedColorsGroup = function (_a) {
    var colors = _a.colors, selectedColor = _a.selectedColor, onColorSelect = _a.onColorSelect, theme = _a.theme, otherProps = __rest(_a, ["colors", "selectedColor", "onColorSelect", "theme"]);
    var primaryColor = find(colors, function (color) { return !!color.isPrimary; });
    return (React.createElement("div", __assign({}, otherProps, { style: { display: 'flex', flexDirection: 'column' } }),
        primaryColor && (React.createElement(ColorSwatch, { key: primaryColor.name, isSelected: primaryColor.name === selectedColor, variant: ColorSwatchVariant.Large, color: getColorForTheme(primaryColor, theme.type), label: upperFirst(primaryColor.hue), onClick: function () { return onColorSelect(primaryColor); }, theme: theme })),
        React.createElement("div", { style: {
                display: 'flex',
                marginTop: '8px',
            } }, colors.map(function (color) {
            return !color.isPrimary && (React.createElement("div", { key: color.name, style: { marginRight: '4px' } },
                React.createElement(ColorSwatch, { key: color.name, isSelected: color.name === selectedColor, color: getColorForTheme(color, theme.type), onClick: function () { return onColorSelect(color); }, theme: theme })));
        }))));
};
export default NamedColorsGroup;
//# sourceMappingURL=NamedColorsGroup.js.map