import { __assign, __rest } from "tslib";
import React from 'react';
import { Tooltip } from '../Tooltip/Tooltip';
import { Icon } from '../Icon/Icon';
export var InfoTooltip = function (_a) {
    var children = _a.children, restProps = __rest(_a, ["children"]);
    return (React.createElement(Tooltip, __assign({ content: children }, restProps),
        React.createElement(Icon, { name: "info-circle" })));
};
//# sourceMappingURL=InfoTooltip.js.map