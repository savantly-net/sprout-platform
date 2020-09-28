import React from 'react';
import { ConfirmButton } from './ConfirmButton';
import { Button } from '../Button';
export var DeleteButton = function (_a) {
    var size = _a.size, disabled = _a.disabled, onConfirm = _a.onConfirm;
    return (React.createElement(ConfirmButton, { confirmText: "Delete", confirmVariant: "destructive", size: size || 'md', disabled: disabled, onConfirm: onConfirm },
        React.createElement(Button, { variant: "destructive", icon: "times", size: size || 'sm' })));
};
//# sourceMappingURL=DeleteButton.js.map