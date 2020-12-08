import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { monoIcons } from '../../types';
import { withCenteredStory } from '../../util/storybook/withCenteredStory';
import { fabIcons, fasIcons } from '../Icon/Icon';
import { LoadingIcon } from './LoadingIcon';

const withDupes = fabIcons.concat(fasIcons).concat(monoIcons);
const availableFaIcons = withDupes.filter((name, index) => {
  return withDupes.indexOf(name) === index;
});

const icons = availableFaIcons.sort((a, b) => a.localeCompare(b));

export default {
  title: 'Icon/LoadingIcon',
  component: LoadingIcon,
  decorators: [withCenteredStory],
  argTypes: {
    name: {
      control: {
        type: 'select',
        options: icons
      }
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x']
      }
    },
    color: { control: 'color' }
  }
};

const Template: Story<ComponentProps<typeof LoadingIcon>> = (args) => <LoadingIcon {...args} />;

export const DefaultStyle = Template.bind({});
