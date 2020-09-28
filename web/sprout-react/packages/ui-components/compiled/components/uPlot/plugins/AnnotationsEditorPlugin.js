import { __makeTemplateObject } from "tslib";
import React, { useRef } from 'react';
import { SelectionPlugin } from './SelectionPlugin';
import { css } from 'emotion';
import { Button } from '../../Button';
import useClickAway from 'react-use/lib/useClickAway';
export var AnnotationsEditorPlugin = function (_a) {
    var onAnnotationCreate = _a.onAnnotationCreate;
    var pluginId = 'AnnotationsEditorPlugin';
    return (React.createElement(SelectionPlugin, { id: pluginId, onSelect: function (selection) {
            console.log(selection);
        }, lazy: true }, function (_a) {
        var selection = _a.selection, clearSelection = _a.clearSelection;
        return React.createElement(AnnotationEditor, { selection: selection, onClose: clearSelection });
    }));
};
var AnnotationEditor = function (_a) {
    var onClose = _a.onClose, selection = _a.selection;
    var ref = useRef(null);
    useClickAway(ref, function () {
        if (onClose) {
            onClose();
        }
    });
    return (React.createElement("div", null,
        React.createElement("div", { ref: ref, className: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          position: absolute;\n          background: purple;\n          top: ", "px;\n          left: ", "px;\n          width: ", "px;\n          height: ", "px;\n        "], ["\n          position: absolute;\n          background: purple;\n          top: ", "px;\n          left: ", "px;\n          width: ", "px;\n          height: ", "px;\n        "])), selection.bbox.top, selection.bbox.left, selection.bbox.width, selection.bbox.height) },
            "Annotations editor maybe?",
            React.createElement(Button, { onClick: function () { } }, "Create annotation"))));
};
var templateObject_1;
//# sourceMappingURL=AnnotationsEditorPlugin.js.map