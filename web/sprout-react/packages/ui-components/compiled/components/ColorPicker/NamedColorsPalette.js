import React from 'react';
import { getNamedColorPalette } from '@savantly/sprout-api';
import NamedColorsGroup from './NamedColorsGroup';
export var NamedColorsPalette = function (_a) {
    var color = _a.color, onChange = _a.onChange, theme = _a.theme;
    var swatches = [];
    getNamedColorPalette().forEach(function (colors, hue) {
        swatches.push(React.createElement(NamedColorsGroup, { key: hue, theme: theme, selectedColor: color, colors: colors, onColorSelect: function (color) {
                onChange(color.name);
            } }));
    });
    return (React.createElement("div", { style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridRowGap: '24px',
            gridColumnGap: '24px',
        } }, swatches));
};
//# sourceMappingURL=NamedColorsPalette.js.map