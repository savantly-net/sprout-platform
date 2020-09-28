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

export const basic = () => {
  const ctaElements: { [key: string]: JSX.Element } = {
    custom: <h1>This is just H1 tag, you can any component as CTA element</h1>,
    button: (
      <Button size="lg" icon="plus" onClick={action('cta button clicked')}>
        Add datasource
      </Button>
    ),
  };
  const ctaElement = select(
    'Call to action element',
    {
      Custom: 'custom',
      Button: 'button',
    },
    'custom'
  );

  return renderComponentWithTheme(CallToActionCard, {
    message: text('Call to action message', 'Renders message prop content'),
    callToActionElement: ctaElements[ctaElement],
    footer: text('Call to action footer', 'Renders footer prop content'),
  });
};
