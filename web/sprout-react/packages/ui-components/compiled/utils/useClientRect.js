import { __read } from "tslib";
import { useState, useCallback } from 'react';
export var useClientRect = function () {
    var _a = __read(useState(null), 2), rect = _a[0], setRect = _a[1];
    var ref = useCallback(function (node) {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
    }, []);
    return [rect, ref];
};
//# sourceMappingURL=useClientRect.js.map