// Libraries
import React from 'react';
import { Icon } from '../Icon/Icon';
export var PanelOptionsGroup = function (props) {
    return (React.createElement("div", { className: "panel-options-group" },
        props.onAdd ? (React.createElement("div", { className: "panel-options-group__header" },
            React.createElement("button", { className: "panel-options-group__add-btn", onClick: props.onAdd },
                React.createElement("div", { className: "panel-options-group__add-circle" },
                    React.createElement(Icon, { name: "plus" })),
                React.createElement("span", { className: "panel-options-group__title" }, props.title)))) : (props.title && (React.createElement("div", { className: "panel-options-group__header" },
            React.createElement("span", { className: "panel-options-group__title" }, props.title),
            props.onClose && (React.createElement("button", { className: "btn btn-link", onClick: props.onClose },
                React.createElement(Icon, { name: "times" })))))),
        props.children && React.createElement("div", { className: "panel-options-group__body" }, props.children)));
};
//# sourceMappingURL=PanelOptionsGroup.js.map