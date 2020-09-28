import { __makeTemplateObject, __read } from "tslib";
import React, { useState, useLayoutEffect, useRef } from 'react';
import { stylesFactory } from '../../themes/stylesFactory';
import { selectThemeVariant } from '../../themes/selectThemeVariant';
import { css } from 'emotion';
import { useTheme } from '../../themes/ThemeContext';
import useWindowSize from 'react-use/lib/useWindowSize';
var getTooltipContainerStyles = stylesFactory(function (theme) {
    var bgColor = selectThemeVariant({ light: theme.palette.gray5, dark: theme.palette.dark1 }, theme.type);
    return {
        wrapper: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      overflow: hidden;\n      background: ", ";\n      /* max-width is set up based on .grafana-tooltip class that's used in dashboard */\n      max-width: 800px;\n      padding: ", ";\n      border-radius: ", ";\n      z-index: ", ";\n    "], ["\n      overflow: hidden;\n      background: ", ";\n      /* max-width is set up based on .grafana-tooltip class that's used in dashboard */\n      max-width: 800px;\n      padding: ", ";\n      border-radius: ", ";\n      z-index: ", ";\n    "])), bgColor, theme.spacing.sm, theme.border.radius.sm, theme.zIndex.tooltip),
    };
});
export var TooltipContainer = function (_a) {
    var position = _a.position, offset = _a.offset, children = _a.children;
    var theme = useTheme();
    var tooltipRef = useRef(null);
    var _b = useWindowSize(), width = _b.width, height = _b.height;
    var _c = __read(useState({
        x: position.x + offset.x,
        y: position.y + offset.y,
    }), 2), placement = _c[0], setPlacement = _c[1];
    // Make sure tooltip does not overflow window
    useLayoutEffect(function () {
        var xO = 0, yO = 0;
        if (tooltipRef && tooltipRef.current) {
            var measurement = tooltipRef.current.getBoundingClientRect();
            var xOverflow = width - (position.x + measurement.width);
            var yOverflow = height - (position.y + measurement.height);
            if (xOverflow < 0) {
                xO = measurement.width;
            }
            if (yOverflow < 0) {
                yO = measurement.height;
            }
        }
        setPlacement({
            x: position.x + offset.x - xO,
            y: position.y + offset.y - yO,
        });
    }, [tooltipRef, position]);
    var styles = getTooltipContainerStyles(theme);
    return (React.createElement("div", { ref: tooltipRef, style: {
            position: 'fixed',
            left: 0,
            top: 0,
            transform: "translate3d(" + placement.x + "px, " + placement.y + "px, 0)",
        }, className: styles.wrapper }, children));
};
TooltipContainer.displayName = 'TooltipContainer';
var templateObject_1;
//# sourceMappingURL=TooltipContainer.js.map