import React from 'react';
import { Icon } from '../Icon/Icon';
export var LoadingPlaceholder = function (_a) {
    var text = _a.text;
    return (React.createElement("div", { className: "gf-form-group" },
        text,
        " ",
        React.createElement(Icon, { name: "fa fa-spinner", className: "fa-spin" })));
};
//# sourceMappingURL=LoadingPlaceholder.js.map