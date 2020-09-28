import { __read } from "tslib";
import React, { useState } from 'react';
import { text } from '@storybook/addon-knobs';
import { withCenteredStory } from '../../utils/storybook/withCenteredStory';
import { ClipboardButton } from './ClipboardButton';
import { Input } from '../Forms/Legacy/Input/Input';
import mdx from './ClipboardButton.mdx';
var getKnobs = function () {
    return {
        buttonText: text('Button text', 'Copy to clipboard'),
        inputText: text('Input', 'go run build.go -goos linux -pkg-arch amd64 ${OPT} package-only'),
        clipboardCopyMessage: text('Copy message', 'Value copied to clipboard'),
    };
};
var Wrapper = function () {
    var _a = getKnobs(), inputText = _a.inputText, buttonText = _a.buttonText;
    var _b = __read(useState(''), 2), copyMessage = _b[0], setCopyMessage = _b[1];
    return (React.createElement("div", { style: { width: '100%' } },
        React.createElement("div", { style: { display: 'flex', width: '100%', marginBottom: '1em' } },
            React.createElement(ClipboardButton, { variant: "secondary", getText: function () { return getKnobs().inputText; }, onClipboardCopy: function () { return setCopyMessage(getKnobs().clipboardCopyMessage); } }, buttonText),
            React.createElement(Input, { value: inputText, onChange: function () { } })),
        React.createElement("span", null, copyMessage)));
};
export default {
    title: 'Buttons/ClipboardButton',
    component: ClipboardButton,
    decorators: [withCenteredStory],
    parameters: {
        docs: {
            page: mdx,
        },
    },
};
export var copyToClipboard = function () { return React.createElement(Wrapper, null); };
//# sourceMappingURL=ClipboardButton.story.internal.js.map