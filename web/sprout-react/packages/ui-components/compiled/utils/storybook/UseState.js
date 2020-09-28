import { __assign, __extends } from "tslib";
import React from 'react';
import { action } from '@storybook/addon-actions';
var UseState = /** @class */ (function (_super) {
    __extends(UseState, _super);
    function UseState(props) {
        var _this = _super.call(this, props) || this;
        _this.handleStateUpdate = function (nextState) {
            _this.setState({ value: nextState });
        };
        _this.state = {
            value: props.initialState,
            initialState: props.initialState,
        };
        return _this;
    }
    // @ts-ignore
    UseState.getDerivedStateFromProps = function (props, state) {
        if (props.initialState !== state.initialState) {
            return {
                initialState: props.initialState,
                value: props.initialState,
            };
        }
        return __assign(__assign({}, state), { value: state.value });
    };
    UseState.prototype.render = function () {
        if (this.props.logState) {
            action('UseState current state')(this.state.value);
        }
        return this.props.children(this.state.value, this.handleStateUpdate);
    };
    return UseState;
}(React.Component));
export { UseState };
//# sourceMappingURL=UseState.js.map