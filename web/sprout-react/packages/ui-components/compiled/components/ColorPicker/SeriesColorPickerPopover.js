import { __assign, __extends, __rest } from "tslib";
import React from 'react';
import { ColorPickerPopover } from './ColorPickerPopover';
import { Switch } from '../Forms/Legacy/Switch/Switch';
import { withTheme } from '../../themes/ThemeContext';
export var SeriesColorPickerPopover = function (props) {
    var yaxis = props.yaxis, onToggleAxis = props.onToggleAxis, color = props.color, colorPickerProps = __rest(props, ["yaxis", "onToggleAxis", "color"]);
    return (React.createElement(ColorPickerPopover, __assign({}, colorPickerProps, { color: color || '#000000', customPickers: {
            yaxis: {
                name: 'Y-Axis',
                tabComponent: function () { return (React.createElement(Switch, { key: "yaxisSwitch", label: "Use right y-axis", className: "ColorPicker__axisSwitch", labelClass: "ColorPicker__axisSwitchLabel", checked: yaxis === 2, onChange: function () {
                        if (onToggleAxis) {
                            onToggleAxis();
                        }
                    } })); },
            },
        } })));
};
var AxisSelector = /** @class */ (function (_super) {
    __extends(AxisSelector, _super);
    function AxisSelector(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            yaxis: _this.props.yaxis,
        };
        _this.onToggleAxis = _this.onToggleAxis.bind(_this);
        return _this;
    }
    AxisSelector.prototype.onToggleAxis = function () {
        this.setState({
            yaxis: this.state.yaxis === 2 ? 1 : 2,
        });
        if (this.props.onToggleAxis) {
            this.props.onToggleAxis();
        }
    };
    AxisSelector.prototype.render = function () {
        var leftButtonClass = this.state.yaxis === 1 ? 'btn-primary' : 'btn-inverse';
        var rightButtonClass = this.state.yaxis === 2 ? 'btn-primary' : 'btn-inverse';
        return (React.createElement("div", { className: "p-b-1" },
            React.createElement("label", { className: "small p-r-1" }, "Y Axis:"),
            React.createElement("button", { onClick: this.onToggleAxis, className: 'btn btn-small ' + leftButtonClass }, "Left"),
            React.createElement("button", { onClick: this.onToggleAxis, className: 'btn btn-small ' + rightButtonClass }, "Right")));
    };
    return AxisSelector;
}(React.PureComponent));
export { AxisSelector };
// This component is to enable SeriesColorPickerPopover usage via series-color-picker-popover directive
export var SeriesColorPickerPopoverWithTheme = withTheme(SeriesColorPickerPopover);
//# sourceMappingURL=SeriesColorPickerPopover.js.map