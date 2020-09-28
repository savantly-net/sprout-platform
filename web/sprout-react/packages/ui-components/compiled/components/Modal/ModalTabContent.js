import React from 'react';
import { cx } from 'emotion';
import { Icon } from '../Icon/Icon';
export var ModalTabContent = function (_a) {
    var icon = _a.icon, iconClass = _a.iconClass, children = _a.children;
    return (React.createElement("div", { className: "share-modal-body" },
        React.createElement("div", { className: "share-modal-header" },
            icon && React.createElement(Icon, { name: icon, size: "xxl", className: cx(iconClass, 'share-modal-big-icon') }),
            React.createElement("div", { className: "share-modal-content" }, children))));
};
//# sourceMappingURL=ModalTabContent.js.map