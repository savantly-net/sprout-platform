import { __assign, __extends } from "tslib";
import React, { PureComponent } from 'react';
import Select from './Select';
import { Icon } from '../../../Icon/Icon';
var ButtonComponent = function (buttonProps) { return function (props) {
    var label = buttonProps.label, className = buttonProps.className, iconClass = buttonProps.iconClass;
    return (React.createElement("div", { ref: props.innerRef, className: "btn navbar-button navbar-button--tight " + className, onClick: props.selectProps.menuIsOpen ? props.selectProps.onMenuClose : props.selectProps.onMenuOpen, onBlur: props.selectProps.onMenuClose, tabIndex: 0 },
        React.createElement("div", { className: "select-button" },
            iconClass && React.createElement(Icon, { className: 'select-button-icon', name: iconClass, size: "lg" }),
            React.createElement("span", { className: "select-button-value" }, label ? label : ''),
            !props.menuIsOpen && React.createElement(Icon, { name: "angle-down", style: { marginBottom: 0 }, size: "lg" }),
            props.menuIsOpen && React.createElement(Icon, { name: "angle-up", style: { marginBottom: 0 }, size: "lg" }))));
}; };
var ButtonSelect = /** @class */ (function (_super) {
    __extends(ButtonSelect, _super);
    function ButtonSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (item) {
            var onChange = _this.props.onChange;
            onChange(item);
        };
        return _this;
    }
    ButtonSelect.prototype.render = function () {
        var _a = this.props, className = _a.className, options = _a.options, value = _a.value, label = _a.label, iconClass = _a.iconClass, components = _a.components, maxMenuHeight = _a.maxMenuHeight, tooltipContent = _a.tooltipContent, isMenuOpen = _a.isMenuOpen, onOpenMenu = _a.onOpenMenu, onCloseMenu = _a.onCloseMenu, tabSelectsValue = _a.tabSelectsValue, _b = _a.autoFocus, autoFocus = _b === void 0 ? true : _b;
        var combinedComponents = __assign(__assign({}, components), { Control: ButtonComponent({ label: label, className: className, iconClass: iconClass }) });
        return (React.createElement(Select, { autoFocus: autoFocus, backspaceRemovesValue: false, isClearable: false, isSearchable: false, options: options, onChange: this.onChange, value: value, isOpen: isMenuOpen, onOpenMenu: onOpenMenu, onCloseMenu: onCloseMenu, maxMenuHeight: maxMenuHeight, components: combinedComponents, className: "gf-form-select-box-button-select", tooltipContent: tooltipContent, tabSelectsValue: tabSelectsValue }));
    };
    return ButtonSelect;
}(PureComponent));
export { ButtonSelect };
//# sourceMappingURL=ButtonSelect.js.map