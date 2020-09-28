import { __extends } from "tslib";
import React from 'react';
import { withTheme } from '../../themes';
import { registerSuggestions } from './suggestions';
import ReactMonaco from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
var UnthemedCodeEditor = /** @class */ (function (_super) {
    __extends(UnthemedCodeEditor, _super);
    function UnthemedCodeEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // This is replaced with a real function when the actual editor mounts
        _this.getEditorValue = function () { return ''; };
        _this.onBlur = function () {
            var onBlur = _this.props.onBlur;
            if (onBlur) {
                onBlur(_this.getEditorValue());
            }
        };
        _this.editorWillMount = function (m) {
            var _a = _this.props, language = _a.language, getSuggestions = _a.getSuggestions;
            if (getSuggestions) {
                _this.completionCancel = registerSuggestions(language, getSuggestions);
            }
        };
        _this.editorDidMount = function (editor) {
            var _a = _this.props, onSave = _a.onSave, onEditorDidMount = _a.onEditorDidMount;
            _this.getEditorValue = function () { return editor.getValue(); };
            if (onSave) {
                editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
                    onSave(_this.getEditorValue());
                });
            }
            if (onEditorDidMount) {
                onEditorDidMount(editor);
            }
        };
        return _this;
    }
    UnthemedCodeEditor.prototype.componentWillUnmount = function () {
        if (this.completionCancel) {
            this.completionCancel.dispose();
        }
    };
    UnthemedCodeEditor.prototype.componentDidUpdate = function (oldProps) {
        var _a = this.props, getSuggestions = _a.getSuggestions, language = _a.language;
        if (getSuggestions) {
            // Language changed
            if (language !== oldProps.language) {
                if (this.completionCancel) {
                    this.completionCancel.dispose();
                }
                this.completionCancel = registerSuggestions(language, getSuggestions);
            }
        }
    };
    UnthemedCodeEditor.prototype.render = function () {
        var _a;
        var _b = this.props, theme = _b.theme, language = _b.language, width = _b.width, height = _b.height, showMiniMap = _b.showMiniMap, showLineNumbers = _b.showLineNumbers, readOnly = _b.readOnly;
        var value = (_a = this.props.value) !== null && _a !== void 0 ? _a : '';
        var longText = value.length > 100;
        var options = {
            wordWrap: 'off',
            codeLens: false,
            minimap: {
                enabled: longText && showMiniMap,
                renderCharacters: false,
            },
            readOnly: readOnly,
            lineNumbersMinChars: 4,
            lineDecorationsWidth: 0,
            overviewRulerBorder: false,
            automaticLayout: true,
        };
        if (!showLineNumbers) {
            options.glyphMargin = false;
            options.folding = false;
            options.lineNumbers = 'off';
            options.lineDecorationsWidth = 5; // left margin when not showing line numbers
            options.lineNumbersMinChars = 0;
        }
        return (React.createElement("div", { onBlur: this.onBlur },
            React.createElement(ReactMonaco, { width: width, height: height, language: language, theme: theme.isDark ? 'vs-dark' : 'vs-light', value: value, options: options, editorWillMount: this.editorWillMount, editorDidMount: this.editorDidMount })));
    };
    return UnthemedCodeEditor;
}(React.PureComponent));
export default withTheme(UnthemedCodeEditor);
//# sourceMappingURL=CodeEditor.js.map