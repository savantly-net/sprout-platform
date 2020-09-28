import { __assign } from "tslib";
import React from 'react';
import { useAsyncDependency } from '../../utils/useAsyncDependency';
import { ErrorWithStack, LoadingPlaceholder } from '..';
export var CodeEditor = function (props) {
    var _a = useAsyncDependency(import(/* webpackChunkName: "code-editor" */ './CodeEditor')), loading = _a.loading, error = _a.error, dependency = _a.dependency;
    if (loading) {
        return React.createElement(LoadingPlaceholder, { text: '' });
    }
    if (error) {
        return (React.createElement(ErrorWithStack, { title: "Code editor failed to load", error: error, errorInfo: { componentStack: (error === null || error === void 0 ? void 0 : error.stack) || '' } }));
    }
    var CodeEditor = dependency.default;
    return React.createElement(CodeEditor, __assign({}, props));
};
//# sourceMappingURL=CodeEditorLazy.js.map