import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { withCenteredStory } from '../../util/storybook/withCenteredStory';
import { FeedbackButton } from './FeedbackButton';

export default {
  title: 'Buttons/Feedback',
  component: FeedbackButton,
  decorators: [withCenteredStory]
};

const Template: Story<ComponentProps<typeof FeedbackButton>> = (args) => <FeedbackButton {...args} />;

export const DefaultStyle = Template.bind({});
