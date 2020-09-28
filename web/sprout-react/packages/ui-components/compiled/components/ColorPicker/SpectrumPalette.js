import { __assign } from "tslib";
import React from 'react';
import { CustomPicker } from 'react-color';
import { Saturation, Hue, Alpha } from 'react-color/lib/components/common';
import tinycolor from 'tinycolor2';
import ColorInput from './ColorInput';
import SpectrumPalettePointer from './SpectrumPalettePointer';
import { getColorFromHexRgbOrName } from '@savantly/sprout-api';
var renderPointer = function (theme) { return function (props) { return (React.createElement(SpectrumPalettePointer, __assign({}, props, { theme: theme }))); }; };
// @ts-ignore
var SpectrumPicker = CustomPicker(function (_a) {
    var rgb = _a.rgb, hsl = _a.hsl, onChange = _a.onChange, theme = _a.theme;
    return (React.createElement("div", { style: {
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
        } },
        React.createElement("div", { style: {
                display: 'flex',
            } },
            React.createElement("div", { style: {
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'column',
                } },
                React.createElement("div", { style: {
                        position: 'relative',
                        height: '100px',
                        width: '100%',
                    } },
                    React.createElement(Saturation, { onChange: onChange, hsl: hsl, hsv: tinycolor(hsl).toHsv() })),
                React.createElement("div", { style: {
                        width: '100%',
                        height: '16px',
                        marginTop: '16px',
                        position: 'relative',
                        background: 'white',
                    } },
                    React.createElement(Alpha, { rgb: rgb, hsl: hsl, a: rgb.a, onChange: onChange, pointer: renderPointer(theme) }))),
            React.createElement("div", { style: {
                    position: 'relative',
                    width: '16px',
                    height: '100px',
                    marginLeft: '16px',
                } },
                React.createElement(Hue, { onChange: onChange, hsl: hsl, direction: "vertical", pointer: renderPointer(theme) })))));
});
var SpectrumPalette = function (_a) {
    var color = _a.color, onChange = _a.onChange, theme = _a.theme;
    return (React.createElement("div", null,
        React.createElement(SpectrumPicker, { color: tinycolor(getColorFromHexRgbOrName(color)).toRgb(), onChange: function (a) {
                onChange(tinycolor(a.rgb).toString());
            }, theme: theme }),
        React.createElement(ColorInput, { theme: theme, color: color, onChange: onChange, style: { marginTop: '16px' } })));
};
export default SpectrumPalette;
//# sourceMappingURL=SpectrumPalette.js.map