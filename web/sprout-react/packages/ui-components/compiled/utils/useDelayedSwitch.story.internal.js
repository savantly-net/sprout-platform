import React from 'react';
import { withCenteredStory } from './storybook/withCenteredStory';
import { useDelayedSwitch } from './useDelayedSwitch';
import { boolean, number } from '@storybook/addon-knobs';
var getKnobs = function () {
    return {
        value: boolean('Value', false),
        duration: number('Duration to stay on', 2000),
        delay: number('Delay before switching on', 2000),
    };
};
function StoryWrapper() {
    var _a = getKnobs(), value = _a.value, _b = _a.delay, delay = _b === void 0 ? 0 : _b, _c = _a.duration, duration = _c === void 0 ? 0 : _c;
    var valueDelayed = useDelayedSwitch(value, { delay: delay, duration: duration });
    return React.createElement("div", null, valueDelayed ? 'ON' : 'OFF');
}
export default {
    title: 'useDelayedSwitch',
    decorators: [withCenteredStory],
};
export var basic = function () {
    return React.createElement(StoryWrapper, null);
};
//# sourceMappingURL=useDelayedSwitch.story.internal.js.map