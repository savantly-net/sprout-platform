import { __read } from "tslib";
import React, { useState } from 'react';
import { Switch } from './Switch';
import { text } from '@storybook/addon-knobs';
import mdx from './Switch.mdx';
var getStory = function (title, component) { return ({
    title: title,
    parameters: {
        component: component,
        docs: {
            page: mdx,
        },
    },
}); };
export default getStory('Forms/Legacy/Switch', Switch);
var getKnobs = function () {
    return {
        label: text('Label Text', 'Label'),
        tooltip: text('Tooltip', ''),
    };
};
var SwitchWrapper = function () {
    var _a = getKnobs(), label = _a.label, tooltip = _a.tooltip;
    var _b = __read(useState(false), 2), checked = _b[0], setChecked = _b[1];
    return React.createElement(Switch, { label: label, checked: checked, onChange: function () { return setChecked(!checked); }, tooltip: tooltip });
};
export var basic = function () { return React.createElement(SwitchWrapper, null); };
//# sourceMappingURL=Switch.story.internal.js.map