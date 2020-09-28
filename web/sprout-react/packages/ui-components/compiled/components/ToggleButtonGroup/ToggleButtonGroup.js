import { __extends } from "tslib";
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Tooltip } from '../Tooltip/Tooltip';
var ToggleButtonGroup = /** @class */ (function (_super) {
    __extends(ToggleButtonGroup, _super);
    function ToggleButtonGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleButtonGroup.prototype.render = function () {
        var _a;
        var _b = this.props, children = _b.children, label = _b.label, transparent = _b.transparent, width = _b.width;
        var labelClasses = classNames('gf-form-label', (_a = {
                'gf-form-label--transparent': transparent
            },
            _a["width-" + width] = width,
            _a));
        var buttonGroupClasses = classNames('toggle-button-group', {
            'toggle-button-group--transparent': transparent,
            'toggle-button-group--padded': width,
        });
        return (React.createElement("div", { className: "gf-form gf-form--align-center" },
            label && React.createElement("label", { className: labelClasses }, label),
            React.createElement("div", { className: buttonGroupClasses }, children)));
    };
    return ToggleButtonGroup;
}(PureComponent));
export { ToggleButtonGroup };
export var ToggleButton = function (_a) {
    var children = _a.children, selected = _a.selected, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.value, value = _c === void 0 ? null : _c, tooltip = _a.tooltip, onChange = _a.onChange;
    var onClick = function (event) {
        event.stopPropagation();
        if (!selected && onChange) {
            onChange(value);
        }
    };
    var btnClassName = "btn " + className + (selected ? ' active' : '');
    var button = (React.createElement("button", { className: btnClassName, onClick: onClick },
        React.createElement("span", null, children)));
    if (tooltip) {
        return (React.createElement(Tooltip, { content: tooltip, placement: "bottom" }, button));
    }
    else {
        return button;
    }
};
//# sourceMappingURL=ToggleButtonGroup.js.map