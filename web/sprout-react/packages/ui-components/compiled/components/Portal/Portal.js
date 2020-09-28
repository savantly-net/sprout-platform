import { __assign, __extends } from "tslib";
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
var Portal = /** @class */ (function (_super) {
    __extends(Portal, _super);
    function Portal(props) {
        var _this = _super.call(this, props) || this;
        _this.node = document.createElement('div');
        var _a = _this.props, className = _a.className, _b = _a.root, root = _b === void 0 ? document.body : _b;
        if (className) {
            _this.node.classList.add(className);
        }
        _this.portalRoot = root;
        _this.portalRoot.appendChild(_this.node);
        return _this;
    }
    Portal.prototype.componentWillUnmount = function () {
        this.portalRoot.removeChild(this.node);
    };
    Portal.prototype.render = function () {
        // Default z-index is high to make sure
        return ReactDOM.createPortal(React.createElement("div", { style: { zIndex: 1051, position: 'relative' }, ref: this.props.forwardedRef }, this.props.children), this.node);
    };
    return Portal;
}(PureComponent));
export { Portal };
export var RefForwardingPortal = React.forwardRef(function (props, ref) {
    return React.createElement(Portal, __assign({}, props, { forwardedRef: ref }));
});
//# sourceMappingURL=Portal.js.map