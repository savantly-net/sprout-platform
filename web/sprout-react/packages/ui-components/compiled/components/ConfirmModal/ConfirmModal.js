import { __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import { css } from 'emotion';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button';
import { stylesFactory, ThemeContext } from '../../themes';
import { HorizontalGroup } from '..';
export var ConfirmModal = function (_a) {
    var isOpen = _a.isOpen, title = _a.title, body = _a.body, confirmText = _a.confirmText, _b = _a.dismissText, dismissText = _b === void 0 ? 'Cancel' : _b, _c = _a.icon, icon = _c === void 0 ? 'exclamation-triangle' : _c, onConfirm = _a.onConfirm, onDismiss = _a.onDismiss;
    var theme = useContext(ThemeContext);
    var styles = getStyles(theme);
    return (React.createElement(Modal, { className: styles.modal, title: title, icon: icon, isOpen: isOpen, onDismiss: onDismiss },
        React.createElement("div", { className: styles.modalContent },
            React.createElement("div", { className: styles.modalText }, body),
            React.createElement(HorizontalGroup, { justify: "center" },
                React.createElement(Button, { variant: "destructive", onClick: onConfirm }, confirmText),
                React.createElement(Button, { variant: "secondary", onClick: onDismiss }, dismissText)))));
};
var getStyles = stylesFactory(function (theme) { return ({
    modal: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: 500px;\n  "], ["\n    width: 500px;\n  "]))),
    modalContent: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    text-align: center;\n  "], ["\n    text-align: center;\n  "]))),
    modalText: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    font-size: ", ";\n    color: ", ";\n    margin-bottom: calc(", " * 2);\n    padding-top: ", ";\n  "], ["\n    font-size: ", ";\n    color: ", ";\n    margin-bottom: calc(", " * 2);\n    padding-top: ", ";\n  "])), theme.typography.heading.h4, theme.colors.link, theme.spacing.d, theme.spacing.d),
}); });
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=ConfirmModal.js.map