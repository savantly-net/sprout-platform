import { __extends } from "tslib";
import React from 'react';
import { NamedColorsPalette } from './NamedColorsPalette';
import SpectrumPalette from './SpectrumPalette';
import { warnAboutColorPickerPropsDeprecation } from './warnAboutColorPickerPropsDeprecation';
import { GrafanaThemeType, getColorName, getColorFromHexRgbOrName } from '@grafana/data';
var ColorPickerPopover = /** @class */ (function (_super) {
    __extends(ColorPickerPopover, _super);
    function ColorPickerPopover(props) {
        var _this = _super.call(this, props) || this;
        _this.getTabClassName = function (tabName) {
            var activePicker = _this.state.activePicker;
            return "ColorPickerPopover__tab " + (activePicker === tabName && 'ColorPickerPopover__tab--active');
        };
        _this.handleChange = function (color) {
            var _a = _this.props, onColorChange = _a.onColorChange, onChange = _a.onChange, enableNamedColors = _a.enableNamedColors, theme = _a.theme;
            var changeHandler = onColorChange || onChange;
            if (enableNamedColors) {
                return changeHandler(color);
            }
            changeHandler(getColorFromHexRgbOrName(color, theme.type));
        };
        _this.onTabChange = function (tab) {
            return function () { return _this.setState({ activePicker: tab }); };
        };
        _this.renderPicker = function () {
            var activePicker = _this.state.activePicker;
            var _a = _this.props, color = _a.color, theme = _a.theme;
            switch (activePicker) {
                case 'spectrum':
                    return React.createElement(SpectrumPalette, { color: color, onChange: _this.handleChange, theme: theme });
                case 'palette':
                    return (React.createElement(NamedColorsPalette, { color: getColorName(color, theme.type), onChange: _this.handleChange, theme: theme }));
                default:
                    return _this.renderCustomPicker(activePicker);
            }
        };
        _this.renderCustomPicker = function (tabKey) {
            var _a = _this.props, customPickers = _a.customPickers, color = _a.color, theme = _a.theme;
            if (!customPickers) {
                return null;
            }
            return React.createElement(customPickers[tabKey].tabComponent, {
                color: color,
                theme: theme,
                onChange: _this.handleChange,
            });
        };
        _this.renderCustomPickerTabs = function () {
            var customPickers = _this.props.customPickers;
            if (!customPickers) {
                return null;
            }
            return (React.createElement(React.Fragment, null, Object.keys(customPickers).map(function (key) {
                return (React.createElement("div", { className: _this.getTabClassName(key), onClick: _this.onTabChange(key), key: key }, customPickers[key].name));
            })));
        };
        _this.state = {
            activePicker: 'palette',
        };
        warnAboutColorPickerPropsDeprecation('ColorPickerPopover', props);
        return _this;
    }
    ColorPickerPopover.prototype.render = function () {
        var theme = this.props.theme;
        var colorPickerTheme = theme.type || GrafanaThemeType.Dark;
        return (React.createElement("div", { className: "ColorPickerPopover ColorPickerPopover--" + colorPickerTheme },
            React.createElement("div", { className: "ColorPickerPopover__tabs" },
                React.createElement("div", { className: this.getTabClassName('palette'), onClick: this.onTabChange('palette') }, "Colors"),
                React.createElement("div", { className: this.getTabClassName('spectrum'), onClick: this.onTabChange('spectrum') }, "Custom"),
                this.renderCustomPickerTabs()),
            React.createElement("div", { className: "ColorPickerPopover__content" }, this.renderPicker())));
    };
    return ColorPickerPopover;
}(React.Component));
export { ColorPickerPopover };
//# sourceMappingURL=ColorPickerPopover.js.map