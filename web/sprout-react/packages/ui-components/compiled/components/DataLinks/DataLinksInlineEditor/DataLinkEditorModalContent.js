import { __read } from "tslib";
import React, { useState } from 'react';
import { DataLinkEditor } from '../DataLinkEditor';
import { HorizontalGroup } from '../../Layout/Layout';
import { Button } from '../../Button';
export var DataLinkEditorModalContent = function (_a) {
    var link = _a.link, index = _a.index, suggestions = _a.suggestions, onSave = _a.onSave, onCancel = _a.onCancel;
    var _b = __read(useState(link), 2), dirtyLink = _b[0], setDirtyLink = _b[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(DataLinkEditor, { value: dirtyLink, index: index, isLast: false, suggestions: suggestions, onChange: function (index, link) {
                setDirtyLink(link);
            } }),
        React.createElement(HorizontalGroup, null,
            React.createElement(Button, { onClick: function () {
                    onSave(index, dirtyLink);
                } }, "Save"),
            React.createElement(Button, { variant: "secondary", onClick: function () { return onCancel(index); } }, "Cancel"))));
};
//# sourceMappingURL=DataLinkEditorModalContent.js.map