import { __assign } from "tslib";
import React from 'react';
// Ignoring because I couldn't get @types/react-select work with Torkel's fork
// @ts-ignore
import { components } from '@torkelo/react-select';
export var NoOptionsMessage = function (props) {
    var children = props.children;
    return (React.createElement(components.Option, __assign({}, props),
        React.createElement("div", { className: "gf-form-select-box__desc-option" },
            React.createElement("div", { className: "gf-form-select-box__desc-option__body" }, children))));
};
export default NoOptionsMessage;
//# sourceMappingURL=NoOptionsMessage.js.map