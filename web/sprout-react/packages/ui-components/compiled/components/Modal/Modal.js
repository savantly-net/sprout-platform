import { __extends } from "tslib";
import React from 'react';
import { Portal } from '../Portal/Portal';
import { cx } from 'emotion';
import { withTheme } from '../../themes';
import { getModalStyles } from './getModalStyles';
import { ModalHeader } from './ModalHeader';
import { IconButton } from '../IconButton/IconButton';
var UnthemedModal = /** @class */ (function (_super) {
    __extends(UnthemedModal, _super);
    function UnthemedModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onDismiss = function () {
            if (_this.props.onDismiss) {
                _this.props.onDismiss();
            }
        };
        _this.onClickBackdrop = function () {
            _this.onDismiss();
        };
        return _this;
    }
    UnthemedModal.prototype.renderDefaultHeader = function (title) {
        var icon = this.props.icon;
        return React.createElement(ModalHeader, { icon: icon, title: title });
    };
    UnthemedModal.prototype.render = function () {
        var _a = this.props, title = _a.title, _b = _a.isOpen, isOpen = _b === void 0 ? false : _b, theme = _a.theme, className = _a.className;
        var styles = getModalStyles(theme);
        if (!isOpen) {
            return null;
        }
        return (React.createElement(Portal, null,
            React.createElement("div", { className: cx(styles.modal, className) },
                React.createElement("div", { className: styles.modalHeader },
                    typeof title === 'string' ? this.renderDefaultHeader(title) : title,
                    React.createElement("div", { className: styles.modalHeaderClose },
                        React.createElement(IconButton, { surface: "header", name: "times", size: "lg", onClick: this.onDismiss }))),
                React.createElement("div", { className: styles.modalContent }, this.props.children)),
            React.createElement("div", { className: styles.modalBackdrop, onClick: this.props.onClickBackdrop || this.onClickBackdrop })));
    };
    return UnthemedModal;
}(React.PureComponent));
export { UnthemedModal };
export var Modal = withTheme(UnthemedModal);
//# sourceMappingURL=Modal.js.map