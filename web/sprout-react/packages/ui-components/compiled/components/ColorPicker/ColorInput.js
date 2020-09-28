import { __assign, __extends } from "tslib";
import React from 'react';
import tinycolor from 'tinycolor2';
import debounce from 'lodash/debounce';
import { Input } from '../Forms/Legacy/Input/Input';
var ColorInput = /** @class */ (function (_super) {
    __extends(ColorInput, _super);
    function ColorInput(props) {
        var _this = _super.call(this, props) || this;
        _this.updateColor = function (color) {
            _this.props.onChange(color);
        };
        _this.onChange = function (event) {
            var newColor = tinycolor(event.currentTarget.value);
            _this.setState({
                value: event.currentTarget.value,
            });
            if (newColor.isValid()) {
                _this.updateColor(newColor.toString());
            }
        };
        _this.onBlur = function () {
            var newColor = tinycolor(_this.state.value);
            if (!newColor.isValid()) {
                _this.setState({
                    value: _this.props.color,
                });
            }
        };
        _this.state = {
            previousColor: props.color,
            value: props.color,
        };
        _this.updateColor = debounce(_this.updateColor, 100);
        return _this;
    }
    ColorInput.getDerivedStateFromProps = function (props, state) {
        var newColor = tinycolor(props.color);
        if (newColor.isValid() && props.color !== state.previousColor) {
            return __assign(__assign({}, state), { previousColor: props.color, value: newColor.toString() });
        }
        return state;
    };
    ColorInput.prototype.render = function () {
        var value = this.state.value;
        return (React.createElement("div", { style: __assign({ display: 'flex' }, this.props.style) },
            React.createElement("div", { style: {
                    background: this.props.color,
                    width: '35px',
                    height: '35px',
                    flexGrow: 0,
                    borderRadius: '3px 0 0 3px',
                } }),
            React.createElement("div", { style: {
                    flexGrow: 1,
                } },
                React.createElement(Input, { className: "gf-form-input", value: value, onChange: this.onChange, onBlur: this.onBlur }))));
    };
    return ColorInput;
}(React.PureComponent));
export default ColorInput;
//# sourceMappingURL=ColorInput.js.map