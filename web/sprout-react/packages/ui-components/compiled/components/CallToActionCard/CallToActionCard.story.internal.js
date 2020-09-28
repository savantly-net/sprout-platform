import React from 'react';
import { renderComponentWithTheme } from '../../utils/storybook/withTheme';
import { CallToActionCard } from './CallToActionCard';
import { select, text } from '@storybook/addon-knobs';
import { Button } from '../Button/Button';
import { action } from '@storybook/addon-actions';
export default {
    title: 'Layout/CallToActionCard',
    component: CallToActionCard,
};
export var basic = function () {
    var ctaElements = {
        custom: React.createElement("h1", null, "This is just H1 tag, you can any component as CTA element"),
        button: (React.createElement(Button, { size: "lg", icon: "plus", onClick: action('cta button clicked') }, "Add datasource")),
    };
    var ctaElement = select('Call to action element', {
        Custom: 'custom',
        Button: 'button',
    }, 'custom');
    return renderComponentWithTheme(CallToActionCard, {
        message: text('Call to action message', 'Renders message prop content'),
        callToActionElement: ctaElements[ctaElement],
        footer: text('Call to action footer', 'Renders footer prop content'),
    });
};
//# sourceMappingURL=CallToActionCard.story.internal.js.map