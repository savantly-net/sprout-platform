import { __extends } from "tslib";
import React, { PureComponent } from 'react';
import { Alert } from '../Alert/Alert';
import { ErrorWithStack } from './ErrorWithStack';
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            error: null,
            errorInfo: null,
        };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    };
    ErrorBoundary.prototype.render = function () {
        var children = this.props.children;
        var _a = this.state, error = _a.error, errorInfo = _a.errorInfo;
        return children({
            error: error,
            errorInfo: errorInfo,
        });
    };
    return ErrorBoundary;
}(PureComponent));
export { ErrorBoundary };
var ErrorBoundaryAlert = /** @class */ (function (_super) {
    __extends(ErrorBoundaryAlert, _super);
    function ErrorBoundaryAlert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorBoundaryAlert.prototype.render = function () {
        var _a = this.props, title = _a.title, children = _a.children, style = _a.style;
        return (React.createElement(ErrorBoundary, null, function (_a) {
            var error = _a.error, errorInfo = _a.errorInfo;
            if (!errorInfo) {
                return children;
            }
            if (style === 'alertbox') {
                return (React.createElement(Alert, { title: title || '' },
                    React.createElement("details", { style: { whiteSpace: 'pre-wrap' } },
                        error && error.toString(),
                        React.createElement("br", null),
                        errorInfo.componentStack)));
            }
            return React.createElement(ErrorWithStack, { title: title || '', error: error, errorInfo: errorInfo });
        }));
    };
    ErrorBoundaryAlert.defaultProps = {
        title: 'An unexpected error happened',
        style: 'alertbox',
    };
    return ErrorBoundaryAlert;
}(PureComponent));
export { ErrorBoundaryAlert };
//# sourceMappingURL=ErrorBoundary.js.map