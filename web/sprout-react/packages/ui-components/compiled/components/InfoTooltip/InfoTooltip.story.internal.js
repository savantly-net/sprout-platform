import React from 'react';
import { withCenteredStory } from '../../utils/storybook/withCenteredStory';
import { InfoTooltip } from './InfoTooltip';
import { Tooltip } from '../Chart/Tooltip';
export default {
    title: 'Overlays/Tooltip',
    component: Tooltip,
    decorators: [withCenteredStory],
};
export var basic = function () { return React.createElement(InfoTooltip, null, "This is the content of the tooltip"); };
//# sourceMappingURL=InfoTooltip.story.internal.js.map