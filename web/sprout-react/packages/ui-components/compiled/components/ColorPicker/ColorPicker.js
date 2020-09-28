import { __assign, __extends } from "tslib";
import React, { Component, createRef } from 'react';
import omit from 'lodash/omit';
import { PopoverController } from '../Tooltip/PopoverController';
import { Popover } from '../Tooltip/Popover';
import { ColorPickerPopover } from './ColorPickerPopover';
import { getColorFromHexRgbOrName } from '@savantly/sprout-api';
import { SeriesColorPickerPopover } from './SeriesColorPickerPopover';
import { withTheme } from '../../themes/ThemeContext';
import { ColorPickerTrigger } from './ColorPickerTrigger';
export var colorPickerFactory = function (popover, displayName) {
    var _a;
    if (displayName === void 0) { displayName = 'ColorPicker'; }
    return _a = /** @class */ (function (_super) {
            __extends(ColorPicker, _super);
            function ColorPicker() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.pickerTriggerRef = createRef();
                _this.onColorChange = function (color) {
                    var _a = _this.props, onColorChange = _a.onColorChange, onChange = _a.onChange;
                    var changeHandler = (onColorChange || onChange);
                    return changeHandler(color);
                };
                return _this;
            }
            ColorPicker.prototype.render = function () {
                var _this = this;
                var _a = this.props, theme = _a.theme, children = _a.children;
                var popoverElement = React.createElement(popover, __assign(__assign({}, omit(this.props, 'children')), { onChange: this.onColorChange }));
                return (React.createElement(PopoverController, { content: popoverElement, hideAfter: 300 }, function (showPopper, hidePopper, popperProps) {
                    return (React.createElement(React.Fragment, null,
                        _this.pickerTriggerRef.current && (React.createElement(Popover, __assign({}, popperProps, { referenceElement: _this.pickerTriggerRef.current, wrapperClassName: "ColorPicker", onMouseLeave: hidePopper, onMouseEnter: showPopper }))),
                        children ? (
                        // Children have a bit weird type due to intersection used in the definition so we need to cast here,
                        // but the definition is correct and should not allow to pass a children that does not conform to
                        // ColorPickerTriggerRenderer type.
                        children({
                            ref: _this.pickerTriggerRef,
                            showColorPicker: showPopper,
                            hideColorPicker: hidePopper,
                        })) : (React.createElement(ColorPickerTrigger, { ref: _this.pickerTriggerRef, onClick: showPopper, onMouseLeave: hidePopper, color: getColorFromHexRgbOrName(_this.props.color || '#000000', theme.type) }))));
                }));
            };
            return ColorPicker;
        }(Component)),
        _a.displayName = displayName,
        _a;
};
export var ColorPicker = withTheme(colorPickerFactory(ColorPickerPopover, 'ColorPicker'));
export var SeriesColorPicker = withTheme(colorPickerFactory(SeriesColorPickerPopover, 'SeriesColorPicker'));
//# sourceMappingURL=ColorPicker.js.map