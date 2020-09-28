import { __assign } from "tslib";
import React from 'react';
import { selectThemeVariant } from '../../themes/selectThemeVariant';
var SpectrumPalettePointer = function (_a) {
    var theme = _a.theme, direction = _a.direction;
    var styles = {
        picker: {
            width: '16px',
            height: '16px',
            transform: direction === 'vertical' ? 'translate(0, -8px)' : 'translate(-8px, 0)',
        },
    };
    var pointerColor = selectThemeVariant({
        light: theme.palette.dark3,
        dark: theme.palette.gray2,
    }, theme.type);
    var pointerStyles = {
        position: 'absolute',
        left: '6px',
        width: '0',
        height: '0',
        borderStyle: 'solid',
        background: 'none',
    };
    var topArrowStyles = {
        top: '-7px',
        borderWidth: '6px 3px 0px 3px',
        borderColor: pointerColor + " transparent transparent transparent",
    };
    var bottomArrowStyles = {
        bottom: '-7px',
        borderWidth: '0px 3px 6px 3px',
        borderColor: " transparent transparent " + pointerColor + " transparent",
    };
    if (direction === 'vertical') {
        pointerStyles = __assign(__assign({}, pointerStyles), { left: 'auto' });
        topArrowStyles = {
            borderWidth: '3px 0px 3px 6px',
            borderColor: "transparent transparent transparent " + pointerColor,
            left: '-7px',
            top: '7px',
        };
        bottomArrowStyles = {
            borderWidth: '3px 6px 3px 0px',
            borderColor: "transparent " + pointerColor + " transparent transparent",
            right: '-7px',
            top: '7px',
        };
    }
    return (React.createElement("div", { style: styles.picker },
        React.createElement("div", { style: __assign(__assign({}, pointerStyles), topArrowStyles) }),
        React.createElement("div", { style: __assign(__assign({}, pointerStyles), bottomArrowStyles) })));
};
export default SpectrumPalettePointer;
//# sourceMappingURL=SpectrumPalettePointer.js.map