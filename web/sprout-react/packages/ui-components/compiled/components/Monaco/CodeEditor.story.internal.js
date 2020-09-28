import React from 'react';
import { number, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withCenteredStory } from '../../utils/storybook/withCenteredStory';
import mdx from './CodeEditor.mdx';
import { CodeEditor } from './CodeEditorLazy';
var getKnobs = function () {
    var CONTAINER_GROUP = 'Container options';
    // ---
    var containerWidth = number('Container width', 300, {
        range: true,
        min: 100,
        max: 500,
        step: 10,
    }, CONTAINER_GROUP);
    return {
        containerWidth: containerWidth,
        text: text('Body', 'SELECT * FROM table LIMIT 10'),
        language: text('Language', 'sql'),
        showLineNumbers: boolean('Show line numbers', false),
        showMiniMap: boolean('Show mini map', false),
        readOnly: boolean('readonly', false),
    };
};
export default {
    title: 'CodeEditor',
    component: CodeEditor,
    decorators: [withCenteredStory],
    parameters: {
        docs: {
            page: mdx,
        },
    },
};
export var basic = function () {
    var _a = getKnobs(), containerWidth = _a.containerWidth, text = _a.text, language = _a.language, showLineNumbers = _a.showLineNumbers, showMiniMap = _a.showMiniMap, readOnly = _a.readOnly;
    return (React.createElement(CodeEditor, { width: containerWidth, height: 400, value: text, language: language, onBlur: function (text) {
            action('code blur')(text);
        }, onSave: function (text) {
            action('code saved')(text);
        }, showLineNumbers: showLineNumbers, showMiniMap: showMiniMap, readOnly: readOnly }));
};
//# sourceMappingURL=CodeEditor.story.internal.js.map